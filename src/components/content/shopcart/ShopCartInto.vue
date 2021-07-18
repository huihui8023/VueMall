.<template>
  <div class="shop-cart">
    <i>{{ cartLength }}</i>
    <img src="@/assets/img/detail/cart.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "ShopCartInto",
  data() {
    return {
      kindCount: 0,
    };
  },
  computed: {
    cartLength() {
      this.kindCount = this.$store.state.cartList.reduce((prev, next) => {
        return prev + next.count;
      }, 0);
      return this.kindCount;
    },
  },
};
</script>

<style scoped>
.shop-cart {
  position: fixed;

  right: 15px;
  bottom: 115px;
}
.shop-cart img {
  width: 47px;
  height: 47px;
}
i {
  position: relative;
  top: -23px;
  left: 36px;
  color: #ffffff;
}
</style>