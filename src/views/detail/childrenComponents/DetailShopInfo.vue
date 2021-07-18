.<template>
  <div class="ShopInfo">
    <div class="name">
      <img :src="shopInfo.logo" alt="" class="img" />
      <span>{{ shopInfo.name }}</span>
    </div>
    <div class="Middle">
      <div class="MiddleLeft">
        <div class="MiddleLeft-left">
          <div class="MiddleLeft-left-first">
            {{ shopInfo.sells | sellCountFilter }}
          </div>
          <div>总销量</div>
        </div>
        <div class="MiddleLeft-right">
          <div class="MiddleLeft-right-first">{{ shopInfo.goodsCount }}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="MiddleRight">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'better-score': item.isBetter }">
              {{ item.score }}
            </td>
            <td>
              <span class="better" :class="{ 'better-more': item.isBetter }">{{
                item.isBetter ? "高" : "低"
              }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) {
        return value;
      } else {
        return (value / 10000).toFixed(2) + "万";
      }
    },
  },
};
</script>

<style scoped>
.name {
  margin-top: 25px;
  margin-left: 10px;
}
.name span {
  position: relative;
  top: -15px;
  margin-left: 10px;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.Middle {
  display: flex;
  text-align: center;
  margin: 15px 0;
}
.MiddleLeft {
  flex: 1;
  display: flex;
  justify-content: space-around;

  border-right: 1px solid #ccc;
}
.MiddleRight {
  flex: 1;
}

.MiddleLeft-right-first,
.MiddleLeft-left-first {
  font-size: 19px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.score {
  color: green;
}
.better-score {
  color: red;
}
td:nth-child(1),
td:nth-child(2),
td:nth-child(3) {
  padding-left: 15px;
  padding-bottom: 5px;
}
.better {
  background-color: green;
  color: #fff;
}
.better-more {
  background-color: red;
}
.shop-bottom {
  margin: 0 auto;
  text-align: center;
  height: 30px;
  width: 100px;
  background-color: #ccc;
  line-height: 30px;
  border-radius: 25px;
}
</style>