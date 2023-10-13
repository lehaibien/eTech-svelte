<script lang="ts">
  import type { Brand, Category } from '$lib/types';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import { Table } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  let brands: Brand[];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/brand');
    brands = await res.json();
  });
  let tableSource: TableSource;
  $: {
    if (brands) {
      tableSource = {
        head: ['', 'Tên hãng', 'Quốc gia', ''],
        /* @ts-ignore */
        body: brands.map((brand) => {
          return [
            `<img src="${brand.image.filePath}" alt="${brand.name}" class="max-w-[100px] max-h-[100px] mx-auto" />`,
            `${brand.name}`,
            brand.country,
            `<button class="btn">Chỉnh sửa</button>`
          ];
        }),
        /* @ts-ignore */
        meta: brands,
        foot: [
          'Số lượng:',
          '',
          '',
          `<span class="w-full flex justify-end text-sm">${brands.length}</span>`
        ]
      };
    }
  }
</script>

{#if brands}
  <div class="flex flex-col">
    <Table
      regionHeadCell="bg-secondary-600-300-token text-white dark:text-black whitespace-nowrap"
      source={tableSource}
    />
    <a href="/admin/brands/new" class="btn variant-ghost-primary rounded-md mt-2 self-end">
      Thêm hãng mới
    </a>
  </div>
{/if}
