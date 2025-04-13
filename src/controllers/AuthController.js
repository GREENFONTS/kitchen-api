const { authService } = require('../services/index');

/**
 * Register a new customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const registerCustomer = async (req, res) => {
  const result = await authService.registerCustomer(req.body);
  return res.status(result.status).json(result);
};

/**
 * Login a customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const loginCustomer = async (req, res) => {
  const result = await authService.loginCustomer(req.body);
  return res.status(result.status).json(result);
};

/**
 * Login a vendor
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const loginVendor = async (req, res) => {
  const result = await authService.loginVendor(req.body);
  return res.status(result.status).json(result);
};

module.exports = { registerCustomer, loginCustomer, loginVendor };
