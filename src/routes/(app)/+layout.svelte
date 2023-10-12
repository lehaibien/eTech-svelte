<script lang="ts">
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import '../../app.postcss';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { initializeStores } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { getUserFromToken, setUser } from '../../stores/userStore';
  import { onMount } from 'svelte';
  const pathNames: Record<string, string> = {
    categories: 'Danh mục sản phẩm',
    products: 'Sản phẩm',
    'chuot-choi-game': 'Chuột chơi game',
    'ban-phim-co': 'Bàn phím cơ'
  };
  let regex = new RegExp('^(?!$)(?![0-9]+$).*$');
  let paths: string[] = [];
  $: paths = $page.url.pathname
    .split('/')
    .filter((path) => regex.test(path))
    .map((path) => pathNames[path] || path);

  onMount(() => {
    const setUserFromLocalStorage = async (token: any) => {
      const user = await getUserFromToken(token);
      setUser(user);
    };
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken?.length > 0) {
      setUserFromLocalStorage(accessToken);
    }
  });
  initializeStores();
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <div class="container mx-auto">
    {#if $page.url.pathname !== '/'}
      <ol class="breadcrumb">
        <li class="crumb">
          <a class="anchor flex items-center no-underline justify-center text-primary-600-300-token hover:text-error-600-300-token" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
            </svg>
            <p class="font-bold ms-1">Home</p>            
          </a>
        </li>
        {#each paths as path}
          <li class="crumb-separator font-bold" aria-hidden>&rsaquo;</li>
          <li class="font-bold capitalize">{path}</li>
        {/each}
      </ol>
    {/if}

    <slot />
  </div>
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">
    <Footer />
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>
