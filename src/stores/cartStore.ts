import type { CartItem, Product, User } from '$lib/types';
import { get, writable } from 'svelte/store';
import { getUserFromToken, userStore } from './userStore';

// Define the initial state of the cart
interface CartState {
  user: User | null;
  items: CartItem[];
  total: number;
}
const initialCartState: CartState = {
  user: null,
  items: [],
  total: 0
};

const getCart = (): CartState => {
  const user = get(userStore);
  if (user === null) {
    return initialCartState;
  }
  const userId = user.id;
  const cart: CartState = fetch(`https://localhost:7066/api/cart/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
  console.log(cart)
  if(cart === undefined || cart.items === undefined) {
    return initialCartState;
  }
  cart.total = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return {
    user: user,
    items: cart.items,
    total: cart.total
  };
};

// Create a writable store with the initial state
export const cartStore = writable(getCart());

// Define actions to update the cart state
export const addToCart = async (item: Product, quantity = 1) => {
  const token = JSON.parse(localStorage.getItem('accessToken')).accessToken
  const user = await getUserFromToken(token);
  let cartItem: CartItem = {
    product: null,
    quantity: 0
  };
  console.log(user);
  try {
    cartItem = await fetch(`https://localhost:7066/api/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: user.id,
        productId: item.id,
        quantity: quantity
      })
    }).then((res) => res.json());
  } catch {
    console.log('Error adding to cart');
    return;
  }
  cartStore.update((cart) => {
    cart.user = user;
    // Check if the item already exists in the cart
    if (cartItem.product === null) {
      return cart;
    }
    const existingItem = cart.items.find((i) => i.product.id === cartItem.product.id);
    if (existingItem) {
      // If it does, update the quantity
      existingItem.quantity = cartItem.quantity;
    } else {
      // Otherwise, add the new item
      cart.items.push(cartItem);
    }
    // Update the total price of the cart
    cart.total = cart.items
      .map((item) => item.product.price * item.quantity)
      .reduce((acc, price) => acc + price, 0);
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
  console.log('Clearing cart...');
  cartStore.set({
    user: null,
    items: [],
    total: 0
  });
  localStorage.removeItem('cart');
};
