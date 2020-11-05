import HelloWorld from '../components/HelloWorld'
import PagePasswordForget from '../pages/PagePasswordForget'
import PageLogin from '../pages/PageLogin'
import PageRegister from '../pages/PageRegister'
import Index from '../pages/Index'
import PageStudent from '../pages/PageStudent'
import PageTeacher from '../pages/PageTeacher'
import PageAdmin from '../pages/PageAdmin'
import startApply from '../components/StartApply'
import createApply from '../components/CreateApply'
import SelectClass from '../components/SelectClass'
import AllClass from '../components/AllClass'
import CreateCourse from '../components/CreateCourse'
import OpenCourse from '../components/OpenCourse'
import MyCourse from '../components/MyCourse'
import PageClassDetailTch from '../pages/PageClassDetailTch'
import CreateTask from '../components/CreateTask'
import TaskDetailTch from '../components/TaskDetailTch'
import PageTaskDetailStu from '../pages/PageTaskDetailStu'

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
    },
    children: [{
      path: 'selectClass',
      name: 'selectClass',
      component: SelectClass
    }, {
      path: 'AllClass',
      name: 'AllClass',
      component: AllClass
    }]
  },
  {
    path: '/stu/taskDetailStu',
    name: 'taskDetailStu',
    component: PageTaskDetailStu,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/tch/detail',
    name: 'PageClassDetailTch',
    component: PageClassDetailTch,
    meta: {
      requireAuth: true
    },
    children: [{
       path: 'createTask',
       name: 'createTask',
       component: CreateTask
    }, {
       path: 'taskDetail',
       name: 'taskDetailTch',
       component: TaskDetailTch
      }
    ]
  },
  {
    path: '/tch',
    name: 'PageTeacher',
    component: PageTeacher,
    meta: {
      requireAuth: true
    },
    children:[{
      path: 'createCourse',
      name: 'createCourse',
      component: CreateCourse
    }, {
      path: 'openCourse',
      name: 'openCourse',
      component: OpenCourse,
      meta: {
        requireAuth: true
      }
    }, {
      path: 'myCourse',
      name: 'myCourse',
      component: MyCourse,
      meta: {
        requireAuth: true
      }
    }]
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
      component: startApply
    }]
  }
]
