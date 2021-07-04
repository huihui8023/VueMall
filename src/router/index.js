import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Info = () => import("../views/info/Info")
const ShopCar = () => import("../views/shopCar/ShopCar")

// 1.安装插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/info',
        component: Info
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/shopCar',
        component: ShopCar
    },

]

// 2.创建路由对象
const router = new VueRouter({
    routes,
    mode: 'history'
})

// 3.导出 去main挂载
export default router
