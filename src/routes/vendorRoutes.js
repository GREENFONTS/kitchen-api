import express from 'express';
const router = express.Router();
import { VendorController, MenuItemController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';
import { validate } from '../middlewares/validationMiddleware.js';
import Joi from 'joi';
import { vendorQuerySchema, vendorIdSchema } from '../validations/vendorValidation.js';
import { createMenuItemSchema, updateMenuItemSchema } from '../validations/menuItemValidation.js';

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

export default router;
