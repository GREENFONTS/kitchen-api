import * as auth from './authMiddleware.js';
import * as validation from './validationMiddleware.js';

export const authMiddleware = { ...auth };
export const validationMiddleware = { ...validation };
