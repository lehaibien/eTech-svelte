<script lang="ts">
  import { page } from '$app/stores';
  let category: string;
  category = $page.params.id;
</script>

<h1>Hello {category}</h1>
