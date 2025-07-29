# Dust Jacket Books - Online Bookstore Management System

A modern, responsive online bookstore application built with Bootstrap, vanilla JavaScript, and Node.js backend support. This project represents the digital transformation of a traditional specialty bookstore, streamlining operations from manual recordkeeping to automated inventory management, sales tracking, and customer ordering.

## Features

### Frontend (Current Implementation)
- **Modern Bootstrap UI**: Clean, responsive design using Bootstrap 5
- **User Authentication**: Login and registration modals with local storage
- **Shopping Cart**: Full cart functionality with quantity management
- **Book Search & Filtering**: Search by title, author, genre, or description
- **Category Browsing**: Filter books by genre categories
- **Book Management**: Add new books to inventory (admin feature)
- **Responsive Design**: Mobile-first approach with Bootstrap components

### Backend Integration (Ready for Development)
- **Node.js Server**: Express.js backend structure ready
- **Database**: MongoDB with Mongoose ODM
- **API Endpoints**: RESTful API design for books, users, and orders
- **Authentication**: JWT-based user authentication
- **Security**: CORS, input validation, and password hashing

## Project Structure

```
dust-jacket-books/
├── index.html              # Main landing page
├── search.html             # Legacy search page (consolidated into index.html)
├── indexI.html             # Legacy inventory page (consolidated into index.html)
├── js/
│   └── bookstore.js        # Main application logic
├── package.json            # Node.js dependencies and scripts
├── tests/                  # Test files
│   └── test1.md           # Test documentation
└── README.md              # This file
```

## Getting Started

### Frontend Development
1. Open `index.html` in a web browser to see the full bookstore interface
2. Or use a local server for better development experience:
   ```bash
   npm install -g http-server
   http-server . -p 3000 -c-1
   ```
3. Navigate to `http://localhost:3000`

### Backend Development (Next Steps)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## UI Components

### Navigation
- **Brand Logo**: Dust Jacket Books with book icon
- **Search Bar**: Real-time search functionality
- **User Menu**: Login/Register or User Profile when authenticated
- **Shopping Cart**: Cart icon with item counter

### Main Sections
- **Hero Section**: Welcome message and call-to-action buttons
- **Category Filters**: Quick filter buttons for book genres
- **Book Grid**: Responsive card layout displaying books
- **Modals**: Login, Register, Shopping Cart, and Add Book forms

### Book Cards
- **Book Cover**: Placeholder with book icon
- **Book Details**: Title, author, genre, description
- **Pricing**: Clear price display with stock information
- **Add to Cart**: Functional button with stock validation

## JavaScript Features

### State Management
- Global state object managing user, books, cart, and filters
- Local storage persistence for user session and cart
- Real-time UI updates based on state changes

### Core Functions
- **Authentication**: `handleLogin()`, `handleRegister()`, `logout()`
- **Book Management**: `renderBooks()`, `handleAddBook()`, `searchBooks()`
- **Shopping Cart**: `addToCart()`, `updateCartQuantity()`, `checkout()`
- **UI Updates**: `updateCartDisplay()`, `updateUserInterface()`

### Event Handling
- Form submissions with validation
- Real-time search and filtering
- Cart quantity management
- Modal interactions

## API Integration Points

The frontend is ready to integrate with these backend endpoints:

```javascript
// User Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

// Books Management
GET /api/books
GET /api/books/:id
POST /api/books
PUT /api/books/:id
DELETE /api/books/:id

// Shopping Cart & Orders
GET /api/cart
POST /api/cart/add
PUT /api/cart/update
DELETE /api/cart/remove
POST /api/orders/checkout
```

## Operational Areas Covered

### Inventory Management
- Add, edit, and remove books from inventory
- Real-time stock tracking
- Low stock alerts (ready for backend integration)

### Sales Tracking
- Shopping cart functionality
- Order processing simulation
- Transaction history (ready for backend)

### Customer Management
- User registration and authentication
- Profile management
- Order history tracking

### Automation Efficiency
- Automated inventory updates after purchases
- Real-time search and filtering
- Responsive UI for all device types

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

## Next Steps for Backend Integration

1. **Create Express Server**: Set up basic Express.js server
2. **Database Models**: Design MongoDB schemas for users, books, orders
3. **API Routes**: Implement RESTful endpoints
4. **Authentication**: Add JWT middleware and password hashing
5. **Testing**: Unit and integration tests
6. **Deployment**: Production configuration and deployment setup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details.
