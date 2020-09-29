<template>
<div id="pageLogin">
  <banner></banner>
  <div class="content">
     <login-form></login-form>
     <copy-right></copy-right>
  </div>
</div>
</template>

<script>
  import LoginForm from './LoginForm'
  import Banner from './Banner'
  export default {
    name: 'PageLogin',
    components:{
      'login-form': LoginForm,
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
