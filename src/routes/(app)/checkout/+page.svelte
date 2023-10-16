<script lang="ts">
  import region from '$lib/region.json';
  import { get } from 'svelte/store';
  import { cartStore } from '../../../stores/cartStore';
  import { userStore } from '../../../stores/userStore';
  import { onMount } from 'svelte';
  import { getUserInit } from '../../../stores/userStore';
  import { goto } from '$app/navigation';
  onMount(async () => {
    await getUserInit();
  });
  let cart = get(cartStore);
  let user = get(userStore);
  cartStore.subscribe((c) => {
    cart = c;
  });
  userStore.subscribe((u) => {
    user = u;
  });
  const provinces = region.map((r) => r.Name);
  let districts: any[] = [];
  $: {
    if (user && user.address !== null) {
      let regionDistricts = region.find((r) => r.Name === user.address.province);
      if (regionDistricts) {
        districts = regionDistricts.Districts;
      }
    }
  }
  const checkout = async () => {
    console.log(user);
    console.log(cart);
    const localAccessToken = localStorage.getItem('accessToken');
    console.log(localAccessToken);
    if (!localAccessToken) {
      alert('Bạn chưa đăng nhập');
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    const response = await fetch('https://localhost:7066/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: user.id,
        amount: cart.total,
        paymentType: 'COD',
        fee: 0,
        items: cart.items.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity
          };
        })
      })
    });
    if (response.ok) {
      alert('Đặt hàng thành công');
      goto('/checkout/success');
    } else {
      alert('Đặt hàng thất bại');
    }
  };
</script>

{#if user && cart && user.address !== null}
  <div class="h-full flex flex-col">
    <h1>Thanh toán</h1>
    <div class="grid grid-cols-2 py-4 gap-3">
      <div class="col-span-1 p-6 border border-surface-300-600-token">
        <h2>Thông tin giao hàng</h2>
        <div class="mb-3">
          <label for="name">Họ Tên</label>
          <input
            name="name"
            type="text"
            class="w-full rounded-md bg-surface-300-600-token p-2"
            placeholder="Nhập họ và tên"
            bind:value={user.name}
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            name="email"
            type="text"
            class="w-full rounded-md bg-surface-300-600-token p-2"
            placeholder="Nhập email"
            bind:value={user.email}
          />
        </div>
        <div class="mb-3">
          <label for="phone">Số diện thoại</label>
          <input
            name="phone"
            type="text"
            class="w-full rounded-md bg-surface-300-600-token p-2"
            placeholder="Nhập số diện thoại"
            bind:value={user.phoneNumber}
          />
        </div>
        <div class="mb-3">
          <label for="address">Địa chỉ</label>
          <input
            name="address"
            type="text"
            class="w-full rounded-md bg-surface-300-600-token p-2"
            placeholder="Nhập địa chỉ"
            bind:value={user.address.streetAddress}
          />
        </div>
        <div class="mb-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label for="address">Tỉnh</label>
            <select
              name="address"
              id=""
              class="w-full rounded-md bg-surface-300-600-token p-2"
              bind:value={user.address.province}
            >
              <option value="" disabled>Chọn tỉnh</option>
              {#each provinces as province}
                <option value={province}>{province}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="address">Quận / Huyện</label>
            <select
              name="address"
              id=""
              class="w-full rounded-md bg-surface-300-600-token p-2"
              bind:value={user.address.city}
            >
              <option value="" disabled>Chọn quận / huyện</option>
              {#each districts as district}
                <option value={district.Name}>{district.Name}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label for="zipcode">Mã bưu chính</label>
          <input
            name="zipcode"
            type="number"
            class="w-full rounded-md bg-surface-300-600-token p-2"
            placeholder="Nhập mã bưu chính"
            bind:value={user.address.zipCode}
          />
        </div>
      </div>
      <div class="col-span-1 p-6 border border-surface-300-600-token">
        {#if cart}
          {#each cart.items as item}
            <h2>{item.product.name}</h2>
          {/each}
        {/if}
      </div>
    </div>
    <div class="self-end flex gap-2 items-center">
      <a href="/admin/products" class="btn rounded-lg variant-glass-error">Trở về</a>
      <button class="btn rounded-lg variant-filled-primary" on:click={checkout}>
        Thêm sản phẩm mới
      </button>
    </div>
  </div>
{/if}
