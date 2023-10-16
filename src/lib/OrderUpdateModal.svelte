<script lang="ts">
    import { onMount } from "svelte";
    import type { Order } from "./types";

  export let parent: any;
  export let order: Order;
  onMount(() => {
    console.log(order);
  });
  </script>

<h2>HELLO</h2>