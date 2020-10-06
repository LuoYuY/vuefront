<template>
  <div>
    <input v-model="username" type="text" placeholder="username"/>
    <input v-model="password" type="password" placeholder="password"/>
    <div>
      <router-link to="/account/password_reset">forget password?</router-link>
    </div>
    <button v-on:click="pwdLogin">Login</button>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'LoginPassword',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      pwdLogin: function () {
        let data = {
          // "idd": "f6588b4d3a274d599c8696e3a2e89579",
          // "name":"水"
          username: this.username,
          password: this.password
        }
        this.$axios.post('/user/loginPwd', qs.stringify(data))
          .then((response) => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
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
    padding: 5px;
    margin-top: 15px;
  }

  a {
    float: right;
    margin-top: 10px;
    font-size: 15px;
  }

</style>
