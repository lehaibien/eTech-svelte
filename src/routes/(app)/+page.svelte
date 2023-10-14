<script lang="ts">
  import type { Category } from '$lib/types';
  import { onMount } from 'svelte';

  let categories: Category[];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/category');
    categories = await res.json();
  });
</script>

<svelte:head>
  <title>Trang chủ | eTech</title>
</svelte:head>

<div class="banner">
  <img
    src="/images/banner.png"
    alt=""
    class="w-full rounded-md"
  />
</div>
<div class="featured-category mt-2">
  <h2 class="text-2xl font-bold uppercase">Danh mục nổi bật</h2>
  <div class="grid grid-cols-6">
    {#if categories}
      {#each categories as category}
        <div class="col-span-1">
          <a
            href="/categories/{category.id}"
            class="w-1/2 p-3 flex flex-col justify-center items-center"
          >
            <img
              src={category.image.filePath}
              alt={category.name}
              class="max-w-[100px] max-h-[100px]"
            />
            <h3 class="whitespace-nowrap">{category.name}</h3>
          </a>
        </div>
      {/each}
    {/if}
  </div>
</div>
