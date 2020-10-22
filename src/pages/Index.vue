<template>
  <div id="pageLogin">
    <banner></banner>
    <div class="content">
      <div>课程列表</div>
    </div>
    <copy-right></copy-right>
  </div>
</template>

<script>
  import Banner from '../components/Banner'
  export default {
    name: 'index',
    components:{
      'banner': Banner
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }
  .content {
    background-image: url('../assets/backgroud1.jpg');
    background-repeat: repeat-x;
    background-position: center;
    background-size: 100% 100%;
    height: 1000px;
  }
</style>
