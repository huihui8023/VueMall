.<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">Ljs的Vue项目</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!--轮播图 -->
      <home-swiper :banners="banner" @imageLoad="swiperImageLoad"></home-swiper>
      <!-- 四个推荐推荐 -->
      <recommend-view :recommend="recommend"> </recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!--  -->
      <tab-control
        :title="['爆款', '火爆', '爆火']"
        @tabClick="tabClick"
        ref="tabControl"
        @imageLoad="swiperImageLoad"
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
import Goods from "@/components/content/goods/Goods.vue";

import HomeSwiper from "@/views/home/childrenComponents/HomeSwiper.vue";
import RecommendView from "./childrenComponents/RecommendView.vue";
import FeatureView from "./childrenComponents/FeatureView.vue";

import { getHomeMultidata, getHomeData } from "@/network/home.js";

// import { debounce } from "@/common/utils.js";
import { backTopMixin } from "@/common/mixin.js";

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
      tabControlOffSetTop: 0,
      istabControlFixed: false,
      saveY: 0,
    };
  },
  mixins: [backTopMixin],
  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },

  activated() {
    this.$refs.scroll.bsscroll.refresh();
    this.$refs.scroll.bsscroll.scrollTo(0, this.saveY, 0);
  },

  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);

    // 取消全局事件的监听 事件|函数
    // this.$bus.$off("itemImgLoad", () => {
    //   this.$refs.scroll.bsscroll.refresh();
    // });
  },
  mounted() {
    //监听item图片加载完成
    // const refresh = debounce(this.$refs.scroll.bsscroll.refresh(), 50); //防抖动
    /**
     * 在新版的better scroll 中已经不需要再监听图片加载速度大于计算高度了速度了
     *observeDOM: true,
      observeImage: true,
     */
    this.$bus.$on("homeItemImgLoad", () => {
      this.$refs.scroll.bsscroll.refresh();
    });
  },
  methods: {
    /**
     * 防抖动函数
     */
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if (timer) clearInterval(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },

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

        this.$refs.scroll && this.$refs.scroll.bsscroll.finishPullUp(); //重新加载
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

      // 让两个tabcontrol保持一致currentIndex保持一致
      // this.$refs.tabControl.currentIndex = index
      // this.$refs.tabControlDemo.currentIndex = index
    },

    contentScroll(position) {
      // BackTop是否显示
      this.isBackTopShow = -position.y > 2000 ? true : false;

      // tabControl是否吸顶
      this.istabControlFixed =
        -position.y > this.tabControlOffSetTop ? true : false;
    },
    loadMore() {
      this.getHomeData(this.currentIndex);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      //所有的组件都有一个$el:用于获取组件中的元素
      this.tabControlOffSetTop = this.$refs.tabControl.$el.offsetTop;
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

.content {
  position: absolute;
  top: 44px;
  bottom: 40px;
  left: 0;
  right: 0;

  overflow: hidden;
}
</style>