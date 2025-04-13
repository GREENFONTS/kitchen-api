const AuthService = require('./AuthService');
const VendorService = require('./VendorService');
const MenuItemService = require('./MenuItemService');
const CategoryService = require('./CategoryService');

module.exports = {
  authService: { ...AuthService },
  vendorService: { ...VendorService },
  menuItemService: { ...MenuItemService },
  categoryService: { ...CategoryService },
};
