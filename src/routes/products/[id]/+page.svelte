<script lang="ts">
  import { convertPriceToCurrency } from '$lib/helper.js';
  import type { Product } from '$lib/types.js';

  export let data;
  let product: Product | null = null;
  $: product = data.props.product;
  let quantity = 1;
  const handleQuantity = (e: any) => {
    quantity = e.target.value;
  };
  const increaseQuantity = () => {
    quantity++;
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      quantity--;
    }
  };
  if (product === null) {
    console.error('Product not found');
  }
</script>

<svelte:head>
  {#if product !== null}
    <title>{product.name} | eTech</title>
  {:else}
    <title>eTech</title>
  {/if}
</svelte:head>

{#if product !== null}
  <div class="flex flex-wrap bg-surface-50-900-token">
    <div class="w-full md:w-[36%] relative p-4">
      <img src={product.images[0].filePath} alt="" class="mx-auto" />
    </div>
    <div
      class="w-full md:w-[64%] bg-surface-50-900-token border-l-[1px] dark:border-gray-600 border-gray-300 p-4"
    >
      <div class="pt-4 mb-4">
        <h1 class="text-xl mb-2">{product.name}</h1>
        <span class="text-xs md:text-base"
          >Thương hiệu:
          <strong class="text-primary-600-300-token text-sm md:text-lg">
            <a title="Show vendor" href="/collections/vendors?q=logitech">{product.brand.name}</a>
          </strong>
        </span>
        <span class="text-xs md:text-base"
          >Thời gian bảo hành: <strong class="text-primary-600-300-token text-sm md:text-lg"
            >24 tháng</strong
          ></span
        >
      </div>
      <div class="flex flex-wrap">
        <div class="lg:max-w-[66.7%] lg:flex-[66.7%] max-w-full flex-[100%] px-4">
          <div class="price flex items-center rounded p-4 bg-surface-200-700-token mb-4">
            <span class="font-semibold w-1/5 hidden md:block">Giá: </span>
            <span class="text-primary-600-300-token text-lg md:text-2xl font-semibold pr-2"
              >{convertPriceToCurrency(product.price)}</span
            >
            <!-- <del class="text-gray-400 text-sm md:text-lg mr-2">2,790,000₫</del>
            <span
              class="border-[1px] border-primary-600-300-token rounded text-xs md:text-sm font-semibold text-primary-600-300-token px-2 md:px-4 py-1 inline-block"
              >-32%</span
            > -->
          </div>
          <div class="mb-4 hidden md:block">
            <div class="flex items-center">
              <div class="w-1/4 font-semibold pl-4 text-sm">Số lượng:</div>
              <button
                type="button"
                on:click={decreaseQuantity}
                class="btn h-[40px] w-[40px] text-2xl float-left border-[1px] border-surface-400-500-token bg-surface-100-800-token rounded-none"
                >-</button
              >
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={quantity}
                min="1"
                on:change={handleQuantity}
                class="text-sm p-0 focus:ring-0 font-semibold appearance-none border-t-[1px] border-b-[1px] border-surface-400-500-token bg-surface-100-800-token w-[40px] h-[40px] text-center float-left"
              />
              <button
                type="button"
                on:click={increaseQuantity}
                class="btn h-[40px] w-[40px] text-2xl float-left border-[1px] border-surface-400-500-token bg-surface-100-800-token rounded-none"
                >+</button
              >
            </div>
            <div class="mt-4 flex">
              <button
                type="button"
                class="rounded text-[15px] font-semibold w-full px-5 py-3 uppercase bg-surface-800-200-token text-primary-600-300-token border-[1px] border-primary-600-300-token"
              >
                Thêm vào giỏ
              </button>
              <button
                type="button"
                class="btn rounded text-[15px] font-semibold w-full px-5 py-3 uppercase bg-primary-600-300-token text-tertiary-50-900-token ml-4"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
        <div class="lg:max-w-[33.3%] lg:flex-[33.3%] max-w-full flex-[100%]" />
      </div>
    </div>
    <div class="w-full p-4">
      <div class="mb-4 border-b-[1px] border-surface-300-600-token">
        <h2
          class="mb-3 uppercase font-semibold relative inline-block before:absolute before:w-full before:bg-surface-500-400-token before:h-[1px] before:bottom-[-13px]"
        >
          Mô tả sản phẩm
        </h2>
      </div>
      <div class="description">
        {product.description}
      </div>
    </div>
  </div>
  <section
    class="fixed left-0 bottom-0 z-50 border-t-[1px] border-surface-400-500-token block md:hidden py-2 w-full bg-surface-50-900-token"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center flex-wrap">
        <div class="quantity w-2/6">
          <input
            type="button"
            value="-"
            class="bg-surface-100-800-token text-surface-900-50-token cursor-pointer text-base font-semibold w-1/3 h-[40px] float-left"
            on:click={decreaseQuantity}
          />
          <input
            type="text"
            id="quantity-bottom"
            name="quantity"
            value={quantity}
            min="1"
            on:change={handleQuantity}
            class="bg-surface-100-800-token h-[40px] w-1/3 border-none focus:ring-0 font-semibold text-center text-sm p-0 float-left"
          />
          <input
            type="button"
            value="+"
            class="bg-surface-100-800-token text-surface-900-50-token cursor-pointer text-base font-semibold w-1/3 h-[40px] float-left"
            on:click={increaseQuantity}
          />
        </div>
        <div class="w-2/3 float-left pl-2">
          <button type="button" class="btn bg-primary-400-500-token rounded w-full h-[40px]">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </section>
{/if}
