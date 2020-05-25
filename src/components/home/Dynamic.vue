<template>
  <div class="wrap">
    <el-scrollbar style="height:100%">
      <div class="content">
        <div class="header">
          <div>个人动态</div>
          <div>
            <ElButton type="primary" size="mini" @click="dialogFormVisible = true">添加动态</ElButton>
          </div>
        </div>
        <div class="elChart">
          <div>
            <el-date-picker
              v-model="form.date"
              @change="dateChange"
              type="date"
              placeholder="请选择日期"
            ></el-date-picker>
          </div>
        </div>
        <div v-if="dynamicData.length===0">暂无数据</div>
        <div v-else>
          <div
            class="items"
            v-for="(item,index) in dynamicData"
            :class="index%2===0 ? 'back':'c-desc'"
            :key="index"
          >
            <div class="top">
              <div>
                <div>类型:</div>
                <div>{{item.classification}}</div>
              </div>
              <div>
                <div>发布人:</div>
                <div>{{item.username}}</div>
              </div>
            </div>
            <div v-if="item.reportUsers.length>0" class="itemsMiddle">
              <div>汇报人:</div>
              <div v-for="(items,indexs) in item.reportUsers" :key="indexs">{{items}}</div>
            </div>
            <div class="bottom">
              <div>
                <div>动态:</div>
                <div>{{item.dynamic}}</div>
              </div>
              <div class="timer">发布于{{formatTime(item.date)}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>

    <div class="dialog">
      <el-dialog title="添加动态" show-close :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="动态类型" :label-width="formLabelWidth">
            <el-select
              v-model="form.classification"
              size="medium"
              placeholder="请选择动态类型"
              style="display:block"
            >
              <el-option label="个人心情" value="个人心情"></el-option>
              <el-option label="工作汇报" value="工作汇报"></el-option>
              <el-option label="公司相关" value="公司相关"></el-option>
              <el-option label="其他事务" value="其他事务"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="相关汇报人"
            v-if="form.classification==='工作汇报'"
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.reportUsers" multiple placeholder="请选择" style="display:block">
              <el-option
                v-for="item in Report"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情内容" :label-width="formLabelWidth">
            <el-input v-model="form.dynamic" autosize type="textarea" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const indexModule = createNamespacedHelpers("indexs");
const { mapActions: indexActions, mapState: indexState } = indexModule;
export default {
  data() {
    return {
      value1: new Date(),
      dialogFormVisible: false,
      formLabelWidth: "110px",
      form: {
        username: JSON.parse(localStorage.getItem("adminUser")).username,
        date: new Date(),
        classification: "",
        dynamic: "",
        reportUsers: []
      },
      dynamicData: []
    };
  },
  components: {},
  props: {},
  methods: {
    ...indexActions(["addDynamic", "getDynamic", "getReport"]),
    submit() {
      console.log(this.form);
      this.addDynamic(this.form);

      this.dialogFormVisible = false;
    },
    formatTime(time) {
      return this.$dayjs(time).format("YYYY年MM月DD日");
    },
    dateChange(e) {
      this.getDynamic();
      this.dynamicData = this.Dynamic.filter(item => {
        return item.date === this.form.date;
      });
      console.log(this.dynamicData);
    }
  },
  mounted() {
    this.getDynamic();
    this.getReport();
  },
  watch: {
    Dynamic(val) {
      console.log(val);
      console.log(this.form.date);

      this.dynamicData = val.filter(item => {
        return this.formatTime(item.date) === this.formatTime(this.form.date);
      });
      console.log(this.dynamicData);
    }
  },
  computed: {
    ...indexState(["Report", "Dynamic"])
  }
};
</script>

<style scoped lang='scss'>
.header {
  height: 53px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.wrap {
   border: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
.content {
  max-height: 453px;
  padding: 0 20px;
 
  border-bottom: none!important;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.elChart {
  padding: 20px 0;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.items {
  padding: 0 20px;
  min-height: 112px;
  display: flex;
  margin: 15px 0;
  flex-direction: column;
  justify-content: space-around;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
  }
}
.itemsMiddle {
  display: flex;
  //   justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
  }
  > div:not(:first-child) {
    margin-right: 5px;
  }
}
.back {
  background: #eee;
}
.c-desc {
  background: #fafafa;
}
.c-desc:hover,
.back:hover {
  background: #f2f3f7;
}
.timer {
  color: #ccc;
}
</style>