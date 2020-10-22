<template>
  <div id="pageLogin">
    <banner></banner>
    <div class="content">
      <register-form></register-form>
    </div>
    <copy-right></copy-right>
  </div>
</template>
<script>
  import RegisterForm from '../components/RegisterForm'
  import Banner from '../components/Banner'
  export default {
    name: 'PageRegister',
    components:{
      'register-form': RegisterForm,
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
