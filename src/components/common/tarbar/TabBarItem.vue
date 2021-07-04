.<template>
  <div class="tab-bar-item" @click="clickItem">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "deeppink",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    clickItem() {
      if (this.$route.path !== this.path) {
        this.$router.replace(this.path);
      }
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  height: 49px;
}

.tab-bar-item img {
  width: 29px;
  height: 29px;
  margin-top: 2px;
  /* margin-bottom: 2px; */
  vertical-align: middle;
}
</style>