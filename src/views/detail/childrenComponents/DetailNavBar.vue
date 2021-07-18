.<template>
  <div>
    <nav-bar>
      <div slot="left" class="leftItem" @click="clickBack">＜</div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ active: currentIndex == index }"
          @click="clickItem(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    clickItem(index) {
      this.currentIndex = index;
      this.$emit("clickItem", index);
    },
    clickBack() {
      this.$router.back();
      // this.$router.go(-1) == this.$router.back()
    },
  },
};
</script>

<style scoped>
.leftItem {
  font-size: 30px;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: deeppink;
  border-bottom: 0;
}
</style>

