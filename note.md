

### 一. 项目初始化

### 1. git库创建

#### 1.1 先用 vue ui 命令创建项目，进行项目初始化操作，建立一个基本的vue项目目录结构

####  1.2 在GitHub中创建远程版本库，https://github.com/PulfGit/supermall.git

#### 1.3 使用在终端中在项目目录下使用如下命令当由vue生成的git与github进行挂接：

``` 
git remote add origin https://github.com/PulfGit/supermall.git
git push -u origin master
```

####  运行第一条瞬间就完成了，运行第二条时需要输入登录GitHub中此项目的用户名和密码，运行时可能会报错，无非就是网络连接问题和需要输入GitHub用户密码的问题，多试几次即可：

```
E:\Vue\07-vueproject>git push -u origin master
fatal: HttpRequestException encountered.
   发送请求时出错。
Username for 'https://github.com': PulfGit
Password for 'https://PulfGit@github.com':
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/PulfGit/supermall.git/'

E:\Vue\07-vueproject>git push -u origin master
Enumerating objects: 17, done.
Counting objects: 100% (17/17), done.
Delta compression using up to 12 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (17/17), 78.32 KiB | 4.61 MiB/s, done.
Total 17 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/PulfGit/supermall.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

####  完成挂接后会自动push一次本地库

###  2. 目录结构划分

#### 2.1  在asset目录中添加css和img目录，分别用于存放css文件和图片资源。

####  2.2 在src目录下新建views目录，用于放单独的组件、页面和视图，与放置公共组件的components目录功能进行区别

####  2.3 在已有的components目录下新建两个目录，一个是common目录，用于可跨项目间进行复用的组件，一个是content，用于存放当前项目中与业务相关的可复用公共组件。

####  2.4 创建network目录，用于存放网络请求处理的代码

####  2.5 创建router目录，用于存放路由相关的代码

####  2.6 创建store目录，用于存放Vuex相关的代码

####  2.7 在src目录下创建common目录，在该目录下可以创建const.js文件，用于存放全局配置和公共常量和配置；创建utils.js用于存放工具和工具的方法；创建mixin.js用于存放混入代码。

###  3. 进行向Github的第一次提交

```
git add .			// 将工作区代码加载到暂存区
git commit '项目初始目录结构创建完成，进行向本地版本库的第一提交'
git push			// 向GitHub远程库push代码
```

####  4.  统一CSS样式

####  4.1. 通过第三方模板统一css样式：在css目录中放入normalize.css文件，对css标签进行统一。该文件在GitHub中进行下载，链接为：https://github.com/necolas/normalize.css ，将zip中的normalize.css文件拷贝到src/asset/css目录中即可

#### 4.2  css全局自定义样式设置： 在css目录下创建base.css文件，对项目全局样式进行统一：

####  同时还需要在base.css中引入用于统一css样式的的模板文件normalize.css，并添加自定义的样式：

```css
@import "normalize.css";


/*:root是一个伪类,等效于html
root里边用--开头的是定义的变量,这另一好的变量,后边可以var(--xxxx)的方式进行调用
*/
:root {
  --color-text: #666;
  --color-high-text: #ff5777;
  --color-tint: #ff8198;
  --color-background: #fff;
  --font-size: 14px;
  --line-height: 1.5;
}

*,
*::before,
*::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Nenu',Helvetica,'PingFang SC','Hiragino Sans GB',"Microsoft YaHei UI",'微软雅黑',Arial,sans-serif;
  user-select: none;  /*禁止用户鼠标在页面上选中文字/图片等*/
  -webkit-tap-highlight-color: transparent;   /* webkit是苹果浏览器引擎,tap点击,highlight背景高亮,color颜色,颜色用值调节*/
  background-color: var(--color-background);
  color: var(--color-text);
  /*rem vw/vh*/
  width: 100vw;
}

a {
  color: var(--color-text);
  text-decoration: none;
}

.clear-fix::after {
  clear: both;
  content: '';
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}

.clear-fix {
  zoom: 1;
}

.left {
  float: left;
}

