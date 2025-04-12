// Import the controller modules
import * as vendor from './vendorController.js';
import * as menuItem from './menuItemController.js';
import * as auth from './AuthController.js';

export const VendorController = { ...vendor };
export const MenuItemController = { ...menuItem };
export const AuthController = { ...auth };
