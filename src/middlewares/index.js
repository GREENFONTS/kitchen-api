const auth = require('./authMiddleware');
const validation = require('./validationMiddleware');

module.exports = {
  authMiddleware: { ...auth },
  validationMiddleware: { ...validation },
};
