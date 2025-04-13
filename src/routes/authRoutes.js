const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers/index');
const { validate } = require('../middlewares/validationMiddleware');
const { customerRegistrationSchema, loginSchema } = require('../validations/authValidation');

// Public routes
router.post('/register', validate(customerRegistrationSchema), AuthController.registerCustomer);

router.post('/login/customer', validate(loginSchema), AuthController.loginCustomer);

router.post('/login/vendor', validate(loginSchema), AuthController.loginVendor);

module.exports = router;
