<script lang="ts">
  import type { Category } from '$lib/types';
  import { onMount } from 'svelte';
  let categories: Category[];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/category');
    categories = await res.json();
  });
  const deleteCategory = async (id: number) => {
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
    const response = await fetch(`https://localhost:7066/api/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if(response.ok) {
      alert('Xóa thành công');
      categories = categories.filter((cat) => cat.id !== id);
    } else {
      alert('Xóa thất bại');
    }
  }
</script>

{#if categories}
  <div class="flex flex-col">
    <!-- <Table regionHeadCell="variant-filled-tertiary whitespace-nowrap" source={tableSource} /> -->

    <!-- Responsive Container (recommended) -->
    <div class="table-container">
      <!-- Native Table Element -->
      <table class="table table-hover table-fixed">
        <thead>
          <tr class="variant-filled-tertiary whitespace-nowrap">
            <th/>
            <th>Tên thể loại</th>
            <th colspan="2">Mô tả</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {#each categories as cat, i}
            <tr class="[&>td]:!align-middle">
              <td>
                <img
                  class="max-w-[100px] max-h-[100px] mx-auto"
                  src={cat.image.filePath}
                  alt={cat.name}
                />
              </td>
              <td>{cat.name}</td>
              <td colspan="2">{cat.description}</td>
              <td>
                <a href="/admin/categories/{cat.id}" class="btn variant-ghost-primary rounded-md"
                  >Cập nhật</a
                >
                <button class="btn variant-ghost-error rounded-md ml-2" on:click={() => deleteCategory(cat.id)}>Xóa</button>
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" />
            <td colspan="2" class="normal-case">Tổng số lượng:</td>
            <td colspan="1" class="text-right">{categories.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <a href="/admin/categories/new" class="btn variant-ghost-primary rounded-md mt-2 self-end">
      Thêm thể loại mới
    </a>
  </div>
{/if}
