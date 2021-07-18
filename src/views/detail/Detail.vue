.<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav"
      @clickItem="clickItem"
      :probeType="3"
      ref="navBar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper :topImage="topImage"> </detail-swiper>
      <detail-base-info :goods="DetailBaseInfo"> </detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"> </detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad">
      </detail-goods-info>
      <detail-params-info :paramsInfo="paramInfo" ref="params">
      </detail-params-info>
      <detail-rate :rate="rate" ref="rate"> </detail-rate>
      <!-- 自己写的 -->
      <detail-recommend :recommend="recommend" ref="recommend">
      </detail-recommend>
      <!-- 调用封装好的组件 -->
      <goods :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addToCar="addToCar"> </detail-bottom-bar>
    <!-- native属性可以监听组件点击 -->
    <back-top @click.native="backClick" v-show="isBackTopShow"> </back-top>
    <!-- native属性可以监听组件点击 -->
    <shop-cart-into @click.native="shopCartClick"> </shop-cart-into>
    <!-- <toast message="加入购物车成功"> </toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childrenComponents/DetailNavBar.vue";
import DetailSwiper from "./childrenComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childrenComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrenComponents/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childrenComponents/DetailParamsInfo.vue";
import DetailRate from "./childrenComponents/DetailRate.vue";
import DetailRecommend from "./childrenComponents/DetailRecommend.vue";
import DetailBottomBar from "./childrenComponents/DetailBottomBar.vue";

import Goods from "@/components/content/goods/Goods.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import ShopCartInto from "@/components/content/shopcart/ShopCartInto.vue";

// 使用组件方式的封装 不用导入 注册 以及绑定值
// import Toast from "@/components/common/toast/Toast.vue";

// 防抖
import { debounce } from "@/common/utils.js";
// 混入
import { backTopMixin } from "@/common/mixin.js";

import {
  getDetail,
  getRecommend,
  shopGoods,
  shopInfo,
  paramInfo,
  rate,
} from "@/network/detail.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailRate,
    DetailRecommend,
    Goods,
    Scroll,
    DetailBottomBar,
    ShopCartInto,
    // 使用组件方式的封装 不用导入 注册 以及绑定值
    // Toast,
  },
  data() {
    return {
      id: null,
      topImage: [],
      DetailBaseInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      rate: {},
      recommend: [],
      themeTops: [],
      getThemeTops: null,
      currentIndex: 0,
    };
  },
  mixins: [backTopMixin],
  created() {
    // 保存传入的iid
    this.id = this.$route.params.id;

    // 2.根据id请求数据
    getDetail(this.id).then((res) => {
      console.log(res);
      const data = res.result;
      //  请求轮播图
      this.topImage = data.itemInfo.topImages;

      // 3.请求商品信息
      this.DetailBaseInfo = new shopGoods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //商家信息
      this.shopInfo = new shopInfo(data.shopInfo);

      //商品信息
      this.detailInfo = data.detailInfo;

      //参数信息
      this.paramInfo = new paramInfo(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 评论
      this.rate = new rate(data.rate);
    });

    //推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });

    /**
     * $nextTick 以解决created获取不到组件,
     *或者数据传入但没渲染页面的问题,
     *当渲染完成 再来执行nextTick /里面的回调
     *但页面渲染完成 图片依旧没加载完成
     *所有依旧有问题
     */
    // this.$nextTick(() => {
    // });

    /**
     * 可以使用防抖 在事件总线中只需调用一次getThemeTops 以提高性能
     * 在事件总线将位置push进数组
     */
    // this.getThemeTops = debouce(() => {
    // });
  },
  /**
   * $nextTick 与 updated 解决同一问题 但也有同一问题
   */
  mounted() {
    // 根据发送的事件总线来刷新scroll 以解决scrollHight的数据没有根据图片
    // 更新完成来刷新高度数据的问题
    this.$bus.$on("detailItemImgLoad", () => {
      // this.$refs.scroll.bsscroll.refresh();
      // console.log(this.$refs.scroll.bsscroll.refresh);
      // console.log("detailItemImgLoad");
      /**
       * 此处可用防抖
       * 在data里面赋值一个null的函数
       * 将操作放入防抖中 赋值给这个函数
       * 只需调用一次函数
       */
      // this.themeTops = [];
      // this.themeTops.push(0);
      // this.themeTops.push(this.$refs.params.$el.offsetTop - 55);
      // this.themeTops.push(this.$refs.rate.$el.offsetTop - 55);
      // this.themeTops.push(this.$refs.recommend.$el.offsetTop - 55);
      // console.log("mounted: " + this.themeTops);
    });
  },
  methods: {
    // 点击导航楼 滚动到对应位置
    clickItem(index) {
      console.log(index);
      this.$refs.scroll.bsscroll.scrollTo(0, -this.themeTops[index], 300);
    },
    // 将各个小组件的位置传入数组中，方便定位
    imageLoad() {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.params.$el.offsetTop - 55);
      this.themeTops.push(this.$refs.rate.$el.offsetTop - 55);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop - 55);
      this.themeTops.push(Number.MAX_VALUE);
    },
    // 内容滚动 navbar变化样式
    contentScroll(position) {
      let positionY = -position.y;

      let length = this.themeTops.length;

      /**
       * 内容滚动 普通写法
       */
      // for (var i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTops[i] &&
      //       positionY < this.themeTops[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTops[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.navBar.currentIndex = this.currentIndex;
      //   }
      // }

      /**
       * 内容滚动 hack做法
       * 在数组里加一个最大值 这样就不用分层判断
       * 为索引越界问题依然存在 循环条件length - 1
       */
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }

      // BackTop是否显示
      this.isBackTopShow = -position.y > 2000 ? true : false;
    },
    addToCar() {
      // 1.拿到数据
      const produce = {};
      produce.image = this.topImage[0];
      produce.title = this.DetailBaseInfo.title;
      produce.desc = this.DetailBaseInfo.desc;
      produce.price = this.DetailBaseInfo.realPrice;
      produce.id = this.id;
      produce.shopName = this.shopInfo.name;

      // 2.将数据添加到state dispatch会返回一个promise
      // vuex技巧 如果想知道vuex里面是否完成了操作 可以返回promise 在then里面回调
      // 同样 actions里面的方法也可以映射 方法和mapGetters 一样mapActions
      // this.$store.commit("addCart", produce);
      this.$store.dispatch("addCart", produce).then((res) => {
        // 使用组件方式的封装 不用导入 注册 以及绑定值
        // this.$toast.show('xxx',2000)
        this.$toast.show(res, 2000);
      });
    },
    shopCartClick() {
      this.$router.replace("/shopCar");
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}

.detail-nav {
  position: relative;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  z-index: 999;
}
</style>