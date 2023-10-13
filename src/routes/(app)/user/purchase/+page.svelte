<script lang="ts">
  import { Tab, TabGroup } from '@skeletonlabs/skeleton';
  let tabSet: number = 0;
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
      <span id="main" class="rounded-none">Tất cả</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab2"
      value={1}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800 rounded-none"
      rounded="none"
    >
      <span>Chờ thanh toán</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab3"
      value={2}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span>Vận chuyển</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab4"
      value={3}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span>Đang giao</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab5"
      value={4}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span>Hoàn thành</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab6"
      value={5}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span>Đã hủy</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab7"
      value={6}
      class="hover:text-primary-700-200-token hover:font-bold bg-slate-800"
      rounded="none"
    >
      <span>Trả hàng/Hoàn tiền</span>
    </Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <div class="overflow-x-auto w-[850px]">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="rounded-s-md w-12 h-[42px] p-2 bg-gray-700 border border-gray-500 border-e-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>              
                <input class="input rounded-s-none rounded-e-md w-[785px]" type="text" placeholder="Hello" />
            </div>
            <div class="bg-slate-800 h-[600px] mt-5 rounded-md">
                <div class="flex justify-center items-center flex-col my-auto h-full">
                    <img src="/images/Empty_Cart.png" class="w-80" alt="">
                    <p>Chưa có đơn hàng</p>
                </div>
            </div>
        </div>
      {:else if tabSet === 1}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="bg-slate-800 h-[600px] rounded-md">
                    <div class="flex justify-center items-center flex-col my-auto h-full">
                        <img src="/images/Empty_Cart.png" class="w-80" alt="">
                        <p>Chưa có đơn hàng</p>
                    </div>
                </div>
            </div>
        </div>
      {:else if tabSet === 2}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="bg-slate-800 h-[600px] rounded-md">
                    <div class="flex justify-center items-center flex-col my-auto h-full">
                        <img src="/images/Empty_Cart.png" class="w-80" alt="">
                        <p>Chưa có đơn hàng</p>
                    </div>
                </div>
            </div>
        </div>
      {:else if tabSet === 3}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="bg-slate-800 h-[600px] rounded-md">
                    <div class="flex justify-center items-center flex-col my-auto h-full">
                        <img src="/images/Empty_Cart.png" class="w-80" alt="">
                        <p>Chưa có đơn hàng</p>
                    </div>
                </div>
            </div>
        </div>
      {:else if tabSet === 4}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="overflow-x-auto w-[850px]">
                    <div class="bg-slate-800 h-[600px] rounded-md">
                        <div class="flex justify-center items-center flex-col my-auto h-full">
                            <img src="/images/Empty_Cart.png" class="w-80" alt="">
                            <p>Chưa có đơn hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      {:else if tabSet === 5}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="overflow-x-auto w-[850px]">
                    <div class="bg-slate-800 h-[600px] rounded-md">
                        <div class="flex justify-center items-center flex-col my-auto h-full">
                            <img src="/images/Empty_Cart.png" class="w-80" alt="">
                            <p>Chưa có đơn hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      {:else if tabSet === 6}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="overflow-x-auto w-[850px]">
                    <div class="bg-slate-800 h-[600px] rounded-md">
                        <div class="flex justify-center items-center flex-col my-auto h-full">
                            <img src="/images/Empty_Cart.png" class="w-80" alt="">
                            <p>Chưa có đơn hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      {:else if tabSet === 7}
        <div class="overflow-x-auto w-[850px]">
            <div class="overflow-x-auto w-[850px]">
                <div class="overflow-x-auto w-[850px]">
                    <div class="bg-slate-800 h-[600px] rounded-md">
                        <div class="flex justify-center items-center flex-col my-auto h-full">
                            <img src="/images/Empty_Cart.png" class="w-80" alt="">
                            <p>Chưa có đơn hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
