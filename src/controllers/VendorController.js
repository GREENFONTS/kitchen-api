const { vendorService, categoryService } = require('../services/index');

/**
 * Get all vendors with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllVendors = async (req, res) => {
  const result = await vendorService.getAllVendors({
    filters: req.query,
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy || 'createdAt',
    sortOrder: req.query.sortOrder || 'desc',
  });

  return res.status(result.status).json(result);
};

/**
 * Get vendor by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getVendorById = async (req, res) => {
  const result = await vendorService.getVendorById(req.params.id);
  return res.status(result.status).json(result);
};

/**
 * Get vendor menu items
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getVendorMenuItems = async (req, res) => {
  const result = await vendorService.getVendorMenuItems(req.params.id);
  return res.status(result.status).json(result);
};

/**
 * Get categories for a vendor
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getVendorCategories = async (req, res) => {
  // Use vendorId from query params if provided, otherwise use the authenticated user's ID
  const vendorId = req.query.vendorId || req.user?.id;

  if (!vendorId) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Vendor ID is required',
      error: {},
    });
  }

  const result = await categoryService.getVendorCategories(vendorId);
  return res.status(result.status).json(result);
};

/**
 * Create a new category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createCategory = async (req, res) => {
  const result = await categoryService.createCategory(req.body, req.user.id);
  return res.status(result.status).json(result);
};

module.exports = {
  getAllVendors,
  getVendorById,
  getVendorMenuItems,
  getVendorCategories,
  createCategory,
};
