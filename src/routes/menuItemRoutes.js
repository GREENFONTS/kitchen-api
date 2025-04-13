const express = require('express');
const router = express.Router();
const { MenuItemController } = require('../controllers/index');
const { authMiddleware } = require('../middlewares/index');
const { validate } = require('../middlewares/validationMiddleware');
const { menuItemQuerySchema } = require('../validations/menuItemValidation');
const Joi = require('joi');

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

module.exports = router;
