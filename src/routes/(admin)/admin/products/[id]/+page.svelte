<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { geturlextension } from '$lib/helper';
  import type { Category, Brand, Image } from '$lib/types';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  import { FileDropzone, Toast, getToastStore } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  let files: FileList | undefined;
  let message = '';
  const removeImage = (i: number) => {
    files = Array.from(files).filter((_, index) => index !== i);
  };
  interface AdminProduct {
    name: string;
    price: number;
    stock: number;
    description: string;
    categoryId: number;
    category: Category | null;
    brandId: number;
    brand: Brand | null;
    images: Image[];
  }
  let product: AdminProduct = {
    name: '',
    price: 0,
    stock: 0,
    description: '',
    categoryId: 0,
    category: null,
    brandId: 0,
    brand: null,
    images: []
  };
  const addCategory = async () => {
    if (files === undefined || files.length === 0) {
      message = 'Vui lòng chọn hình ảnh cho thể loại.';
      toastStore.trigger(t);
      return;
    }
    const formData = new FormData();
    formData.append('id', $page.params.id);
    formData.append('name', product.name);
    formData.append('category', product.categoryId.toString());
    formData.append('description', product.description);
    Array.from(files).forEach((image) => {
      formData.append('images', image);
    });
    const localAccessToken = localStorage.getItem('accessToken');
    if (localAccessToken === null) {
      message = 'Bạn không có quyền truy cập vào trang này.';
      toastStore.trigger(t);
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    const res = await fetch('https://localhost:7066/api/products', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (res.status === 201 || res.status === 200) {
      message = 'Cập nhật sản phẩm thành công';
      toastStore.trigger(t);
      goto('/admin/products');
    } else {
      message = 'Cập nhật sản phẩm thất bại';
      toastStore.trigger(t);
    }
  };
  let category: { id: number; name: string }[] = [];
  let brand: { id: number; name: string }[] = [];
  onMount(async () => {
    category = await fetch('https://localhost:7066/api/category').then((res) => res.json());
    brand = await fetch('https://localhost:7066/api/brand').then((res) => res.json());
  });
  onMount(async () => {
    const id = $page.params.id;
    const localAccessToken = localStorage.getItem('accessToken');
    if (localAccessToken === null) {
      alert('User is not logged in');
      return;
    }
    const token = JSON.parse(localAccessToken).accessToken;
    product = await fetch(`https://localhost:7066/api/product/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json());
    if (product !== null) {
      const blobs = await fetch(`https://localhost:7066/api/product/${id}/images`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json());
      // make blob for each json object
      let fileArray: File[] = [];
      blobs.forEach((blob: any, i: number) => {
        const file: File = new File([blob.bytes], product.images[i].originalFileName, {
          type: blob.contentType
        });
        console.log(URL.createObjectURL(file)); 
        fileArray.push(file);
      });
      /* @ts-ignore */
      files = fileArray;
    }
  });
  const toastStore = getToastStore();
  let t: ToastSettings = {
    message: '',
    background: 'variant-filled-error',
    timeout: 1500
  };
  $: t.message = message;
</script>

<svelte:head>
  <title>Cập nhật hãng | eTech</title>
</svelte:head>

<Toast position="tr" />
<div class="h-full flex flex-col">
  <h1>Cập nhật hãng</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 py-4 gap-3">
    <div class="col-span-1 p-6 border border-surface-300-600-token">
      <h3 class="mb-2">Hình ảnh</h3>
      <FileDropzone name="files" bind:files accept="image/*" multiple>
        <svelte:fragment slot="lead">
          <svg
            class="w-40 h-40 mx-auto"
            fill="currentColor"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10.5 5c-.073 0-.14.015-.207.045L.83 9.35c-.737.335-1.033 1.227-.687 1.945L6.355 24.18c.347.718 1.24 1.07 1.967.664l3.422-1.907c.588-.298.044-1.18-.486-.873L7.834 23.97c-.196.11-.467.01-.58-.224l-.414-.857 1.885-.943c.605-.304.078-1.16-.45-.894l-1.87.935L1.044 10.86c-.113-.233-.023-.498.2-.6l9.464-4.305c.485-.222.287-.955-.207-.955zm4.777-1c-.19 0-.377.035-.552.104-.35.137-.648.407-.81.775L8.122 18.15c-.32.737.02 1.61.757 1.93l13.277 5.797c.737.32 1.61-.02 1.93-.757l5.795-13.277c.32-.737-.023-1.61-.76-1.93L15.847 4.12c-.184-.08-.378-.12-.57-.12zm-.015.994c.06.002.122.016.183.043l13.278 5.795c.244.107.345.37.238.613l-4.82 11.047-14.13-6.166 4.822-11.05c.08-.182.248-.286.43-.282zM9.61 17.242l14.13 6.168-.572 1.313c-.107.244-.37.347-.613.24L9.277 19.168c-.244-.107-.347-.37-.24-.615zM7.5 16c-.22-.002-.408.133-.475.342l-1 3c-.194.583.733.967.95.316l1-3c.112-.323-.133-.656-.475-.658zm9-3c-.075 0-.156.02-.223.053l-4 2c-.596.267-.093 1.19.446.894l3.605-1.802 1.756 2.632c.14.21.413.282.64.17l3.604-1.802 1.756 2.632c.352.547 1.19-.033.832-.554l-2-3c-.14-.21-.413-.282-.64-.17l-3.604 1.802-1.756-2.632c-.094-.142-.246-.226-.416-.223zm.5-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 1c.563 0 1 .437 1 1s-.437 1-1 1-1-.437-1-1 .437-1 1-1zM6 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 1c.563 0 1 .437 1 1s-.437 1-1 1-1-.437-1-1 .437-1 1-1z"
              />
            </g>
          </svg>
        </svelte:fragment>
        <svelte:fragment slot="message">
          Kéo thả hình vào đây, hoặc
          <strong class="text-tertiary-600-300-token">Nhấn để chọn</strong>
        </svelte:fragment>
        <svelte:fragment slot="meta">Chỉ chấp nhận PNG, JPG, JPEG và GIF</svelte:fragment>
      </FileDropzone>
      <div class="image-zone w-full">
        {#if files !== undefined && files.length > 0}
          {#each files as file, i}
            <div
              class="flex justify-between items-center mt-3 border border-surface-400-500-token p-4"
            >
              <img src={URL.createObjectURL(file)} alt={file.name} class="w-1/5" />
              <button class="btn rounded-lg variant-filled-primary w-1/6" on:click={() => removeImage(i)}>
                Xóa
              </button>
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <div class="col-span-1 flex flex-col p-6 border border-surface-300-600-token">
      <div class="mb-3">
        <label for="product-name">Tên sản phẩm</label>
        <input
          name="product-name"
          type="text"
          class="w-full rounded-md bg-surface-300-600-token p-2"
          placeholder="Nhập tên sản phẩm"
          bind:value={product.name}
        />
      </div>
      <div class="mb-3">
        <label for="category">Danh mục</label>
        <select
          name="category"
          class="w-full rounded-md bg-surface-300-600-token p-2"
          bind:value={product.categoryId}
        >
          {#each category as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
      </div>
      <div class="mb-3">
        <label for="brand">Hãng</label>
        <select
          name="brand"
          class="w-full rounded-md bg-surface-300-600-token p-2"
          bind:value={product.brandId}
        >
          {#each brand as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
      </div>
      <div class="mb-3 relative">
        <label for="price">Giá</label>
        <input
          name="price"
          type="number"
          class="w-full rounded-md bg-surface-300-600-token p-2"
          bind:value={product.price}
        />
        <button class="absolute top-1/2 right-2 z-10" disabled>VNĐ</button>
      </div>
      <div class="mb-3">
        <label for="stock">Số lượng tồn kho</label>
        <input
          name="stock"
          type="number"
          class="w-full rounded-md bg-surface-300-600-token p-2"
          bind:value={product.stock}
        />
      </div>
      <div class="mb-3 flex-grow">
        <label for="description">Mô tả</label>
        <textarea
          name="description"
          class="w-full rounded-md bg-surface-300-600-token p-2 h-full resize-none"
          placeholder="Nhập mô tả cho sản phẩm"
          bind:value={product.description}
        />
      </div>
    </div>
  </div>
  <div class="self-end flex gap-2 items-center">
    <a href="/admin/products" class="btn rounded-lg variant-glass-error">Trở về</a>
    <button class="btn rounded-lg variant-filled-primary" on:click={addCategory}>
      Thêm sản phẩm mới
    </button>
  </div>
</div>
