.<template>
  <div class="Category">
    <div v-for="(item, index) in getCategoryData" :key="index">
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { getCategory } from "@/network/category.js";

// 1.install安装BetterScroll
// 2.引用
// 3.new一个实例 括号内传一个标签
// 4.wrapper里面只能有一个元素 传入的那个元素的里面只能放一个元素 div里面只能放一个ul
// 5.设置高度
import BetterScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      bsscroll: null,
      getCategoryData: null,
    };
  },
  created() {
    getCategory().then((res) => {
      this.getCategoryData = res.data.category.list;
      console.log(this.getCategoryData);
      console.log(res);
    });
  },
  // 钩子方法中cteated无法操作dom元素 需要在mounted中操作
  mounted() {
    // this.bsscroll = new BetterScroll(".wrapper", {
    //   probeType: 3, //0.1 不检测滑动 2检测手指滑动 3检测所有滑动
    //   pullUpLoad: true,
    // });
    // this.bsscroll.on("scroll", (position) => {
    //   // console.log(position);
    // });
    // this.bsscroll.on("pullingUp", () => {
    //   console.log("---正在加载---");
    //   // 重新开启加载
    //   setTimeout(() => {
    //     this.bsscroll.finishPullUp(); //重新开启加载
    //   }, 1000);
    // });
  },
};
</script>

<style scoped>
</style>