<template>
<div>
  <banner></banner>
  <create-course></create-course>
</div>
</template>

<script>
  import CreateCourse from '../components/CreateCourse'
  import BannerTeacher from '../components/BannerTeacher'
  export default {
    name: 'PageCreateCourse',
    components:{
      'create-course': CreateCourse,
      'banner': BannerTeacher
    }
  }
</script>

<style scoped>

</style>
