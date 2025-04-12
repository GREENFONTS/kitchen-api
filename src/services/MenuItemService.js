import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as apiResponse from '../utils/apiResponse.js';

/**
 * Get all menu items with pagination
 * @param {Object} options - Query options
 * @param {Object} options.filters - Optional filters
 * @param {number} options.page - Page number (starts from 1)
 * @param {number} options.limit - Number of items per page
 * @param {string} options.sortBy - Field to sort by
 * @param {string} options.sortOrder - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} API response with paginated menu items
 */
const getAllMenuItems = async ({
  filters = {},
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
} = {}) => {
  return apiResponse.handleServiceResponse(
    async () => {
      // Validate pagination parameters
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, Math.min(20, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;

      // Build where clause for filters
      const where = {
        available: true,
      };

      if (filters.available !== undefined) {
        where.available = filters.available === true || filters.available === 'true';
      }

      if (filters.name) {
        where.name = {
          contains: filters.name,
          mode: 'insensitive',
        };
      }

      if (filters.vendorId) {
        where.vendorId = filters.vendorId;
      }

      if (filters.categoryId) {
        where.categoryId = filters.categoryId;
      }

      if (filters.minPrice !== undefined) {
        where.price = {
          ...where.price,
          gte: parseFloat(filters.minPrice),
        };
      }

      if (filters.maxPrice !== undefined) {
        where.price = {
          ...where.price,
          lte: parseFloat(filters.maxPrice),
        };
      }

      // Build orderBy object
      const orderBy = {};
      orderBy[sortBy] = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

      // Get total count for pagination metadata
      const totalCount = await prisma.menuItem.count({ where });

      // Get menu items with pagination
      const menuItems = await prisma.menuItem.findMany({
        where,
        include: {
          vendor: {
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          },
          category: true,
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
        data: menuItems,
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
      successMessage: 'Menu items retrieved successfully',
      errorMessage: 'Failed to retrieve menu items',
    }
  );
};

/**
 * Get menu item by ID
 * @param {string} id - The menu item ID
 * @returns {Promise<Object>} API response with menu item data
 */
const getMenuItemById = async id => {
  return apiResponse.handleServiceResponse(
    async () => {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id },
        include: {
          vendor: {
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!menuItem) {
        throw new Error('Menu item not found');
      }

      return menuItem;
    },
    {
      successMessage: 'Menu item retrieved successfully',
      errorMessage: 'Failed to retrieve menu item',
    }
  );
};

/**
 * Create a new menu item
 * @param {Object} menuItemData - The menu item data
 * @returns {Promise<Object>} API response with created menu item
 */
const createMenuItem = async menuItemData => {
  return apiResponse.handleServiceResponse(
    async () => {
      // Check if vendor exists
      const vendor = await prisma.vendor.findUnique({
        where: { id: menuItemData.vendorId },
      });

      if (!vendor) {
        throw new Error('Vendor not found');
      }

      let categoryId = null;
      if (menuItemData.categoryId) {
        // Check if category exists
        const category = await prisma.category.findUnique({
          where: { id: menuItemData.categoryId },
        });

        if (!category) {
          throw new Error('Category not found');
        }
        categoryId = category.id;
      }

      const menuItem = await prisma.menuItem.create({
        data: {
          name: menuItemData.name,
          description: menuItemData.description || null,
          price: parseFloat(menuItemData.price),
          available: true,
          vendorId: menuItemData.vendorId,
          categoryId: categoryId,
          image: menuItemData.image || null,
        },
        include: {
          vendor: {
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return menuItem;
    },
    {
      successMessage: 'Menu item created successfully',
      errorMessage: 'Failed to create menu item',
    }
  );
};

/**
 * Update a menu item
 * @param {string} id - The menu item ID
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object>} API response with updated menu item
 */
const updateMenuItem = async (id, updateData) => {
  return apiResponse.handleServiceResponse(
    async () => {
      // First check if menu item exists
      const existingMenuItem = await prisma.menuItem.findUnique({
        where: { id },
      });

      if (!existingMenuItem) {
        throw new Error('Menu item not found');
      }

      // Check if vendor exists if vendorId is provided
      // Note: We don't allow changing the vendor once a menu item is created
      if (updateData.vendorId && updateData.vendorId !== existingMenuItem.vendorId) {
        console.log('cannot change vendor association for an existing menu item');
        throw new Error('Invalid request');
      }

      // Remove vendorId from updateData to prevent any changes to vendor association
      const { vendorId, ...dataToUpdate } = updateData;

      // Check if category exists if categoryId is provided and not null
      if (dataToUpdate.categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: dataToUpdate.categoryId },
        });

        if (!category) {
          throw new Error('Category not found');
        }
      }

      // Prepare data for update
      const data = { ...dataToUpdate };
      if (data.price !== undefined) {
        data.price = parseFloat(data.price);
      }

      // Handle explicit null values for relationships
      if (data.categoryId === null) {
        data.categoryId = null;
      }

      const updatedMenuItem = await prisma.menuItem.update({
        where: { id },
        data,
        include: {
          vendor: {
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return updatedMenuItem;
    },
    {
      successMessage: 'Menu item updated successfully',
      errorMessage: 'Failed to update menu item',
    }
  );
};

/**
 * Delete a menu item
 * @param {string} id - The menu item ID
 * @returns {Promise<Object>} API response with deleted menu item
 */
const deleteMenuItem = async id => {
  return apiResponse.handleServiceResponse(
    async () => {
      // First check if menu item exists
      const existingMenuItem = await prisma.menuItem.findUnique({
        where: { id },
      });

      if (!existingMenuItem) {
        throw new Error('Menu item not found');
      }

      const deletedMenuItem = await prisma.menuItem.delete({
        where: { id },
      });

      return deletedMenuItem;
    },
    {
      successMessage: 'Menu item deleted successfully',
      errorMessage: 'Failed to delete menu item',
    }
  );
};

/**
 * Toggle menu item availability
 * @param {string} id - The menu item ID
 * @returns {Promise<Object>} API response with updated menu item
 */
const toggleAvailability = async id => {
  return apiResponse.handleServiceResponse(
    async () => {
      // First check if menu item exists and get current availability
      const menuItem = await prisma.menuItem.findUnique({
        where: { id },
      });

      if (!menuItem) {
        throw new Error('Menu item not found');
      }

      // Toggle availability
      const updatedMenuItem = await prisma.menuItem.update({
        where: { id },
        data: {
          available: !menuItem.available,
        },
        include: {
          vendor: {
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return updatedMenuItem;
    },
    {
      successMessage: 'Menu item availability toggled successfully',
      errorMessage: 'Failed to toggle menu item availability',
    }
  );
};

export {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
};
