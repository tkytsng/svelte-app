<script lang="ts">
  import SomeCompo from "./components/some-comp.svelte";
  const message = "Hello World!";
  let input1;
  let input2;

  function alertTest() {
    alert(process.env.APIKEY_RECRUIT);
  }
</script>

<input class="input" type="number" bind:value={input1} />
<input type="number" bind:value={input2} />
<button class="button" on:click={alertTest}>Bulma Button</button>

<div class:input1>{message}</div>
<SomeCompo {input1} {input2} />
