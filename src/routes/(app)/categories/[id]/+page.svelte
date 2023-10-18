<script lang="ts">
  import { page } from '$app/stores';
  import type { Category, Product } from '$lib/types';
  import { onMount } from 'svelte';
  import { addToCart } from '../../../../stores/cartStore';
  let id: string;
  let category: Category | null = null;
  let products: Product[] = [];
  id = $page.params.id;
  $: onMount(async () => {
    category = await fetch('https://localhost:7066/api/category/' + id, {
      method: 'GET'
    }).then((res) => res.json());
    products = category?.products;
    console.log(products);
  });
  const addProductToCart = (item: Product) => {
    addToCart(item, 1);
  };
</script>

<div class="p-1">
  <img src={category?.image.filePath} class="w-full h-[300px] rounded-md" alt="">
  <div class="flex my-3 items-center">
    <p class="font-bold text-lg">{category?.name}</p>
    <p class="ms-2"><strong>{products.length}</strong> sản phẩm</p>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex justify-center">
    {#each products as product}
        <div class="card max-w-[250px] flex flex-col justify-between">
            <div>
                <header class="card-header">
                    <img src={product.images[0].filePath} class="w-[250px] h-[250px]" alt="">
                </header>
                <section class="p-4">
                    <p class="text-slate-400">{product.brand.name}</p>
                    <a class="break-words" href={"/products/"+product.id}>{product.name}</a>
                    <p class="text-error-600-300-token font-semibold">{product.price} đ</p>
                </section>
            </div>
            <footer class="card-footer">
                <button on:click={addProductToCart(product)} class="flex items-center rounded-lg hover:bg-tertiary-700 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 p-1 rounded-full bg-tertiary-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p class="font-bold">Thêm vào giỏ</p>                           
                </button>
            </footer>
        </div>
    {/each}
</div>
</div>
