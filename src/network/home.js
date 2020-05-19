// 1. 导入封装好的request组件
import {request} from "network/request";

// 将首页对于不同url的请求进行单个封装,并都放在home.js文件里,以便进行管理

// 2. 封装一个函数,用于请求 http://123.207.32.32:8000/home/multidata 下的资源
export function getMultidata() {
  return request({
    url: '/home/multidata',
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}


