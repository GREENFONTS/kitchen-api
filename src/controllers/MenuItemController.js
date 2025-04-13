const { menuItemService } = require('../services/index');

/**
 * Get all menu items with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllMenuItems = async (req, res) => {
  const result = await menuItemService.getAllMenuItems({
    filters: req.query,
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy || 'createdAt',
    sortOrder: req.query.sortOrder || 'desc',
  });

  return res.status(result.status).json(result);
};

/**
 * Get a menu item by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getMenuItemById = async (req, res) => {
  const result = await menuItemService.getMenuItemById(req.params.id);
  return res.status(result.status).json(result);
};

/**
 * Create a new menu item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createMenuItem = async (req, res) => {
  const result = await menuItemService.createMenuItem({
    ...req.body,
    vendorId: req.user.id,
  });
  return res.status(result.status).json(result);
};

/**
 * Update an existing menu item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateMenuItem = async (req, res) => {
  const result = await menuItemService.updateMenuItem(req.params.id, req.body);
  return res.status(result.status).json(result);
};

/**
 * Delete a menu item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteMenuItem = async (req, res) => {
  const result = await menuItemService.deleteMenuItem(req.params.id);
  return res.status(result.status).json(result);
};

/**
 * Toggle the availability status of a menu item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const toggleAvailability = async (req, res) => {
  const result = await menuItemService.toggleAvailability(req.params.id);
  return res.status(result.status).json(result);
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
};
