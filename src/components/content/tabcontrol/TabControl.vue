.<template>
  <div class="tabcontrol">
    <div v-for="(item, index) in title" :key="index" @click="itemClick(index)">
      <span :class="{ active: currentIndex === index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      defaule() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style >
.tabcontrol {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
}
.tabcontrol div {
  flex: 1;
  color: black;
  font-size: 18px;
}
.active {
  color: pink;
  border-bottom: 2px solid pink;
}
</style>