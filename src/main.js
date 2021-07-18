import Vue from 'vue'
import App from './App.vue'
import store from "\./store/index"
import FastClick from 'fastclick'
// 导入
import toast from "./components/common/toast"
// 安装toast插件
Vue.use(toast) //调用Vue.use 本质上会去执行对象的install方法

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
