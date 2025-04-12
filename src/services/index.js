import * as AuthService from './AuthService.js';
import * as VendorService from './VendorService.js';
import * as MenuItemService from './MenuItemService.js';
import * as CategoryService from './CategoryService.js';

export const authService = { ...AuthService };
export const vendorService = { ...VendorService };
export const menuItemService = { ...MenuItemService };
export const categoryService = { ...CategoryService };
