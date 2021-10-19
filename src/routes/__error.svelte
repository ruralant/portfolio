<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status,
        error
      }
    };
  }
</script>

<script>
  export let status;
  export let error;
</script>

<h1>Something weird happend</h1>

<h3>{status}</h3>
<h3>{error.message}</h3>
