.<template>
  <div class="rate">
    <div class="rate-top">用户点评</div>
    <div class="rate-item">
      <div class="user">
        <img :src="rate.avatar" alt="" />
        <span>{{ rate.uname }}</span>
      </div>
      <div class="style">
        {{ rate.style }}
      </div>
      <div class="content">
        {{ rate.content }}
      </div>
      <!-- v-if="rate.img.length !== 0" -->
      <div class="img">
        <img :src="img" alt="" v-for="(img, index) in rate.img" :key="index" />
      </div>
      <div class="timer">{{ rate.created | showDate }}</div>
    </div>
  </div>
</template>

<script>
import { format } from "@/common/utils.js";
export default {
  name: "DetailRate",
  props: {
    rate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      //将时间戳转换为对象
      const date = new Date(value * 1000);

      // 将对象转换为字符串
      return format(date, "yyyy/MM/dd hh:mm:ss");
    },
  },
};
</script>

<style scoped>
.rate {
  margin-top: 50px;
  padding: 0 10px;
}
.rate-top {
  font-size: 22px;
  background-color: rgb(156, 156, 156);
  padding-left: 10px;
  border-radius: 5px;
}
.rate-item {
  /* background-color: #ccc; */
  padding-left: 10px;
  /* border-radius: 5px; */
  margin-top: 20px;
  padding-top: 5px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(53, 53, 53, 0.3);
}
.rate-item .user img {
  width: 25px;
  height: 25px;
  border-radius: 12px;
  vertical-align: middle;
}
.rate-item .user span {
  margin-left: 7px;
  position: relative;
  top: -5px;
}
.style {
  font-size: 12px;
  padding-left: 32px;
  position: relative;
  top: -9px;
}
.rate-item .img img {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
.rate-item .img img:first-child {
  margin-right: 5px;
}
.content {
  margin-top: 10px;
}
.timer {
  position: relative;
  top: 15px;
  font-size: 14px;
}
</style>