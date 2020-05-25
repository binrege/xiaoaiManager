import { createNamespacedHelpers } from 'vuex';
<template>
  <div class="wraps">
    <div class="heads">
      <div class="headLeft">
        <div>
          <i class="el-icon-folder-opened"></i>
        </div>
        <div>offer管理</div>
      </div>
      <div class="headRight">
        <div>
          <el-button type="primary" size="small">新建offer</el-button>
        </div>
        <div>
          <el-button type="primary" size="small">转移状态</el-button>
        </div>
        <div>
          <el-button type="primary" size="small">导出</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div class="c-btn">
          <el-button
            type="primary"
            size="mini"
            round
            v-for="(item,index) in status"
            :key="index"
          >{{item}}({{getOfferStatus(index)}})</el-button>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="offerList"
            tooltip-effect="dark"
            style="width:1200px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <template v-for="(item,index) in getOfferList">
              <el-table-column
                align="center"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span v-if="item.prop==='education'">{{educationList[scope.row.education]}}</span>
                  <span v-else-if="item.prop==='marriage'">{{marriages[scope.row.marriage]}}</span>
                  <span v-else-if="item.prop==='gender'">{{genderList[scope.row.gender]}}</span>
                  <span v-else-if="item.prop==='status'">{{statusList[scope.row.status]}}</span>
                  <span v-else>{{scope.row[item.prop]}}</span>
                </template>
              </el-table-column>
            </template>
            <el-table-column width="120" align="right">
              <template slot="header" slot-scope="scope">
                <el-popover v-model="visible0" placement="bottom" width="200" trigger="click">
                  <div class="edit">
                    <el-popover v-model="visible1" placement="left" width="100" trigger="click">
                      <el-checkbox-group v-model="addField">
                        <el-checkbox
                          v-for="(item,index) in getAddField(false)"
                          :key="index"
                          :label="item.label"
                        ></el-checkbox>
                      </el-checkbox-group>
                      <div class="btn">
                        <el-button
                          type="primary"
                          size="mini"
                          v-popover:popover1
                          @click="sureAdd(true)"
                        >确定</el-button>
                      </div>
                      <div slot="reference">添加显示字段</div>
                    </el-popover>
                    <el-popover v-model="visible2" placement="left" width="100" trigger="click">
                      <el-checkbox-group v-model="delField">
                        <el-checkbox
                          v-for="(item,index) in getAddField(true)"
                          :key="index"
                          :label="item.label"
                        ></el-checkbox>
                      </el-checkbox-group>
                      <div class="btn">
                        <el-button
                          type="primary"
                          size="mini"
                          v-popover:popover1
                          @click="sureAdd(false)"
                        >确定</el-button>
                      </div>

                      <div slot="reference">删除显示字段</div>
                    </el-popover>
                  </div>

                  <div>选择间距类型</div>
                  <div class="spaces">
                    <div
                      v-for="(item,index) in spaceList"
                      :key="index"
                      :class="{'active':active===index}"
                      @click="handleClick(index)"
                    >{{item}}</div>
                  </div>

                  <i class="el-icon-setting settingCOlor" slot="reference"></i>
                </el-popover>
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const offerModule = createNamespacedHelpers("offer");
const { mapActions: offerAction, mapState: offerState } = offerModule;
export default {
  data() {
    return {
      status: [
        "代发offer",
        "已发offer",
        "已接受offer",
        "已拒绝offer",
        "已入职offer"
      ],
     
      offerList: [],
      tableData: [],
      multipleSelection: [],
      tableProps: [
        { label: "民族", prop: "nation", isShow: true, isProp: true },
        { label: "电话", prop: "phone", isShow: true, isProp: true },
        { label: "学历", prop: "education", isShow: true, isProp: false },
        { label: "手机", prop: "tel", isShow: true, isProp: true },
        { label: "qq", prop: "qq", isShow: true, isProp: true },
        { label: "入职时间", prop: "createTime", isShow: true, isProp: true },
        { label: "工作地点", prop: "workAddress", isShow: true, isProp: true },
        { label: "部门", prop: "department", isShow: true, isProp: true },
        { label: "婚姻状态", prop: "marriage", isShow: true, isProp: false },
        { label: "姓名", prop: "name", isShow: false, isProp: true },
        { label: "个人邮箱", prop: "email", isShow: false, isProp: true },
        {
          label: "证件类型",
          prop: "certificates",
          isShow: false,
          isProp: true
        },
        {
          label: "证件号码",
          prop: "certificatesNum",
          isShow: false,
          isProp: true
        },
        { label: "性别", prop: "gender", isShow: false, isProp: false },
        { label: "职位", prop: "position", isShow: false, isProp: true },
        { label: "offer状态", prop: "status", isShow: false, isProp: false },
        { label: "出生日期", prop: "birthday", isShow: false, isProp: true },
        { label: "籍贯", prop: "nativePlace", isShow: false, isProp: false }
      ],
      page: 1,
      size: 10,
      pageSize: 10,
      educationList: [
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士",
        "博士以上"
      ],
      marriages: ["已婚", "未婚"],
      spaceList: ["紧凑", "适中", "宽松"],
      active: 1,
      rowStyle: { height: "60px" },
      addField: [],
      delField: [],
      visible0: false,
      visible1: false,
      visible2: false,
      filterProps: [],
      statusList: ["待发", "已发", "已接受", "已拒绝", "已入职"],
      genderList: ["男", "女"],
      currentPage4: 1
    };
  },
  components: {},
  props: {},
  methods: {
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // this.offerList=this.offer.splice(1,val)
        this.size=val
        this.offerList=this.offer.slice(1,val)


      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // console.log(this.offer);
        this.offerList=this.offer.slice(this.size*(val-1),this.size+this.size*(val-1))

      },
    ...offerAction(["getOffer"]),
    getOfferStatus(index) {
      // console.log(index);
      return this.offer.filter(item => {
        return item.status === index;
      }).length;
    },
    handleClick(index) {
      console.log(index);
      this.active = index;
    },
    // 获取可添加字段
    getAddField(flag) {
      let addList = this.tableProps.filter(item => item.isShow === flag);
      return addList;
    },
    getFilterProps() {
      this.filterProps = this.tableProps.filter(item => item.isShow);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 确认添加
    sureAdd(flage) {
      console.log(this.addField);
      let arr = this.addField;
      if (!flage) {
        arr = this.delField;
        this.visible2 = false;
      } else {
        this.visible1 = false;
      }
      if (!this.visible1 && !this.visible2) {
        this.visible0 = false;
      }
      arr.map(item => {
        this.tableProps.map(items => {
          if (items.label === item) {
            items.isShow = flage;
          }
          return;
        });
      });
      localStorage.setItem("tableProps", JSON.stringify(this.tableProps));
      this.getFilterProps();
      this.addField = [];
      this.delField = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {
    this.getOffer();
  },
  beforeMount() {
    if (localStorage.getItem("tableProps")) {
      this.tableProps = JSON.parse(localStorage.getItem("tableProps"));
    }
  },
  watch: {
    offer(val) {
      this.offerList = val.slice(1,10);
    }
  },
  computed: {
    ...offerState(["offer"]),
    getOfferList() {
      return this.tableProps.filter(item => {
        return item.isShow;
      });
    },
    total(){
      return this.offer.length
    }
  }
};
</script>

<style lang="scss" scoped>
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
.content {
  padding: 20px 0;
}
.settingCOlor {
  color: skyblue;
  font-size: 20px;
}
.edit {
  display: flex;
  font-size: 12px;
  cursor: pointer;
  color: skyblue;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  padding: 5px 0;
}
.spaces {
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    cursor: pointer;
  }
  margin-top: 10px;
}
.active {
  color: skyblue;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>