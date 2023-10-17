<script lang="ts">
  import { page } from '$app/stores';
  import { convertPriceToCurrency } from '$lib/helper';
  import type { Order } from '$lib/types';
  import { onMount } from 'svelte';

  let order: Order;
  const id = $page.params.id;
  onMount(async () => {
    const localAccessToken = localStorage.getItem('accessToken');
    if (!localAccessToken) {
      alert('Bạn chưa đăng nhập');
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    const res = await fetch(`https://localhost:7066/api/order/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    order = await res.json();
  });
  const orderStatus = [
    {
      title: 'Đang xử lý',
      color: 'text-error-500'
    },
    {
      title: 'Đang giao hàng',
      color: 'text-warning-500'
    },
    {
      title: 'Đã giao hàng',
      color: 'text-success-500'
    }
  ];
</script>

{#if order}
  <div class="flex gap-2 items-center">
    <a href="/admin/orders">
      <svg class="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20 12H4M4 12L10 6M4 12L10 18"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </a>
    <h2>Đơn hàng #{order.id}</h2>
  </div>
  <hr />
  <div class="p-3">
    <p>Họ tên: {order.user.name}</p>
    <p>Email: {order.user.email}</p>
    <p>Số điện thoại: {order.user.phoneNumber}</p>
    <p>
      Địa chỉ: {`${order.user.address.streetAddress}, ${order.user.address.city}, ${order.user.address.province}`}
    </p>
    <p>
      Trạng thái:
      <span class={orderStatus[order.orderStatus].color}>
        {orderStatus[order.orderStatus].title}
      </span>
    </p>
  </div>
  <div class="flex">
    <!-- Responsive Container (recommended) -->
    <div class="table-container">
      <!-- Native Table Element -->
      <table class="table table-hover table-fixed">
        <thead>
          <tr class="variant-ghost-tertiary text-sm">
            <th />
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {#each order.orderItems as ord, i}
            <tr class="[&>td]:!align-middle [&>td]:!px-4">
              <td>
                <img
                  class="w-1/2 bg-white"
                  src={ord.product.images[0].filePath}
                  alt={ord.product.name + ' image'}
                />
              </td>
              <td>{ord.product.name}</td>
              <td>{ord.quantity}</td>
              <td>{convertPriceToCurrency(ord.product.price * ord.quantity)}</td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="normal-case">Tổng số tiền phải trả:</td>
            <td colspan="1" class="text-right">
              {convertPriceToCurrency(
                order.orderItems.reduce((acc, ord) => acc + ord.product.price * ord.quantity, 0)
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
{/if}
