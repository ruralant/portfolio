<script>
  import meImage from "$lib/assets/images/home/me-b-w.jpg?enhanced&w=400&h=400&quality=100";
  let { width, height, classes } = $props();
</script>

<enhanced:img src={meImage} alt="myself speaking in public" class={classes} />
