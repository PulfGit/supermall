<template>
  <div>
    <!--    L3. 使用Swiper组件,并根据获取的数据通过循环动态分配SwiperItem的数量-->
    <Swiper>
      <SwiperItem v-for="item in banners">
        <!--        L4. 由于每个图片都是可以点击进入超级链接的,所以应该被a标签包裹-->
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  // L1. 导入轮播图组件
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    // 从父组件的获取数据
    props:{
      banners:{
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
      Swiper,        // L2. 注册轮播图组件
      SwiperItem
    },
  }
</script>

<style scoped>

</style>
