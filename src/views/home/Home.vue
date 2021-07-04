.<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banner"></home-swiper>
    <recommend-view :recommend="recommend"> </recommend-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import HomeSwiper from "@/views/home/childrenComponents/HomeSwiper.vue";
import RecommendView from "./childrenComponents/RecommendView.vue";
import { getHomeMultidata } from "@/network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      banner: [],
      dKeyword: [],
      keywords: [],
      recommend: [],
    };
  },
  created() {
    getHomeMultidata().then((res) => {
      this.banner = res.data.banner.list;
      this.dKeyword = res.data.dKeyword.list;
      this.keywords = res.data.keywords.list;
      this.recommend = res.data.recommend.list;
    });
  },
};
</script> 

<style>
.home-nav {
  background-color: pink;
}
</style>