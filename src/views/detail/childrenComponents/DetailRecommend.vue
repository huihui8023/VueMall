.<template>
  <div class="recommend">
    <div v-for="(item, index) in recommend" :key="index" class="item">
      <img :src="item.image" alt="" />
      <p>{{ item.title }}</p>
      <span class="price">{{ item.discountPrice }}</span>
      <span>⭐{{ item.cfav | filtersCfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRecommend",
  props: {
    recommend: {
      type: Array,
    },
  },
  filters: {
    filtersCfav(value) {
      if (value > 10000) {
        return (value / 10000).toFixed(2) + "万";
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.recommend {
  margin-top: 20px;
  background-color: pink;
  border-radius: 10px;
}
.item {
  display: inline-block;
  width: 49%;
  margin-bottom: 10px;
  /* justify-content: space-between; */
  text-align: center;
}
/* .item .price {
  margin-left: 10px;
} */
.item:nth-child(2n + 0) {
  margin-left: 7px;
}
.item p {
  /* 规定不换行 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item img {
  width: 100%;
  border-radius: 10px;
}
</style>