<script lang="ts">
  import { convertPriceToCurrency } from '$lib/helper';
  import { get } from 'svelte/store';
  import { cartStore, updateCart } from '../../../stores/cartStore';
  import type { CartItem } from '$lib/types';
  let cart = get(cartStore);
  cartStore.subscribe((c) => {
    cart = c;
  });
  const handleQuantity = (e: Event) => {
    //do nothing for now
    // TODO: handle quantity change
    // get input name
    // @ts-ignore
    const index = Number(e.target.name.replace('quantity-', ''));
    const cartItem = cart.items[index];
    updateCart(cartItem, cartItem.quantity);
  };
  const increaseQuantity = (cartItem: CartItem) => {
    updateCart(cartItem, cartItem.quantity + 1);
  };
  const decreaseQuantity = (cartItem: CartItem) => {
    if (cartItem.quantity > 1) {
      updateCart(cartItem, cartItem.quantity - 1);
    }
  };
</script>

{#if cart && cart.items.length > 0}
  <div class="flex flex-col p-4 mt-2">
    <div class="table-container">
      <!-- Native Table Element -->
      <table class="table table-hover table-fixed">
        <thead>
          <tr class="variant-glass-tertiary whitespace-nowrap !text-center">
            <th />
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {#each cart.items as item, i}
            <tr class="text-center">
              <td>
                <img
                  class="w-1/2"
                  src={item.product.images[0].filePath}
                  alt={item.product.name + ' image'}
                />
              </td>
              <td class="!align-middle">{item.product.name}</td>
              <td class="!align-middle">{convertPriceToCurrency(item.product.price)}</td>
              <td class="!align-middle">
                <div class="bg-surface-200-700-token w-1/2 mx-auto flex">
                  <button class="btn btn-sm w-1/4" on:click={() => decreaseQuantity(item)}>-</button
                  >
                  <input
                    name="quantity-{i}"
                    type="number"
                    class="py-2 bg-inherit border-none text-center w-1/2"
                    bind:value={item.quantity}
                    min="1"
                    on:change={handleQuantity}
                  />
                  <button class="btn btn-sm w-1/4" on:click={() => increaseQuantity(item)}>+</button
                  >
                </div>
              </td>
              <td class="!align-middle"
                >{convertPriceToCurrency(item.product.price * item.quantity)}</td
              >
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" />
            <th colspan="1">Tổng tiền:</th>
            <td colspan="1" class="text-right">
              {convertPriceToCurrency(
                cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <a href="/checkout" class="btn variant-ghost-error self-end mt-2">Thanh toán</a>
  </div>
{:else}
  <h2>Giỏ hàng trống</h2>
{/if}
