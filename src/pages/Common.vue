<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          :collapse="isCollapse"
        >
          <template v-for="(item) in menu">
            <el-submenu :index="item.url" v-if="item.children.length>0">
              <template slot="title">
                <i :class="'el-icon-'+item.icons"></i>
                <span slot="title">{{$t(`commons.${item.enName}`)}}</span>
              </template>
              <el-menu-item
                :index="items.url"
                v-for="(items,indexs) in item.children"
                :key="indexs"
              >
                <i :class="'el-icon-'+items.icons"></i>
                <span slot="title">{{$t(`commons.${items.enName}`)}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.url" v-if="item.children.length===0">
              <i :class="'el-icon-'+item.icons"></i>
              <span slot="title">{{$t(`commons.${item.enName}`)}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="headers">
        <div>
          <Nav></Nav>
        </div>
        <div>
          <Mains :navs="navs"></Mains>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./../components/nav/nav";
import Mains from "./../components/main/mains";
import { createNamespacedHelpers } from "vuex";
const indexModule = createNamespacedHelpers("indexs");
const { mapActions: indexActions, mapState: indexState } = indexModule;
export default {
  name: "",
  props: {},
  components: {
    Nav,
    Mains
  },
  data() {
    return {
      active: "/home",
      msg: "我是home组件的数据",
      isCollapse: false,
      navs: ["dashboard"],
     
    };
  },
  methods: {
    ...indexActions(["getMenus"]),
    ChangeisCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$bus.$emit("isCollapse", this.isCollapse);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);

     
      if(key==="/home"){
        this.navs=["dashboard","dashboard"]
         this.$router.push("/");
      }else{
         this.$router.push(key);
      }
      
      console.log(this.$route);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.$bus.$on("isCollapse", data => {
      this.isCollapse = data;
    });
    if (this.$route.path === "/") {
    } else {
      this.active = this.$route.path;
    }
    //  console.log(this.$router);
    console.log(this.$route);
    // if (this.$route.matched[0].meta.name === "首页") {
    //   this.navs.push(this.$route.matched[0].meta.enName);
    //   // console.log(this.navs);
    // }
    
      this.$route.matched.map((item, index,arr) => {
        if (item.meta.enName) {
          if(arr.length>1){
            this.navs.push(item.meta.enName);
          }
         
        }
      });
    this.getMenus()
  },
  created() {
    if (this.$route.matched.length===1) {
      this.$set(this.$route.matched[0].meta, "name", "首页");
      this.$set(this.$route.matched[0].meta, "enName", "dashboard");
      this.navs.push(this.$route.matched[0].meta.enName)
    }

    console.log("created");
  },
  watch: {
    $route(val, oldVal) {
      console.log(val);
      this.navs = ["dashboard"];
      val.matched.map((item, index) => {
        if (item.meta.enName) {
          this.navs.push(item.meta.enName);
        }
      });
    }
  },
  computed: {
    ...indexState(["menu"])
  }
};
</script>

<style scoped lang='scss'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  overflow: hidden;
}
.wrap {
  display: flex;
}
.nav {
  min-height: 100vh;
  overflow-x: hidden !important;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    overflow: hidden;
  }
}
::v-deep .el-menu {
  border-right: none !important;
}

.headers {
  width: 100%;
}
::v-deep .el-submenu__icon-arrow{
  right: 30px;
}
</style>