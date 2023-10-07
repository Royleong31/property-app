<script lang="ts">
  let count = 0;
  export let foo: string;

  function handleClick(foo) {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  clicks: {count}
</button>
<p>{foo}</p>