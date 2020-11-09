<template>
  <div>
    <input v-model="email" type="text" placeholder="email"/>
    <input v-model="password" type="password" placeholder="password"/>
    <p>{{ msg }}</p>
    <button v-on:click="pwdLogin">Login</button>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'LoginPassword',
    data () {
      return {
        email: '',
        password: '',
        msg: '',
        value11: '',
        value12: '',
        value13: '',
        select1: 'http',
        select2: 'com',
        select3: 'day'
      }
    },
    methods: {
      pwdLogin: function () {
        this.msg = ''
        let data = {
          // "idd": "f6588b4d3a274d599c8696e3a2e89579",
          // "name":"水"
          email: this.email,
          password: this.password
        }
        this.$axios.post('/user/loginPwd', qs.stringify(data))
          .then((response) => {
            console.log(response)
            if (response.data.status === 0) {
              // alert(response.data.data.token)
              this.$store.commit('ADD_COUNT', response.data.data.token)
              // this.$store.state.email = response.data.data.address
              console.log(response.data.data.currentUser)
              localStorage.setItem('currentUser', JSON.stringify(response.data.data.currentUser))
              // let clock = window.setInterval(() => {
              //   this.totalTime-- ;
              //   if (this.totalTime < 0) {
              //     window.clearInterval(clock) ;
              //     this.$Loading.finish();
              //     this.$router.push('/') ;
              //   }
              // },1000)
              if (response.data.data.currentUser.roleId === 0) {
                this.$router.push('/stu')
              }
              if (response.data.data.currentUser.roleId === 1) {
                this.$router.push('/tch')
              }
            } else {
              this.msg = response.data.msg
            }
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
    background: #3aa0ff;
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
