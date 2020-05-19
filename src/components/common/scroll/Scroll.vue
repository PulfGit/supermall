<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {      // 从外部组件指定是否需要实时监听
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,     // 根据外部组件的值来决定是否需要实时监听
        pullUpLoad: this.pullUpLoad    // 根据外部组件的值来决定是否需要上拉加载
      })

      // 2. 监听滚动对象
      this.scroll.on('scroll', position => {
        // console.log(position);
        // 由于监听的内容不是在本组件内调用,是所以需要定义一个自定义事件srcollPosition,并把内容发出去
        this.$emit('scrollPosition',position)
      })

      // 3.监听上拉事件 pullingUp BScroll框架里定义的监听上拉的自定义事件,查手册
      // 由于监听的是外部组件的上拉,所以需要自定义事件pullUpLoad并把它通过$emit发到父组件
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }

    }
  }
</script>

<style scoped>

</style>
