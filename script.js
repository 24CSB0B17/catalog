// Product class
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

// Cart class
class Cart {
    constructor() {
        this.items = [];
        this.date = new Date();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.updateLocalStorage();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateLocalStorage();
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    loadCart() {
        const storedItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedItems) {
            this.items = storedItems;
        }
    }
}

// Initialize cart and load from localStorage
const cart = new Cart();
cart.loadCart();

// Product data (this could be fetched from an API in a real application)
const products = [
    new Product(1, 'Product 1', 29.99, 'https://via.placeholder.com/200x150'),
    new Product(2, 'Product 2', 49.99, 'https://via.placeholder.com/200x150'),
    new Product(3, 'Product 3', 19.99, 'https://via.placeholder.com/200x150'),
    new Product(4, 'Product 4', 99.99, 'https://via.placeholder.com/200x150'),
];

// Display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Update cart UI
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    cartItemsDiv.innerHTML = '';
    cart.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} x ${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartSummary.innerHTML = `
        <p>Total Items: ${cart.getTotalItems()}</p>
        <p>Total Price: $${cart.getTotalPrice().toFixed(2)}</p>
        <p>Date: ${cart.date.toLocaleString()}</p>
    `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();

    // Add to cart
    document.getElementById('product-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            cart.addItem(product);
            updateCartUI();
        }
    });

    // Remove from cart
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            cart.removeItem(productId);
            updateCartUI();
        }
    });
});
