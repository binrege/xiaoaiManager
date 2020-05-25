<template>
  <div>
    <div class="mainNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in navs" :key="index">
         {{ $t(`commons.${item}`)}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {
    navs: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  mounted() {
    console.log(this.$route);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.mainNav{
  padding: 15px 0;
}
</style>