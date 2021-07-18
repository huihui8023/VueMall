.<template>
  <div class="ShopCartListItem">
    <div class="item">
      <button-check
        class="button-check"
        :isChecked="item.checked"
        @click.native="btnClickCheck"
      >
      </button-check>
      <p class="shopName">{{ item.shopName }} ></p>

      <img :src="item.image" alt="" />
      <p class="title">{{ item.title }}</p>
      <p class="price">{{ countPrice | filtersPrice }}</p>
      <div class="alter">
        <button class="add" @click="btnClickAdd(item)">+</button>
        <p class="count">x{{ item.count }}</p>
        <button class="cut" @click="btnClickCut(item)">-</button>
      </div>
    </div>
    <div class="tips" v-show="isShow">该宝贝不能减少了哟</div>
  </div>
</template>

<script>
import ButtonCheck from "@/components/content/buttoncheck/ButtonCheck.vue";

export default {
  name: "ShopCartListItem",
  components: {
    ButtonCheck,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dis: true,
      isShow: false,
    };
  },
  computed: {
    countPrice() {
      return this.item.count * this.item.price;
    },
  },
  methods: {
    btnClickCut(item) {
      if (item.count === 1) {
        clearTimeout(timer);
        this.isShow = true;
        let timer = setTimeout(() => {
          this.isShow = false;
        }, 3000);
      } else if (item.count > 1) {
        this.$store.commit("shopCartCutCount", item);
      }
    },
    btnClickAdd(item) {
      this.$store.commit("shopCartAddCount", item);
    },
    btnClickCheck() {
      this.item.checked = !this.item.checked;
    },
  },
  filters: {
    filtersPrice(value) {
      return "$" + value.toFixed(2);
    },
  },
};
</script>

<style scoped>
.item {
  height: 180px;
  border-radius: 15px;
  background-color: #ffffff;
  margin: 20px 10px;
  position: relative;
}

img {
  height: 120px;
  width: 90px;
  vertical-align: middle;
  float: left;
  padding-left: 15px;
  margin-left: 10px;
}

p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.shopName {
  padding-top: 10px;
  padding-left: 15px;
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
}
.title,
img {
  padding-top: 10px;
}
.title {
  padding-left: 10px;
}
.price {
  margin-top: 75px;
  padding-left: 10px;
}
.tips {
  width: 180px;
  height: 70px;
  position: absolute;
  top: 450px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(22, 22, 22);
  color: #ffffff;
  text-align: center;
  line-height: 70px;
  border-radius: 10px;
}
.button-check {
  position: absolute;
  top: 85px;
  left: 3px;
}
.alter {
  position: absolute;
  height: 30px;
  width: 150px;
  bottom: 10px;
  right: 10px;
  line-height: 3;
  text-align: center;
}
.add,
.cut,
.count {
  position: absolute;
  bottom: 0px;
}

.add {
  right: 80px;
}

.cut {
  right: 10px;
}
.count {
  width: 60px;
  height: 30px;
  right: 25px;
  bottom: 3px;
  text-align: center;
}

.alter button {
  width: 20px;
  height: 20px;
}
</style>