<script lang="ts">
  import { goto } from '$app/navigation';
  import { Drawer, getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { cartStore, getCart, removeFromCart } from '../stores/cartStore';
  import { getUserInit, userStore } from '../stores/userStore';
  import { convertPriceToCurrency } from './helper';
  import type { CartItem, User } from './types';
  let totalCartItem = 0;
  let cartItems: CartItem[] = [];
  cartStore.subscribe((cart) => {
    totalCartItem = cart.items.length;
    cartItems = cart.items;
  });
  /* @ts-ignore */
  let user: User = null;
  $: onMount(async () => {
    await getUserInit();
    await getCart();
  });
  userStore.subscribe((u) => {
    user = u;
  });
  const drawerStore = getDrawerStore();
  const drawerSettings: DrawerSettings = {
    id: 'cart-drawer',
    position: 'right',
    width: 'w-[50px] md:w-[420px]'
  };
</script>

<Drawer>
  <div class="h-full relative pt-4 flex flex-col gap-2">
    {#each cartItems as item, i}
      <div class="card overflow-hidden">
        <div class="p-4 flex justify-between items-center variant-glass-secondary rounded-lg">
          <a href="/products/{item.product.id}" class="flex gap-2 items-center w-2/3">
            <img
              class="w-1/4 object-cover rounded-xl"
              src={item.product.images[0].filePath}
              alt={item.product.name}
            />
            <div id="product-container" class="w-2/3">
              <h3 class="text-sm">{item.product.name}</h3>
              <h4 class="text-sm text-tertiary-500-400-token">Số lượng: {item.quantity}</h4>
              <div>
                <span class="text-sm font-medium">{convertPriceToCurrency(item.product.price)}</span
                >
              </div>
            </div>
          </a>
          <div id="cart-quantity" class="w-1/6">
            <div class="w-full mx-auto text-center">
              <button
                class="btn rounded-xl text-sm font-semibold variant-ghost-error mt-2"
                on:click={() => removeFromCart(item.product.id)}>Xóa</button
              >
            </div>
          </div>
        </div>
      </div>
    {/each}
    <button
      on:click={() => {
        goto('/cart');
        drawerStore.close();
      }}
      class="btn absolute variant-filled-tertiary rounded-t-lg rounded-b-none bottom-0 w-full"
      >Xem giỏ hàng</button
    >
  </div>
</Drawer>
<div class="header-action flex flex-row items-center">
  <div class="dropdown relative">
    {#if user !== null}
      <a class="btn" href="/user">
        <svg class="w-6 h-6 fill-current" viewBox="0 0 1024 1024">
          <path
            d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"
          />
          <path
            d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"
          />
        </svg>
        <span class="hidden md:inline text-base">{user.name}</span>
      </a>
    {:else}
      <a class="btn" href="/login">
        <svg class="w-6 h-6 fill-current" viewBox="0 0 1024 1024">
          <path
            d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"
          />
          <path
            d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"
          />
        </svg>
        <span class="hidden md:inline text-base">Đăng nhập</span>
      </a>
    {/if}
  </div>
  <button
    class="btn btn-sm"
    type="button"
    on:click={() => {
      drawerStore.open(drawerSettings);
    }}
  >
    <div class="relative inline-block">
      <span class="badge-icon variant-filled-primary absolute -top-1 -right-2 z-10"
        >{totalCartItem}</span
      >
      <svg
        class="w-6 h-6 fill-current"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0 512) scale(.1 -.1)">
          <path
            d="m2371 5100c-150-40-306-141-387-248l-35-48-492-58c-271-32-501-63-512-69-31-16-44-39-45-75 0-32 54-516 64-573 5-25 3-27-44-31-27-3-56-11-65-18s-78-117-155-245l-139-232-86-1660c-47-913-85-1692-85-1730 0-60 3-73 23-91l23-22h2125 2126l21 23c18 19 22 35 22 92 0 37-38 815-85 1728l-86 1660-139 232c-77 128-147 238-156 246-11 9-49 15-106 18-86 3-90 4-84 25 3 11 18 74 33 138 29 128 26 152-19 182-13 8-190 54-393 101-204 47-380 90-391 94-14 6-24 22-28 45-11 60-92 208-153 281-76 91-209 181-324 220-73 25-102 29-219 32-111 2-148-1-209-17zm318-176c139-34 279-140 353-265 21-34 36-64 34-66s-51 8-110 22c-113 28-152 27-180-4-8-9-34-96-56-192-23-95-43-182-46-191-4-14-72-44-80-35-1 1-19 139-39 306-19 167-40 311-44 320-21 39-55 45-163 33-56-7-103-10-106-7-8 8 127 68 183 81 72 18 178 17 254-2zm-329-258c0-2 14-117 30-256 17-139 27-256 23-260s-190-51-413-104c-308-74-410-102-427-118-31-29-30-70 7-220 17-67 30-128 30-135 0-10-45-13-203-13h-203l-56 478c-31 262-56 478-55 478 1 1 283 36 627 77s628 75 633 76c4 0 7-1 7-3zm1105-357c242-56 444-105 449-110 6-5-20-134-64-324l-74-315h-246-246l-82 343c-72 301-85 345-107 365-31 26-65 28-147 6-33-8-61-14-63-12-1 2 7 42 18 89l20 86 51-13c28-7 249-58 491-115zm-495-226c0-5 27-120 60-257 33-136 60-252 60-257s-276-9-643-9h-642l-28 117c-15 64-26 117-24 119 2 1 1194 291 1210 293 4 0 7-2 7-6zm-1980-282c0-9 14-119 25-203l5-38h-100c-55 0-100 3-100 6 0 18 145 244 156 244 8 0 14-4 14-9zm3239-110c39-66 71-122 71-125s-74-6-165-6-165 3-165 8c0 4 12 60 27 125l27 117h67 66l72-119zm155-373c3-35 40-733 81-1553s76-1511 78-1537l4-48h-1987-1987l4 48c2 26 37 717 78 1537s78 1518 81 1553l6 62h1818 1818l6-62z"
          />
          <path
            d="m1850 3209c-168-32-260-248-169-395 24-39 82-92 114-104 23-9 23-10 27-242 4-223 5-236 32-313 85-248 285-432 534-492 88-21 256-21 344 0 249 60 449 244 534 492 27 77 28 90 32 312l4 233 34 16c42 20 101 85 121 133 24 55 21 159-6 214-26 53-87 112-140 134-46 20-156 20-202 0-199-83-215-381-26-479l39-19-4-207c-5-237-17-291-88-400-225-349-715-349-940 0-71 109-83 164-88 400l-4 207 39 19c85 44 132 127 133 232 0 175-145 292-320 259z"
          />
        </g>
      </svg>
    </div>
    <button
      type="button"
      aria-label="Giỏ hàng"
      aria-pressed="false"
      class="hidden md:inline text-base"
    >
      Giỏ hàng
    </button>
  </button>
</div>
