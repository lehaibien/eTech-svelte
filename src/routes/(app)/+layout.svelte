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
  const paths = $page.url.pathname
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
          <a class="anchor" href="/">Home</a>
        </li>
        {#each paths as path}
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li>{path}</li>
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
