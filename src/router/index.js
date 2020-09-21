import Vue from 'vue'
import Router from 'vue-router'
import Banner from '../components/Banner'
import HelloWorld from '../components/HelloWorld'
import PagePasswordForget from '../components/PagePasswordForget'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/index',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/account/password_reset',
      name: 'PagePasswordForget',
      component: PagePasswordForget
    }
  ]
})
