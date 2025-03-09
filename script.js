class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class Cart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }

  addItem(product) {
    this.items.push(product);
    this.totalPrice += product.price;
    this.updateCartDisplay();
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    this.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItemsContainer.appendChild(li);
    });

    document.getElementById('cart-total').textContent = `Total: $${this.totalPrice.toFixed(2)}`;
  }
}

const product1 = new Product(1, 'Product 1', 19.99, 'product1.jpg');
const product2 = new Product(2, 'Product 2', 29.99, 'product2.jpg');

const cart = new Cart();

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const productId = event.target.closest('.product').id;
    if (productId === 'product1') {
      cart.addItem(product1);
    } else if (productId === 'product2') {
      cart.addItem(product2);
    }
  });
});
