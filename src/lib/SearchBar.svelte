<script lang="ts">
  import { convertPriceToCurrency } from './helper';
  import type { Product } from './types';
  const staticPath = 'https://localhost:7066/static/images/';
  let search: string;
  let searchResult: Product[] = [];
  const handleSearch = async (query: string) => {
    if (query === '' || query === undefined) {
      searchResult = [];
      return;
    }
    try {
      const result = await fetch(`https://localhost:7066/api/product/search?query=${query}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());
      searchResult = result;
    } catch {
      console.error('Error when searching');
      searchResult = [];
    }
  };
  $: handleSearch(search);
</script>

<div class="search-box relative flex-1">
  <form
    action="/search"
    on:submit={() => {
      search = '';
    }}
  >
    <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
    <div class="relative">
      <input
        type="search"
        id="default-search"
        class="block w-full p-2 md:p-4 text-sm bg-surface-300-600-token rounded-none md:rounded-md border-none focus:ring-0"
        placeholder="Tìm kiếm sản phẩm..."
        required
        bind:value={search}
      />
      <button
        type="submit"
        class="text-white absolute right-1 md:right-2 bottom-1 md:bottom-2.5 variant-filled-primary font-medium rounded-lg text-sm px-4 py-2"
        ><svg
          class="w-3 md:w-4 h-3 md:h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg></button
      >
    </div>
  </form>
  {#if searchResult.length > 0}
    <div
      class="absolute top-full left-0 right-0 z-50 bg-surface-200-700-token shadow shadow-surface-400 dark:shadow-surface-600 p-4"
    >
      {#each searchResult as s}
        <div
          class="search-item p-3 border-b-surface-300 dark:border-b-surface-600 flex items-center border-b"
        >
          <div class="w-5/6 pr-1 relative mt-0 flex flex-col">
            <a href="/products/{s.id}" class="text-xs text-ellipsis whitespace-pre mt-2 mb-1"
              >{s.name}</a
            >
            <p class="text-primary-600-300-token text-xs font-medium m-0">
              {convertPriceToCurrency(s.price)}
            </p>
          </div>
          <div class="w-1/6 inline-block text-right">
            <a href="/products/2">
              <img src={s.images[0].filePath} alt="logitech" />
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
