<script lang="ts">
    import SearchBar from '$lib/SearchBar.svelte';
  import type { Order } from '$lib/types';
  import { getModalStore, Modal, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import OrderUpdateModal from '$lib/OrderUpdateModal.svelte';
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
  });
  const deleteOrder = async (id: number) => {
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
    const response = await fetch(`https://localhost:7066/api/order/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      alert('Xóa thành công');
      orders = orders.filter((ord) => ord.id !== id);
    } else {
      alert('Xóa thất bại');
    }
  };
  let modalComponent: ModalComponent;
  $: modalComponent = { ref: OrderUpdateModal, props: { orders } };
  const modalStore = getModalStore();
  let modal : ModalSettings;
  $: modal = {
    type: 'component',
    component: modalComponent,
    title: 'Cập nhật đơn hàng',
  };
</script>

<Modal />
{#if orders && orders.length > 0}
  <div class="flex flex-col">
    <!-- <Table regionHeadCell="variant-filled-tertiary whitespace-nowrap" source={tableSource} /> -->
    <!-- Responsive Container (recommended) -->
    <div class="table-container">
      <!-- Native Table Element -->
      <table class="table table-hover table-fixed">
        <thead>
          <tr class="variant-filled-tertiary">
            <th>Người đặt hàng</th>
            <th>Số lượng sản phẩm</th>
            <th>Địa chỉ giao hàng</th>
            <th>Ngày đặt hàng</th>
            <th colspan="2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {#each orders as ord, i}
            <tr class="[&>td]:!align-middle [&>td]:!px-4">
              <td>{ord.user.name}</td>
              <td>{ord.orderItems.length}</td>
              <td>
                {ord.user.address
                  ? `${ord.user.address.streetAddress}, ${ord.user.address.city}, ${ord.user.address.province}`
                  : 'Không xác định'}
              </td>
              <td>{new Date(ord.createdAt).toLocaleString('vi')}</td>
              <td colspan="2">
                <a href="/admin/orders/{ord.id}" class="btn variant-ghost-primary rounded-md">Xem</a
                >
                <button class="btn variant-ghost-tertiary rounded-md ml-2" on:click={() => modalStore.trigger(modal)}
                  >Cập nhật</button
                >
                <button
                  class="btn variant-ghost-error rounded-md ml-2"
                  on:click={() => deleteOrder(ord.id)}>Xóa</button
                >
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" />
            <td colspan="1" class="normal-case">Tổng số lượng:</td>
            <td colspan="2" class="text-right">{orders.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
{:else}
  <h2>Không có đơn hàng nào.</h2>
{/if}
