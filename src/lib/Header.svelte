<script>
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
  import SearchBar from './SearchBar.svelte';
  import Action from './Action.svelte';
  import Category from './Category.svelte';
</script>

<header class="mb-3">
  <AppBar
    gridColumns="grid-cols-3"
    slotDefault="place-self-stretch"
    slotTrail="place-content-end"
    regionRowMain="container mx-auto"
    regionRowHeadline="bg-surface-50-900-token"
    padding="pt-4"
    background="bg-surface-200-700-token"
  >
    <svelte:fragment slot="lead">
      <div class="logo">
        <a href="/">
          <img src="/images/logo-ptud.png" alt="Playzone" class="w-5/6 md:w-1/4" />
        </a>
      </div>
    </svelte:fragment>
    <div class="items-center justify-center lg:flex h-full grow hidden">
      <SearchBar />
    </div>
    <svelte:fragment slot="trail">
      <Action />
      <LightSwitch />
    </svelte:fragment>
    <svelte:fragment slot="headline">
      <div class="flex">
        <div class="flex-1">
          <Category />
        </div>
        <div class="block md:hidden flex-[4] py-2">
          <SearchBar />
        </div>
      </div>
    </svelte:fragment>
  </AppBar>
</header>
