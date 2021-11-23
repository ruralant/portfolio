<script>
  export let company;
  const { name, from, to, position, techStack, description } = company;
</script>

<div class="flex mb-20">
  <div class="flex items-center mr-10 w-96">
    <p>{`${from} - ${to}`}</p>
  </div>
  <div>
    <div class="flex mb-5">
      <p class="mr-5"><span>{position} </span><span>@ {name}</span></p>
      <div><p>Logo</p></div>
    </div>
    <p>{description}</p>
  </div>
</div>
