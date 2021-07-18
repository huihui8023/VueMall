<template>
  <div id="app">
    <keep-alive exclude="Detail"> <router-view></router-view></keep-alive>

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


