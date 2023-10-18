<script lang="ts">
    import type { Category, Product } from '$lib/types';   
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { addToCart } from '../../../../stores/cartStore';
    let categories: Category[] = [];
    let productes: Product[] = [];
    let product: Product | null = null;
    $: onMount(async () => {
        categories = await fetch('https://localhost:7066/api/category', {
        method: 'GET'
        }).then((res) => res.json());
        productes = await fetch('https://localhost:7066/api/product', {
        method: 'GET'
        }).then((res) => res.json());
        console.log(categories)
        console.log(productes)
    });
    const addProductToCart = (item: Product) => {
        addToCart(item, 1);
    };
</script>

<div class="flex mt-5 justify-evenly">
    <div class="w-[20%] max-w-[200px] h-fit bg-slate-50 rounded-lg">
        <Accordion>
            <AccordionItem open hover="text-secondary-800 text-lg bg-slate-50 border-b-2">
                <svelte:fragment slot="lead">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>                                          
                </svelte:fragment>
                <svelte:fragment slot="summary">
                    <p class="font-bold">Thể loại</p>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="flex flex-col">
                        {#each categories as cate}
                            <a class="my-1 text-secondary-800 font-medium text-base" href={"/categories/" + cate.id}>{cate.name}</a>
                        {/each}
                    </div>
                </svelte:fragment>
            </AccordionItem>
        </Accordion>
    </div>
    <div class="w-[70%]">
        <img src="/images/Category.jpeg" class="w-full" alt="">
        <div class="flex items-center my-2">
            <p class="font-bold text-lg">Tất cả sản phẩm</p>
            <p class="text-xs ms-2"><strong>{productes.length}</strong> sản phẩm</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {#each productes as product}
                <div class="card max-w-[250px] flex flex-col justify-between">
                    <div>
                        <header class="card-header">
                            <img src={product.images[0].filePath} class="w-[250px] h-[250px]" alt="">
                        </header>
                        <section class="p-4">
                            <p class="text-slate-400">{product.brand.name}</p>
                            <a class="break-words" href={"/products/"+product.id}>{product.name}</a>
                            <p class="text-error-600-300-token font-semibold">{product.price} đ</p>
                        </section>
                    </div>
                    <footer class="card-footer">
                        <button on:click={addProductToCart(product)} class="flex items-center rounded-lg hover:bg-tertiary-700 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 p-1 rounded-full bg-tertiary-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <p class="font-bold">Thêm vào giỏ</p>                           
                        </button>
                    </footer>
                </div>
            {/each}
        </div>
    </div>
</div>