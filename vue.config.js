module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:['js','vue'],  // 扩展名省略的自动识别 vue默认配置中已配置
      alias: {
        // .set('@', resolve('src')),  // 根目录配置vue默认配置中已经配置好了
        'assets': '@/assets',           // vue3以上可以直接使用@作为src的路径
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',

        // router一般只在main.js中被引用一次,而且所有文件不引用可以直接拿到$router对象所以别名意义不大
        // 'router':'@/router',
        // store一般只在main.js中被引用一次,而且所有文件不引用可以直接拿到$store对象所以别名意义不大
        // 'store':'@/store',
      }
    }
  }
}
