<script lang="ts">
  import axios from "axios";
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // const APIKEY_RECRUIT = process.env.APIKEY_RECRUIT;
  const APIKEY_GNAVI = process.env.APIKEY_GNAVI;
  const api_gnavi = `https://api.gnavi.co.jp/RestSearchAPI/v3/`;

  const promise = getMotsu();

  async function getMotsu() {
    const url = api_gnavi;
    const location = await getLocation();
    console.log(location);
    const latitude = location ? location.latitude : 0;
    const longitude = location ? location.longitude : 0;

    const params = {
      keyid: APIKEY_GNAVI,
      freeword: "もつ鍋,モツ鍋",
      freeword_condition: 2,
      latitude: latitude,
      longitude: longitude
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
      // dispatch("motsu", {
      //   data: data
      // });
    } else {
      // dispatch("motsu", {
      //   data: new Error(data)
      // });
      throw new Error(data);
    }
  }

  async function getLocation() {
    if (!navigator.geolocation) {
      console.log(`!navigator.geolocation`);
      return;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        data => {
          resolve({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude
          });
        },
        err => {
          reject(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 2000
        }
      );
    });
  }
</script>

<style lang="sass">
  a.shop-desc {
    color: inherit;
    text-decoration: none;
  }
</style>

{#await promise}
  <div />
{:then data}
  {#if data}
    {#each data.rest as { name, address, access, tel, url, image_url, pr, latitude, longitude }, i}
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img src={image_url.shop_image1} alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content is-large">
              <a href={url} class="shop-desc" target="_blank">
                <p>
                  <strong>{name}</strong>
                </p>
                <p>{pr.pr_short}</p>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query={name},{latitude},{longitude}"
                target="_blank">
                <small>{address}(Google Map)</small>
              </a>
            </div>
          </div>
        </article>
      </div>
    {/each}
  {/if}
{/await}
