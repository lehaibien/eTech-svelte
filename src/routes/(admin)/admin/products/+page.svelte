<script lang="ts">
  import type { Product } from '$lib/types';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import { Table } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  let products: Product[];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/product');
    products = await res.json();
  });
  let tableSource: TableSource;
  $: {
    if (products) {
      tableSource = {
        head: ['', 'Tên sản phẩm', 'Giá', 'Tồn kho', 'Thể loại', 'Hãng', 'Mô tả', ''],
        /* @ts-ignore */
        body: products.map((product) => {
          return [
            `<img src="${product.images[0].filePath}" alt="${product.name}" class="max-w-[100px] max-h-[100px] mx-auto" />`,
            product.name,
            product.price,
            product.stock,
            product.category.name,
            product.brand.name,
            product.description
          ];
        }),
        /* @ts-ignore */
        meta: products,
        foot: [
          'Số lượng:',
          '',
          '',
          '',
          '',
          '',
          `<span class="w-full flex justify-end text-sm">${products.length}</span>`
        ]
      };
    }
  }
</script>

{#if products}
  <Table
    regionHeadCell="bg-secondary-600-300-token text-white dark:text-black whitespace-nowrap"
    source={tableSource}
    interactive
    on:selected={(e) => {
      console.log(e.detail);
    }}
  />
{/if}
