<template>
  <div>
  <banner></banner>
  <class-detail></class-detail>
  </div>
</template>

<script>
  import BannerTeacher from '../components/BannerTeacher'
  import ClassDetailTch from '../components/ClassDetailTch'
  export default {
    name: 'PageClassDetailTch',
    components: {
      'banner': BannerTeacher,
      'class-detail': ClassDetailTch
    }
  }
</script>

<style scoped>
  .ivu-card-body {
    display: none;
  }
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
