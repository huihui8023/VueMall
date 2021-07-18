.<template>
  <div v-if="Object.keys(goods).length !== 0" class="baseinfo">
    <div class="info-title">
      {{ goods.title }}
    </div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="info-price-discount" v-if="goods.discount">
        {{ goods.discount }}
      </span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.baseinfo {
  padding: 0 8px;
  border-bottom: 5px solid rgb(168, 167, 167, 0.3);
}
.info-title {
  margin: 10px 0 15px 0;
  font-size: 16px;
}
.info-price {
  margin-bottom: 15px;
  font-size: 18px;
  color: pink;
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price-discount {
  margin-left: 15px;
  padding: 3px 5px;
  font-size: 12px;
  position: relative;
  background-color: pink;
  border-radius: 18px;
  top: -6px;
  color: #fff;
}
.info-other {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(182, 182, 182, 0.5);
  margin-top: 15px;
  padding-bottom: 10px;
}

.info-service {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  padding-bottom: 20px;
}
.info-service > span {
  font-size: 12px;
}
.info-service img {
  height: 15px;
  width: 15px;
  position: relative;
  top: 2px;
}
</style>