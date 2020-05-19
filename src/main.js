import Vue from 'vue'
import App from './App.vue'

// 挂载路由实例
import router from "./router";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
