<script lang="ts">
  import { AppShell, Avatar } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { getUserInit, userStore } from '../../../stores/userStore';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import { get } from 'svelte/store';
  let user: any = null;
    userStore.subscribe((u) => {
    user = u;
    console.log(user)
  });
</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">
    <div class="inline-flex items-center mt-5 py-2 w-full bg-surface-800 rounded-md justify-around">
      <Avatar
        src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
        width="w-20"
        rounded="rounded-full"
      />
      <div>
        {#if user!== null}
          <p class="font-bold">{user.name}</p>
        {:else}
          <p class="font-bold">Loading...</p>
        {/if}
        <a href="/user/profile" class="inline-flex text-surface-600-300-token">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
            />
            <path
              d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
            />
          </svg>
          Sửa Hồ Sơ
        </a>
      </div>
    </div>
    <div class="mt-5 bg-surface-800 rounded-md">
        
      <Accordion>
        <AccordionItem>
          <svelte:fragment slot="lead">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </svelte:fragment>
          <svelte:fragment slot="summary">Tài Khoản Của Tôi</svelte:fragment>
          <svelte:fragment slot="content">
            <ul class="ms-11">
                <li>
                    <a href="">Hồ Sơ</a>
                </li>
                <li>
                    <a href="">Địa chỉ</a>
                </li>
            </ul>
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
      <a href="" class="flex px-4 py-2 hover:bg-primary-hover-token rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>          
        <p class="ms-5">Đơn mua</p>
      </a>
    </div>
  </svelte:fragment>
  <slot />
</AppShell>
