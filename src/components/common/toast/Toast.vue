
<template>
  <div class="Toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = "默认文字", duration = 1500) {
      // 以前给默认值
      // duration = duration || 1500;

      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.Toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(41, 41, 41, 0.8);
  width: 200px;
  height: 50px;
  color: #ffffff;
  text-align: center;
  line-height: 50px;
  z-index: 9999;
}
</style>