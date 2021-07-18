import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 1.安装插件
Vue.use(Vuex)


const state = {
    cartList: []
}
// 2.创建插件
const store = new Vuex.Store({
    state,
    mutations,
    // mutations 唯一的目的就是修改state中的状态
    // mutations 里面的东西尽量单一一点
    actions,
    getters
})

// 3.挂载在实例上
export default store