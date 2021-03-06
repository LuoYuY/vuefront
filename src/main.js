// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import './styles/init.css'
import VueRouter from 'vue-router'
import Routes from './router/index'
import Vuex from 'vuex'
import locale from 'iview/dist/locale/en-US'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iView, { locale })
const router = new VueRouter({
  routes: Routes,
  mode:'history'
})
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 30000
axios.interceptors.request.use(
  config => {
    console.log(config)
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  function (err) {
    console.log('失败信息' + err)
  }
)
Vue.prototype.$axios = axios

const ADD_COUNT = 'ADD_COUNT' // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT'
// 注册状态管理全局参数
let store = new Vuex.Store({
  state:{
    token:'',
    email:''
  },
  mutations: {
    // 写法与getters相类似
    // 组件想要对于vuex 中的数据进行的处理
    // 组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    // 内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem('token', token)
      localStorage.setItem('token', token)
      state.token = token
    },
    [REMOVE_COUNT] (state, token) { // 退出登录
      sessionStorage.removeItem('token')
      localStorage.removeItem('token')
      state.token = ''
    }
  }
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()// loadong 效果
  store.state.token = localStorage.getItem('token')// 获取本地存储的token

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.token !== '' && store.state.token !== null) { // 通过vuex state获取当前的token是否存
      next()
    } else {
      next({
        path: '/sign_in',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
