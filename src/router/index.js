import HelloWorld from '../components/HelloWorld'
import PagePasswordForget from '../pages/PagePasswordForget'
import PageLogin from '../pages/PageLogin'
import PageRegister from '../pages/PageRegister'
import Index from '../pages/Index'
import PageStudent from '../pages/PageStudent'
import PageTeacher from '../pages/PageTeacher'
import PageCreateCourse from '../pages/PageCreateCourse'
import PageAdmin from '../pages/PageAdmin'
import startApply from '../components/StartApply'
import createApply from '../components/CreateApply'
import PageMyCourse from '../pages/PageMyCourse'
import PageOpenCourse from '../pages/PageOpenCourse'
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
  },
  {
    path: '/tch/createCourse',
    name: 'PageCreateCourse',
    component: PageCreateCourse,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/tch/openCourse',
    name: 'PageOpenCourse',
    component: PageOpenCourse,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/tch/myCourse',
    name: 'PageMyCourse',
    component: PageMyCourse,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin',
    name: 'PageAdmin',
    component: PageAdmin,
    children: [{
      path: 'createApply',
      name: 'createApply',
      component: createApply
    }, {
      path: 'startApply',
      name: 'startApply',
      // components: {
      //   default: UserProfile,
      //   helper: UserProfilePreview
      // }
      component: startApply
    }]
  }
]
