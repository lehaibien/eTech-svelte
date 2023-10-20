<script lang="ts">
  import type { Order } from '$lib/types';
  import { Tab, TabGroup } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { format } from 'date-fns-tz';
    import { convertPriceToCurrency } from '$lib/helper';
  let tabSet: number = 0;
  let orders: Order[] = [];
  let Pending: Order[] = [];
  let Delivering: Order[] = [];
  let Delivered: Order[] = [];
  const orderStatus = ['Chưa thanh toán', 'Đang giao', 'Đã hoàn thành'];
  $: onMount(async () => {
    const localAccessToken = localStorage.getItem('accessToken');
    const token = JSON.parse(localAccessToken || '{}').accessToken;
    orders = await fetch('https://localhost:7066/api/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json());
    orders.reverse();
    orders.forEach((element) => {
      if (element.orderStatus === 0) {
        Pending.push(element);
      } else if (element.orderStatus === 1) {
        Delivering.push(element);
      } else {
        Delivered.push(element);
      }
    });
    console.log(orders);
    console.log(Pending);
    console.log(Delivering);
    console.log(Delivered);
    console.log(ConvertDateTime(orders[0].createdAt.toString(), 'Asia/Ho_Chi_Minh'));
  });
  function ConvertDateTime(dateTimeString: string, targetTimeZone: string): string {
    const date = new Date(dateTimeString);
    const formattedDate = format(date, 'HH:mm - dd/MM/yyyy', { timeZone: targetTimeZone });
    return formattedDate;
  }
</script>

<div
  class="ms-5 flex mt-5 snap-x scroll-px-4 snap-mandatory scroll-smooth overflow-x-auto w-full rounded-md"
>
  <TabGroup class="mx-auto">
    <Tab
      bind:group={tabSet}
      name="tab1"
      value={0}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span id="main" class="rounded-none px-8">Tất cả</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab2"
      value={1}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800 rounded-none"
      rounded="none"
    >
      <span class="px-8">Chưa thanh toán</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab4"
      value={2}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span class="px-8">Đang giao</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab5"
      value={3}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800 px-12"
      rounded="none"
    >
      <span class="px-7">Hoàn thành</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab6"
      value={4}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800 px-12"
      rounded="none"
    >
      <span class="px-7">Đã hủy</span>
    </Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <div class="overflow-x-auto w-[835px]">
          <div class="bg-slate-800 h-fit rounded-md p-2">
            {#if orders.length === 0}
              <div class="flex justify-center items-center flex-col my-auto h-full">
                <img src="/images/Empty_Cart.png" class="w-80" alt="" />
                <p>Chưa có đơn hàng</p>
              </div>
            {:else}
              {#each orders as order}
                <div class="p-4 bg-slate-200 my-2 rounded text-surface-900">
                  <div class="flex justify-between">
                    <p>
                      Ngày đặt hàng: <strong class="text-primary-300-600-token"
                        >{ConvertDateTime(order.createdAt.toString(), 'Asia/Ho_Chi_Minh')}</strong
                      >
                    </p>
                    {#if order.orderStatus === 0}
                      <p class="text-error-300-600-token font-semibold">
                        {orderStatus[order.orderStatus]}
                      </p>
                    {/if}
                  </div>
                  <div>
                    <div class="my-2 py-2 border-y border-slate-500">
                      {#each order.orderItems as Item}
                        <a
                          href={'/products/' + Item.product.id}
                          class="flex items-center justify-between my-2"
                        >
                          <div class="flex items-center">
                            <img src={Item.product.images[0].filePath} class="w-28 h-28 bg-white" alt="" />
                            <div class="mx-2">
                              <p class="font-bold hover:underline hover:text-secondary-600">
                                {Item.product.name}
                              </p>
                              <p class="relative w-fit font-semibold">
                                {Item.product.brand.name}<span
                                  class="absolute bottom-0 right-0 left-0 opacity-30
                            -skew-x-6 -skew-y-1 transform h-3/5 bg-warning-500"
                                />
                              </p>
                              <p class="font-semibold">x{Item.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <p class="text-primary-800 font-semibold">
                              {convertPriceToCurrency(Item.product.price * Item.quantity)}
                            </p>
                          </div>
                        </a>
                      {/each}
                    </div>
                    <div class="text-end">
                      <p>
                        Thành tiền: <strong class="text-primary-800"
                          >{order.payment.amount} đ</strong
                        >
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {:else if tabSet === 1}
        <div class="overflow-x-auto w-[835px]">
          <div class="bg-slate-800 h-fit rounded-md p-2">
            {#if Pending.length === 0}
              <div class="flex justify-center items-center flex-col my-auto h-full">
                <img src="/images/Empty_Cart.png" class="w-80" alt="" />
                <p>Chưa có đơn hàng</p>
              </div>
            {:else}
              {#each Pending as order}
                <div class="p-4 bg-slate-200 my-2 rounded text-surface-900">
                  <div class="flex justify-between">
                    <p>
                      Ngày đặt hàng: <strong class="text-primary-300-600-token"
                        >{ConvertDateTime(order.createdAt.toString(), 'Asia/Ho_Chi_Minh')}</strong
                      >
                    </p>
                    {#if order.orderStatus === 0}
                      <p class="text-error-300-600-token font-semibold">
                        {orderStatus[order.orderStatus]}
                      </p>
                    {/if}
                  </div>
                  <div>
                    <div class="my-2 py-2 border-y border-slate-500">
                      {#each order.orderItems as Item}
                        <a
                          href={'/products/' + Item.product.id}
                          class="flex items-center justify-between my-2"
                        >
                          <div class="flex items-center">
                            <img src={Item.product.images[0].filePath} class="w-28 h-28" alt="" />
                            <div class="mx-2">
                              <p class="font-bold hover:underline hover:text-secondary-600">
                                {Item.product.name}
                              </p>
                              <p class="relative w-fit font-semibold">
                                {Item.product.brand.name}<span
                                  class="absolute bottom-0 right-0 left-0 opacity-30
                            -skew-x-6 -skew-y-1 transform h-3/5 bg-warning-500"
                                />
                              </p>
                              <p class="font-semibold">x{Item.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <p class="text-primary-800 font-semibold">
                              {convertPriceToCurrency(Item.product.price * Item.quantity)}
                            </p>
                          </div>
                        </a>
                      {/each}
                    </div>
                    <div class="text-end">
                      <p>
                        Thành tiền: <strong class="text-primary-800"
                          >{order.payment.amount} đ</strong
                        >
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {:else if tabSet === 2}
        <div class="overflow-x-auto w-[835px]">
          <div class="bg-slate-800 h-fit rounded-md p-2">
            {#if Delivering.length === 0}
              <div class="flex justify-center items-center flex-col my-auto h-full">
                <img src="/images/Empty_Cart.png" class="w-80" alt="" />
                <p>Chưa có đơn hàng</p>
              </div>
            {:else}
              {#each Delivering as order}
                <div class="p-4 bg-slate-200 my-2 rounded text-surface-900">
                  <div class="flex justify-between">
                    <p>
                      Ngày đặt hàng: <strong class="text-primary-300-600-token"
                        >{ConvertDateTime(order.createdAt.toString(), 'Asia/Ho_Chi_Minh')}</strong
                      >
                    </p>
                    {#if order.orderStatus === 0}
                      <p class="text-error-300-600-token font-semibold">
                        {orderStatus[order.orderStatus]}
                      </p>
                    {/if}
                  </div>
                  <div>
                    <div class="my-2 py-2 border-y border-slate-500">
                      {#each order.orderItems as Item}
                        <a
                          href={'/products/' + Item.product.id}
                          class="flex items-center justify-between my-2"
                        >
                          <div class="flex items-center">
                            <img src={Item.product.images[0].filePath} class="w-28 h-28" alt="" />
                            <div class="mx-2">
                              <p class="font-bold hover:underline hover:text-secondary-600">
                                {Item.product.name}
                              </p>
                              <p class="relative w-fit font-semibold">
                                {Item.product.brand.name}<span
                                  class="absolute bottom-0 right-0 left-0 opacity-30
                            -skew-x-6 -skew-y-1 transform h-3/5 bg-warning-500"
                                />
                              </p>
                              <p class="font-semibold">x{Item.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <p class="text-primary-800 font-semibold">
                              {Item.product.price * Item.quantity} đ
                            </p>
                          </div>
                        </a>
                      {/each}
                    </div>
                    <div class="text-end">
                      <p>
                        Thành tiền: <strong class="text-primary-800"
                          >{order.payment.amount} đ</strong
                        >
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {:else if tabSet === 3}
        <div class="overflow-x-auto w-[835px]">
          <div class="bg-slate-800 h-fit rounded-md p-2">
            {#if Delivered.length === 0}
              <div class="flex justify-center items-center flex-col my-auto h-full">
                <img src="/images/Empty_Cart.png" class="w-80" alt="" />
                <p>Chưa có đơn hàng</p>
              </div>
            {:else}
              {#each Delivered as order}
                <div class="p-4 bg-slate-200 my-2 rounded text-surface-900">
                  <div class="flex justify-between">
                    <p>
                      Ngày đặt hàng: <strong class="text-primary-300-600-token"
                        >{ConvertDateTime(order.createdAt.toString(), 'Asia/Ho_Chi_Minh')}</strong
                      >
                    </p>
                    {#if order.orderStatus === 0}
                      <p class="text-error-300-600-token font-semibold">
                        {orderStatus[order.orderStatus]}
                      </p>
                    {/if}
                  </div>
                  <div>
                    <div class="my-2 py-2 border-y border-slate-500">
                      {#each order.orderItems as Item}
                        <a
                          href={'/products/' + Item.product.id}
                          class="flex items-center justify-between my-2"
                        >
                          <div class="flex items-center">
                            <img src={Item.product.images[0].filePath} class="w-28 h-28" alt="" />
                            <div class="mx-2">
                              <p class="font-bold hover:underline hover:text-secondary-600">
                                {Item.product.name}
                              </p>
                              <p class="relative w-fit font-semibold">
                                {Item.product.brand.name}<span
                                  class="absolute bottom-0 right-0 left-0 opacity-30
                            -skew-x-6 -skew-y-1 transform h-3/5 bg-warning-500"
                                />
                              </p>
                              <p class="font-semibold">x{Item.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <p class="text-primary-800 font-semibold">
                              {Item.product.price * Item.quantity} đ
                            </p>
                          </div>
                        </a>
                      {/each}
                    </div>
                    <div class="text-end">
                      <p>
                        Thành tiền: <strong class="text-primary-800"
                          >{order.payment.amount} đ</strong
                        >
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {:else if tabSet === 4}
        <div class="overflow-x-auto w-[835px]">
          <div class="bg-slate-800 h-fit rounded-md p-2">
            <div class="flex justify-center items-center flex-col my-auto h-full">
              <img src="/images/Empty_Cart.png" class="w-80" alt="" />
              <p>Chưa có đơn hàng</p>
            </div>
          </div>
        </div>
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
