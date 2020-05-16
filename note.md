### 一. git库创建

#### 1. 先用 vue ui 命令创建项目，进行项目初始化操作，建立一个基本的vue项目目录结构

####  2. 在GitHub中创建远程版本库，https://github.com/PulfGit/supermall.git

#### 3. 使用在终端中在项目目录下使用如下命令当由vue生成的git与github进行挂接：

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

###  二. 目录结构划分

#### 1.  在asset目录中添加css和img目录，分别用于存放css文件和图片资源。

####  2. 在src目录下新建views目录，用于放单独的组件、页面和视图，与放置公共组件的components目录功能进行区别

####  3. 在已有的components目录下新建两个目录，一个是common目录，用于可跨项目间进行复用的组件，一个是content，用于存放当前项目中与业务相关的可复用公共组件。

####  4. 创建network目录，用于存放网络请求处理的代码

####  5. 创建router目录，用于存放路由相关的代码

####  6. 创建store目录，用于存放Vuex相关的代码

####  7. 在src目录下创建common目录，在该目录下可以创建const.js文件，用于存放全局配置和公共常量和配置；创建utils.js用于存放工具和工具的方法；创建mixin.js用于存放混入代码。



