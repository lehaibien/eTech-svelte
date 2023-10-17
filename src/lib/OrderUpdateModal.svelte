<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import type { Order } from './types';
  export let parent: any;
  export let order: Order;
  const modalStore = getModalStore();
  const updateOrderStatus = async () => {
    const localAccessToken = localStorage.getItem('accessToken');
    if (!localAccessToken) {
      alert('Bạn chưa đăng nhập');
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    const response = await fetch(`https://localhost:7066/api/order/${order.id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: order.orderStatus.toString()
    });
    console.log(await response.json());
    if (response.ok) {
      alert('Cập nhật trạng thái đơn hàng thành công');
      modalStore.close();
    } else {
      alert('Cập nhật trạng thái đơn hàng thất bại');
      modalStore.close();
    }
  };
</script>

<slot />
<div class="p-8 rounded-lg {parent.background}">
  <header class="h3">Cập nhật đơn hàng</header>
  <form class="border border-surface-500 p-4 space-y-4 rounded-container-token">
    <label for="orderstatus" class="label">Trạng thái đơn hàng</label>
    <select
      name="orderstatus"
      id="orderstatus"
      bind:value={order.orderStatus}
      class="w-[250px] variant-filled"
    >
      <!--
          Pending,
    Returned,
    Rejected,
    Delivered,
    Dispatched,
    -->
      <option value={0}>Đang xử lý</option>
      <option value={1}>Đang giao</option>
      <option value={2}>Đã giao</option>
    </select>
    <button
      on:click={() => {
        updateOrderStatus();
      }}
      class="btn variant-ghost-primary rounded-md flex mx-auto"
    >
      Cập nhật
    </button>
  </form>
</div>
