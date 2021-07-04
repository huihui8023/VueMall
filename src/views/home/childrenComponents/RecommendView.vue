.<template>
  <div class="Recommend">
    <div v-for="(item, index) in recommend" :key="index" class="Recommenditem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.Recommend {
  display: flex;
  width: 100%;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  border-bottom: 10px solid rgba(92, 92, 92, 0.281);
}
.Recommenditem {
  /* width: 25%; */
  flex: 1;
  margin: 0 20px 15px;
}
.Recommenditem img {
  width: 100%;
  margin-bottom: 8px;
}
</style>