const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { handleServiceResponse } = require('../utils/apiResponse');

/**
 * Get all categories for a vendor
 * @param {string} vendorId - The vendor ID
 * @returns {Promise<Object>} API response with vendor categories
 */
const getVendorCategories = async vendorId => {
  return handleServiceResponse(
    async () => {
      // First check if vendor exists
      const existingVendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
      });

      if (!existingVendor) {
        throw new Error('Vendor not found');
      }

      const categories = await prisma.category.findMany({
        where: { vendorId },
      });

      return categories;
    },
    {
      successMessage: 'Vendor categories retrieved successfully',
      errorMessage: 'Failed to retrieve vendor categories',
    }
  );
};

/**
 * Create a new category
 * @param {Object} categoryData - The category data
 * @returns {Promise<Object>} API response with created category
 */
const createCategory = async categoryData => {
  return handleServiceResponse(
    async () => {
      // Check if category with same name already exists
      const existingCategory = await prisma.category.findFirst({
        where: { name: { equals: categoryData.name, mode: 'insensitive' } },
      });

      if (existingCategory) {
        throw new Error('Category with this name already exists');
      }

      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
        },
      });

      return category;
    },
    {
      successMessage: 'Category created successfully',
      errorMessage: 'Failed to create category',
    }
  );
};

module.exports = { getVendorCategories, createCategory };