.right {
  float: right;
}
```

####  此css文件中需要留意css中变量的声明和使用

####  然后还需要在App.vue文件中的style标签中引入base.css样式，才能起到作用

```
<style>
  @import "./assets/css/base.css";
</style>
```



### 5. webpack脚手架增强配置

#### 5.1 在项目根目录下创建vue.config.js,在这个文件中可以对脚手架的配置进行添加或调整：

- 配置路径别名

```js
module.exports={
  configureWebpack:{
    resolve:{
      // extensions:['js','vue'],  // 扩展名省略的自动识别 vue默认配置中已配置
      alias:{
        // .set('@', resolve('src')),  // 根目录配置vue默认配置中已经配置好了
        'assets':'@/assets',           // vue3以上可以直接使用@作为src的路径
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',

        // router一般只在main.js中被引用一次,而且所有文件不引用可以直接拿到$router对象所以别名意义不大
        // 'router':'@/router',   
        // store一般只在main.js中被引用一次,而且所有文件不引用可以直接拿到$store对象所以别名意义不大
        // 'store':'@/store',         
      }
    }
  }
}
```

####  5.2 创建.editorconfig文件，对于整个项目的代码风格进行约束，所有组里的协同开发者将遵循这个约束：

```js
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```



### 二.项目开发之TabBar组件复用

#### 1. 首先设计App框架，将之前学习时在components目录下编写的tabbar目录及所有文件拷贝至项目components/common目录下，进行组件的复用。由于该组件时与项目业务无关的，可以进行跨项目复用，所以放在common目录下更合适。

####  2. 同时将与业务有关的，用于整合上边两个组件的vue组件拷贝到components/content/mainTabbar目录，因为其内部包含了具体的文字，这些文字与业务是有关的，无法直接在其它项目里边用。

####  3. 将tabbar目录中的img子目录中的图片，重新安排到assets/img目录。由于这些图片文件是静态的资源，所以需要放在assets目录中，由于是图片文件，所以需要放在img中，又由于这些图片资源时属于tabbar组件的，所以在src/assets/img目录下再创建一个目录tabbar用于专门存放侧组件的图片。我觉得这样貌似并不好，如果要复用组件又要好几个目录分开去拷贝文件，这样不如把组件的资源就放在组件之内来的方便。

####  4. TabBar组件复用

####  4.1 App.vue作为程序入口，使用了MainTabBar.vue这个整合了另外两个子组件的应用组件。所以需要导入MainTabbar组件，同时在components中对组件进行注册，并在template标签中进行使用。注意，template中如果没有router-view将不会渲染效果

```JS
<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  
  import MainTabBar from "components/content/mainTabbar/MainTabBar";  // 导入MainTabBar组件
  import router from "./router";    // 导入路由实例

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
```



####  4.2 TabBar组件作为图标的容器，通过slot方式能插入任意多个子组件：

```
<template>
<div>
  <div id="tab-bar">
    <slot></slot>
  </div>
</div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>

  #tab-bar {

    display: flex;
    background-color: #f2f2f2;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -1px 2px rgba(100, 100, 100, 0.18);
  }

</style>

```



####  4.3 TabBarItem组件用作图标和按键响应，通过slot方式能插入到TabBar父组件中，该组件用到了父子组件的props传属性、活动路由判断、动态样式等技术，要细看注释文件：

```js
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
```



####	4.4  MainTabBar组件是对TabBar和TabBarItem两个组件的组合与实际业务应用。由于其中包含了具体的业务内容(根据实际业务需求，写死的子组件的数量和具体名称)，所以不适合作为通用组件。这里需要注意是父组件向子组件传数据用到的props，同时在路由中进行配置：

```js
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
```



####  5. 配置路由

####  5.1 由于MainTabBar组件的子组件用到了router，所以需要安装这个包: 

```
npm install vue-router --save
```

####  运行如上命令进项安装，该包在开发和生产环境都会被用到，所以使用--save参数

####  5.2 同时，在router目录下创建index.js用于编写路由映射关系，并懒加载路由指向的页面组件：

```js
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
```

####  路由中配置了不同路由路径path所映射的子组件，并根据需要，对子组件进行懒加载。



###   三. 开发并封装导航栏（Home页面）

####  1. 在component/common目录下创建NavBar.vue组件，该组件为通用组件，是导航栏的容器，将导航栏划分为三块空间，这三块空间均用slot的方式可由其它组件作为子组件插入。这里需要通过div包裹slot来对组件的左、中、右三个区域进行布局和样式初始设定：

```js
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
```

####  2. 在Home组件中使用NavBar组件。 需要在Home.vue中导入NavBar组件，然后在components中对该组件进行注册，同时配置NavBar组件在Home组件中需要表现的样式，并在template中进行使用：

```js
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  // 1. 导入NavBar,以便在首页使用
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Home",
    components:{
      NavBar        // 2. 注册NavBar组件后才可使用
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #f2f2f2;
  }
