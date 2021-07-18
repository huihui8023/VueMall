/**
 * 插件方法的封装
 */
import Toast from "./Toast.vue"

const obj = {}

// install执行的时候默认会传过来一个参数 Vue
obj.install = function (Vue) {

    // 1.常见组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创造出来一个组件对象
    const toast = new toastConstructor()

    // 3.将组件对象 手动挂载到某一元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el 对应的就是div
    document.body.appendChild(toast.$el)


    Vue.prototype.$toast = toast
}

export default obj