/**
 * Standard API response format
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {string} message - Response message
 * @property {number} status - HTTP status code
 * @property {*} data - Response data (optional)
 * @property {Object} meta - Metadata for pagination, etc. (optional)
 * @property {Object} error - Error details (optional)
 */

/**
 * Create a success response
 * @param {Object} options - Response options
 * @param {*} options.data - Response data
 * @param {string} options.message - Success message
 * @param {number} options.status - HTTP status code (default: 200)
 * @param {Object} options.meta - Additional metadata (e.g., pagination)
 * @returns {ApiResponse} Formatted success response
 */
const success = ({ data = null, message = 'Operation successful', status = 200, meta = null }) => {
  const response = {
    success: true,
    message,
    status,
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return response;
};

/**
 * Create an error response
 * @param {Object} options - Response options
 * @param {string} options.message - Error message
 * @param {number} options.status - HTTP status code (default: 400)
 * @param {Object} options.error - Detailed error information
 * @returns {ApiResponse} Formatted error response
 */
const error = ({ message = 'Operation failed', status = 400, error = null }) => {
  const response = {
    success: false,
    message,
    status,
  };

  if (error) {
    response.error = error;
  }

  return response;
};

/**
 * Create a not found response
 * @param {string} message - Not found message
 * @returns {ApiResponse} Formatted not found response
 */
const notFound = (message = 'Resource not found') => {
  return error({
    message,
    status: 404,
  });
};

/**
 * Create a validation error response
 * @param {string} message - Validation error message
 * @param {Object} errors - Validation errors object
 * @returns {ApiResponse} Formatted validation error response
 */
const validationError = (message = 'Validation failed', errors = {}) => {
  return error({
    message,
    status: 422,
    error: { validation: errors },
  });
};

/**
 * Create an unauthorized response
 * @param {string} message - Unauthorized message
 * @returns {ApiResponse} Formatted unauthorized response
 */
const unauthorized = (message = 'Unauthorized access') => {
  return error({
    message,
    status: 401,
  });
};

/**
 * Create a forbidden response
 * @param {string} message - Forbidden message
 * @returns {ApiResponse} Formatted forbidden response
 */
const forbidden = (message = 'Access forbidden') => {
  return error({
    message,
    status: 403,
  });
};

/**
 * Create a server error response
 * @param {string} message - Server error message
 * @param {Object} error - Error details
 * @returns {ApiResponse} Formatted server error response
 */
const serverError = (message = 'Internal server error', error = null) => {
  return {
    success: false,
    message,
    status: 500,
    ...(error && { error }),
  };
};

/**
 * Handle service response and convert to API response
 * @param {Function} serviceFunction - Async service function to execute
 * @param {Object} options - Response options
 * @param {string} options.successMessage - Success message
 * @param {string} options.errorMessage - Error message prefix
 * @returns {Promise<ApiResponse>} API response
 */
const handleServiceResponse = async (
  serviceFunction,
  { successMessage = 'Operation successful', errorMessage = 'Operation failed' } = {}
) => {
  try {
    const result = await serviceFunction();

    // If the result has meta information (like pagination)
    if (result && typeof result === 'object' && result.meta) {
      return success({
        data: result.data,
        message: successMessage,
        meta: result.meta,
      });
    }

    return success({
      data: result,
      message: successMessage,
    });
  } catch (err) {
    console.log(err, 'error');
    // Handle specific error types
    if (err.message.includes('not found')) {
      return notFound(err.message);
    }

    if (err.message.includes('validation')) {
      return validationError(err.message);
    }

    if (err.message.includes('unauthorized') || err.message.includes('invalid credentials')) {
      return unauthorized(err.message);
    }

    if (err.message.includes('forbidden')) {
      return forbidden(err.message);
    }

    // Generic error with the original error message
    return error({
      message: `${errorMessage}: ${err.message}`,
      error: process.env.NODE_ENV === 'production' ? undefined : err,
    });
  }
};

export {
  success,
  error,
  notFound,
  validationError,
  unauthorized,
  forbidden,
  serverError,
  handleServiceResponse,
};
