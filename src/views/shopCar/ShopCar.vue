.<template>
  <div class="shopCar">
    <!-- 头部导航 -->
    <nav-bar class="shopCar-nav">
      <div slot="center">购物车({{ cartLength }})</div>
      <div slot="right" @click="manageClick">管理</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <shop-cart-list> </shop-cart-list>
      <div class="without" v-if="cartLength === 0">暂时没有宝贝在购物车</div>
      <detail-recommend :recommend="recommend" class="recommend">
      </detail-recommend>
    </scroll>

    <!-- 底部汇总 -->
    <cart-bottom-bar class="bottom"> </cart-bottom-bar>
  </div>
</template>

<script>
import ShopCartList from "./childrenComponents/ShopCartList.vue";
import CartBottomBar from "./childrenComponents/CartBottomBar.vue";

import NavBar from "@/components/common/navbar/NavBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import DetailRecommend from "@/views/detail/childrenComponents/DetailRecommend.vue";

import { mapGetters } from "vuex";
import { shopcartgetRecommend } from "@/network/shopcart.js";

export default {
  name: "ShopCar",
  components: {
    NavBar,
    ShopCartList,
    Scroll,
    DetailRecommend,
    CartBottomBar,
  },
  data() {
    return {
      scrollerHeight: 0,
      recommend: [],
    };
  },
  created() {
    shopcartgetRecommend().then((res) => {
      this.recommend = res.data.list;
    });
  },
  computed: {
    // 两种语法
    ...mapGetters(["cartLength", "cartList"]),
    // ...mapGetters({
    //   length: "cartLength",
    //   list: "cartList",
    // }),
  },
  activated() {
    /**
     * 隐式切换
     * 从shopcart切换出去后scrollerHeight的高度 就为0
     * 再切换回来后并不会自动刷新高度
     */
    setTimeout(() => {
      console.log("before:" + this.$refs.scroll.bsscroll.scrollerHeight);
      this.$refs.scroll.bsscroll.refresh();
      console.log("after:" + this.$refs.scroll.bsscroll.scrollerHeight);
    }, 100);
  },
  methods: {
    manageClick() {
      this.$bus.$emit("manageClick");
    },
  },
};
</script>

<style scoped>
.shopCar-nav {
  background-color: pink;
  color: #ffffff;
}
.shopCar {
  height: 100vh;
}
.content {
  /* 第一种设置高度方法 */
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  background-color: #cccccc;
  overflow: hidden;
  height: calc(100% - 44px - 49px - 35px);
}
.recommend {
  background-color: #cccccc;
}
.recommend::before {
  content: "猜你喜欢";
  display: block;
  width: 160px;
  height: 40px;
  background-color: #494949;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  color: #ffffff;
  margin-bottom: 10px;
}
.without {
  width: 320px;
  height: 40px;
  background-color: #494949;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  color: #ffffff;
  margin-bottom: 10px;
}
</style>