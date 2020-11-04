<template>
<div id="pageStudent">
  <banner-student></banner-student>
  <router-view></router-view>
</div>
</template>

<script>
  import BannerStudent from '../components/BannerStudent'
  export default {
    name: 'PageStudent',
    components:{
      'banner-student':BannerStudent
    }
  }
</script>

<style scoped>

</style>
