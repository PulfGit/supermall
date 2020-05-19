/*********************** 对axios进行封装 ********************/

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


/**************************************************************************************************/
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

