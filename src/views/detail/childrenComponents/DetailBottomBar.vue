.<template>
  <div class="BottomBar">
    <div class="left">
      <div class="service">
        <div class="icon"></div>
        <span>客服</span>
      </div>
      <div class="shop">
        <div class="icon"></div>
        <span>店铺</span>
      </div>
      <div class="collect">
        <div class="icon"></div>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="ShoppingCart" @click="addToCar">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCar() {
      this.$emit("addToCar");
    },
  },
};
</script>

<style scoped>
.BottomBar {
  height: 49px;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.left,
.right {
  display: flex;
  width: 50%;
}

.left .service,
.shop,
.collect {
  flex: 1;
  text-align: center;
  line-height: 3;
}
.left .service .icon {
  height: 25px;
  background: url("C:/Users/灰灰/Desktop/Vue.js/09/mall/src/assets/img/detail/detail_bottom.png")
    no-repeat 22px -47px;
  background-size: 21px;
}

.left .shop .icon {
  height: 25px;
  background: url("C:/Users/灰灰/Desktop/Vue.js/09/mall/src/assets/img/detail/detail_bottom.png")
    no-repeat 25px -90px;
  background-size: 21px;
}
.left .collect .icon {
  height: 25px;
  background: url("C:/Users/灰灰/Desktop/Vue.js/09/mall/src/assets/img/detail/detail_bottom.png")
    no-repeat 25px -21px;
  background-size: 21px;
}
.left .service span {
  position: relative;
  bottom: 10px;
  left: 0;
}
.left .shop span {
  position: relative;
  bottom: 10px;
  left: 0;
}
.left .collect span {
  position: relative;
  bottom: 10px;
  left: 0;
}

.ShoppingCart,
.buy {
  width: 50%;
  text-align: center;
  line-height: 3;
}

.ShoppingCart {
  background-color: yellow;
  color: rgb(0, 0, 0);
}
.buy {
  background-color: deeppink;
  color: #fff;
}
</style>