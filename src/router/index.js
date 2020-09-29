import Banner from '../components/Banner'
import HelloWorld from '../components/HelloWorld'
import PagePasswordForget from '../components/PagePasswordForget'
import PageLogin from '../components/PageLogin'

export default [
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
  },
  {
    path: '/sign_in',
    name: 'PageLogin',
    component: PageLogin
  }]
