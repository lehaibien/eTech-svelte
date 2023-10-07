import type { CartItem, Product, User } from '$lib/types';
import { get, writable } from 'svelte/store';
import { userStore } from './userStore';

// Define the initial state of the cart
interface CartState {
  user: User;
  items: CartItem[];
  total: number;
}
const initialCartState: CartState = {
  user: null,
  items: [],
  total: 0
};

// Create a writable store with the initial state
export const cartStore = writable(initialCartState);

// Define actions to update the cart state
export const addToCart = (item: Product, quantity = 1) => {
  console.log('Adding product to cart...');
  cartStore.update((cart) => {
    cart.user = get(userStore);
    // Check if the item is already in the cart
    const existingItem = cart.items.find((i) => i.product.id === item.id);

    if (existingItem) {
      // If the item is already in the cart, increment the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item is not in the cart, add it to the items array
      cart.items.push({
        product: item,
        quantity: quantity
      });
    }

    // Update the total price of the cart
    cart.total += item.price;
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);

    // Return the updated cart state
    return cart;
  });
};

export const removeFromCart = (productId: number) => {
  cartStore.update((cart) => {
    // Find the index of the item with the matching id
    const index = cart.items.findIndex((i) => i.product.id === productId);

    if (index !== -1) {
      // If the item is found, remove it from the items array
      const item = cart.items[index];
      cart.items.splice(index, 1);

      // Update the total price of the cart
      cart.total -= item.product.price * item.quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Return the updated cart state
    return cart;
  });
};

export const clearCart = () => {
  // Reset the cart to the initial state
  cartStore.set(initialCartState);
  localStorage.removeItem('cart');
};
