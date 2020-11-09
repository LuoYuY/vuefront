<template>
  <div id="banner">
    <Menu mode="horizontal">
      <Menu-Item name="1" @click.native="toSelectClass">
        <Icon type="ios-paper" />
        <a> 选课 </a>
<!--        <router-link to="/stu/selectClass">选课</router-link>-->
      </Menu-Item>
<!--      <Submenu name="4">-->
<!--        <template slot="title">-->
<!--          <Icon type="ios-stats" />-->
<!--          课程管理-->
<!--        </template>-->
<!--        <MenuGroup title="">-->
<!--          <Menu-Item name="3-1"><router-link to="/stu/allClass">我的课程</router-link></Menu-Item>-->
<!--          <Menu-Item name="3-2"><a href="#">BBBB</a></Menu-Item>-->
<!--          <Menu-Item name="3-3"><a href="#">AAAAA</a></Menu-Item>-->
<!--        </MenuGroup>-->
        <!--        <MenuGroup title="留存">-->
        <!--          <Menu-Item name="3-4">用户留存</Menu-Item>-->
        <!--          <Menu-Item name="3-5">流失用户</Menu-Item>-->
        <!--        </MenuGroup>-->
<!--      </Submenu>-->
      <Menu-Item name="2" @click.native="toAllClass">
        <Icon type="ios-people" />
        <a>我的课程</a>
      </Menu-Item>
      <Menu-Item name="5" style="float: right" v-if="currentUser === null">
        <Icon type="ios-people" />
        <a href="sign_in">登录</a>
      </Menu-Item>
      <Submenu name="3" style="float: right" v-if="currentUser !== null">
        <template slot="title">
          <Icon type="ios-stats" />
          <a href="#">{{ currentUser.userName }}</a>
        </template>
        <MenuGroup title="">
          <Menu-Item name="3-1"><a href="#">主页</a></Menu-Item>
          <Menu-Item name="3-2"><a href="#">信息管理</a></Menu-Item>
          <Menu-Item name="3-3"><a href="#" v-on:click="logout">退出</a></Menu-Item>
        </MenuGroup>
        <!--        <MenuGroup title="留存">-->
        <!--          <Menu-Item name="3-4">用户留存</Menu-Item>-->
        <!--          <Menu-Item name="3-5">流失用户</Menu-Item>-->
        <!--        </MenuGroup>-->
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: 'BannerStudent',
    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('currentUser'))
      }
    },
    methods: {
      logout: function () {
        this.$store.commit('REMOVE_COUNT', this.$store.state.token)
        localStorage.removeItem('currentUser')
        this.$router.push('/sign_in')
      },
      toSelectClass: function () {
        this.$router.push({path:'/stu/selectClass'})
      },
      toAllClass: function () {
        this.$router.push({path:'/stu/allClass'})
      }
    }
  }
</script>

<style scoped>
  body {
    /*margin: 0;*/
  }
  #banner {
    /* 设置宽度高度背景颜色 */
    /*height: auto; !*高度改为自动高度*!*/
    /*width: 100%;*/
    /*margin-left: 0;*/
    /*background: #3aa0ff;*/
    /*position: fixed; !*固定在顶部*!*/
    /*banner: 0; !*离顶部的距离为0*!*/
    /*margin-bottom: 5px;*/
    /*font-size: 20px;*/
  }

  #banner ul {
    /*!* 清除ul标签的默认样式 *!*/
    /*width: auto; !*宽度也改为自动*!*/
    /*list-style-type: none;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*margin-left: 5%;*/
    /*!* margin-banner: 0;          *!*/
    /*padding: 0;*/

  }
  #banner li {
    /*float: left; !* 使li内容横向浮动，即横向排列  *!*/
    /*margin-right: 2%; !* 两个li之间的距离*!*/
    /*position: relative;*/
    /*overflow: hidden;*/
  }

  #banner li a {
    /*!* 设置链接内容显示的格式*!*/
    /*display: block; !* 把链接显示为块元素可使整个链接区域可点击 *!*/
    /*color: white;*/
    /*text-align: center;*/
    /*padding: 3px;*/
    /*overflow: hidden;*/
    /*text-decoration: none; !* 去除下划线 *!*/
    /*padding: 10px;*/

  }

  #banner li a:hover {
    /*!* 鼠标选中时背景变为黑色 *!*/
    /*background-color: #75c2ff;*/
  }

  #banner ul li ul {
    /*!* 设置二级菜单 *!*/
    /*margin-left: -0.2px;*/
    /*background: rgb(189, 181, 181);*/
    /*position: relative;*/
    /*display: none; !* 默认隐藏二级菜单的内容 *!*/

  }

  #banner ul li ul li {
    /*!* 二级菜单li内容的显示 *!*/
    /*float: none;*/
    /*text-align: center;*/
  }

  #banner ul li:hover ul {
    /*!* 鼠标选中二级菜单内容时 *!*/
    /*display: block;*/
  }
</style>
<style>
  .ivu-menu {
    padding-left: 10%;
    padding-right: 10%;
  }
</style>
