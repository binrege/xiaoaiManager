import { createNamespacedHelpers } from 'vuex';
<template>
  <div class="wrapper">
    <div class="heads">
      <div class="headLeft">
        <div>
          <i class="el-icon-user"></i>
        </div>
        <div>人员信息</div>
      </div>
      <div class="headRight">
        <div class="btn-confirm" v-if="isconfirm">
          <div>
            <el-button type="primary" size="small" @click="confirm">确认</el-button>
          </div>
          <div>
            <el-button type="primary" size="small" @click="cancel">取消</el-button>
          </div>
        </div>

        <div v-if="!isconfirm">
          <el-button type="primary" size="small" @click="isconfirm=true">批量转正申请</el-button>
        </div>
        <div>
          <el-button type="primary" size="small">导出</el-button>
        </div>
      </div>
    </div>
    <div class="btn">
      <div v-for="(item,index) in userTypeList" :key="index">
        <div
          class="btnType"
          :class="active===index? 'active':''"
          @click="handleclick(index)"
        >{{item}}</div>
      </div>
    </div>
    <div class="tab">
      <el-table
         clearSelection
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
       
        <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column align="center" prop="num" sortable label="工号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="mechanism" label="机构" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="department" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          prop="startTime"
          sortable
          label="试用期开始日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="endTime"
          sortable
          label="试用期结束日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="state" label="转正审批状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state===0">审批通过</span>
            <span v-if="scope.row.state===1">审批未通过</span>
            <span v-if="scope.row.state===2">审批中</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑试用期</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userInfoModule = createNamespacedHelpers("userInfo");
const { mapActions: userInfoAction, mapState: userInfoState } = userInfoModule;
export default {
  data() {
    return {
      isconfirm: false,
      active: 0,
      userTypeList: ["全部员工", "考核中员工", "已转正员工"],
      tableData: [],
      multipleSelection: [],
      page: 1,
      size: 10,
      currentPage4: 1
    };
  },
  components: {},
  props: {},
  methods: {
    ...userInfoAction(["userInfoS"]),
    handleclick(index) {
      if(index===0){
        this.tableData=this.userInfo.slice(this.size * (this.currentPage4 - 1),
        this.size + this.size * (this.currentPage4 - 1))
      }else if(index===1){
        this.tableData=this.userInfo.filter(item=>{
          return item.state===2
        }).slice(this.size * (this.currentPage4 - 1),
        this.size + this.size * (this.currentPage4 - 1))
      }else{
        this.tableData=this.userInfo.filter(item=>{
          return item.state===0
        }).slice(this.size * (this.currentPage4 - 1),
        this.size + this.size * (this.currentPage4 - 1))
      }
      this.active = index;

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.offerList=this.offer.splice(1,val)
      this.size = val;
      this.tableData = this.userInfo.slice(1, val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // console.log(this.offer);
      this.tableData = this.userInfo.slice(
        this.size * (val - 1),
        this.size + this.size * (val - 1)
      );
    },
    //确定
    confirm(){
      this.isconfirm=false
      this.multipleSelection.map(item=>{
        item.state=0
      })
      this.multipleSelection=[]
      console.log(this.multipleSelection);

    },
    cancel(){

    }

  },
  mounted() {
    this.userInfoS();
  },
  watch: {
    userInfo(val) {
      this.tableData = val.slice(1,10);
    }
  },
  computed: {
    ...userInfoState(["userInfo"]),
    total() {
      return this.userInfo.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.heads {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headLeft {
  display: flex;
  > div:first-child {
    width: 26px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background: #38ba72;
    color: white;
    margin-right: 8px;
  }
  > div:last-child {
    font-weight: 700;
  }
}
.headRight {
  display: flex;
  align-items: center;
  > div:nth-child(2) {
    margin: 0 5px;
  }
}
.btn-confirm {
  display: flex;
  justify-content: space-between;
  > div {
    margin-right: 10px;
  }
}
.btn {
  display: flex;
  > div:nth-child(2) {
    margin: 0 10px;
  }
  margin-top: 20px;
  padding: 0 20px;
}
.btnType {
  background: #ecf5ff;
  color: #409eff;
  height: 32px;
  line-height: 32px;
  text-align: center;
  width: 82px;
  font-size: 12px;
  border-radius: 16px;
  cursor: pointer;
}
.active {
  background: #1587d9 !important;
  color: white;
}
span {
  cursor: pointer;
  color: #0285dc;
}
</style>