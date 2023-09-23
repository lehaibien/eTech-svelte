<script lang="ts">
  import { onMount } from 'svelte';
  import type { Category } from '../app';

  let data: Category[] = [];
  onMount(async () => {
    const res = await fetch('https://localhost:7066/api/category');
    data = await res.json();
  });
</script>

<div class="banner">
  <img src="https://theme.hstatic.net/200000637319/1000990988/14/slide_3_img.jpg?v=367" alt="" />
</div>
<div class="featured-category mt-2">
  <h2 class="text-2xl font-bold uppercase">Danh mục nổi bật</h2>
  <div class="grid grid-cols-7">
    {#each data as cat}
      <a href="/category/chuot-choi-game" class="p-3 flex flex-col justify-center items-center">
        <img src={cat.image.filePath} alt="" class="max-w-[100px] max-h-[100px]" />
        <h3>{cat.name}</h3>
      </a>
    {/each}
    <div class="col-span-1">
      <a href="/category/chuot-choi-game" class="p-3 flex flex-col justify-center items-center">
        <img
          src="https://theme.hstatic.net/200000637319/1000990988/14/cate_feature_1_img.jpg?v=370"
          alt=""
          class="max-w-[100px] max-h-[100px]"
        />
        <h3>Chuột chơi game</h3>
      </a>
    </div>
    <div class="col-span-1">
      <a href="/category/chuot-choi-game" class="p-3 flex flex-col justify-center items-center">
        <img
          src="https://theme.hstatic.net/200000637319/1000990988/14/cate_feature_2_img.jpg?v=370"
          alt=""
          class="max-w-[100px] max-h-[100px]"
        />
        <h3>Bàn phím cơ</h3>
      </a>
    </div>
  </div>
</div>
