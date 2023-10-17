<script lang="ts">
  import type { Category, Product } from '$lib/types';
  import { onMount } from 'svelte';

  let categories: Category[];
  let products: Product[];
  onMount(async () => {
    const categoryFetch = await fetch('https://localhost:7066/api/category');
    const productFetch = await fetch('https://localhost:7066/api/product/latest');
    categories = await categoryFetch.json();
    products = await productFetch.json();
  });
</script>

<svelte:head>
  <title>Trang chủ | eTech</title>
</svelte:head>

<div class="banner">
  <img src="/images/banner.png" alt="" class="w-full rounded-md" />
</div>
<div class="featured-category mt-2">
  <h2 class="text-2xl font-bold uppercase">Danh mục nổi bật</h2>
  <div class="grid grid-cols-7 gap-1">
    {#if categories}
      {#each categories as category}
        <div class="col-span-1 p-3">
          <a href="/categories/{category.id}">
            <img
              src={category.image.filePath}
              alt={category.name}
              class="object-cover aspect-square bg-white rounded-lg"
            />
            <h3 class="text-sm">{category.name}</h3>
          </a>
        </div>
      {/each}
    {/if}
  </div>
</div>

<div class="latest-product mt-2">
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold uppercase">Sản phẩm mới nhất</h2>
    <a href="/products" class="text-primary-500-400-token font-semibold text-xl hover:underline">Xem tất cả</a>
  </div>
  <div class="grid grid-cols-7 gap-1">
    {#if products}
      {#each products as product}
        <div class="col-span-1 p-3">
          <a href="/products/{product.id}">
            <img
              src={product.images[0].filePath}
              alt={product.name}
              class="object-cover aspect-square bg-white rounded-lg"
            />
            <h3 class="text-sm">{product.name}</h3>
          </a>
        </div>
      {/each}
    {/if}
  </div>
</div>
