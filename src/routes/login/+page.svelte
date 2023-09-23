<script lang="ts">
  const onFormSubmit = (value: SubmitEvent) => {
    fetch('https://localhost:7066/api/authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  let username: string;
  let password: string;
</script>

<form on:submit={onFormSubmit} class="variant-form-material p-3">
  <div>
    <label for="username">Tài khoản</label>
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Vui lòng nhập tài khoản"
      class="text-primary-900"
      bind:value={username}
    />
  </div>
  <div>
    <label for="password">Mật khẩu</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Vui lòng nhập mật khẩu"
      class="text-primary-900"
      bind:value={password}
    />
  </div>
  <button class="p-3 mt-2 btn variant-outline-primary text-white" type="submit">Đăng nhập</button>
</form>
