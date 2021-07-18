.<template>
  <div class="ShopCartList">
    <shop-cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :item="item"
    >
    </shop-cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ShopCartListItem from "./ShopCartListItem.vue";
export default {
  name: "ShopCartList",
  components: { ShopCartListItem },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style>
</style>