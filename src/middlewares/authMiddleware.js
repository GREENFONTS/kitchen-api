const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const apiResponse = require('../utils/apiResponse');

/**
 * Verify JWT token and attach user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(
        apiResponse.error({
          message: 'Authentication required',
          status: 401,
        })
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Find user based on userType
    let user;

    if (decoded.userType === 'CUSTOMER') {
      user = await prisma.customer.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } else if (decoded.userType === 'VENDOR') {
      user = await prisma.vendor.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          phone: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    if (!user) {
      return res.status(401).json(
        apiResponse.error({
          message: 'Invalid authentication token',
          status: 401,
        })
      );
    }

    // Attach user to request
    req.user = { ...user, userType: decoded.userType };

    next();
  } catch (error) {
    return res.status(401).json(
      apiResponse.error({
        message: 'Authentication failed: ' + error.message,
        status: 401,
      })
    );
  }
};

/**
 * Middleware to ensure user is a customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireCustomer = async (req, res, next) => {
  // First authenticate the user
  authenticate(req, res, () => {
    // Check if user is a customer
    if (req.user.userType !== 'CUSTOMER') {
      return res.status(403).json(apiResponse.forbidden('Unauthorized'));
    }

    next();
  });
};

/**
 * Middleware to ensure user is a vendor
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireVendor = async (req, res, next) => {
  // First authenticate the user
  authenticate(req, res, () => {
    // Check if user is a vendor
    if (req.user.userType !== 'VENDOR') {
      return res.status(403).json(apiResponse.forbidden('Unauthorized'));
    }

    // Check if vendor is active
    if (!req.user.isActive) {
      return res
        .status(403)
        .json(apiResponse.forbidden('Access denied: Vendor account is inactive'));
    }

    next();
  });
};

/**
 * Middleware to ensure user is a vendor and owns the resource
 * @param {string} paramName - Name of the parameter containing the resource ID
 * @returns {Function} Middleware function
 */
const requireVendorOwnership = paramName => {
  return async (req, res, next) => {
    // First authenticate as vendor
    requireVendor(req, res, async () => {
      try {
        const resourceId = req.params[paramName];

        // Check if the resource exists and belongs to this vendor
        const resource = await prisma.menuItem.findUnique({
          where: { id: resourceId },
        });

        if (!resource) {
          return res.status(404).json(apiResponse.notFound('Resource not found'));
        }

        if (resource.vendorId !== req.user.id) {
          return res.status(403).json(apiResponse.forbidden('Unauthorized'));
        }

        next();
      } catch (error) {
        return res.status(500).json(apiResponse.serverError('Server error: ' + error.message));
      }
    });
  };
};

module.exports = { authenticate, requireCustomer, requireVendor, requireVendorOwnership };
