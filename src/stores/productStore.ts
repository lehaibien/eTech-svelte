import { writable } from 'svelte/store';
import type { Product } from '$lib/types';

const initialState : Product[] = [];
const productStore = writable(initialState);

const initProductStore = async () => {
  const token = JSON.parse(localStorage.getItem('accessToken')).accessToken;
  if(token === undefined || token === null){
    console.log("Token doesn't exists!");
    return;
  }
  const products: Product[] = await fetch('https://localhost:7066/api/product', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.json());
  if(products.length === 0) {
    return;
  }
  productStore.set(products);
}