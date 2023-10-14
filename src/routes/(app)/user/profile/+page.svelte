<script lang="ts">
  import { Avatar, FileButton } from "@skeletonlabs/skeleton";
    import { userStore } from "../../../../stores/userStore";
  let user: any = null;
  let imageUser: string = null;
  let username: any = null;
  userStore.subscribe((u) => {
      user = u;
      imageUser = u?.image.filePath;
      username = u?.name;
  });
</script>
  
  <div
    class="mx-5 flex mt-5 flex-col rounded-md bg-slate-800 px-8"
  >
    <div class="py-5 border-b-[1px]">
        <p class="font-bold text-xl">Hồ Sơ Của Tôi</p>
        <p class="font-light">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    </div>
    <form class="p-5 mt-5 flex">
      <div class="flex-col flex w-[65%] h-[300px] border-r">
        <table class="">
          <tbody class="">
            <tr class="">
              <td class="pb-6">Tên đăng nhập</td>
              {#if user !== null || user !== undefined}
                <td class="pb-6">{user?.username}</td>
              {:else}
                <td class="pb-6">Loading...</td>
              {/if}
            </tr>
            <tr class="">
              <td class="pb-6">Tên</td>
              <td class="pb-6">
                {#if user !== null || user !== undefined}
                  <input bind:value={username} type="text" class="input w-[80%] rounded-sm">
                {:else}
                  <input type="text" class="input w-[80%] rounded-sm" placeholder="Loading...">
                {/if}
              </td>
            </tr>
            <tr>
              <td class="pb-6">Số điện thoại</td>
              <td class="flex pb-6">
                {#if user !== null || user !== undefined}
                  <p>{user?.phoneNumber}</p>
                {:else}
                  <p>Loading...</p>
                {/if}
                <a href="/" class="underline text-primary-600-300-token ms-2">Thay đổi</a>
              </td>
            </tr>
            <tr>
              <td class="pb-6">Email</td>
              <td class="flex pb-6">
                {#if user !== null || user !== undefined}
                  <p>{user?.email}</p>
                {:else}
                  <p>Loading...</p>
                {/if}
                <a href="/" class="underline text-primary-600-300-token ms-2">Thay đổi</a>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit" class="mt-5 px-6 py-2 variant-filled rounded-sm font-semibold hover:bg-primary-500-400-token hover:text-white">Lưu</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <div class="flex flex-col justify-start my-5 items-center mx-auto">
          <Avatar src={imageUser} width="w-32" rounded="rounded-full" />
          <FileButton name="files" class="rounded-sm" button="btn variant-filled rounded-md mt-3 font-semibold "/>
          <div>
            <p>Dung lượng file tối đa 1 MB</p>
          </div>
        </div>

    </form>
  </div>
  