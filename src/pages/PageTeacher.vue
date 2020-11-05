<template>
  <div id="pageTeacher">
    <banner-teacher></banner-teacher>
    <router-view></router-view>
  </div>
</template>

<script>
  import BannerTeacher from '../components/BannerTeacher'
  export default {
    name: 'PageTeacher',
    components:{
      'banner-teacher':BannerTeacher
    }
  }
</script>

<style scoped>

</style>
