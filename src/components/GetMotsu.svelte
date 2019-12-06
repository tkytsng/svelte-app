<script>
  //@ts-check
  import axios from "axios";
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  import MotsuBox from "./MotsuBox.svelte";
  import MotsuCard from "./MotsuCard.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // const APIKEY_RECRUIT = process.env.APIKEY_RECRUIT;
  const APIKEY_GNAVI = process.env.APIKEY_GNAVI;
  const api_gnavi = `https://api.gnavi.co.jp/RestSearchAPI/v3/`;

  const promise = getMotsu();
  let innnerwidth;
  let Here = {
    latitude: 35.6096,
    longitude: 139.7283
  };

  async function getMotsu() {
    const url = api_gnavi;
    const location = await getLocation();
    console.log(location);
    Here.latitude = location ? location.latitude : 35;
    Here.longitude = location ? location.longitude : 140;

    const params = {
      keyid: APIKEY_GNAVI,
      freeword: "もつ鍋,モツ鍋",
      freeword_condition: 2,
      latitude: Here.latitude,
      longitude: Here.longitude
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

  function getDistance(here, dest) {
    const d = Math.sqrt(
      (here.longitude - dest.longitude) *
        Math.cos((here.latitude + dest.latitude) / 2) +
        Math.pow(here.latitude - dest.latitude, 2)
    );
    console.log(Math.round(6370 * d));

    return Math.round(6370 * d);
  }
</script>

<svelte:window bind:innerWidth={innnerwidth} />

{#await promise}
  <div />
{:then data}
  {#if data}
    <!-- <p>innnerwidth is {innnerwidth}</p> -->
    {#each data.rest as rest, i}
      <!-- <MotsuCard {rest} /> -->
      <MotsuBox
        {rest}
        distance={getDistance(Here, {
          latitude: Number(rest.latitude),
          longitude: Number(rest.longitude)
        })} />
    {/each}
  {/if}
{:catch}
  <p>この辺りでもつ鍋を見つけることが出来ませんでした。</p>
{/await}
