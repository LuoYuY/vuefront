<template>
  <div>
    <banner></banner>
    <my-course></my-course>
  </div>
</template>

<script>
  import MyCourse from '../components/MyCourse'
  import BannerTeacher from '../components/BannerTeacher'
  export default {
    name: 'PageMyCourse',
    components:{
      'my-course': MyCourse,
      'banner': BannerTeacher
    }
  }
</script>

<style scoped>

</style>
