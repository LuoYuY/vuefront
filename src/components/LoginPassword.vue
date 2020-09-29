<template>
  <div>
    <input type="text" placeholder="username"/>
    <input type="password" placeholder="password"/>
    <div>
      <router-link to="/account/password_reset">forget password?</router-link>
    </div>
    <button v-on:click="pwdLogin">Login</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'LoginPassword',
    methods:{
      pwdLogin: function () {
        axios.post('user/getUser', {}).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #eee;
    outline: none;
    height: 40px;
    font-size: 25px;
    margin-top: 20px;
  }
  button {
    width: 100%;
    border: none;
    color: white;
    background: #be0cff;
    font-size: 20px;
    padding:5px;
    margin-top: 15px;
  }
  a{
    float: right;
    margin-top:10px;
    font-size: 15px;
  }

</style>
