<template>
  <div>
    <banner></banner>
    <open-course></open-course>
  </div>
</template>

<script>
  import MyCourse from '../components/OpenCourse'
  import BannerTeacher from '../components/BannerTeacher'
  export default {
    name: 'PageOpenCourse',
    components:{
      'open-course': MyCourse,
      'banner': BannerTeacher
    }
  }
</script>

<style scoped>

</style>
