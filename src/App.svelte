<script lang="ts">
  import SomeCompo from "./components/some-comp.svelte";
  const message = "Heldloo World!";
  let input1;
  let input2;
</script>

<input type="number" bind:value={input1} />
<input type="number" bind:value={input2} />

<div class:input1>{message}</div>
<SomeCompo {input1} {input2} />
