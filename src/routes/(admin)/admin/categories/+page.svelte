<script lang="ts">
  import type { Category } from '$lib/types';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import { Table } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  let categories: Category[];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/category');
    categories = await res.json();
  });
  let tableSource: TableSource;
  $: {
    if (categories) {
      tableSource = {
        head: ['', 'Tên thể loại', 'Mô tả', ''],
        /* @ts-ignore */
        body: categories.map((category) => {
          return [
            `<img src="${category.image.filePath}" alt="${category.name}" class="max-w-[100px] max-h-[100px] mx-auto" />`,
            category.name,
            category.description
          ];
        }),
        /* @ts-ignore */
        meta: categories,
        foot: [
          'Số lượng:',
          '',
          '',
          `<span class="w-full flex justify-end text-sm">${categories.length}</span>`
        ]
      };
    }
  }
</script>

{#if categories}
  <Table
    regionHeadCell="bg-secondary-600-300-token text-white dark:text-black whitespace-nowrap"
    source={tableSource}
    interactive
    on:selected={(e) => {
      console.log(e.detail);
    }}
  />
{/if}
