<template>
  <div class="content">
    <div class="wrap">
      <div class="title">
        <div class="eng">XiaoAi Admin</div>
        <div class="chni">这是一个酷炫的后台管理系统</div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label label-width="0" style="width: 322px;" prop="username">
          <el-input prefix-icon="el-icon-user" v-model="ruleForm.username" placeholder="2-10位用户名"></el-input>
        </el-form-item>
        <el-form-item label label-width="0" prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password" placeholder="6位以上的密码"></el-input>
        </el-form-item>
        <el-form-item label label-width="0" prop="email">
          <el-input prefix-icon="el-icon-user" v-model="ruleForm.email" placeholder="合法邮箱"></el-input>
        </el-form-item>
        <el-form-item label label-width="0" prop="phone">
          <el-input prefix-icon="el-icon-phone" v-model="ruleForm.phone" placeholder="11位合法手机号"></el-input>
        </el-form-item>
        <div class="code">
          <el-form-item label label-width="0" style="width: 200px;" prop="sms">
            <el-input prefix-icon="el-icon-document" v-model="ruleForm.sms" placeholder="6位验证码"></el-input>
          </el-form-item>
          <el-button @click="sendMsg">{{codeMsg}}</el-button>
        </div>
        <div class="register">
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <div  @click='$router.push("/login")'>使用已有账号登录</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      codeMsg: "验证码",
      ruleForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
        sms: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "输入密码", trigger: "blur" },
          { min: 6, message: "密码长度大于6", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "请输入合法邮箱",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入合法手机号",
            trigger: "blur"
          }
        ],
        sms: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...userActions(["sendCode","register"]),
    sendMsg() {
      if (this.ruleForm.phone) {
        this.sendCode(this.ruleForm.phone)
          .then(res => {
            console.log(res);
            let i = 60;
            let timerId = setInterval(() => {
              this.codeMsg = `重新发送(${i})`;
              i--;
              if (i === 0) {
                clearInterval(timerId);
                this.codeMsg = `重新发送`;
                i = 60;
              }
            }, 1000);
          })
          .catch(err => {});
      } else {
        this.$message({
          message: "请输入合法的手机号",
          type: "error"
        });
      }
    },
    submitForm(ruleForm) {
    console.log(this.ruleForm);
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.register(this.ruleForm)
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  width: 222px;
  height: 158px;
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: flex-end;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  div {
    text-align: center;
  }
  .eng {
    width: 100%;
    font-size: 32px;
    font-weight: 800;
  }
  .chni {
    font-size: 16px;
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.code {
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.register {
  display: flex;

  justify-content: space-between;
  ::v-deep .el-button {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div {
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
  }
}
</style>