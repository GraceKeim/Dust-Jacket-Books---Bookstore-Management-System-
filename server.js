// Dust Jacket Books - Express.js Server
// Author: CS492 Team
// Description: Backend server for the online bookstore

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import routes (to be created)
// const authRoutes = require('./routes/auth');
// const bookRoutes = require('./routes/books');
// const orderRoutes = require('./routes/orders');
// const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'your-production-domain.com' : 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '.')));

// API Routes (to be implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/users', userRoutes);

// Basic API health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Dust Jacket Books API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Sample books endpoint (temporary - will be replaced with database)
app.get('/api/books', (req, res) => {
    const sampleBooks = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            isbn: "9780743273565",
            price: 12.99,
            description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
            publishDate: "1925-04-10",
            stock: 15
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            isbn: "9780061120084",
            price: 14.99,
            description: "A gripping tale of racial injustice and childhood innocence in the American South.",
            publishDate: "1960-07-11",
            stock: 8
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            genre: "Fiction",
            isbn: "9780451524935",
            price: 13.99,
            description: "A dystopian social science fiction novel exploring totalitarianism and surveillance.",
            publishDate: "1949-06-08",
            stock: 12
        }
    ];
    
    res.json({ success: true, data: sampleBooks });
});

// Catch-all handler: send back the frontend app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'API endpoint not found' 
    });
});

// Database connection (to be implemented)
// const connectDB = require('./config/database');
// connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Dust Jacket Books server is running on port ${PORT}`);
    console.log(`📚 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📖 Sample Books: http://localhost:${PORT}/api/books`);
});

module.exports = app;
