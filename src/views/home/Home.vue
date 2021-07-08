.<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!--轮播图 -->
      <home-swiper :banners="banner"></home-swiper>
      <!-- 四个推荐推荐 -->
      <recommend-view :recommend="recommend"> </recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!--  -->
      <tab-control
        class="tab-control"
        :title="['爆款', '火爆', '爆火']"
        @tabClick="tabClick"
      >
      </tab-control>
      <goods :goods="goods[currentIndex].list"> </goods>
    </scroll>
    <!-- native属性可以监听组件点击 -->
    <back-top @click.native="backClick" v-show="isBackTopShow"> </back-top>
    <!-- ul>li{$}*100 -->
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabcontrol/TabControl.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";
import Goods from "@/components/content/goods/Goods.vue";

import HomeSwiper from "@/views/home/childrenComponents/HomeSwiper.vue";
import RecommendView from "./childrenComponents/RecommendView.vue";
import FeatureView from "./childrenComponents/FeatureView.vue";

import { getHomeMultidata, getHomeData } from "@/network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    Goods,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      dKeyword: [],
      keywords: [],
      recommend: [],

      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentIndex: "pop",
      isBackTopShow: false,
    };
  },
  created() {
    this.getHomeMultidata();

    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.dKeyword = res.data.dKeyword.list;
        this.keywords = res.data.keywords.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.bsscroll.finishPullUp(); //重新加载
      });
    },

    /*
    事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = "pop";
          break;
        case 1:
          this.currentIndex = "new";
          break;
        case 2:
          this.currentIndex = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.bsscroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.isBackTopShow = -position.y > 2000 ? true : false;
    },
    loadMore() {
      this.getHomeData(this.currentIndex);
    },
  },
};
</script> 

<style scoped>
.home-nav {
  position: fixed;
  background-color: pink;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.swiper {
  margin-top: 44px;
}
.tab-control {
  /* 粘性定位  固定定位和相对定位的混合*/

  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 40px;
  left: 0;
  right: 0;

  overflow: hidden;
}
</style>