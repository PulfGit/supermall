<template>
  <div>
    <!--    在组建上设置鼠标点击捕获事件,声明itemClick方法,并在method中进行处理-->
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>

<!--      动态绑定样式
      通过computed中的activeStyle()来决定使用哪种样式
-->
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {
        // isActive: true
      }
    },
    // props用于父组件向子组件通过标签属性传递数据
    props: {
      // 用于保存子组件的路由值/path
      path: String,
      // 用于封装活跃组件的样式,而不是一次写死,即组件可以根据外部传入的颜色进行自定义
      // 需要在使用此组件时,传入一个activeColor的属性(见MainTabBar.vue开头的标签注释)
      activeColor: {
        type: String,
        default: 'dodgerblue'
      }
    },
    computed: {
      // 判断哪个子组件被选定,
      isActive() {
        // 通过this.$route.path获取到当前活跃路由的path, 然后跟当前被点击子组件的path属性值作对比
        // 如果当前活跃路由与被点击的子组件其path属性的值一样,说明当前被点击的组件是活跃的,
        // 刚好把这个相等的值返回与返回一个isActive()返回一个true是一样的.
        return this.$route.path === this.path

        // 下面这种方式与上面的判断等效,使用indexOf函数判断当前活跃路由路径是否包含被点击的子组件path属性值
        // return this.$route.path.indexOf(this.path) !== -1
      },
      // 根据用户传入的activeColor属性决定组件活动时的颜色
      activeStyle() {
        // 如果当前组件处于活跃, 如果处于活跃将父组件传入的activeColor属性传入, 如果不是活跃状态,则不传入样式
        return this.isActive ? {color: this.activeColor} :{}
      }
    },
    methods: {
      // 从TabBarItem中获取点击事件进行处理
      itemClick() {
        // console.log('-------------')
        // 获取组件内当前活动子组件的路由,

        // 首先,在props属性里添加path,用于保存那个子组件被选中
        // 然后,在实例化子组件的标签里,此项目为MainTabBar中,为插入slot的具体实例的标签中添加path属性,并以其路由名作为值
        // 最后,每点击一次,就将通过this.$router的replace或push方法,把当前的path替换为选定组件的this.path值

        // 为避免多次点击同一个子组件进行的报错,先判断一下,当前活跃的路由与被点击的组件path值是否一样,如果一样说明是重复点击,啥都不做直接返回
        if (this.$route.path === this.path) return

        // 走到这里说明不是重复点击,用当前被点击子组件的path属性值替换获压入路由值即可
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .tab-bar-item img {
    width: 26px;
    height: 26px;
    vertical-align: middle;
    /*margin-top: 1px;*/
    margin-bottom: 1px;
  }

  /*.active {*/
  /*  color: dodgerblue;*/
  /*}*/

</style>
