/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Vendor unique ID
 *         name:
 *           type: string
 *           description: Vendor's business name
 *         email:
 *           type: string
 *           format: email
 *           description: Vendor's email address
 *         address:
 *           type: string
 *           description: Vendor's physical address
 *         phone:
 *           type: string
 *           description: Vendor's contact phone number
 *         isActive:
 *           type: boolean
 *           description: Whether the vendor is active
 *         userType:
 *           type: string
 *           description: Type of user (always VENDOR)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the vendor was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the vendor was last updated
 *         menuItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MenuItem'
 *           description: Menu items offered by this vendor
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: "Tasty Burgers"
 *         email: "contact@tastyburgers.com"
 *         address: "123 Main St, Anytown, USA"
 *         phone: "+1-555-123-4567"
 *         isActive: true
 *         userType: "VENDOR"
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *         menuItems: []
 *
 *     VendorUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Vendor's business name
 *         address:
 *           type: string
 *           description: Vendor's physical address
 *         phone:
 *           type: string
 *           description: Vendor's contact phone number
 *       example:
 *         name: Tasty Burgers Updated
 *         address: 456 New St, Anytown, USA
 *         phone: (555) 987-6543
 *
 *     VendorResponse:
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
 *           $ref: '#/components/schemas/Vendor'
 *       example:
 *         status: 200
 *         success: true
 *         message: Vendor retrieved successfully
 *         data:
 *           id: 123e4567-e89b-12d3-a456-426614174000
 *           name: Tasty Burgers
 *           email: contact@tastyburgers.com
 *           address: 123 Main St, Anytown, USA
 *           phone: (555) 123-4567
 *           isActive: true
 *           userType: VENDOR
 *           createdAt: 2023-01-01T00:00:00.000Z
 *           updatedAt: 2023-01-01T00:00:00.000Z
 *           menuItems: []
 *
 *     VendorsResponse:
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
 *             $ref: '#/components/schemas/Vendor'
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
 *       example:
 *         status: 200
 *         success: true
 *         message: Vendors retrieved successfully
 *         data: [
 *           {
 *             id: "123e4567-e89b-12d3-a456-426614174000",
 *             name: "Tasty Burgers",
 *             email: "contact@tastyburgers.com",
 *             address: "123 Main St, Anytown, USA",
 *             phone: "(555) 123-4567",
 *             isActive: true,
 *             userType: "VENDOR",
 *             createdAt: "2023-01-01T00:00:00.000Z",
 *             updatedAt: "2023-01-01T00:00:00.000Z"
 *           }
 *         ]
 *         meta: {
 *           page: 1,
 *           limit: 10,
 *           totalCount: 1,
 *           totalPages: 1,
 *           hasNext: false,
 *           hasPrevious: false
 *         }
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
 *         description:
 *           type: string
 *           description: Category description
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the category was last updated
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: "Burgers"
 *         description: "Delicious burger options"
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *
 *     CategoryCreate:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *       example:
 *         name: "Burgers"
 *
 *     CategoryResponse:
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
 *           $ref: '#/components/schemas/Category'
 *       example:
 *         status: 201
 *         success: true
 *         message: "Category created successfully"
 *         data:
 *           id: "123e4567-e89b-12d3-a456-426614174000"
 *           name: "Burgers"
 *           createdAt: "2023-01-01T00:00:00.000Z"
 *           updatedAt: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Vendor management
 */

/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors with pagination
 *     tags: [Vendors]
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
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Vendors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VendorsResponse'
 *
 * /vendors/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VendorResponse'
 *       404:
 *         description: Vendor not found
 *
 * /vendors/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all available categories without pagination
 *     parameters:
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *         description: Filter categories by vendor ID (optional)
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful
 *                 message:
 *                   type: string
 *                   description: Response message
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *               example:
 *                 status: 200
 *                 success: true
 *                 message: "Categories retrieved successfully"
 *                 data: [
 *                   {
 *                     id: "123e4567-e89b-12d3-a456-426614174000",
 *                     name: "Burgers",
 *                     createdAt: "2023-01-01T00:00:00.000Z",
 *                     updatedAt: "2023-01-01T00:00:00.000Z"
 *                   },
 *                   {
 *                     id: "123e4567-e89b-12d3-a456-426614174001",
 *                     name: "Drinks",
 *                     createdAt: "2023-01-01T00:00:00.000Z",
 *                     updatedAt: "2023-01-01T00:00:00.000Z"
 *                   }
 *                 ]
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a vendor
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new category
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Invalid input or category already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a vendor
 *       500:
 *         description: Server error
 *
 * /vendors/menu-items:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItemCreate'
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItemResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a vendor
 *
 * /vendors/menu-items/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItemUpdate'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItemResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner of this menu item
 *       404:
 *         description: Menu item not found
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Vendors]
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
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItemResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner of this menu item
 *       404:
 *         description: Menu item not found
 *
 * /vendors/menu-items/{id}/toggle-availability:
 *   put:
 *     summary: Toggle menu item availability
 *     tags: [Vendors]
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
 *         description: Menu item availability toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItemResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner of this menu item
 *       404:
 *         description: Menu item not found
 */
