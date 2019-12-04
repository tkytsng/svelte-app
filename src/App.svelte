<script lang="ts">
  import GetMotsu from "./components/GetMotsu.svelte";

  let promise;
  function test(event) {
    console.log(event.detail.data);
    promise = event.detail.data;
  }
</script>

<style lang="sass">
  a.shop-desc {
    color: inherit;
    text-decoration: none;
  }
</style>

<!-- <input class="input" type="number" bind:value={input1} />
<input type="number" bind:value={input2} /> -->
<!-- <button class="button" on:click={getGnavi}>Get Motsu</button> -->
<!-- <button class="button" on:click={getLocation}>getLocation Button</button> -->

<GetMotsu on:motsu={test} />

{#if promise}
  {#each promise.rest as { name, address, access, tel, url, image_url, pr, latitude, longitude }, i}
    <!-- <div class="box">
      <p>{name}</p>
      <p>{address}</p>
      <p>{tel}</p>
      <p>{url}</p>
    </div> -->

    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <!-- <img src={image_url.shop_image1} alt="Image" /> -->
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <a href={url} class="shop-desc" target="_blank">
              <p>
                <strong>{name}</strong>
                <br />
                <small>{address}</small>

              </p>
              <p>{pr.pr_short}</p>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query={name},{latitude},{longitude}"
              target="_blank">
              Google Mapで開く
            </a>
          </div>
        </div>
      </article>
    </div>
  {/each}
{/if}
