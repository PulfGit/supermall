<template>
  <div>
    <tab-bar id="tab-bar">
<!--  TabBarItem组件包含另个属性,他们在TabBarItem.vue中的props中被定义
      path: 用于保存路径当前组件的路由路径path
      activeColor: 用于获取用户自定义的激活组件时的颜色,如果不传入此属性,则用TabBarItem的props中activeColor属性的默认值
-->
      <tab-bar-item path="/home" activeColor="blue">
        <img slot="item-icon" src="~components/common/tabbar/img/Moneymanagement1.png" alt="">
        <img slot="item-icon-active" src="~components/common/tabbar/img/Moneymanagement.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
        <img slot="item-icon" src="~components/common/tabbar/img/salescenter1.png" alt="">
        <img slot="item-icon-active" src="~components/common/tabbar/img/salescenter.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="green">
        <img slot="item-icon" src="~components/common/tabbar/img/searchcart1.png" alt="">
        <img slot="item-icon-active" src="~components/common/tabbar/img/searchcart.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" >
        <img slot="item-icon" src="~components/common/tabbar/img/usercenter1.png" alt="">
        <img slot="item-icon-active" src="~components/common/tabbar/img/usercenter.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from '../../common/tabbar/TabBar'
  import TabBarItem from "../../common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
