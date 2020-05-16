

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

