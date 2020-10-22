import HelloWorld from '../components/HelloWorld'
import PagePasswordForget from '../pages/PagePasswordForget'
import PageLogin from '../pages/PageLogin'
import PageRegister from '../pages/PageRegister'
import Index from '../pages/Index'
import PageStudent from '../pages/PageStudent'
import PageTeacher from '../pages/PageTeacher'
export default [
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // },
  {
    path: '/index',
    name: 'Index',
    component: Index
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
  },
  {
    path: '/register',
    name: 'PageRegister',
    component: PageRegister
  },
  {
    path: '/stu',
    name: 'PageStudent',
    component: PageStudent,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/tch',
    name: 'PageTeacher',
    component: PageTeacher,
    meta: {
      requireAuth: true
    }
  }
]
