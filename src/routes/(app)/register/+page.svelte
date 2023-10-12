<script lang="ts">
  import { onMount } from 'svelte';
  import { getUserFromToken, setUser } from '../../../stores/userStore';

  const HangdleTerm = () => {
    const register = document.getElementById('Register');
    register.disabled = !register.disabled;
  };
  const HandleRegister = async (value: SubmitEvent) => {
    error = false;
    passwordTooShort = false;
    nameHaveNumberAndSpecial = false;
    numberHaveTenNum = false;
    usernameHaveAlready = false;
    if (password.length < 8) {
      error = true;
      passwordTooShort = true;
    }
    if (containsSpecialCharOrNumber(name)) {
      error = true;
      nameHaveNumberAndSpecial = true;
    }
    if (!isValidString(phoneNumber)) {
      error = true;
      numberHaveTenNum = true;
      return;
    }
    const register = await fetch('https://localhost:7066/api/authenticate/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, name, phoneNumber })
    }).then((res) => res.json());
    if (register.message === 'User already exists!') {
      error = true;
      usernameHaveAlready = true;
    }
    if (register.status == 'Success') {
      const token = await fetch('https://localhost:7066/api/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      }).then((res) => res.json());
      localStorage.setItem('accessToken', JSON.stringify(token));
      const user = await getUserFromToken(token);
      setUser(user);
      window.location.href = '/';
    }
  };
  function containsSpecialCharOrNumber(str: string) {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g;
    return regex.test(str);
  }
  function isValidString(str: string) {
    const regex = /^[0-9]{10}$/;
    return regex.test(str);
  }
  onMount(() => {
    screenSize = window.innerWidth;
    window.addEventListener('resize', () => {
      screenSize = window.innerWidth;
    });
  });
  let username: string;
  let email: string;
  let password: string;
  let name: string;
  let phoneNumber: string;
  let error: boolean;
  let passwordTooShort: boolean;
  let usernameHaveAlready: boolean;
  let nameHaveNumberAndSpecial: boolean;
  let numberHaveTenNum: boolean;
  let screenSize: number;
</script>

<div
  class="card p-6 space-y-6 shadow-xl m-auto flex w-[90%] max-w-5xl items-center justify-center my-10"
>
  {#if screenSize > 520}
    <div class="flex justify-center w-[50%]">
      <img src="/images/logo-ptud.png" class="max-h-60 h-fit" alt="" />
    </div>
  {/if}
  <div class="">
    <p class="font-bold text-3xl text-primary-600-300-token">Đăng ký</p>
    <p class="text-primary-600-300-token my-3">
      Nó hoàn toàn miễn phí và chỉ mất vài phút để thực hiện
    </p>
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
          Đăng ký <strong>Không thành công</strong>.
        </span>
        {#if passwordTooShort == true}
          <p class="ml-7"><strong>Mật khẩu</strong> quá ngắn</p>
        {/if}
        {#if usernameHaveAlready}
          <p class="ml-7"><strong>Tên tài khoản</strong> đã tồn tại</p>
        {/if}
        {#if nameHaveNumberAndSpecial == true}
          <p class="ml-7"><strong>Họ và tên</strong> không được chứa chữ số hoặc ký tự đặc biệt</p>
        {/if}
        {#if numberHaveTenNum == true}
          <p class="ml-7"><strong>Số điện thoại</strong> phải chứa 10 chữ só</p>
        {/if}
      </div>
    {/if}
    <form on:submit={HandleRegister}>
      <div class="flex justify-between">
        <input
          bind:value={username}
          type="text"
          placeholder="Tên tài khoản"
          class="input rounded-md my-2 w-[49%]"
        />
        <input
          bind:value={email}
          type="email"
          placeholder="Địa chỉ Email"
          class="input rounded-md my-2 w-[49%]"
        />
      </div>
      <input
        bind:value={password}
        type="password"
        placeholder="Mật khẩu"
        class="input rounded-md my-2"
      />
      <input bind:value={name} type="text" placeholder="Họ và Tên" class="input rounded-md my-2" />
      <input
        bind:value={phoneNumber}
        type="text"
        placeholder="Số điện thoại"
        class="input rounded-md my-2"
      />
      <div class="flex items-center py-2">
        <p>
          <input id="Term" on:change={HangdleTerm} type="checkbox" /> Tôi đồng ý với các
          <a href="" class="text-primary-600-300-token">Điều khoản</a>
          & <a href="" class="text-primary-600-300-token">Chính sách bảo mật</a>
        </p>
      </div>
      <div class="flex justify-end">
        <button
          id="Register"
          type="submit"
          class="btn text-white gap-2 bg-primary-500-400-token"
          disabled>Đăng ký</button
        >
      </div>
    </form>
  </div>
</div>
