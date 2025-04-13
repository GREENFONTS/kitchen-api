const Joi = require('joi');

// Menu item creation validation schema
const createMenuItemSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'Name is required',
  }),
  description: Joi.string().max(500).messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive',
    'number.precision': 'Price cannot have more than 2 decimal places',
    'any.required': 'Price is required',
  }),
  image: Joi.string().uri().messages({
    'string.uri': 'Image must be a valid URL',
  }),
  available: Joi.boolean().default(true),
  categoryId: Joi.string().optional(),
});

// Menu item update validation schema
const updateMenuItemSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  description: Joi.string().max(500).messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),
  price: Joi.number().positive().precision(2).messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive',
    'number.precision': 'Price cannot have more than 2 decimal places',
  }),
  image: Joi.string().uri().messages({
    'string.uri': 'Image must be a valid URL',
  }),
  available: Joi.boolean(),
  categoryId: Joi.string().optional(),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

// Menu item query validation schema
const menuItemQuerySchema = Joi.object({
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
  sortBy: Joi.string().valid('name', 'price', 'createdAt', 'updatedAt'),
  sortOrder: Joi.string().valid('asc', 'desc'),
  name: Joi.string(),
  minPrice: Joi.number().min(0).messages({
    'number.min': 'Minimum price cannot be negative',
  }),
  maxPrice: Joi.number().min(0).messages({
    'number.min': 'Maximum price cannot be negative',
  }),
  available: Joi.boolean(),
  vendorId: Joi.string().optional(),
  categoryId: Joi.string().optional(),
});

module.exports = { createMenuItemSchema, updateMenuItemSchema, menuItemQuerySchema };
