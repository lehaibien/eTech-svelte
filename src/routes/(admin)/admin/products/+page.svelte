<script lang="ts">
  import { convertPriceToCurrency } from '$lib/helper';
  import type { Product } from '$lib/types';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import { Table } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  let products: Product[];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/product');
    products = await res.json();
  });
</script>

{#if products}
  <div class="flex flex-col">
    <!-- Responsive Container (recommended) -->
    <div class="table-container">
      <!-- Native Table Element -->
      <table class="table table-hover table-fixed">
        <thead>
          <tr class="variant-ghost-tertiary whitespace-nowrap text-xs lg:text-sm">
            <th />
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Hãng</th>
            <th>Thể loại</th>
            <th colspan="3">Mô tả</th>
            <th colspan="2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {#each products as product, i}
            <tr class="[&>td]:!align-middle [&>td]:!px-4">
              <td>
                <img src={product.images[0].filePath} alt={product.name + ' image'} />
              </td>
              <td>{product.name}</td>
              <td>{convertPriceToCurrency(product.price)}</td>
              <td>{product.stock}</td>
              <td>{product.brand.name}</td>
              <td>{product.category.name}</td>
              <td colspan="3" class="text-justify">{product.description}</td>
              <td colspan="2">
                <a
                  href="/admin/products/{product.id}"
                  class="btn variant-ghost-primary rounded-md ml-2">Cập nhật</a
                >
                <button class="btn variant-ghost-error rounded-md ml-2" on:click={() => {}}
                  >Xóa</button
                >
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" />
            <td colspan="4" class="normal-case">Tổng số lượng:</td>
            <td colspan="1" class="text-right">{products.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <a href="/admin/products/new" class="btn variant-ghost-primary rounded-md mt-2 self-end">
      Thêm sản phẩm mới
    </a>
  </div>
{/if}
