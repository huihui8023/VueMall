.<template>
  <div class="CartBottomBar">
    <button-check
      class="button"
      :isChecked="isSelectAll"
      @click.native="selectAll"
    >
    </button-check>
    <div v-if="!switchState" class="settlement">结算({{ accounts }})</div>
    <div v-if="switchState" class="switchState" @click="clearClick">清除</div>
    <div v-if="!switchState" class="price">总计：{{ totalPrice }} 元</div>
    <div v-if="switchState" class="Collection">加入收藏夹</div>
  </div>
</template>

<script>
import ButtonCheck from "@/components/content/buttoncheck/ButtonCheck.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: { ButtonCheck },
  data() {
    return {
      switchState: false,
      dataSelectAll: true,
    };
  },
  activated() {
    this.switchState = false;
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((pre, item) => {
          return pre + item.count * item.price;
        }, 0)
        .toFixed(1);
    },
    accounts() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((pre, item) => {
          return pre + item.count;
        }, 0);
    },
    ...mapGetters(["cartList"]),
    isSelectAll() {
      if (this.cartList.length == 0) {
        return false;
      } else {
        return !this.cartList.some((item) => item.checked == false);
      }
      // if (this.cartList.length == 0) return false;
      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    },
  },
  mounted() {
    this.$bus.$on("manageClick", () => {
      this.switchState = !this.switchState;
    });
  },
  //   filters: {
  //     filtersPrice(value) {
  //       return value.toFixed(1);
  //     },
  //   },
  methods: {
    clearClick() {
      this.$store.commit("dropShopCart");
    },
    selectAll() {
      // if (this.dataSelectAll == true) {
      //   this.$store.commit("selectAll");
      //   this.dataSelectAll = false;
      // } else if (this.dataSelectAll == false) {
      //   this.$store.commit("cancelAll");
      //   this.dataSelectAll = true;
      // }
      if (this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
  },
};
</script>

<style scoped>
.CartBottomBar {
  height: 35px;
  background-color: #ffffff;
  position: relative;
}
.button {
  position: absolute;
  top: 9px;
  left: 5px;
}
.settlement,
.price {
  text-align: center;
  line-height: 35px;
  height: 35px;
  width: 80px;
  background-color: red;
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
}
.price {
  background-color: #ffffff;
  right: 100px;
  color: #000;
  width: 140px;
}
.switchState,
.Collection {
  text-align: center;
  line-height: 35px;
  height: 35px;
  width: 80px;
  background-color: red;
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
}
.Collection {
  background-color: #1f1e1e;
  right: 100px;
  color: rgb(255, 255, 255);
  width: 140px;
  border-radius: 30px;
  line-height: 25px;
  height: 25px;
  margin-top: 5px;
}
</style>