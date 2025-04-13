const Joi = require('joi');

// Vendor query validation schema
const vendorQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1',
  }),
  limit: Joi.number().integer().min(1).max(100).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 100',
  }),
  sortBy: Joi.string().valid('name', 'createdAt', 'updatedAt'),
  sortOrder: Joi.string().valid('asc', 'desc'),
  name: Joi.string(),
  isActive: Joi.boolean(),
});

// Vendor ID parameter validation schema
const vendorIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Vendor ID is required',
  }),
});

module.exports = { vendorQuerySchema, vendorIdSchema };
