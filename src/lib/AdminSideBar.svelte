<script>
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { getUserInit, userStore } from '../stores/userStore';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  let currentPage = '';
  $: currentPage = $page.url.pathname;
  onMount(async () => {
    await getUserInit();
    let user = get(userStore);
    if (user == null) {
      goto('/login');
    }
  });
  const appRailSvgClass = 'w-3 md:w-7 h-3 md:h-7';
  const appRailTextClass = 'ml-1 md:ml-2 text-sm md:text-base';
</script>

<AppRail
  width="w-full"
  height="min-h-screen h-full"
  aspectRatio="aspect-[30/9]"
  gap="gap-2"
  active="bg-secondary-200-700-token"
  hover="bg-inherit"
  regionDefault="flex flex-col"
  regionTrail="py-2"
>
  <svelte:fragment slot="lead">
    <AppRailAnchor href="/admin" regionLabel="h-1/3 flex items-center">
      <img src="/images/logo-ptud-min.png" alt="eTech logo" class="w-2/5 mx-auto" />
    </AppRailAnchor>
  </svelte:fragment>
  <!-- --- -->
  <AppRailAnchor href="/admin/brands" selected={currentPage == '/admin/brands'}>
    <svelte:fragment slot="lead">
      <svg class={appRailSvgClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.39113 10.5439C6.39051 9.44976 6.7016 8.37924 7.28617 7.46394C7.86503 6.55596 8.69417 5.84514 9.6681 5.42194C10.9668 4.85935 12.4322 4.85935 13.7309 5.42194C14.7052 5.84498 15.5347 6.55581 16.1138 7.46394C17.3021 9.32579 17.309 11.731 16.1314 13.5999L18.525 17.9719L16.0037 17.4719L15.1973 19.9999L12.9753 15.9249C12.1382 16.1414 11.2618 16.1414 10.4247 15.9249L8.20267 19.9999L7.39635 17.4709L4.875 17.9719L7.26863 13.5999C6.69465 12.6895 6.38988 11.6281 6.39113 10.5439V10.5439Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4504 8.32691C11.4973 8.22925 11.5943 8.16742 11.7005 8.16742C11.8066 8.16742 11.9036 8.22925 11.9506 8.32691L12.4683 9.37291C12.5069 9.45209 12.5788 9.50881 12.6633 9.52691L13.7475 9.74991C13.8468 9.77396 13.9266 9.84932 13.9583 9.94877C13.99 10.0482 13.9688 10.1574 13.9025 10.2369L13.1284 11.1369C13.0738 11.2009 13.0483 11.2856 13.0582 11.3699L13.2015 12.5879C13.216 12.6944 13.1719 12.8004 13.0868 12.8633C13.0018 12.9262 12.8898 12.9357 12.7959 12.8879L11.8209 12.3799C11.7419 12.3384 11.6483 12.3384 11.5693 12.3799L10.5943 12.8879C10.5004 12.9357 10.3884 12.9262 10.3034 12.8633C10.2183 12.8004 10.1742 12.6944 10.1887 12.5879L10.3321 11.3729C10.3419 11.2886 10.3164 11.2039 10.2619 11.1399L9.4877 10.2399C9.41982 10.159 9.39893 10.0473 9.43286 9.94637C9.46679 9.84548 9.55041 9.77067 9.65248 9.74991L10.7367 9.52591C10.8212 9.50781 10.893 9.45109 10.9317 9.37191L11.4504 8.32691Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.90164 13.1977C7.6795 12.8481 7.21601 12.7448 6.8664 12.9669C6.51679 13.189 6.41345 13.6525 6.63559 14.0021L7.90164 13.1977ZM7.95112 14.4679L8.49338 13.9498L8.49105 13.9474L7.95112 14.4679ZM10.1224 15.8399L10.3567 15.1274L10.3557 15.1271L10.1224 15.8399ZM10.2422 16.6561C10.6433 16.7596 11.0523 16.5184 11.1558 16.1173C11.2593 15.7162 11.018 15.3072 10.6169 15.2037L10.2422 16.6561ZM16.7644 14.0021C16.9865 13.6525 16.8832 13.189 16.5336 12.9669C16.184 12.7448 15.7205 12.8481 15.4983 13.1977L16.7644 14.0021ZM15.4489 14.4679L14.9089 13.9474L14.9066 13.9498L15.4489 14.4679ZM13.2775 15.8399L13.0443 15.1271L13.0433 15.1274L13.2775 15.8399ZM12.783 15.2037C12.382 15.3072 12.1407 15.7162 12.2442 16.1173C12.3477 16.5184 12.7567 16.7596 13.1578 16.6561L12.783 15.2037ZM6.63559 14.0021C6.86081 14.3566 7.12062 14.6871 7.41118 14.9885L8.49105 13.9474C8.27068 13.7188 8.07317 13.4676 7.90164 13.1977L6.63559 14.0021ZM7.40886 14.986C8.0972 15.7064 8.94842 16.2449 9.88921 16.5527L10.3557 15.1271C9.65246 14.897 9.01285 14.4935 8.49337 13.9498L7.40886 14.986ZM9.88822 16.5524C10.0051 16.5908 10.1231 16.6254 10.2422 16.6561L10.6169 15.2037C10.5294 15.1811 10.4426 15.1557 10.3567 15.1274L9.88822 16.5524ZM15.4983 13.1977C15.3268 13.4676 15.1293 13.7188 14.9089 13.9474L15.9888 14.9885C16.2794 14.6871 16.5392 14.3566 16.7644 14.0021L15.4983 13.1977ZM14.9066 13.9498C14.3871 14.4935 13.7475 14.897 13.0443 15.1271L13.5108 16.5527C14.4516 16.2449 15.3028 15.7064 15.9911 14.986L14.9066 13.9498ZM13.0433 15.1274C12.9574 15.1557 12.8706 15.1811 12.783 15.2037L13.1578 16.6561C13.2769 16.6254 13.3949 16.5908 13.5118 16.5524L13.0433 15.1274Z"
            fill="currentColor"
          />
        </g>
      </svg>
      <span class={appRailTextClass}>Hãng</span>
    </svelte:fragment>
  </AppRailAnchor>
  <AppRailAnchor href="/admin/categories" selected={currentPage == '/admin/categories'}>
    <svelte:fragment slot="lead">
      <svg class={appRailSvgClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      <span class={appRailTextClass}>Thể loại</span>
    </svelte:fragment>
  </AppRailAnchor>
  <AppRailAnchor href="/admin/products" selected={currentPage == '/admin/products'}>
    <svelte:fragment slot="lead">
      <svg class={appRailSvgClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>
      </svg>
      <span class={appRailTextClass}>Sản phẩm</span>
    </svelte:fragment>
  </AppRailAnchor>
  <AppRailAnchor href="/admin/orders" selected={currentPage == '/admin/orders'}>
    <svelte:fragment slot="lead">
      <svg
        class={appRailSvgClass}
        viewBox="0 0 1024 1024"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z" fill="" />
          <path
            d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8v47.2H205.6c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2H725.6v-47.2h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z"
            fill=""
          />
          <path
            d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z"
            fill=""
          />
        </g>
      </svg>
      <span class={appRailTextClass}>Đơn hàng</span>
    </svelte:fragment>
  </AppRailAnchor>
  <!-- --- -->
  <svelte:fragment slot="trail">
    <div class="w-full h-full flex items-center justify-center p-3">
      <h2>Developed by <span class="text-primary-600-300-token">lehaibien</span></h2>
    </div>
  </svelte:fragment>
</AppRail>
