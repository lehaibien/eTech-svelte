<script lang="ts">
  const HangdleTerm = () => {
    const register = document.getElementById("Register")
    register.disabled = !register.disabled;
  }
  </script>
  <div class="card p-6 space-y-6 shadow-xl m-auto flex w-[90%] max-w-5xl items-center justify-center">
      <div class="w-[50%] flex justify-center">
        <img src="/images/logo-ptud.png" class="max-h-60 h-fit" alt="">
      </div>
      <div class="w-[50%]">
        <p class="font-bold text-3xl text-primary-600-300-token">Đăng ký</p>
        <p class="text-primary-600-300-token my-3">Nó hoàn toàn miễn phí và chỉ mất vài phút để thực hiện</p>
        <form action="">
            <div class="flex justify-between">
                <input type="text" placeholder="Tên tài khoản" class="input rounded-md my-2 w-[49%]" />
                <input type="email" placeholder="Địa chỉ Email" class="input rounded-md my-2 w-[49%]" />
            </div>
            <input type="password" placeholder="Mật khẩu" class="input rounded-md my-2" />
            <input type="text" placeholder="Họ và Tên" class="input rounded-md my-2" />
            <input type="number" placeholder="Số điện thoại" class="input rounded-md my-2" />
            <div class="flex items-center py-2">
                <p><input id="Term" on:change={HangdleTerm} type="checkbox"> Tôi đồng ý với các <a href="" class="text-primary-600-300-token">Điều khoản</a> & <a href="" class="text-primary-600-300-token">Chính sách bảo mật</a></p>
            </div>
            <div class="flex justify-end">
              <button id="Register" class="btn text-white gap-2 bg-primary-500-400-token" disabled>Đăng ký</button>
            </div>
        </form>
      </div>
  </div>
  