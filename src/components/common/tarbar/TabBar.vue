.<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgb(90, 86, 86);
  color: rgb(22, 22, 22);
}
</style>