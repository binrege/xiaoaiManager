<template>
  <div class="container flex a-center j-center">
    <el-card>
      <div slot="header" class="clearfix">
        <span>账单详情</span>
      </div>
      <div class="m-desc flex f-column" id="printMe">
        <div class="m-item flex a-center">付款账户 : {{order.account}}</div>
        <div class="m-item flex a-center">收款账户 : {{order.accountNumber}}</div>
        <div class="m-item flex a-center">收款人姓名 : {{order.name}}</div>
        <div class="m-item flex a-center">
          收款金额 :
          <span style="font-size: 22px;">{{order.price}}</span>元
        </div>
      </div>
      <div class="m-btn flex a-center j-center">
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        <el-button v-print="printObj">打印</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      printObj: { id: "printMe", popTitle: "账单详情" }
    };
  },
  components: {},
  props: {},
  methods: {
    print() {}
  },
  beforeMount() {
    if (localStorage.getItem("order")) {
      this.order = JSON.parse(localStorage.getItem("order"));
    } else {
      this.$confirm("暂无账单, 是否去创建账单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/form/stepForm");
        })
        .catch(() => {
          this.$router.push("/");
        });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.m-desc {
  background: #fafafa;
  width: 400px;
  height: 200px;
  .m-item {
    margin: 10px;
    flex: 1;
  }
}
.m-btn {
  margin-top: 25px;
}
</style>
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
