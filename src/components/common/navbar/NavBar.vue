<template>
  <!--  由于多个地方都会用到这个导航栏,所以不要用id名,给class名更合适-->
  <div class="nav-bar">
    <!--    用div包裹slot插槽以方便进行布局,slot插槽内要给name属性,以方便插入组件时知道替换的是哪个插槽-->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;    /* 要有内容line-height才能被撑起来*/
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
  .left,.right {
    width: 60px;
    /*background-color: hotpink;*/
  }
  .center {
    flex: 1;
    /*background-color: deepskyblue;*/
  }

</style>
