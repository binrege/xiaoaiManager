<template>
  <div class="wrap">
    <div>
      <div class="title">利润(万)</div>

      <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      color: ["#ff0", "#00f", "#f00", "#0ff"],
      sizeMin: 16,
      sizeMax: 20
    };
    return {
      chartData: {
        columns: ["city", "value"],
        rows: []
      }
    };
  },
  components: {},
  props: {
    CityValue: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  mounted() {
    console.log(this.CityValue);
  },
  watch: {
    CityValue(val) {
      this.chartData.rows = val;
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.chartData {
  width: 500px;
}
.wrap {
  box-shadow: 0 2px 12px 0 rgba(160, 113, 113, 0.1);
  width: 610px;
  height: 453px;
  border: 1px solid #ebeef5;
}
.title {
  height: 53px;
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>