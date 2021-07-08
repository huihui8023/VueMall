<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar> </main-tab-bar>
  </div>
</template>

<script>
import router from "./router/index";
import MainTabBar from "./components/content/maintabbar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
  router,
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>


