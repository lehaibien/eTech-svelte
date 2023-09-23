<script lang="ts">
  import GridTile from '$lib/GridTile.svelte';

  export let data;
  const product = data.props.product;
  console.log(product);
</script>

<svelte:head>
  <title>{product.name} | eTech</title>
</svelte:head>

{#if product}
  <div class="flex flex-col md:flex-row">
    <div class="md:h-90 md:w-2/3">
      <GridTile
        title={product.title}
        price={product.price}
        currencyCode="đ"
        imageSrc="https://theme.hstatic.net/200000637319/1000990988/14/cate_feature_1_img.jpg?v=370"
      />
    </div>
  </div>
{/if}

<h1>Hello {product.name}</h1>
