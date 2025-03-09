class Product {
  constructor(id, name, price, image, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }
}

class Cart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.count++;
    } else {
      this.items.push({ ...product, count: 1 });
    }
    this.totalPrice += product.price;
    this.updateCartDisplay();
    alert(`${product.name} added to cart!`);
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    this.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.count}`;
      cartItemsContainer.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `Total: $${this.totalPrice.toFixed(2)}`;
  }
}

const product1 = new Product(1, 'Product 1', 19.99, 'product1.jpg', 'This is an amazing product that you will love!');
const product2 = new Product(2, 'Product 2', 29.99, 'product2.jpg', 'A premium product with excellent features.');
const product3 = new Product(3, 'Product 3', 39.99, 'product3.jpg', 'Best for everyday use, high durability and performance.');
const product4 = new Product(4, 'Product 4', 49.99, 'product4.jpg', 'An innovative product that makes life easier.');

const cart = new Cart();

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const productId = event.target.closest('.product').id;
    if (productId === 'product1') {
      cart.addItem(product1);
    } else if (productId === 'product2') {
      cart.addItem(product2);
    } else if (productId === 'product3') {
      cart.addItem(product3);
    } else if (productId === 'product4') {
      cart.addItem(product4);
    }
  });
});

document.getElementById('proceed-to-checkout').addEventListener('click', () => {
  alert("Proceeding to Checkout... Please wait...");
});
