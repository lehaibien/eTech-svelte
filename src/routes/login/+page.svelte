<script lang="ts">
  import { getUserFromToken, setUser } from '../../stores/userStore';
  import { redirect } from '@sveltejs/kit';
  const onFormSubmit = async (value: SubmitEvent) => {
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
    if(user != null){
      window.location.pathname = "/"
    }else{
      error = true;
    }
  };
  let username: string;
  let password: string;
  let error: boolean;
</script>
<div class="card p-6 space-y-6 shadow-xl max-w-3xl m-auto max-w-sm">
  {error && <div>
    <p>error</p>
  </div>}
  <p class="font-bold text-3xl text-primary-600-300-token">Đăng nhập</p>
	<form on:submit={onFormSubmit} class="space-y-4">
		<div class="flex flex-col">
			<input type="text" bind:value={username} placeholder="Tên tài khoản" class="input rounded-md" />
		</div>
		<div class="flex flex-col">
			<input type="password" bind:value={password} placeholder="Mật khẩu" class="input rounded-md" />
		</div>
	<div class="flex flex-col items-center">
    <button type="submit" class="btn variant-filled-primary w-full">Đăng nhập</button>
		<p class="text-sm unstyled py-2 text-slate-500">
			Bạn chưa có tài khoản? <a href="/register" class="text-primary-600-300-token">Đăng ký</a>
		</p>
	</div>
</form>
</div>
