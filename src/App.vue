<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>

  </div>
</template>

<script>

  import MainTabBar from "components/content/mainTabbar/MainTabBar";  // 导入MainTabBar组件
  import router from "./router";  // 导入路由实例


  export default {
    name: 'App',
    router,           // 使用导入的路由实例
    components: {
      MainTabBar      // 注册导入的组件
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
