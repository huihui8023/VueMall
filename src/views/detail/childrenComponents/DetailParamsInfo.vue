.<template>
  <div v-if="Object.keys(paramsInfo).length !== 0" class="paramsInfo">
    <table
      v-for="(item, index) in paramsInfo.sizes"
      :key="index"
      class="table1"
    >
      <tr v-for="(tr, index1) in item" :key="index1">
        <td v-for="(td, index2) in tr" :key="index2">
          {{ td }}
        </td>
      </tr>
    </table>

    <table class="table2">
      <tr v-for="(info, index3) in paramsInfo.infos" :key="index3">
        <td>
          {{ info.key }}
        </td>
        <td>
          {{ info.value }}
        </td>
      </tr>
    </table>

    <!-- <div v-if="paramsInfo.image.length !== 0">
      <img :src="paramsInfo.image" alt="" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.paramsInfo {
  padding: 0 15px;
}
.table1 {
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;
  border-bottom: 5px solid #333;
}
.table1 tr {
  height: 42px;
  border-bottom: 1px solid rgba(65, 65, 65, 0.3);
}

.table2 {
  width: 100%;
  border-collapse: collapse;
}
.table2 tr {
  height: 42px;
  border-bottom: 1px solid rgba(65, 65, 65, 0.3);
}
.table2 tr td:nth-child(2) {
  padding-left: 17px;
  color: pink;
}
.table2 tr td:nth-child(1) {
  width: 40px;
}
</style>