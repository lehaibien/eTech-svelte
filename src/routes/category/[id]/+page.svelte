<script lang="ts">
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  let category: number;
  if (!parseInt($page.params.id)) {
    throw error(404, 'Not found!');
  }
  category = parseInt($page.params.id);
</script>

<h1>Hello {category}</h1>