</style>
```



###  3. Home组件中的网络资源获取

####  由于home组件中的轮播图需要从网络获取资源，所以需要创建在network目录中创建网络模块，由于之前已经做过这块内容，所以复用这个组件即可，具体创建方式详见注释。

####  3.1 网络资源请求组件是对axios库进行的封装，所以先要安装axios库，由于该库在运行时也需要，所以需要--save的参数安装：

```
npm install axios --save
```



####  3.2 将之前封装过的request.js模块拷贝至network目录，如下：

```js
/************************************* 对axios进行封装 ***********************************/

// 1. 导入axios框架
import axios from 'axios'

// 3. axios拦截器的使用
export function request(config) {
  // a. 创建axios实例,这是必须的,都一样
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // b-.1 在发送真正的网络请求之前使用axios拦截器进行请求加工
  // 对创建的instance实例进行拦截,当然也能通过 axios.interceptors 进行全局拦截
  // 对instance实例启动request拦截,use代表使用,这个拦截有两种情况,拦截成功和拦截失败.
  // use里包含两个参数,这两个参数都是回调函数,分别针对拦截成功和失败进行回调,回调会传回参数,参数名随意
  // 这里成功我们用res,失败用err
  instance.interceptors.request.use(
    // 请求成功的回调,返回的参数就是axios的config配置的值
    config => {
      console.log(config)
      // 发送拦截处理的一些情况举例：
      // 1. 如果config中的一些配置信息,不符合服务器要求
      // 2. 每次发送网络请求时,都显示一个转圈圈的图标
      // 3. 某些网络请求(比如登录,token),必须携带一些特殊的信息

      return config   // 如果不对拿到的res进行返回,下一步将无法正常继续,因为被拦截掉了
    },
    err => {
      console.log(err)
    })

  // b-.2 响应拦截
  instance.interceptors.response.use(
    res=>{
      console.log(res);
      // 不返回会提示undefined,因为被拦截掉了返回值
      return res.data   // 由于res中包含其它属性,所以这里拦截就是对data进行返回
    },
    err => {
      console.log(err);
    }
  )

  // b. 发送真正的网络请求
  return instance(config)

}


/***************************************************************************************/
// 将axios封装为request模块的多种实现方式
// 2. 以函数的方式进行导出,能导出多个axios实例

// 2.4 直接使用axios.create()自带的返回promise的特性,不再重复用promise包裹instance,instance本身返回就是promise
// export function request(config) {
//     // 创建axios实例,这是必须的,都一样
//     // 由于instance的返回值就是promise,这个是axios框架提供的功能
//     // 所以不用再自己显示通过resolve和reject重复创建promise,直接返回即可
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     // 直接返回实例本身(自带promise),即返回的instance的类型就是一个promise
//     // 相当于把instance的promise直接由外部调用,不是下面的那样,先在模块内进行promise调用,然后外部再promise调用一次,重复了
//     return instance(config)
//
// }


