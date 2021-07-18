.<template>
  <div class="goodsitem" @click="itemClick">
    <img :src="isShow" alt="" @load="imgLoad" />
    <p>{{ goodsItem.title }}</p>
    <span class="price">{{ goodsItem.price }}</span>
    <span class="collection">⭐{{ goodsItem.cfav }}</span>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      /**
       * 根据不同的路由发送不同的事件总线
       */
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("homeItemImgLoad");
        console.log("homeItemImgLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("detailItemImgLoad");
        console.log("detailItemImgLoad");
      }

      // this.$bus.$emit("itemImgLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
      // this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    isShow() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
.goodsitem {
  display: inline-block;
  width: 47%;
  text-align: center;
  margin: 5px 3.5px 5px;
  overflow: hidden;
  font-size: 14px;
}

.goodsitem p {
  overflow: hidden;
  text-overflow: ellipsis !important;
  /* 规定不换行 */
  white-space: nowrap;
}
.goodsitem img {
  width: 100%;
  border-radius: 5px;
}
.goodsitem .price {
  color: red;
}
.goodsitem span {
  margin: 0 2.5px;
}
</style>