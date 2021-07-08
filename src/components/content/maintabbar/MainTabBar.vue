.<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-name">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-name">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/shopCar">
      <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-name">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/info">
      <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-name">我的信息</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tarbar/TabBar.vue";
import TabBarItem from "../../common/tarbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>