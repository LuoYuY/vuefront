<template>

  <div id="banner">
    <div style="text-align: center;">
      <ul>
        <li><a href="#">选课</a></li>
        <li><a href="#">一级菜单</a></li>
        <li><a href="#">一级菜单</a></li>
        <li><a href="#"><b>一级菜单</b></a></li>
        <li><a href="#">一级菜单</a></li>
        <li>
          <a href="#">一级菜单</a>
          <ul>
            <li><a href="#">二级菜单</a></li>
            <li><a href="#">二级菜单</a></li>
          </ul>
        </li>
        <li style="float: right">
          <a href="sign_in">登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner'
  }
</script>

<style scoped>
  body {
    margin: 0;
  }
  #banner {
    /* 设置宽度高度背景颜色 */
    height: auto; /*高度改为自动高度*/
    width: 100%;
    margin-left: 0;
    background: #3aa0ff;
    position: fixed; /*固定在顶部*/
    banner: 0; /*离顶部的距离为0*/
    margin-bottom: 5px;
    font-size: 20px;
  }

  #banner ul {
    /* 清除ul标签的默认样式 */
    width: auto; /*宽度也改为自动*/
    list-style-type: none;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 5%;
    /* margin-banner: 0;          */
    padding: 0;

  }
  #banner li {
    float: left; /* 使li内容横向浮动，即横向排列  */
    margin-right: 2%; /* 两个li之间的距离*/
    position: relative;
    overflow: hidden;
  }

  #banner li a {
    /* 设置链接内容显示的格式*/
    display: block; /* 把链接显示为块元素可使整个链接区域可点击 */
    color: white;
    text-align: center;
    padding: 3px;
    overflow: hidden;
    text-decoration: none; /* 去除下划线 */
    padding: 10px;

  }

  #banner li a:hover {
    /* 鼠标选中时背景变为黑色 */
    background-color: #75c2ff;
  }

  #banner ul li ul {
    /* 设置二级菜单 */
    margin-left: -0.2px;
    background: rgb(189, 181, 181);
    position: relative;
    display: none; /* 默认隐藏二级菜单的内容 */

  }

  #banner ul li ul li {
    /* 二级菜单li内容的显示 */

    float: none;
    text-align: center;
  }

  #banner ul li:hover ul {
    /* 鼠标选中二级菜单内容时 */
    display: block;
  }
</style>
