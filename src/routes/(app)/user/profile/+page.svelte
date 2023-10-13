<script lang="ts">
  import { Tab, TabGroup } from '@skeletonlabs/skeleton';
  let tabSet: number = 0;
</script>
<div class="ms-5 flex rounded-md mt-5">
  <TabGroup class="bg-slate-800 mx-auto">
    <Tab bind:group={tabSet} name="tab1" value={0} class="hover:text-primary-700-200-token hover:font-bold">
      <span id="main">Tất cả</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab2" value={1} class="hover:text-primary-700-200-token hover:font-bold">
      <span>Chờ thanh toán</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab3" value={2} class="hover:text-primary-700-200-token hover:font-bold">
      <span>Vận chuyển</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab4" value={3} class="hover:text-primary-700-200-token hover:font-bold">
      <span>Đang giao</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab5" value={4} class="hover:text-primary-700-200-token hover:font-bold">
      <span>Hoàn thành</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab6" value={5} class="hover:text-primary-700-200-token hover:font-bold">
      <span>Đã hủy</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab7" value={6} class="hover:text-primary-700-200-token hover:font-bold">
      <span>Trả hàng/Hoàn tiền</span>
    </Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <p class="">(tab panel 1 contents)</p>
      {:else if tabSet === 1}
        (tab panel 2 contents)
      {:else if tabSet === 2}
        (tab panel 3 contents)
      {:else if tabSet === 3}
        (tab panel 4 contents)
      {:else if tabSet === 4}
        (tab panel 5 contents)
      {:else if tabSet === 5}
        (tab panel 6 contents)
      {:else if tabSet === 6}
        (tab panel 7 contents)
      {:else if tabSet === 7}
        (tab panel 8 contents)
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
