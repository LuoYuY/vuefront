<template>
<div id="pageLogin">
  <div class="content">
     <login-form></login-form>
     <copy-right></copy-right>
  </div>
</div>
</template>

<script>
  import LoginForm from '../components/LoginForm'
  export default {
    name: 'PageLogin',
    components:{
      'login-form': LoginForm
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }
  .content {
    background-image: url('../assets/background.jpg');
    background-repeat: repeat-x;
    background-position: center;
    background-size: 100% 100%;
    height: 1000px;
  }
</style>
