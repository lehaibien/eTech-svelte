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
            product.description,
            `<a href="/admin/products/${product.id}" class="btn variant-ghost-primary rounded-md">Cập nhật</a>`
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
  <div class="flex flex-col">
    <Table
      regionHeadCell="variant-filled-tertiary whitespace-nowrap"
      source={tableSource}
    />
    <a href="/admin/products/new" class="btn variant-ghost-primary rounded-md mt-2 self-end">
      Thêm sản phẩm mới
    </a>
  </div>
{/if}
