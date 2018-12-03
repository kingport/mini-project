<template>
  <div class="hone-banner">
    <image class="home-banner-image" src='../../static/images.jpeg' />
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.hone-banner {
  width: 100%;
  height: 35vw;
}
.home-banner-image {
  width: 100%;
  height: 100%;
}
</style>
