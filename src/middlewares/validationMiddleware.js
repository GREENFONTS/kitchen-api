import * as apiResponse from '../utils/apiResponse.js';

/**
 * Middleware factory for request validation
 * @param {Object} schema - Joi schema for validation
 * @param {string} property - Request property to validate (body, params, query)
 * @returns {Function} Express middleware function
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown properties
    });

    if (!error) {
      return next();
    }

    const errorDetails = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    return res.status(400).json(
      apiResponse.error({
        message: 'Validation failed',
        error: errorDetails,
        status: 400,
      })
    );
  };
};

export { validate };
