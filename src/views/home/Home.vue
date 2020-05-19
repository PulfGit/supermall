<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>


<!--    要准确的拿到当前作用域下的scroll对象,需要用ref的方式声明,js使用该实例时,用this.$refs.scroll即可-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scrollPosition="getPosition"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--    L6. 使用HomeSwiper组件 并将从Home组件中获取的banners数据通过绑定属性传递给HomeSwiper子组件-->
      <home-swiper :banners="banners"/>

      <!--    使用RecommendsView组件-->
      <recommend-view :recommands="recommands"></recommend-view>


      <!--    使用FeatureView组件-->
      <feature-view></feature-view>

      <!--    使用TabControl组件-->
      <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>


      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
      </ul>
    </scroll>

<!--    组件是不能直接被点击的,如果需要组件能被点击,必须加上native修饰-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>



  </div>
</template>
<script>
  // 1. 导入NavBar,以便在首页使用
  import NavBar from "components/common/navbar/NavBar";

  // A. 引入访问 http://123.207.32.32:8000/home/multidata 资源的getMultidata模块
  import {getMultidata, getHomeGoods} from 'network/home'   // 用default方式导出才能省略{}

  // L4. 调用对swiper进一步封装后的HomeSwiper组件
  import HomeSwiper from "./childComps/HomeSwiper";

  import RecommendView from "./childComps/RecommendView";

  import FeatureView from "./childComps/FeatureView";

  import TabControl from "components/content/tabControl/TabControl";

  import Scroll from "components/common/scroll/Scroll";

  import BackTop from "components/content/backTop/BackTop";


  export default {
    name: "Home",
    components: {
      BackTop,
      Scroll,
      TabControl,
      FeatureView,
      RecommendView,
      NavBar,        // 2. 注册NavBar组件后才可使用
      HomeSwiper     // L5. 注册HomeSwiper组件

    },
    data() {
      return {
        result: null,   // D.创建一个result变量,用于保存网络请求的结果
        banners: [],        // 对上上面的保存做分类
        recommands: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        isShowBackTop: false
      }
    },
    // B. 添加声明周期函数,在组件刚创建完成时就发送网络请求
    created() {
      // C. 请求多个数据,因为这个数据请求返回的除了轮播图的数据,还包含其它的数据
      getMultidata()    // 调用导出的模块,模块默认已经配置好了url,所以不需要配置,而且axios默认返回的就是promise
        .then(res => {
          // console.log(res)
          // this.result = res   // E. 将成功返回的结果保存到上面定义的result变量中
          this.banners = res.data.banner.list   // 对上上面的保存做分类
          this.recommands = res.data.recommend.list
        })

      // 请求商品数据
      getHomeGoods('pop', 1)
        .then(res => {
          console.log(res)
        });
    },
    methods:{
      backClick() {
        console.log('backClick');
        // this.$refs.scroll.scroll.scrollTo(0,0,500)   // 先找到scroll组件,再找到组件内的scroll实例,再调用其scrollTo方法

        this.$refs.scroll.scrollTo(0,0)   // 先找到组件,直接调用组件内部定义的scrollTo方法
      },
      getPosition(position) {
        // console.log(position)
        // if (position.y > 500) {
        //   this.isShowBackTop = true;
        // } else {
        //   this.isShowBackTop = false
        // }

        // 使用一个加法运算来判断y值是否大于500,由于y值为负值,需要取反后再减去500
        this.isShowBackTop = (-position.y) > 500
      },
      loadMore() {
        console.log('loadMore')
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f2f2f2;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*用于实现简单的tab-control的吸顶功能*/
  .tab-control {
    position: sticky;
    top: 44px;
  }

  /* 1. 使用css3的calc()方法计算视口大小*/
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/

  /* 2. 使用position方式进行进行绝对定位*/
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;

  }



</style>
