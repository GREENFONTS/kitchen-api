const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { handleServiceResponse } = require('../utils/apiResponse');

/**
 * Get all vendors with pagination
 * @param {Object} options - Query options
 * @param {Object} options.filters - Optional filters like isActive
 * @param {number} options.page - Page number (starts from 1)
 * @param {number} options.limit - Number of items per page
 * @param {string} options.sortBy - Field to sort by
 * @param {string} options.sortOrder - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} API response with vendors data
 */
const getAllVendors = async ({
  filters = {},
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
} = {}) => {
  return handleServiceResponse(
    async () => {
      // Validate pagination parameters
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, Math.min(20, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;

      // Build where clause for filters
      const where = {
        isActive: true,
      };

      if (filters.isActive !== undefined) {
        where.isActive = filters.isActive === true || filters.isActive === 'true';
      }

      if (filters.name) {
        where.name = {
          contains: filters.name,
          mode: 'insensitive',
        };
      }

      // Build orderBy object
      const orderBy = {};
      orderBy[sortBy] = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

      // Get total count for pagination metadata
      const totalCount = await prisma.vendor.count({ where });

      // Get vendors with pagination
      const vendors = await prisma.vendor.findMany({
        where,
        include: {
          menuItems: true,
        },
        skip,
        take: limitNum,
        orderBy,
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limitNum);
      const hasNext = pageNum < totalPages;
      const hasPrevious = pageNum > 1;

      return {
        data: vendors,
        meta: {
          page: pageNum,
          limit: limitNum,
          totalCount,
          totalPages,
          hasNext,
          hasPrevious,
        },
      };
    },
    {
      successMessage: 'Vendors retrieved successfully',
      errorMessage: 'Failed to retrieve vendors',
    }
  );
};

/**
 * Get vendor by ID
 * @param {string} id - The vendor ID
 * @returns {Promise<Object>} API response with vendor data
 */
const getVendorById = async id => {
  return handleServiceResponse(
    async () => {
      const vendor = await prisma.vendor.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          isActive: true,
          menuItems: {
            include: {
              category: true,
            },
          },
        },
      });

      if (!vendor) {
        throw new Error('Vendor not found');
      }

      return vendor;
    },
    {
      successMessage: 'Vendor retrieved successfully',
      errorMessage: 'Failed to retrieve vendor',
    }
  );
};

/**
 * Get all menu items for a vendor
 * @param {string} vendorId - The vendor ID
 * @returns {Promise<Object>} API response with vendor menu items
 */
const getVendorMenuItems = async vendorId => {
  return handleServiceResponse(
    async () => {
      // First check if vendor exists
      const existingVendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
      });

      if (!existingVendor) {
        throw new Error('Vendor not found');
      }

      const menuItems = await prisma.menuItem.findMany({
        where: { vendorId },
        include: {
          category: true,
        },
      });

      return menuItems;
    },
    {
      successMessage: 'Vendor menu items retrieved successfully',
      errorMessage: 'Failed to retrieve vendor menu items',
    }
  );
};

/**
 * Check if vendors exist in the database
 * @returns {Promise<boolean>} True if vendors exist, false otherwise
 */
const vendorsExist = async () => {
  try {
    const count = await prisma.vendor.count();
    return count > 0;
  } catch (error) {
    throw new Error(`Error checking vendors: ${error.message}`);
  }
};

module.exports = { getAllVendors, getVendorById, getVendorMenuItems, vendorsExist };
