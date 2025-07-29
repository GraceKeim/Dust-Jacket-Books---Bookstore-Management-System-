// Bookstore Application JavaScript
// Author: CS492 Team
// Description: Main functionality for Dust Jacket Books online store

// Global State Management
const state = {
    currentUser: null,
    books: [],
    cart: [],
    currentFilter: 'all'
};

// Sample book data - This would typically come from your Node.js backend
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
    },
    {
        id: 4,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        isbn: "9780316769174",
        price: 11.99,
        description: "A controversial novel about teenage rebellion and alienation.",
        publishDate: "1951-07-16",
        stock: 6
    },
    {
        id: 5,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        isbn: "9780441172719",
        price: 16.99,
        description: "An epic science fiction novel set on the desert planet Arrakis.",
        publishDate: "1965-06-01",
        stock: 10
    },
    {
        id: 6,
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        genre: "Mystery",
        isbn: "9780307454546",
        price: 15.99,
        description: "A gripping mystery thriller involving murder, family secrets, and corruption.",
        publishDate: "2005-08-01",
        stock: 7
    },
    {
        id: 7,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        isbn: "9780141439518",
        price: 10.99,
        description: "A romantic novel of manners set in Georgian England.",
        publishDate: "1813-01-28",
        stock: 9
    },
    {
        id: 8,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        isbn: "9780061122415",
        price: 13.99,
        description: "A philosophical novel about following one's dreams and personal legend.",
        publishDate: "1988-01-01",
        stock: 14
    },
    {
        id: 9,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "Non-Fiction",
        isbn: "9780062316097",
        price: 18.99,
        description: "A brief history of humankind and how we came to dominate the world.",
        publishDate: "2011-01-01",
        stock: 11
    },
    {
        id: 10,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Mystery",
        isbn: "9781250301697",
        price: 14.99,
        description: "A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.",
        publishDate: "2019-02-05",
        stock: 13
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    state.books = [...sampleBooks];
    
    // Load saved state from localStorage
    loadUserSession();
    loadCart();
    
    // Render initial content
    renderBooks();
    updateCartDisplay();
    updateUserInterface();
}

// User Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // In a real application, you would validate credentials with your backend
    // For demo purposes, we'll simulate a successful login
    if (email && password) {
        const user = {
            id: Date.now(),
            name: email.split('@')[0], // Simple name extraction
            email: email,
            loginTime: new Date().toISOString()
        };
        
        state.currentUser = user;
        saveUserSession();
        updateUserInterface();
        
        // Close modal and show success
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        showAlert('Login successful! Welcome back.', 'success');
        
        // Reset form
        document.getElementById('loginForm').reset();
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long!', 'danger');
        return;
    }
    
    // In a real application, you would create the user account via your backend
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        registrationTime: new Date().toISOString()
    };
    
    state.currentUser = user;
    saveUserSession();
    updateUserInterface();
    
    // Close modal and show success
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();
    
    showAlert('Account created successfully! Welcome to Dust Jacket Books.', 'success');
    
    // Reset form
    document.getElementById('registerForm').reset();
}

function logout() {
    state.currentUser = null;
    localStorage.removeItem('djb_user');
    updateUserInterface();
    showAlert('You have been logged out successfully.', 'info');
}

function saveUserSession() {
    if (state.currentUser) {
        localStorage.setItem('djb_user', JSON.stringify(state.currentUser));
    }
}

function loadUserSession() {
    const savedUser = localStorage.getItem('djb_user');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
    }
}

function updateUserInterface() {
    const userGreeting = document.getElementById('userGreeting');
    const loginOption = document.getElementById('loginOption');
    const registerOption = document.getElementById('registerOption');
    const profileOption = document.getElementById('profileOption');
    const ordersOption = document.getElementById('ordersOption');
    const logoutOption = document.getElementById('logoutOption');
    const logoutButton = document.getElementById('logoutButton');
    
    if (state.currentUser) {
        userGreeting.textContent = `Hello, ${state.currentUser.name}`;
        loginOption.style.display = 'none';
        registerOption.style.display = 'none';
        profileOption.style.display = 'block';
        ordersOption.style.display = 'block';
        logoutOption.style.display = 'block';
        logoutButton.style.display = 'block';
    } else {
        userGreeting.textContent = 'Account';
        loginOption.style.display = 'block';
        registerOption.style.display = 'block';
        profileOption.style.display = 'none';
        ordersOption.style.display = 'none';
        logoutOption.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}

// Book Management Functions
function renderBooks(booksToRender = null) {
    const container = document.getElementById('booksContainer');
    const noResults = document.getElementById('noResults');
    const books = booksToRender || state.books;
    
    if (books.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    container.innerHTML = books.map(book => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card book-card h-100">
                <div class="book-cover">
                    <i class="bi bi-book"></i>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text text-muted">by ${book.author}</p>
                    <p class="card-text"><small class="text-muted">${book.genre}</small></p>
                    <p class="card-text flex-grow-1">${book.description.substring(0, 100)}...</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">$${book.price}</span>
                            <small class="text-muted">${book.stock} in stock</small>
                        </div>
                        <button class="btn btn-primary w-100 mt-2" onclick="addToCart(${book.id})" ${book.stock === 0 ? 'disabled' : ''}>
                            <i class="bi bi-cart-plus"></i> ${book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function handleAddBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const genre = document.getElementById('bookGenre').value;
    const isbn = document.getElementById('bookISBN').value.trim();
    const price = parseFloat(document.getElementById('bookPrice').value);
    const description = document.getElementById('bookDescription').value.trim();
    const publishDate = document.getElementById('bookPublishDate').value;
    
    if (!title || !author || !genre || !price) {
        showAlert('Please fill in all required fields.', 'warning');
        return;
    }
    
    if (isbn && !/^\d{10}$|^\d{13}$/.test(isbn)) {
        showAlert('ISBN must be 10 or 13 digits.', 'warning');
        return;
    }
    
    const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        isbn: isbn || 'N/A',
        price,
        description: description || 'No description available.',
        publishDate: publishDate || 'Unknown',
        stock: 10 // Default stock
    };
    
    state.books.unshift(newBook); // Add to beginning of array
    renderBooks();
    
    // Close modal and show success
    const modal = bootstrap.Modal.getInstance(document.getElementById('addBookModal'));
    modal.hide();
    
    showAlert('Book added successfully!', 'success');
    
    // Reset form
    document.getElementById('addBookForm').reset();
}

// Search and Filter Functions
function searchBooks(event) {
    event.preventDefault();
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderBooks();
        return;
    }
    
    const filteredBooks = state.books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm)
    );
    
    renderBooks(filteredBooks);
}

