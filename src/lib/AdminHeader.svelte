<script lang="ts">
  import AdminSearchBar from './AdminSearchBar.svelte';
  import { page } from '$app/stores';
  let currentPage = '';
  $: currentPage = $page.url.pathname;
  // split the url into an array (don't forget to remove the first slash and admin)
  type Breadcrumb = { label: string; link: string };
  let myBreadcrumbs: Breadcrumb[] = [];
  $: myBreadcrumbs = currentPage
    .split('/')
    .slice(2)
    .filter((crumb) => {
      return crumb !== 'add' && crumb !== 'edit';
    })
    .map((crumb) => {
      // capitalize the first letter of each word in the crumb
      const capitalizedCrumb = crumb.charAt(0).toUpperCase() + crumb.slice(1);
      // join the words back together with a space
      // return the label and the link
      return { label: capitalizedCrumb, link: `/${crumb}` };
    });
  console.log(myBreadcrumbs);
</script>

<div class="grid grid-cols-4 gap-4 place-items-center w-full pt-3">
  <div class="col-span-1 w-full p-2">
    <ol class="breadcrumb">
      <li class="crumb">
        <a href="/admin">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0" /><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M22 22L2 22"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path d="M4 22V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <path
                d="M20 22V9.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </g>
          </svg>
        </a>
      </li>
      {#each myBreadcrumbs as crumb, i}
        <!-- If crumb index is less than the breadcrumb length minus 1 -->
        {#if i < myBreadcrumbs.length - 1}
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li class="crumb"><a class="anchor" href={crumb.link}>{crumb.label}</a></li>
        {:else}
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li class="crumb">{crumb.label}</li>
        {/if}
      {/each}
    </ol>
  </div>
  <div class="col-span-2 w-full">
    <AdminSearchBar />
  </div>
  <div class="col-span-1">
    <h1>Hello</h1>
  </div>
</div>
