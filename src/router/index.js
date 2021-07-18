import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Profile = () => import("../views/profile/Profile")
const ShopCar = () => import("../views/shopCar/ShopCar")
const Detail = () => import('../views/detail/Detail.vue')

// 1.安装插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/profile',
        component: Profile
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
    {
        path: '/shopCar',
        component: ShopCar
    },
    {
        path: '/detail/:id',
        component: Detail
    },

]

// 2.创建路由对象
const router = new VueRouter({
    routes,
    mode: 'history'
})

// 3.导出 去main挂载
export default router
