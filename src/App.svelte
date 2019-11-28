<script lang="ts">
  import axios from "axios";
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  import SomeCompo from "./components/some-comp.svelte";
  const message = "Hello World!";
  let input1;
  let input2;

  const APIKEY_RECRUIT = process.env.APIKEY_RECRUIT;
  const APIKEY_GNAVI = process.env.APIKEY_GNAVI;
  const api_gnavi = `https://api.gnavi.co.jp/RestSearchAPI/v3/`;

  let promise;

  async function apitest() {
    const url = api_gnavi;

    const params = {
      keyid: APIKEY_GNAVI,
      freeword: "もつ鍋,モツ鍋",
      freeword_condition: 2
    };

    const options = {
      method: "get",
      url: url,
      params: params
    };
    // fetch(url, options)
    const res = await axios(options);
    const data = await res.data;
    console.log(res.status);

    if (res.status === 200) {
      console.log(data);
      return data;
    } else {
      throw new Error(data);
    }
  }

  function getGnavi() {
    promise = apitest();
  }
</script>

<!-- <input class="input" type="number" bind:value={input1} />
<input type="number" bind:value={input2} /> -->
<button class="button" on:click={getGnavi}>Bulma Button</button>

{#await promise}
  <p>...waiting</p>
{:then data}
  {#if data}
    <p>GNAVI returned</p>
    {#each data.rest as { name, address }, i}
      <p>{name}</p>
      <p>{address}</p>
    {/each}
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<!-- <div class:input1>{message}</div>
<SomeCompo {input1} {input2} /> -->
