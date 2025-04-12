import express from 'express';
const router = express.Router();
import { AuthController } from '../controllers/index.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { customerRegistrationSchema, loginSchema } from '../validations/authValidation.js';

// Public routes
router.post('/register', validate(customerRegistrationSchema), AuthController.registerCustomer);

router.post('/login/customer', validate(loginSchema), AuthController.loginCustomer);

router.post('/login/vendor', validate(loginSchema), AuthController.loginVendor);

export default router;
