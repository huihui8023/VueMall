.<template>
  <div class="DetailGoodsInfo">
    <div v-if="Object.keys(detailInfo).length !== 0">
      <div class="start"></div>
      <div class="desc">
        {{ detailInfo.desc }}
      </div>
      <div class="end"></div>
      <div class="key">
        {{ detailInfo.detailImage[0].key }}
      </div>
      <div
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        class="image"
      >
        <img :src="item" alt="" @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
    },
  },
  methods: {
    imgLoad() {
      this.$emit("imageLoad");
    },
  },
};
</script>

<style scoped>
.DetailGoodsInfo {
  margin-top: 30px;
  padding-bottom: 15px;
  border-bottom: 5px solid #ccc;
}
.desc {
  margin: 15px 0px;
}
.start,
.end {
  height: 2px;
  width: 100px;
  background-color: #333;
  margin: 0;
}
.end {
  float: right;
}

.start::after,
.end::after {
  content: "";
  display: inline-block;
  position: relative;
  top: -14px;
  width: 5px;
  height: 3px;
  background-color: #333;
}
.start::after {
  left: 95px;
}
.key {
  margin: 30px 0px 15px 15px;
  font-size: 16px;
}
.image img {
  width: 100%;
}
</style>