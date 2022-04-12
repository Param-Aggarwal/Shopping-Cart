import items from "./items.json";
import formatCurrency from "./utility/formatCurrency.js";
import { addToCart } from "./shoppingCart.js";
import addGlobalEventListener from "./utility/addGlobalEventListener.js";

const storeItemTemplate = document.querySelector("#store-item-template");
const storeItemContainer = document.querySelector("[data-store-container]");
const IMAGE_URL = "https://dummyimage.com/420x260/";

export function setupStore() {
  if (storeItemTemplate === null) return; // for index.html and team.html pages

  // user clicks on add to cart button
  addGlobalEventListener("click", "[data-add-to-cart-button]", (e) => {
    const id = e.target.closest("[data-container]").dataset.itemId;
    addToCart(parseInt(id)); // moved to shoppingCart.js
  });
  items.forEach((item) => renderStoreItem(item));
}

function renderStoreItem(item) {
  // creating clone of template so as to paste it later in HTML
  const storeItem = storeItemTemplate.content.cloneNode(true);

  // loading the items data
  const container = storeItem.querySelector("[data-container]");
  container.dataset.itemId = item.id;

  const name = storeItem.querySelector("[data-name]");
  name.innerText = item.name;

  const category = storeItem.querySelector("[data-category]");
  category.innerText = item.category;

  const image = storeItem.querySelector("[data-image]");
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

  const price = storeItem.querySelector("[data-price]");
  price.innerText = formatCurrency(item.priceCents / 100);

  // setting the container in html
  storeItemContainer.appendChild(storeItem);
}
