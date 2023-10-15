<script lang="ts">
  import type { Order } from '$lib/types';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import { Table } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  let orders: Order[];
  onMount(async () => {
    const localAccessToken = localStorage.getItem('accessToken');
    if (!localAccessToken) {
      alert('Bạn chưa đăng nhập');
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    const res = await fetch('https://localhost:7066/api/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    orders = await res.json();
    console.log(orders);
  });
  let tableSource: TableSource;
  $: {
    if (orders !== undefined && orders.length > 0) {
      tableSource = {
        head: ['Người đặt hằng', 'Sản phẩm', 'Số lượng', 'Ngày đặt hàng', ''],
        /* @ts-ignore */
        body: orders.map((order) => {
          return [
            order.user.name,
            order.orderItems[1] ? order.orderItems[1].product.name : 'Không có sản phẩm',
            order.orderItems[1] ? order.orderItems[1].quantity : 0,
            new Date(order.createdAt).toLocaleDateString(),
            `<a href="/admin/orders/${order.id}" class="btn variant-ghost-primary rounded-md">Cập nhật</a>`
          ];
        }),
        /* @ts-ignore */
        meta: orders,
        foot: [
          'Số lượng:',
          '',
          '',
          '',
          `<span class="w-full flex justify-end text-sm">${orders.length ?? 0}</span>`
        ]
      };
    }
  }
</script>

{#if orders}
  <div class="flex flex-col">
      <Table regionHeadCell="variant-filled-tertiary whitespace-nowrap" source={tableSource} />
  </div>
{/if}
