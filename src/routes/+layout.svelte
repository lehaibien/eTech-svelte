<script lang="ts">
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import '../app.postcss';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { initializeStores } from '@skeletonlabs/skeleton';

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
    <slot />
  </div>
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">
    <Footer />
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>
