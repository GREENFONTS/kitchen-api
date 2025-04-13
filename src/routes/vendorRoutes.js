const express = require('express');
const router = express.Router();
const { VendorController, MenuItemController } = require('../controllers/index');
const { authMiddleware } = require('../middlewares/index');
const { validate } = require('../middlewares/validationMiddleware');
const Joi = require('joi');
const { vendorQuerySchema, vendorIdSchema } = require('../validations/vendorValidation');
const { createMenuItemSchema, updateMenuItemSchema } = require('../validations/menuItemValidation');

// Public routes
router.get(
  '/',
  authMiddleware.authenticate,
  validate(vendorQuerySchema, 'query'),
  VendorController.getAllVendors
);

router.get('/categories', authMiddleware.authenticate, VendorController.getVendorCategories);

router.get(
  '/:id',
  authMiddleware.authenticate,
  validate(vendorIdSchema, 'params'),
  VendorController.getVendorById
);

router.post(
  '/menu-items',
  authMiddleware.authenticate,
  authMiddleware.requireVendor,
  validate(createMenuItemSchema),
  MenuItemController.createMenuItem
);

router.put(
  '/menu-items/:id',
  authMiddleware.authenticate,
  authMiddleware.requireVendorOwnership('id'),
  validate(updateMenuItemSchema),
  MenuItemController.updateMenuItem
);

// Vendor-only routes
router.put(
  '/menu-items/:id/toggle-availability',
  authMiddleware.authenticate,
  authMiddleware.requireVendorOwnership('id'),
  validate(Joi.object({ id: Joi.string().required() }), 'params'),
  MenuItemController.toggleAvailability
);

router.delete(
  '/menu-items/:id',
  authMiddleware.authenticate,
  authMiddleware.requireVendorOwnership('id'),
  validate(Joi.object({ id: Joi.string().required() }), 'params'),
  MenuItemController.deleteMenuItem
);

// Create a new category
router.post(
  '/categories',
  authMiddleware.authenticate,
  authMiddleware.requireVendor,
  VendorController.createCategory
);

module.exports = router;
