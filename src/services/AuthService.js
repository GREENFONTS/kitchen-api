const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const apiResponse = require('../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Register a new customer
 * @param {Object} userData - The customer registration data
 * @returns {Promise<Object>} API response with created customer
 */
const registerCustomer = async userData => {
  return apiResponse.handleServiceResponse(
    async () => {
      // Check if email already exists in customers
      const existingCustomer = await prisma.customer.findUnique({
        where: { email: userData.email },
      });

      if (existingCustomer) {
        throw new Error('Validation failed: Email already in use');
      }

      // Check if email already exists in vendors
      const existingVendor = await prisma.vendor.findUnique({
        where: { email: userData.email },
      });

      if (existingVendor) {
        throw new Error('Validation failed: Email already in use');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Create customer
      const customer = await prisma.customer.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return customer;
    },
    {
      successMessage: 'Customer registration successful',
      errorMessage: 'Customer registration failed',
    }
  );
};

/**
 * Login a customer
 * @param {Object} credentials - The login credentials
 * @returns {Promise<Object>} API response with auth token and customer data
 */
const loginCustomer = async credentials => {
  return apiResponse.handleServiceResponse(
    async () => {
      // Find customer by email
      const customer = await prisma.customer.findUnique({
        where: { email: credentials.email },
      });

      if (!customer) {
        throw new Error('Invalid credentials');
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(credentials.password, customer.password);

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: customer.id,
          email: customer.email,
          userType: 'CUSTOMER',
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Create customer response object without password
      const customerResponse = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        userType: 'CUSTOMER',
      };

      return {
        token,
        user: customerResponse,
      };
    },
    {
      successMessage: 'Customer login successful',
      errorMessage: 'Customer login failed',
    }
  );
};

/**
 * Login a vendor
 * @param {Object} credentials - The login credentials
 * @returns {Promise<Object>} API response with auth token and vendor data
 */
const loginVendor = async credentials => {
  return apiResponse.handleServiceResponse(
    async () => {
      // Find vendor by email
      const vendor = await prisma.vendor.findUnique({
        where: { email: credentials.email },
      });

      if (!vendor) {
        throw new Error('Invalid credentials');
      }

      // Check if vendor is active
      if (!vendor.isActive) {
        throw new Error('Account is inactive. Please contact support.');
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(credentials.password, vendor.password);

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: vendor.id,
          email: vendor.email,
          userType: 'VENDOR',
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Create vendor response object without password
      const vendorResponse = {
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
        userType: 'VENDOR',
        address: vendor.address,
        phone: vendor.phone,
        isActive: vendor.isActive,
      };

      return {
        token,
        user: vendorResponse,
      };
    },
    {
      successMessage: 'Vendor login successful',
      errorMessage: 'Vendor login failed',
    }
  );
};

/**
 * Verify JWT token
 * @param {string} token - The JWT token
 * @returns {Promise<Object>} API response with decoded token
 */
const verifyToken = async token => {
  return apiResponse.handleServiceResponse(
    async () => {
      if (!token) {
        throw new Error('Token is required');
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
      } catch (error) {
        throw new Error('Invalid or expired token');
      }
    },
    {
      successMessage: 'Token verified successfully',
      errorMessage: 'Token verification failed',
    }
  );
};

module.exports = { registerCustomer, loginCustomer, loginVendor, verifyToken };
