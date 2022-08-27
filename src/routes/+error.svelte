<script>
  import { page } from '$app/stores';
</script>

<h1>Something weird happend</h1>

<h3>{$page.status}</h3>
<h3>{$page.error.message}</h3>
