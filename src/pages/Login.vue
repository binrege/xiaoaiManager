<template>
  <div class="wraper">
    <div class="content">
      <div class="title">
        <div class="eng">XiaoAi Admin</div>
        <div class="chni">这是一个酷炫的后台管理系统</div>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="账号密码登录" name="first">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label label-width="0" style="width: 322px;" prop="username">
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="ruleForm.username"
                  placeholder="2-10位用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label label-width="0" prop="password">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="ruleForm.password"
                  placeholder="6位以上的密码"
                  show-password
                ></el-input>
              </el-form-item>
              <div class="code">
                <el-form-item label label-width="0" style="width: 200px;" prop="code">
                  <el-input
                    prefix-icon="el-icon-document"
                    v-model="ruleForm.code"
                    placeholder="验证码"
                  ></el-input>
                </el-form-item>
                <div class="svgCode" @click="getCode" v-html="code"></div>
              </div>
              <div class="remenberMe">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <el-button type="text">忘记密码?</el-button>
              </div>
              <el-button type="primary" style="width: 322px;" @click="logins('ruleForm')">登录</el-button>
              <div class="remenberMe">
                <div class="loginStyle">
                  <div>其他方式登录</div>
                  <img src="../assets/images/github.svg" alt />
                </div>
                <el-button type="text" @click="$router.push('/register')">注册账号</el-button>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <el-form
              :model="ruleForm1"
              :rules="rules"
              ref="ruleForm1"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label label-width="0" style="width: 322px;" prop="phone">
                <el-input prefix-icon="el-icon-phone" v-model="ruleForm1.phone" placeholder="11位手机号"></el-input>
              </el-form-item>

              <div class="codes">
                <el-form-item label label-width="0" style="width: 200px;" prop="sms">
                  <el-input
                    prefix-icon="el-icon-document"
                    v-model="ruleForm1.sms"
                    placeholder="6位验证码"
                  ></el-input>
                </el-form-item>
                <el-button @click="sendMsg" :disabled="isSend">{{codeMsg}}</el-button>
              </div>
              <div class="remenberMe">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <el-button type="text">忘记密码?</el-button>
              </div>
              <el-button type="primary" style="width: 322px;" @click="Phonelogins('ruleForm1')">登录</el-button>
              <div class="remenberMe">
                <div class="loginStyle">
                  <div>其他方式登录</div>
                  <img src="../assets/images/github.svg" alt />
                </div>
                <el-button type="text" @click="$router.push('/register')">注册账号</el-button>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      isSend: false,
      codeMsg: "验证码",
      activeName: "first",
      checked: true,
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      ruleForm1: {
        phone: "",
        sms: "",
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

        phone: [
          {
            required: true,
            message: "请输入合法手机号",
            trigger: "blur"
          }
        ],
        code: [{}],
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
    ...userActions(["login", "getCode", "sendCode",'loginByPhone']),
    submit() {
      // this.login({
      //   username: this.form.username,
      //   password: this.form.password
      // });
    },
    sendMsg() {
      if (this.ruleForm1.phone) {
        this.isSend = true;
        this.sendCode(this.ruleForm1.phone)
          .then(res => {
            console.log(res);
            let i = 60;
            let timerId = setInterval(() => {
              this.codeMsg = `重新发送(${i})`;
              i--;
              if (i === 0) {
                this.isSend = false;
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
    handleClick() {},
    Phonelogins(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loginByPhone(this.ruleForm1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    logins(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.login(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.getCode();
  },
  watch: {},
  computed: {
    ...userState(["code"])
  }
};
</script>

<style scoped lang='scss'>
.wraper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
  width: 320px;
}
.codes {
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.code {
  height: 60px;
  display: flex;

  justify-content: space-between;
  .svgCode {
    height: 40px;
    margin-top: 5px;
  }
}
::v-deep rect {
  height: 40px;
}
.remenberMe {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loginStyle {
  font-size: 14px;
  display: flex;
  img {
    width: 20px;
    margin: 0 3px;
  }
}
</style>