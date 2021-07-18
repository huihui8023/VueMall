.<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      bsscroll: null,
    };
  },
  props: {
    probeType: Number,
    default: 0,
  },

  // 钩子方法中cteated无法操作dom元素 需要在mounted中操作
  mounted() {
    // 创建BetterScroll
    this.bsscroll = new BetterScroll(".wrapper", {
      probeType: this.probeType, //0.1 不检测滑动 2检测手指滑动 3检测所有滑动
      pullUpLoad: true, //监听是否滚到底部
      click: true,
      observeDOM: true,
      observeImage: true,
    });

    //监听滚动位置
    this.bsscroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    //监听上拉事件
    this.bsscroll.on("pullingUp", () => {
      // console.log("---正在加载---");
      this.$emit("pullingUp");

      // setTimeout(() => {
      //   this.bsscroll.finishPullUp(); //重新开启加载
      // }, 1000);
    });
  },
  methods: {
    // refresh() {
    //   this.scroll && this.scroll.refresh();
    // },
    getScrollY() {
      return this.bsscroll ? this.bsscroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>