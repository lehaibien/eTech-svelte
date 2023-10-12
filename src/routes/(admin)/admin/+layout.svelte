<script lang="ts">
  import AdminHeader from '$lib/AdminHeader.svelte';
  import { AppShell } from '@skeletonlabs/skeleton';
  import '../../../app.postcss';
  import AdminSideBar from '$lib/AdminSideBar.svelte';
</script>

<AppShell slotSidebarLeft="w-[14.2857143%]">
  <!-- (header) -->
  <svelte:fragment slot="sidebarLeft">
    <AdminSideBar />
  </svelte:fragment>
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <AdminHeader />
  <div class="p-6">
    <slot />
  </div>
  <!-- ---- / ---- -->
  <!-- (pageFooter) -->
  <!-- (footer) -->
</AppShell>
