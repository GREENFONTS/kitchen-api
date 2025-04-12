import express from 'express';
const router = express.Router();
import { MenuItemController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { menuItemQuerySchema } from '../validations/menuItemValidation.js';
import Joi from 'joi';

// Public routes
router.get(
  '/',
  authMiddleware.authenticate,
  validate(menuItemQuerySchema, 'query'),
  MenuItemController.getAllMenuItems
);

router.get(
  '/:id',
  authMiddleware.authenticate,
  validate(Joi.object({ id: Joi.string().required() }), 'params'),
  MenuItemController.getMenuItemById
);

export default router;
