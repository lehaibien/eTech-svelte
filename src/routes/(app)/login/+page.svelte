<script lang="ts">
  import { getUserFromToken, setUser } from '../../../stores/userStore';
  import { onMount } from 'svelte';
  const onFormSubmit = async (value: SubmitEvent) => {
    const token = await fetch('https://localhost:7066/api/authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then((res) => res.json());
    if (token.accessToken == undefined) {
      error = true;
      const Username = document.querySelector('#username');
      Username.value = '';
      const Password = document.querySelector('#password');
      Password.value = '';
    } else {
      window.location.href = '/';
    }
    localStorage.setItem('accessToken', JSON.stringify(token));
    const user = await getUserFromToken(token);
    setUser(user);
  };
  onMount(() => {
    screenSize = window.innerWidth;
    window.addEventListener('resize', () => {
      screenSize = window.innerWidth;
    });
  });
  let username: string;
  let password: string;
  let error: boolean;
  let screenSize: number;
</script>

<div
  class="card p-6 space-y-6 shadow-xl max-w-[700px] w-[80%] m-auto my-10 flex items-center justify-center"
>
  {#if screenSize > 520}
    <div class="w-[50%] flex justify-center">
      <img src="/images/logo-ptud.png" class="max-h-60 h-fit" alt="" />
    </div>
  {/if}
  <div>
    <p class="font-bold text-3xl text-primary-600-300-token py-5">Đăng nhập</p>
    {#if error == true}
      <div class="bg-white text-error-400-500-token border-2 border-error-500 p-2 font-medium">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 inline"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          Đăng nhập <strong>Không thành công</strong>. Bạn vui lòng thử lại hoặc đổi cách khác nhá!
        </span>
      </div>
    {/if}
    <form on:submit={onFormSubmit} class="space-y-4">
      <div class="flex items-center border-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <input
          type="text"
          bind:value={username}
          placeholder="Tên tài khoản"
          class="input rounded-none border-2"
          id="username"
        />
      </div>
      <div class="flex border-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>
        <input
          type="password"
          bind:value={password}
          placeholder="Mật khẩu"
          class="input rounded-none border-2"
          id="password"
        />
      </div>
      <div class="flex flex-col items-center">
        <button type="submit" class="btn variant-filled-primary w-full my-3">Đăng nhập</button>
        <p class="text-sm unstyled py-2 text-slate-500">
          Bạn chưa có tài khoản? <a href="/register" class="text-primary-600-300-token">Đăng ký</a>
        </p>
      </div>
    </form>
  </div>
</div>
