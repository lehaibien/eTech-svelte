<script lang="ts">
  import { Avatar, FileButton } from '@skeletonlabs/skeleton';
  import { userStore } from '../../../../stores/userStore';
  import { onMount } from 'svelte';
  import type { User } from '$lib/types';

  let user: User | null = null;
  let DefaultName: any;
  let ChangeName: any;

  userStore.subscribe((u) => {
    user = u;
  });

  onMount(() => {
    DefaultName = document.getElementById('DefaultName');
    ChangeName = document.getElementById('ChangeName');
  });

  const NewName = async () => {};

  function ChangenameBtn() {
    DefaultName?.classList.add('hidden');
    ChangeName?.classList.remove('hidden');
  }

  const onChangeImage = async (e: any) => {
    const localAccessToken = localStorage.getItem('accessToken');
    if (!localAccessToken) {
      alert('Bạn chưa đăng nhập');
      return;
    }
    const formData = new FormData();
    // @ts-ignore
    formData.append('id', user.id.toString());
    formData.append('image', e.target.files[0]);
    const token = JSON.parse(localAccessToken).accessToken;
    const response = await fetch('https://localhost:7066/api/user/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if(response.ok) {
      const img = await response.json();
      userStore.update((u) => {
        u.image = img;
        return u;
      });
      alert('Cập nhật ảnh đại diện thành công');
    } else {
      alert('Cập nhật ảnh đại diện thất bại');
    }
  }
</script>

<svelte:head>
  <title>Hồ Sơ Của Tôi | eTech</title>
</svelte:head>

<div class="mx-5 flex mt-5 flex-col rounded-md bg-slate-800 px-8">
  <div class="py-5 border-b-[1px]">
    <p class="font-bold text-xl">Hồ Sơ Của Tôi</p>
    <p class="font-light">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
  </div>
  <form class="p-5 mt-5 flex">
    <div class="flex-col flex w-[65%] h-fit border-r">
      <table>
        <tbody>
          <tr>
            <td class="pb-6">Tên:</td>
            <td id="DefaultName" class="pb-6 flex">
              {#if user !== null || user !== undefined}
                <p>{user?.name}</p>
                <button
                  type="button"
                  on:click={ChangenameBtn}
                  class="underline text-primary-600-300-token ms-2">Thay đổi</button
                >
              {:else}
                <input type="text" class="input w-[80%] rounded-sm" placeholder="Loading..." />
              {/if}
            </td>
            <td id="ChangeName" class="pb-6 hidden items-center">
              <input type="text" class="input w-[70%] rounded-sm" />
              <button
                id="SaveName"
                on:click={NewName}
                class="underline text-primary-600-300-token ms-2">Lưu</button
              >
              <p class="mx-2">|</p>
              <a href="/user/profile" class="underline text-primary-600-300-token">Hủy</a>
            </td>
          </tr>
          <tr>
            <td class="pb-6">Số điện thoại:</td>
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
            <td class="pb-6">Email:</td>
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
            <td class="pb-6">Địa chỉ:</td>
            <td class="flex pb-6">
              {#if (user !== null || user !== undefined) && user?.address !== null}
                <p>{user?.address.streetAddress}, {user?.address.city}, {user?.address.province}</p>
              {:else}
                <p>Loading...</p>
              {/if}
              <a href="/" class="underline text-primary-600-300-token ms-2">Thay đổi</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col justify-start mb-5 items-center mx-auto">
      <Avatar
        src={user?.image == null ? '/images/DefauleImage_User.png' : user.image.filePath}
        width="w-32"
        rounded="rounded-full"
      />
      <FileButton
        name="files"
        class="rounded-sm"
        button="btn variant-filled rounded-md mt-5 font-semibold" on:change={onChangeImage}>Chọn ảnh</FileButton
      >
      <div>
        <p>Dung lượng file tối đa 1 MB</p>
      </div>
    </div>
  </form>
</div>
