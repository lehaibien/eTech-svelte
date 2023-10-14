<script lang="ts">
  import region from '$lib/region.json';
  import { get } from 'svelte/store';
  import { cartStore } from '../../../stores/cartStore';
  import { userStore } from '../../../stores/userStore';
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
  let currentProvince = '';
  let currentDistrict = '';
  $: districts = region.find((r) => r.Name === currentProvince)?.Districts ?? [];
</script>

{#if user}
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
          />
        </div>
        <div class="mb-3 grid grid-cols-2 gap-2">
          <div>
            <label for="address">Tỉnh</label>
            <select name="address" id="" class="w-full rounded-md bg-surface-300-600-token p-2" bind:value={currentProvince}>
              <option value="" disabled>Chọn tỉnh</option>
              {#each provinces as province}
                <option value={province}>{province}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="address">Quận / Huyện</label>
            <select name="address" id="" class="w-full rounded-md bg-surface-300-600-token p-2" bind:value={currentDistrict}>
              <option value="" disabled>Chọn quận / huyện</option>
              {#each districts as district}
                <option value={district.Name}>{district.Name}</option>
              {/each}
            </select>
          </div>
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
      <button class="btn rounded-lg variant-filled-primary" on:click={() => {}}>
        Thêm sản phẩm mới
      </button>
    </div>
  </div>
{/if}
