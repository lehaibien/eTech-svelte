export async function load({ params, fetch }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const { id } = params;
  const res = await fetch(`https://localhost:7066/api/product/${id}`);
  const product = await res.json();
  return {
    props: {
      product
    }
  };
}
