<template>
  <div id="login-form">
    <div class="content">
      <div class="tabs">
        <div v-bind:class="{tab:true,active:num==0}">注册</div>
      </div>
      <input v-model="email" type="text" placeholder="email"/>
      <input v-model="verifyCode" type="text" placeholder="verifycode"/>
      <div>
        <button v-if="show" v-on:click="verify">获取验证码</button>
        <button v-if="!show">{{ count }}s</button>
      </div>
      <input v-model="user_name" type="text" placeholder="name"/>
      <input v-model="user_id" type="text" placeholder="id"/>
      <label>密码：</label><input v-model="password" type="password"/>
      <label>重复密码</label><input v-model="re_password" type="password"/>
      <p>{{ passwordError }}</p>
      <button v-on:click="register">注册</button>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: 'RegisterForm',
    components: {
    },
    data () { // = data: function() {
      return {
        num: 0,
        email: '',
        verifyCode: '',
        password:'',
        re_password:'',
        user_name:'',
        user_id:'',
        timer: null,
        show:true,
        count:'',
        passwordError:''
      }
    },
    methods: {
      register: function () {
        this.passwordError = ''
        if (this.password !== this.re_password) {
          this.passwordError = '密码不一致'
          return
        }
        let data = {
          user_id:this.user_id,
          user_name:this.user_name,
          password: this.password,
          address: this.email,
          verifyCode: this.verifyCode
        }
        this.$axios.post('/user/registerStudent', qs.stringify(data))
          .then((response) => {
              this.$router.push('/sign_in')
          })
          .catch(function (error) {
            alert('注册失败')
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      verify: function () {
        let data = {
          address: this.email
        }
        this.$axios.post('/user/verify', qs.stringify(data))
          .then((response) => {
            console.log(response)
            this.startTimer(60)
          })
          .catch(function (error) {
            alert('发送失败')
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      startTimer: function (time) {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    }
  }
</script>

<style scoped>
  #login-form {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .content{
    width: 350px;
    margin-top:100px;
    padding:10px 10px 10px 10px;
    background: white;
  }
  .content input{
  }
  .tabs {
    text-align: left;
  }
  .active:after{
    display: block;
    position: absolute;
    bottom: 0;
    content: "";
    width: 100%;
    height: 3px;
    background-color: #be0cff;
  }
  .tab{
    position: relative;
    display: inline-block;
    color: #444;
    font-size: 16px;
    line-height: 60px;
    height: 60px;
    margin-right: 24px;
    cursor: pointer;
    text-align: left;
  }
</style>
