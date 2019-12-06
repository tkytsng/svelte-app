<script>
  export let rest = {};
  export let distance;
</script>

<style>
  .content {
    margin-top: 1rem;
  }
</style>

<div class="box">
  <a href={rest.url} class="shop-desc" target="_blank">
    <article class="media">
      <div class="media-left">
        <figure class="image">
          <img
            src={rest.image_url.shop_image1}
            style="max-width:128px;max-height:128px;width:auto"
            alt="Image" />
        </figure>
      </div>
      <div class="media-content">
        <strong class="title is-4">{rest.name}</strong>
      </div>
    </article>
  </a>
  <div class="content">
    <p>{rest.pr.pr_short}</p>
    <a
      href="https://www.google.com/maps/search/?api=1&query={rest.name},{rest.latitude},{rest.longitude}"
      target="_blank">
      {rest.address}(Google Map)
    </a>
    <p>
      ここからおよそ{distance}メートル
      <small>(直線距離)</small>
    </p>
  </div>
</div>
