import type { Product } from '$lib/types.js';

export async function load({ params, fetch }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const { id } = params;
  let product: Product | null;
  try {
    const res = await fetch(`https://localhost:7066/api/product/${id}`);
    product = await res.json();
  } catch {
    product = null;
  }
  return {
    props: {
      product: product as Product
    }
  };
}
