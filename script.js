import { setupStore } from "./store.js";
import { setupShoppingCart } from "./shoppingCart.js";

// setting up the product items on HTML page dynamically
setupStore();

// setting up the cart items when user adds certain product item to cart
setupShoppingCart();
