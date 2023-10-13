<script lang="ts">
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";

    let tabSet: number = 0;
</script>

<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
    <TabGroup class="bg-surface-800 rounded-md mt-5 ms-5 w-[800px]" justify="justify-between"
active="variant-filled-primary"
hover="hover:variant-soft-primary"
flex="flex-1 lg:flex-none"
rounded=""
border="">
	<Tab bind:group={tabSet} name="tab1" value={0}>
		<span class="text-base">Tất cả</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>
        <span>Chờ thanh toán</span>
    </Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>
        <span>Vận chuyển</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab4" value={3}>
        <span>Đang giao</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab5" value={4}>
        <span>Hoàn thành</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab6" value={5}>
        <span>Đã hủy</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab7" value={6}>
        <span>Trả hàng/Hoàn tiền</span>
    </Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<p class="snap-start">(tab panel 1 contents)</p>
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
