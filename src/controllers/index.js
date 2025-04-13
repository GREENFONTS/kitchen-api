// Import the controller modules
const authController = require('./AuthController');
const vendorController = require('./VendorController');
const menuItemController = require('./MenuItemController');

module.exports = {
  AuthController: authController,
  VendorController: vendorController,
  MenuItemController: menuItemController,
};
