import { ADD_COUNTER, ADD_TO_CART, SHOP_CART_ADD_COUNT, SHOP_CART_CUT_COUNT } from './mutation-types'
export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = false
        state.cartList.push(payload)
    },
    [SHOP_CART_ADD_COUNT](state, item) {
        item.count++
    },
    [SHOP_CART_CUT_COUNT](state, item) {
        item.count--
    },
    dropShopCart(state) {
        state.cartList = state.cartList.filter((item) => {
            return item.checked == false;
        });
    },

}