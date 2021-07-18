.<template>
  <div class="ButtonCheck" :class="{ check: isChecked }">
    <img src="@/assets/img/cart/资源 72.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "ButtonCheck",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.ButtonCheck {
  width: 18px;
  height: 18px;
  border: 2px solid #cccccc;
  border-radius: 50%;
}
.check {
  background-color: red;
  border-color: red;
}
img {
  width: 100%;
  position: relative;
  top: -3px;
}

.check-dome {
  background-color: pink;
}
</style>