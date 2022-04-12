import items from "./items.json";
import formatCurrency from "./utility/formatCurrency.js";
import addGlobalEventListener from "./utility/addGlobalEventListener.js";

const cartButton = document.querySelector("[data-cart-button]");
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]");
const cartItemTemplate = document.querySelector("#cart-item-template");
const IMAGE_URL = "https://dummyimage.com/210x130/";
const cartItemContainer = document.querySelector("[data-cart-container]");
const cartQuantity = document.querySelector("[data-cart-quantity]");
const cartTotal = document.querySelector("[data-cart-total]");
const cart = document.querySelector("[data-cart]");
const LOCAL_STORAGE_KEY = "SHOPPING_CART-cart";

let shoppingCart = loadCart();

export function setupShoppingCart() {
  addGlobalEventListener("click", "[data-remove-from-cart-button]", (e) => {
    const id = e.target.closest("[data-container]").dataset.itemId;
    removeFromCart(parseInt(id));
  });

  renderCart();

  // toogle cart items to show/hide when cart icon is clicked
  cartButton.addEventListener("click", (e) => {
    cartItemsWrapper.classList.toggle("invisible");
  });
}

export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  // if same product added again, then update the previous one
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }

  renderCart();
  saveCart();
}

// setting the cart dynamically
function renderCart() {
  // if no items in cart, then disappears
  if (shoppingCart.length === 0) {
    hideCart();
  } else {
    showCart();
    renderCartItems();
  }
}

// setting the cart items dynamically
function renderCartItems() {
  cartQuantity.innerText = shoppingCart.length;

  // function to calulate TOTAL AMOUNT to be paid
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((e) => entry.id === e.id);
    return sum + item.priceCents * entry.quantity;
  }, 0);
  cartTotal.innerText = formatCurrency(totalCents / 100);

  //setting initial html contents to be null
  cartItemContainer.innerHTML = "";

  shoppingCart.forEach((entry) => {
    const item = items.find((e) => entry.id === e.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);

    // loading the items data
    const container = cartItem.querySelector("[data-container]");
    container.dataset.itemId = item.id;

    const name = cartItem.querySelector("[data-name]");
    name.innerText = item.name;

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-quantity]");
      quantity.innerText = `x${entry.quantity}`;
    }

    const image = cartItem.querySelector("[data-image]");
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    const price = cartItem.querySelector("[data-price]");
    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100);

    // setting the container in html dynamically
    cartItemContainer.appendChild(cartItem);
  });
}

// is user clicks on cancel button, product deletes from cart
function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem === null) return;
  shoppingCart = shoppingCart.filter((entry) => entry.id !== id); // we reduce our cart to all other id's except for the deleted one.
  renderCart();
  saveCart();
}

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shoppingCart));
}

function loadCart() {
  const cart = localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(cart) || [];
}

// function to hide whole cart sectiton
function hideCart() {
  cart.classList.add("invisible");
  cartItemsWrapper.classList.add("invisible");
}

// function to show cart items
function showCart() {
  cart.classList.remove("invisible");
}
