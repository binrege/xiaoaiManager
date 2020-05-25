<template>
  <div class="wraps">
    <div class="info">
      <div>请填写您的转账信息</div>
      <div class="msg">请务必是你本人操作,确认转账金额及收款人信息</div>
    </div>

    <el-card class="box-card" style="width:100%">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div class="step1" v-if="active===0">
        <el-form
          :model="ruleForm"
          label-width="100px"
          label-position="left"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="account" label="付款账户：" required>
            <el-input clearable v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="收款账户:" required>
            <div class="account flex a-center">
              <div class="type">
                <el-form-item prop="accountType">
                  <el-select v-model="ruleForm.accountType" placeholder="请选择">
                    <el-option
                      v-for="item in accountOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item prop="accountNumber">
                  <el-input
                    :disabled="ruleForm.accountType==''"
                    clearable
                    v-model="ruleForm.accountNumber"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="name" label="付款人姓名:" required>
            <el-input clearable v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="收款金额:" required>
            <el-input clearable type="number" v-model="ruleForm.price">
              <span slot="prefix">￥</span>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="nextStep">
          <el-button type="primary" @click="nextStep('ruleForm')">下一步</el-button>
        </div>
      </div>
      <div class="step1" v-if="active===1">
        <div class="content">
          <div>
            <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="info" show-icon></el-alert>
          </div>
          <div class="acountInfo">
            <div>付款账户:{{ruleForm.account}}</div>
            <div>收款账户:{{ruleForm.accountNumber}}</div>
            <div>收款人姓名:{{ruleForm.name}}</div>
            <div>
              收款金额:
              <span>{{ruleForm.price}}</span>元
            </div>
          </div>
          <div class="pwd">
            <el-form
              :model="passForm"
              label-width="100px"
              label-position="left"
              :rules="passRules"
              ref="passForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="password" show-password label="支付密码:" required>
                <el-input clearable v-model="passForm.password"></el-input>
              </el-form-item>
              <div class="nextStep">
                <el-button type="primary" @click="nextStep('passForm')">提交</el-button>
                <el-button @click="active--">上一步</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="step1" v-if="active===2">
        <div class="sure msg">
          <div class="m-icon flex a-center j-center">
            <i class="el-icon-check"></i>
          </div>
          <div style="margin-top: 25px;">操作成功</div>
          <div class="m-info">预计两小时到账</div>
          <div class="m-desc flex f-column">
            <div class="m-item flex a-center">付款账户 : {{ruleForm.account}}</div>
            <div class="m-item flex a-center">收款账户 : {{ruleForm.accountNumber}}</div>
            <div class="m-item flex a-center">收款人姓名 : {{ruleForm.name}}</div>
            <div class="m-item flex a-center">
              收款金额 :
              <span style="font-size: 22px;">{{ruleForm.price}}</span>元
            </div>
          </div>
          <div class="m-btn">
            <el-button type="primary" @click="active=0">再转一笔</el-button>
            <el-button @click="look">查看账单</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      ruleForm: {
        account: "",
        accountType: "",
        accountNumber: "",
        name: "",
        price: ""
      },
      rules: {
        account: [
          { required: true, message: "付款账户不能为空", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "收款账号类型不能为空", trigger: "blur" }
        ],
        accountNumber: [
          { required: true, message: "收款账号不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "付款人不能为空", trigger: "blur" }],
        price: [
          { required: true, message: "收款金额不能为空", trigger: "blur" }
        ]
      },
      passForm: {
        password: ""
      },
      passRules: {
        password: [
          { required: true, message: "支付密码不能为空", trigger: "blur" }
        ]
      },
      accountOption: [
        { label: "支付宝", value: "支付宝" },
        { label: "银行卡", value: "银行卡" }
      ]
    };
  },
  components: {},
  props: {},
  methods: {
    nextStep(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.active++;
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
    look() {
      // 账单
      localStorage.setItem("order", JSON.stringify(this.ruleForm));
      // this.$router.push("/form/checkForm");
      window.open("/form/checkForm");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.info {
  padding: 20px;
  > div:last-child {
    font-size: 14px;
    color: #ccc;
    margin-top: 10px;
  }
}
.step1 {
  margin: 0 auto;
  width: 400px;
}
.account {
  display: flex;
  > div:first-child {
    flex: 1;
  }
  > div:last-child {
    flex: 2;
  }
}
.nextStep {
  display: flex;
  justify-content: flex-end;
}
.acountInfo {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  color: #272727;
  > div {
    margin-top: 10px;
  }
  span {
    font-size: 22px;
  }
}
.sure {
  margin: 0 auto;
  margin-top: 30px;
  width: 40%;
  .alert {
  }
}
.s-item {
  margin: 15px 0;
  color: #272727;
  font-size: 14px;
}
.msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .m-icon {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #52c41a;
    font-size: 32px;
    color: #fff;
  }
  .m-info {
    margin: 5px 0;
    color: #ccc;
    font-size: 14px;
  }
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
    display: flex;
    margin-top: 25px;
    justify-content: space-around;
    
  }

}
</style>