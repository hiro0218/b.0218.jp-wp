<div class="amazon-product" v-cloak v-bind:style="{ 'background-image': 'url('+ amazon_product.LargeImage.URL +')' }" v-if="amazon_product">
  <a v-bind:href="amazon_product.DetailPageURL" target="_blank">
    <div class="product-image">
      <img v-bind:src="amazon_product.LargeImage.URL" data-zoom-disabled="true">
    </div>
    <div class="product-title">
      <span class="amazon-title">{{amazon_product.ItemAttributes.Title}}</span>
    </div>
  </a>
</div>
