/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Menu item unique ID
 *         name:
 *           type: string
 *           description: Menu item name
 *         description:
 *           type: string
 *           description: Menu item description
 *         price:
 *           type: number
 *           format: float
 *           description: Menu item price
 *         image:
 *           type: string
 *           description: URL to menu item image
 *         available:
 *           type: boolean
 *           description: Whether the menu item is available
 *         vendorId:
 *           type: string
 *           description: ID of the vendor offering this menu item
 *         categoryId:
 *           type: string
 *           description: ID of the category this menu item belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the menu item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the menu item was last updated
 *         vendor:
 *           $ref: '#/components/schemas/Vendor'
 *         category:
 *           $ref: '#/components/schemas/Category'
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: Classic Burger
 *         description: Juicy beef patty with lettuce, tomato, and special sauce
 *         price: 9.99
 *         image: https://example.com/images/classic-burger.jpg
 *         available: true
 *         vendorId: 123e4567-e89b-12d3-a456-426614174001
 *         categoryId: 123e4567-e89b-12d3-a456-426614174002
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 *
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Category unique ID
 *         name:
 *           type: string
 *           description: Category name
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174002
 *         name: Burgers
 *
 *     MenuItemCreate:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Menu item name
 *         description:
 *           type: string
 *           description: Menu item description
 *         price:
 *           type: number
 *           format: float
 *           description: Menu item price
 *         image:
 *           type: string
 *           description: URL to menu item image
 *         available:
 *           type: boolean
 *           description: Whether the menu item is available
 *         categoryId:
 *           type: string
 *           description: ID of the category this menu item belongs to
 *       example:
 *         name: Classic Burger
 *         description: Juicy beef patty with lettuce, tomato, and special sauce
 *         price: 9.99
 *         image: https://example.com/images/classic-burger.jpg
 *         available: true
 *         categoryId: 123e4567-e89b-12d3-a456-426614174002
 *
 *     MenuItemUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Menu item name
 *         description:
 *           type: string
 *           description: Menu item description
 *         price:
 *           type: number
 *           format: float
 *           description: Menu item price
 *         image:
 *           type: string
 *           description: URL to menu item image
 *         available:
 *           type: boolean
 *           description: Whether the menu item is available
 *         categoryId:
 *           type: string
 *           description: ID of the category this menu item belongs to
 *       example:
 *         name: Updated Classic Burger
 *         description: Updated description with new ingredients
 *         price: 10.99
 *         available: true
 *
 *     MenuItemResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code
 *         success:
 *           type: boolean
 *           description: Whether the request was successful
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           $ref: '#/components/schemas/MenuItem'
 *       example:
 *         status: 200
 *         success: true
 *         message: Menu item retrieved successfully
 *         data:
 *           id: 123e4567-e89b-12d3-a456-426614174000
 *           name: Classic Burger
 *           description: Juicy beef patty with lettuce, tomato, and special sauce
 *           price: 9.99
 *           image: https://example.com/images/classic-burger.jpg
 *           available: true
 *           vendorId: 123e4567-e89b-12d3-a456-426614174001
 *           categoryId: 123e4567-e89b-12d3-a456-426614174002
 *           createdAt: 2023-01-01T00:00:00.000Z
 *           updatedAt: 2023-01-01T00:00:00.000Z
 *
 *     MenuItemsResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code
 *         success:
 *           type: boolean
 *           description: Whether the request was successful
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MenuItem'
 *         meta:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               description: Current page number
 *             limit:
 *               type: integer
 *               description: Number of items per page
 *             totalCount:
 *               type: integer
 *               description: Total number of items
 *             totalPages:
 *               type: integer
 *               description: Total number of pages
 *             hasNext:
 *               type: boolean
 *               description: Whether there is a next page
 *             hasPrevious:
 *               type: boolean
 *               description: Whether there is a previous page
 */

/**
 * @swagger
 * tags:
 *   name: Menu Items
 *   description: Menu item management
 */

/**
 * @swagger
 * /menu-items:
 *   get:
 *     summary: Get all menu items with pagination and filtering
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name (case insensitive, partial match)
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *         description: Filter by vendor ID
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter by maximum price
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItemsResponse'
 *
 * /menu-items/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItemResponse'
 *       404:
 *         description: Menu item not found
 */
