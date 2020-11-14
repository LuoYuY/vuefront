<template>
  <div id="login-form">
    <div class="content">
      <div class="tabs">
        <div v-bind:class="{tab:true,active:num==0}" v-on:click="showPassword">学生登录</div>
        <div v-bind:class="{tab:true,active:num==1}" v-on:click="showPhone">教师登录</div>
      </div>
      <keep-alive>
        <component v-bind:is="component"></component>
      </keep-alive>
      <div class="socialLogin">
        没有帐号？<router-link :to="{path:'/register'}">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import loginPassword from './LoginPassword'
  import loginPhone from './LoginPhone'
  export default {
    name: 'LoginForm',
    components: {
      'form-one': loginPassword,
      'form-two': loginPhone
    },
    data () { // = data: function() {
      return {
        component: 'form-one',
        num: 0
      }
    },
    methods: {
      showPassword: function () {
        this.component = 'form-one'
        this.num = 0
      },
      showPhone: function () {
        this.component = 'form-two'
        this.num = 1
      },
      wechatLogin: function () {
      },
      qqLogin: function () {
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
    background-color: rgba(122, 106, 114, 0.95);
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
