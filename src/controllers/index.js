// Import the controller modules
const authController = require('./authController');
const vendorController = require('./vendorController');
const menuItemController = require('./menuItemController');

module.exports = {
  AuthController: authController,
  VendorController: vendorController,
  MenuItemController: menuItemController,
};
