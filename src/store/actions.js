import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 检测新添加的produce是否为第一次添加
            // 方法一
            // let oldProduce = null
            // for (let item of context.state.cartList) {
            //     if (item.id === payload.id) {
            //         oldProduce = item
            //     }
            // }
            // 方法二
            let oldProduce = context.state.cartList.find(item => item.id === payload.id)

            if (oldProduce) { //数量+1
                context.commit(ADD_COUNTER, oldProduce)
                resolve('当前商品数量+1')
            } else { //添加商品
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('添加商品')
            }
        })
    }
}