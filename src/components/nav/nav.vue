<template>
  <div class="wrap">
    <div class="isCollapse">
      <div v-if="isCollapse" @click="ChangeisCollapse">
        <i class="el-icon-s-unfold"></i>
      </div>
      <div v-else @click="ChangeisCollapse">
        <i class="el-icon-s-fold"></i>
      </div>
      <div class="title">{{ $t(`commons.xiaoBuAdmin`)}}</div>
    </div>
    <div class="navRight">
      <div>
        <el-dropdown placement="bottom">
          <div class="user el-dropdown-link">
            <i class="el-icon-edit-outline"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeLangEvent('cn')">简体中文</el-dropdown-item>
            <el-dropdown-item @click.native="changeLangEvent('tw')">繁体中文</el-dropdown-item>
            <el-dropdown-item @click.native="changeLangEvent('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div @click="handleFullScreen">
        <el-tooltip
          class="item"
          effect="dark"
          :content="fullscreen ? `取消全屏`:`全屏`"
          placement="bottom"
        >
          <i class="el-icon-full-screen"></i>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
          <i class="el-icon-lock" @click="handleLock"></i>
        </el-tooltip>
      </div>

      <div>
        <el-dropdown @command="userCommand">
          <div class="user el-dropdown-link">
            <div class="img">
             <img :src="userInfo.avatar" :alt="userInfo.username" />
            </div>
            <span>{{userInfo.username}}</span>

            <i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
           <el-dropdown-item :command="index" v-for="(item,index) in userList" :key="index">
                <el-upload
                  v-if="index===0"
                  class="avatar-uploader"
                  :headers="headers"
                  action="api/upload/image"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarError"
                >{{$t(`commons.${item}`)}}</el-upload>
                <span v-else>{{$t(`commons.${item}`)}}</span>
              </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="设置锁屏密码" :visible.sync="box" width="30%" append-to-body>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空'}]">
          <el-input v-model="form.passwd" placeholder="请输入锁屏密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSetLock">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog title="修改密码" :visible.sync="dialogVisible" width="520px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入原密码" prop="password" required>
          <el-input type="password" show-password v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newPwd" required>
          <el-input type="password" show-password v-model="ruleForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="checkPass" required>
          <el-input type="password" show-password v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPwd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatenull } from "../../utils/validate";
import { mapGetters,createNamespacedHelpers } from "vuex";
import { setStore, getStore, removeStore } from "../../utils/store.js";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
     var validatePass = (rule, value, callback) => {
      if (this.ruleForm.checkPass !== "") {
        this.$refs.ruleForm.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userList: ["uploadAvatar", "editPwd", "logout"],
      fullscreen: false,
      isCollapse: false,
      box: false,
      dialogVisible:false,
      form: {
        passwd: ""
      },
       ruleForm: {
        password: "",
        newPwd: "",
        checkPass: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, message: "密码最少为六个字符", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码最少为六个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { min: 6, message: "密码最少为六个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...userActions(["logout", "updatePwd"]),
     // 用户选项
    userCommand(command) {
      if (command === 2) {
        this.logout();
        this.$store.state.userInfo = {};
        localStorage.removeItem("userInfo");
        this.$router.push("/login");
      } else if (command === 1) {
        this.dialogVisible = true;
      }
    },
    handleSetLock() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store.commit("SET_LOCK_PASSWD", this.form.passwd);

          this.handleLock();
        }
      });
    },
      // 上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      let a = /\.(jpg|jepg|gif|png)$/;
      const isType = a.test(file.name);
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else if (!isType) {
        this.$message.error("请上传jpg/png图片!");
      }
      return isLt2M && isType;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$store.state.userInfo.avatar = res.url;
        localStorage.setItem(
          "userInfo",
          JSON.stringify(this.$store.state.userInfo)
        );
        this.$notify({
          title: res.msg,
          type: "success"
        });
      } else {
        this.$notify({
          title: res.msg,
          type: "warning"
        });
      }
    },
    // 上传失败
    handleAvatarError(res) {
      console.log(err);
    },
    handleLock() {
      console.log(this.lockPasswd + "11");
      console.log(
        getStore({
          name: "lockPasswd"
        })
      );
      if (
        !getStore({
          name: "lockPasswd"
        })
      ) {
        this.box = true;
        return;
      }
      this.$store.commit("SET_LOCK");
      setTimeout(() => {
        this.$router.push("/lock");
      }, 100);
    },
    ChangeisCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$bus.$emit("isCollapse", this.isCollapse);
    },
    changeLangEvent(lang) {
      this.$i18n.locale = lang; //关键语句
      localStorage.setItem("lang", lang);
    },
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
   beforeMount() {
    this.headers = {
      Authorization: localStorage.getItem("adminToken")
    };
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["lockPasswd"]),
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style scoped lang='scss'>
.wrap {
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f2f5;
}
.isCollapse {
  i {
    font-size: 22px;
    // margin-right: 20px;
    display: flex;
    align-items: center;
  }
  display: flex;
  align-items: center;
  .title {
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 18px;
    color: #2e5e85;
  }
}
.navRight {
  width: 300px;
  i {
    font-size: 22px;
    // margin-right: 20px;
    display: flex;
    align-items: center;
  }
  display: flex;
  justify-content: space-around;
  align-items: center;
  .user {
    display: flex;
    align-items: center;
    justify-content: space-around;
   
  }
}
 img {
      width: 30px;
      margin-right: 5px;
      height: 30px;
      border-radius: 50%;
      background: #c0c4cc;
    }
</style>