// 2.3 使用promise方式通过resolve和reject把数据甩出去,替代之前success和failure
// export function request(config) {
//   // 用promise包裹需要导出的函数,则这个导出的函数就能使用promise的then或catch进行异步处理
//   return new Promise((resolve,reject) => {
//     // 创建axios实例,这是必须的,都一样
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     instance(config)
//       // 这个then是接的是上面创建实例的过程,就是在instance创建并执行完内部属性之后,之后进行
//       .then(res=>{
//         resolve(res)  // 这块好像已经使用了axios.create()自带的promise了
//       })
//       .catch(err=>{   // 这个catch是接的是上面创建实例的过程
//         reject(err)
//       })
//   })
// }


// 2.2 通过传递一个config对象,对象里包含了url\success()\failure() 三个属性,实现类似2.1
// export function request(config) {
//   // 创建axios实例,这是必须的,都一样
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   instance(config.baseConfig)
//     .then(res=>{
//       config.success(res)
//     })
//     .catch(err=>{
//       config.failure(err)
//     })
// }


// 2.1 传进来三个参数,分别处理url\success()\failure()
// export function request(config,success,failure) {
//   // 创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   instance(config)
//     .then(res=>{
//       console.log('执行instance中的success回调...')
//       success(res)
//     })
//     .catch(err=>{
//       console.log('执行instance中的failure回调...')
//       failure(err)
//     })
// }
```



####  3.3 不在request.js中直接写网络请求，按照组件对网络请求再次进行划分，在network目录下新建home.js，将主页中的所有网络访问请求都放到该文件内，将对不同url中资源的请求都单独封装成一个函数甩出来，并都放在home.js文件里，这样方便进行管理和调用，同时减少和request.js的耦合度：

```js
// 1. 导入封装好的request组件
import {request} from "~network/request";

// 将首页对于不同url的请求进行单个封装,并都放在home.js文件里,以便进行管理

// 2. 封装一个函数,用于请求 http://123.207.32.32:8000/home/multidata 下的资源
export function getMultidata() {
  return request({
    url: '/home/multidata',
  })
}
```

####  3.4 在Home.vue组件中使用在home.js中封装好的网络请求模块，需要在其中先引用这个模块；然后创建声明周期函数，在组件刚刚创建完成的时候就调用home.js模块中的网络请求；由于axios返回的是一个promise所以调用模块方法后，直接用.then()就能获取到请求成功的数据；在Home.vue模块中创建模块内的变量result，用于保存请求返回的数据，同时对这个数据进行划分，按使用位置再次分为banners和recommends两块数据，代码如下:

```js
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  // 1. 导入NavBar,以便在首页使用
  import NavBar from "components/common/navbar/NavBar";

  // A. 引入访问 http://123.207.32.32:8000/home/multidata 资源的getMultidata模块
  import {getMultidata} from 'network/home'   // 用default方式导出才能省略{}

  export default {
    name: "Home",
    components:{
      NavBar        // 2. 注册NavBar组件后才可使用
    },
    data() {
      return {
        // result: null,   // D.创建一个result变量,用于保存网络请求的结果
        banners:[],        // 对上上面的保存做分类
        recommands:[],
      }
    },
    // B. 添加声明周期函数,在组件刚创建完成时就发送网络请求
    created() {
      // C. 请求多个数据,因为这个数据请求返回的除了轮播图的数据,还包含其它的数据
      getMultidata()    // 调用导出的模块,模块默认已经配置好了url,所以不需要配置,而且axios默认返回的就是promise
        .then(res=>{
          // console.log(res)
          // this.result = res   // E. 将成功返回的结果保存到上面定义的result变量中
          this.banners = res.data.banner.list   // 对上上面的保存做分类
          this.recommands = res.data.recommend.list

        })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #f2f2f2;
  }
</style>

```



#### 4 复用轮播图组件，这个之前其实视频里没有实现，所以这里是轮播图的创建：

####  4.1 由于轮播图组件是一个可以跨项目复用的组件，所以在components/common目录下创建一个swiper目录，用于存放轮播图组件。

####  4.2 先设计轮播图组件的容器Swiper.vue，类似于TabBar组件，这个容器以slot插件的方式被插入具体的轮播图子组件，其作用主要是占位、布局、统一样式和消息传递等，其代码如下：

```

```











###  网络模块封装及使用

