function filterByCategory(category) {
    state.currentFilter = category;
    
    if (category === 'all') {
        renderBooks();
        return;
    }
    
    const filteredBooks = state.books.filter(book => 
        book.genre.toLowerCase() === category.toLowerCase()
    );
    
    renderBooks(filteredBooks);
}

// Shopping Cart Functions
function addToCart(bookId) {
    const book = state.books.find(b => b.id === bookId);
    
    if (!book || book.stock === 0) {
        showAlert('This book is currently out of stock.', 'warning');
        return;
    }
    
    const existingItem = state.cart.find(item => item.bookId === bookId);
    
    if (existingItem) {
        if (existingItem.quantity >= book.stock) {
            showAlert('Cannot add more items. Stock limit reached.', 'warning');
            return;
        }
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            bookId: bookId,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart();
    updateCartDisplay();
    showAlert(`"${book.title}" added to cart!`, 'success');
}

function removeFromCart(bookId) {
    state.cart = state.cart.filter(item => item.bookId !== bookId);
    saveCart();
    updateCartDisplay();
    renderCartItems();
}

function updateCartQuantity(bookId, newQuantity) {
    const item = state.cart.find(item => item.bookId === bookId);
    const book = state.books.find(b => b.id === bookId);
    
    if (!item || !book) return;
    
    if (newQuantity <= 0) {
        removeFromCart(bookId);
        return;
    }
    
    if (newQuantity > book.stock) {
        showAlert('Cannot exceed available stock.', 'warning');
        return;
    }
    
    item.quantity = newQuantity;
    saveCart();
    updateCartDisplay();
    renderCartItems();
}

function updateCartDisplay() {
    const cartCounter = document.getElementById('cartCounter');
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    
    // Update cart modal when it's opened
    const cartModal = document.getElementById('cartModal');
    cartModal.addEventListener('shown.bs.modal', renderCartItems);
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartTotal.textContent = '0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    emptyCart.style.display = 'none';
    checkoutBtn.disabled = false;
    
    let total = 0;
    
    cartItemsContainer.innerHTML = state.cart.map(item => {
        const book = state.books.find(b => b.id === item.bookId);
        if (!book) return '';
        
        const itemTotal = book.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h6 class="card-title mb-1">${book.title}</h6>
                            <p class="card-text text-muted mb-0">by ${book.author}</p>
                            <small class="text-muted">$${book.price} each</small>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group input-group-sm">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateCartQuantity(${book.id}, ${item.quantity - 1})">-</button>
                                <input type="number" class="form-control text-center" value="${item.quantity}" min="1" max="${book.stock}" onchange="updateCartQuantity(${book.id}, parseInt(this.value))">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateCartQuantity(${book.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="col-md-2 text-end">
                            <strong>$${itemTotal.toFixed(2)}</strong>
                        </div>
                        <div class="col-md-1 text-end">
                            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${book.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2);
}

function checkout() {
    if (state.cart.length === 0) {
        showAlert('Your cart is empty!', 'warning');
        return;
    }
    
    if (!state.currentUser) {
        showAlert('Please login to proceed with checkout.', 'warning');
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        modal.hide();
        setTimeout(() => {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }, 500);
        return;
    }
    
    // In a real application, this would integrate with your payment system
    const total = state.cart.reduce((sum, item) => {
        const book = state.books.find(b => b.id === item.bookId);
        return sum + (book.price * item.quantity);
    }, 0);
    
    // Simulate order processing
    const orderId = 'DJB-' + Date.now();
    
    // Update stock levels
    state.cart.forEach(item => {
        const book = state.books.find(b => b.id === item.bookId);
        if (book) {
            book.stock -= item.quantity;
        }
    });
    
    // Clear cart
    state.cart = [];
    saveCart();
    updateCartDisplay();
    
    // Close cart modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
    
    // Re-render books to update stock
    renderBooks();
    
    showAlert(`Order placed successfully! Order ID: ${orderId}. Total: $${total.toFixed(2)}`, 'success');
}

function saveCart() {
    localStorage.setItem('djb_cart', JSON.stringify(state.cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('djb_cart');
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
    }
}

// Utility Functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to body
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Additional event listeners
document.addEventListener('keydown', function(event) {
    // Quick search with Ctrl+K
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Export functions for potential Node.js integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        initializeApp,
        addToCart,
        removeFromCart,
        searchBooks,
        filterByCategory
    };
}
