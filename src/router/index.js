import Vue from 'vue'
import VueRouter from 'vue-router'

// 4. 对每个TabBarItem中页面组件进行懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 1. 安装插件
Vue.use(VueRouter)

// 2.1 路由对象的映射关系写成数组甩出来,每一个组件路由都是一个对象
const routes = [
  // 在没有指明访问路径的情况下,默认重定向到/home路径
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',       // 将/home路径下的访问
    component: Home    // 映射到Home组件
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },

]

// 2. 创建router实例
const router = new VueRouter({
  routes, // 添加上面的路由数组中的路由映射关系,增强写法
  mode: 'history'  // 选用history的路由方式避免hash方式生成的#
})

// 3. 导出路由实例,使其能在main.js中挂载
export default router

