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
            category.description,
            `<a href="/admin/categories/${category.id}" class="btn variant-ghost-primary rounded-md">Cập nhật</a>`
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
  <div class="flex flex-col">
    <Table
      regionHeadCell="variant-filled-tertiary whitespace-nowrap"
      source={tableSource}
    />
    <a href="/admin/categories/new" class="btn variant-ghost-primary rounded-md mt-2 self-end">
      Thêm thể loại mới
    </a>
  </div>
{/if}
