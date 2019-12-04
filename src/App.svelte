<script lang="ts">
  import GetMotsu from "./components/GetMotsu.svelte";

  let data;
  function test(event) {
    console.log(event.detail.data);
    data = event.detail.data;
  }
</script>

<GetMotsu />
