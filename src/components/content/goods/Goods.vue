.<template>
  <div class="goods">
    <goods-item v-for="(item, index) in goods" :key="index" :goods-item="item">
    </goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem.vue";

export default {
  name: "Goods",
  components: {
    GoodsItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
/* 两张图片并列对齐 第二种方案 */
/* .goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
} */
</style>