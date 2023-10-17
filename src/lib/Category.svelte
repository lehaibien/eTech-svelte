<script lang="ts">
  import { onMount } from 'svelte';
  import type { Category } from './types';

  let isDropDownOpen = false;

  const handleDropdownClick = () => {
    isDropDownOpen = !isDropDownOpen;
  };

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: any) => {
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
    isDropDownOpen = false;
  };
  let categories: Category[] = [];
  onMount(async () => {
    categories = await fetch('https://localhost:7066/api/category').then((res) => res.json());
  });
</script>

<div class="container mx-auto flex items-center h-full">
  <div class="dropdown relative inline-block" on:focusout={handleDropdownFocusLoss}>
    <button
      class="btn rounded-sm variant-ringed-surface"
      on:click={handleDropdownClick}
    >
      <svg
        class="fill-current mr-1 w-5 lg:w-6 h-5 lg:h-6"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 60.123 60.123"
        style="enable-background:new 0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"
            />
            <path
              d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3   C60.124,31.719,58.781,33.062,57.124,33.062z"
            />
            <path
              d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"
            />
            <circle cx="4.029" cy="11.463" r="4.029" /><circle cx="4.029" cy="30.062" r="4.029" />
            <circle cx="4.029" cy="48.661" r="4.029" />
          </g>
        </g>
      </svg>
      <span class="hidden md:inline uppercase text-sm lg:text-base">Danh mục sản phẩm</span>
    </button>
    <div
      class="category-dropdown absolute w-screen md:w-full bg-surface-100-800-token rounded-b top-14 md:top-12"
      style:visibility={isDropDownOpen ? 'visible' : 'hidden'}
    >
      {#each categories as cat}
        <a
          class="btn w-full p-3 border-b-2 border-surface-200-700-token rounded-none hover:bg-surface-100-800-token"
          href="/categories/{cat.id}">{cat.name}</a
        >
      {/each}
    </div>
  </div>
  <div class="ml-3 items-center p-3 hidden md:flex whitespace-nowrap text-xs md:text-sm">
    <div class="inline-flex items-center gap-1">
      <img
        class="w-6 h-6 invert-0 dark:invert"
        src="//theme.hstatic.net/200000637319/1000990988/14/header_03_policy_1_ico.png?v=367"
        alt=""
      />
      <span>Đảm bảo chất lượng</span>
    </div>
    <div class="ml-3 inline-flex items-center gap-1">
      <img
        class="w-6 h-6 invert-0 dark:invert"
        src="//theme.hstatic.net/200000637319/1000990988/14/header_03_policy_2_ico.png?v=367"
        alt=""
      />
      <span>Hỗ trợ trả góp</span>
    </div>
    <div class="ml-3 inline-flex items-center gap-1">
      <img
        class="w-6 h-6 invert-0 dark:invert"
        src="//theme.hstatic.net/200000637319/1000990988/14/header_03_policy_3_ico.png?v=367"
        alt=""
      />
      <span>Miễn phí vận chuyển nội thành Đồng Nai</span>
    </div>
  </div>
</div>
