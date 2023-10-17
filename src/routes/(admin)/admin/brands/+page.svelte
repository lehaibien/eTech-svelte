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
  const deleteBrand = async (id: number) => {
    const prompt = confirm('Bạn có chắc chắn muốn xóa thể loại này?');
    if (!prompt) {
      return;
    }
    const localAccessToken = localStorage.getItem('accessToken');
    if (!localAccessToken) {
      alert('Bạn chưa đăng nhập');
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    const response = await fetch(`https://localhost:7066/api/brand/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if(response.ok) {
      alert('Xóa thành công');
      brands = brands.filter((brand) => brand.id !== id);
    } else {
      alert('Xóa thất bại');
    }
  }
</script>

{#if brands}
  <div class="flex flex-col">
    <!-- <Table
      regionHeadCell="variant-filled-tertiary whitespace-nowrap"
      source={tableSource}
    /> -->
    <!-- Responsive Container (recommended) -->
    <div class="table-container">
      <!-- Native Table Element -->
      <table class="table table-hover table-fixed">
        <thead>
          <tr class="variant-ghost-tertiary text-sm">
            <th />
            <th>Tên hãng</th>
            <th>Quốc gia</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {#each brands as brand, i}
            <tr class="[&>td]:!align-middle [&>td]:px-4">
              <td>
                <img
                  class="max-w-[100px] max-h-[100px] mx-auto"
                  src={brand.image.filePath}
                  alt={brand.name}
                />
              </td>
              <td>{brand.name}</td>
              <td>{brand.country}</td>
              <td>
                <a href="/admin/brands/{brand.id}" class="btn variant-ghost-primary rounded-md"
                  >Cập nhật</a
                >
                <button
                  class="btn variant-ghost-error rounded-md ml-2"
                  on:click={() => deleteBrand(brand.id)}>Xóa</button
                >
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td colspan="2" class="normal-case">Tổng số lượng:</td>
            <td class="text-right">{brands.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <a href="/admin/brands/new" class="btn variant-ghost-primary rounded-md mt-2 self-end">
      Thêm hãng mới
    </a>
  </div>
{/if}
