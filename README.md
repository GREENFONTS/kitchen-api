# Kitchen API

A modern, secure, and well-documented API for kitchen and food delivery management.

## Features

- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **Rate Limiting**: Protection against abuse with configurable rate limits
- **Comprehensive Validation**: Request validation using Joi for all endpoints
- **API Documentation**: Interactive Swagger documentation
- **Security**: Implemented best practices including helmet, input validation, and proper error handling
- **Database**: Prisma ORM with PostgreSQL

## Tech Stack

- **Node.js & Express**: Fast, unopinionated web framework
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **PostgreSQL**: Powerful, open-source relational database
- **JWT**: JSON Web Tokens for secure authentication
- **Joi**: Schema validation
- **Swagger**: API documentation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/kitchen-api.git
   cd kitchen-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit the `.env` file with your database credentials and other configuration.

4. Run database migrations and seed the database:

   ```bash
   npm run db:setup
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at http://localhost:4000 and the Swagger documentation at http://localhost:4000/api/docs.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new customer
- `POST /api/auth/login/customer` - Customer login
- `POST /api/auth/login/vendor` - Vendor login

### Vendors

- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `GET /api/vendors/:id/menu-items` - Get vendor menu items
- `POST /api/vendors/menu-items` - Create menu item
- `PUT /api/vendors/menu-items/:id` - Update menu item
- `DELETE /api/vendors/menu-items/:id` - Delete menu item
- `PUT /api/menu-items/:id/toggle-availability` - Toggle menu item availability

### Menu Items

- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/:id` - Get menu item by ID

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed the database
- `npm run migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run db:setup` - Run database migrations and seed the database

## Project Structure

```
kitchen-api/
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma        # Database schema
│   └── seed.js              # Database seeding script
├── src/
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Express middlewares
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── validations/         # Validation schemas
│   ├── swagger/             # Swagger documentation
│   └── app.js              # Express app setup
├── .env                     # Environment variables
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── index.js                 # Application entry point
└── package.json             # Project dependencies and scripts
```

## Security

This API implements several security best practices:

- JWT authentication with proper expiration
- Password hashing with bcrypt
- Input validation for all endpoints
- Rate limiting to prevent brute force attacks
- Helmet for secure HTTP headers
- Environment-based error details

## License

This project is licensed under the MIT License - see the LICENSE file for details.
