<script lang="ts">
  import { get } from 'svelte/store';
  import { cartStore } from '../../../stores/cartStore';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import { clearCart, removeFromCart } from '../../../stores/cartStore';
  import { updateCart } from '../../../stores/cartStore';
  import { Table } from '@skeletonlabs/skeleton';
  import { convertPriceToCurrency } from '$lib/helper';
  let tableSource: TableSource;
  let cart = get(cartStore);
  cartStore.subscribe((c) => {
    cart = c;
  });
  const handleQuantity = () => {
    //do nothing for now
    // TODO: handle quantity change
  };
  const increaseQuantity = (index: number) => {
    let cartItem = cart.items[index];
    updateCart(cartItem, cartItem.quantity + 1);
  };
  const decreaseQuantity = (index: number) => {
    let cartItem = cart.items[index];
    if (cartItem.quantity > 1) {
      updateCart(cartItem, cartItem.quantity - 1);
    }
  };
  $: {
    if (cart && cart.items) {
      tableSource = {
        head: ['', 'Tên sản phẩm', 'Giá', 'Số lượng', 'Thành tiền', 'Xóa'],
        /* @ts-ignore */
        body: cart.items.map((item) => {
          return [
            `<img src="${item.product.images[0].filePath}" alt="${item.product.name}" class="max-w-[100px] max-h-[100px] mx-auto" />`,
            item.product.name,
            convertPriceToCurrency(item.product.price),
            item.quantity,
            convertPriceToCurrency(item.product.price * item.quantity),
            `<button type="button" class="btn variant-ghost-error text-error-300 rounded-xl" onclick="removeFromCart(${item.product.id})">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                  <path
                    d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>`
          ];
        }),
        foot: [
          '',
          '',
          '',
          '',
          'Tổng tiền:',
          convertPriceToCurrency(
            cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
          )
        ]
      };
    }
  }
</script>

<div class="flex flex-col p-4 mt-2">
  <Table
    source={tableSource}
    regionHeadCell="variant-glass-tertiary whitespace-nowrap text-center"
    regionFootCell="text-center"
    regionCell="text-center !align-middle"
  />
  <a href="/checkout" class="btn variant-ghost-error self-end mt-2">Thanh toán</a>
</div>
