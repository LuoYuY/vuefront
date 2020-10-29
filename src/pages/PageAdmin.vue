<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <Menu-Item name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </Menu-Item>
            <Menu-Item name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </Menu-Item>
            <Menu-Item name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </Menu-Item>
            <Menu-Item name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </Menu-Item>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                课程管理
              </template>
              <Menu-Item name="1-1">
                <router-link to="/admin/createApply">开课申请</router-link>
              </Menu-Item>
              <Menu-Item name="1-2">
                <router-link to="/admin/startApply">发布申请</router-link>
              </Menu-Item>
              <Menu-Item name="1-3">Option 3</Menu-Item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <Menu-Item name="2-1">Option 1</Menu-Item>
              <Menu-Item name="2-2">Option 2</Menu-Item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <Menu-Item name="3-1">Option 1</Menu-Item>
              <Menu-Item name="3-2">Option 2</Menu-Item>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <i-content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </i-content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
