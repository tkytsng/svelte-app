<script>
  export let rest = {};
</script>

<!-- 		<style>
			
</style> -->
<div class="card">
  <div class="card-content">
    <a href={rest.url} class="shop-desc" target="_blank">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img
              class="has-ratio"
              style="max-height:128px;width:auto"
              src={rest.image_url.shop_image1}
              alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{rest.name}</p>
        </div>
        <!-- <p style="float:left">{rest.pr.pr_short}</p> -->

      </div>
      <div class="content is-medium">
        <p>{rest.pr.pr_short}</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query={rest.name},{rest.latitude},{rest.longitude}"
          target="_blank">
          <small>{rest.address}(Google Map)</small>
        </a>
      </div>
    </a>
  </div>
</div>
