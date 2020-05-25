import { createNamespacedHelpers } from 'vuex';
<template>
  <div>
    <!-- {{payList}} -->
    <div class="heads">
      <div class="headLeft">
        <div>
          <i class="el-icon-price-tag"></i>
        </div>
        <div>薪酬管理</div>
      </div>
      <div class="headRight"></div>
    </div>
    <div class="h-con">
      <div>{{formatTime()}} 薪酬预算</div>
      <div>
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>
    <div class="h-desc">如果有更多的渠道请自行添加, 所有添加的渠道会显示在CRM系统中</div>
    <div>
      <el-card class="box-card">
        <div class="c-title">薪资结构</div>
        <el-table :data="tableData" style="width: 100%" @cell-click="addInput">
          <el-table-column align="center" prop="name" label="薪资构成" width="180">
              <template slot-scope="scope">
                <div>
                  <span
                    class="edit"
                    v-if="!scope.row.name||columnId===`${scope.$index}${scope.column.id}`"
                  >
                    <el-input v-model="scope.row.name" size="mini" @blur="submit" />
                  </span>
                  <span v-else>{{scope.row.name}}</span>
                </div>
              </template>
          </el-table-column>
          <el-table-column align="center" prop="planMoney" label="计划支出(元)" width="180">
            <template slot-scope="scope">
              <div @click="clickCell(scope.$index, scope.column.id,scope.row)">
                <span v-if="!scope.row.planMoney||columnId===`${scope.column.id}${scope.$index}`">
                  <el-input v-model="scope.row.planMoney" size="mini" autofocus="true"  @blur="submit"></el-input>
                </span>
                <span v-else>{{scope.row.planMoney}}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="thisMonth" label="实际支出(元)">
            <template slot-scope="scope">
              <div @click="clickCell(scope.$index, scope.column.id,scope.row)">
                <span v-if="!scope.row.thisMonth||columnId===`${scope.column.id}${scope.$index}`">
                  <el-input v-model="scope.row.thisMonth" size="mini" autofocus="true" @blur="submit"></el-input>
                </span>
                <span v-else>{{scope.row.thisMonth}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column></el-table-column>
          <el-table-column></el-table-column>
          <el-table-column align="center" prop="lastMonth" label="上月计划(元)"></el-table-column>
          <el-table-column align="center" prop="actualMoney" label="上月实际(元)"></el-table-column>
        </el-table>
        <div class="addMore">
          <div class="btn">
            <el-button type="primary" @click="Addmore">添加更多</el-button>
          </div>
          <div class="btn">
            <el-button type="primary" @click="cancal" v-if="showMore">取消</el-button>
          </div>
        </div>
        <div class="totle">
          <div>总计</div>
          <div>{{reduceNumber('planMoney')}}</div>
          <div>{{reduceNumber('thisMonth')}}</div>
          <div></div>
          <div></div>
          <div>{{reduceNumber('lastMonth')}}</div>
          <div>{{reduceNumber('actualMoney')}}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const payModule = createNamespacedHelpers("pay");
const { mapState: payState, mapActions: payAction } = payModule;
export default {
  data() {
    return {
      payList: [],
      columnId: null,
      showMore: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: '',
      value2:new Date() ,
      tableData: []
    };
  },
  components: {},
  props: {},
  methods: {
    ...payAction(["payMsg"]),
     reduceNumber(prop) {
      let result = this.tableData.reduce((a, b) => {
        a = Number(a) + Number(b[prop]);
        return a;
      }, 0);
      return result;
    },
    submit(){
        this.columnId=0
         this.showMore=false
        this.$message({
          message: '修改成功',
          type: 'success'
        });
       
    },
    formatTime(){
        return this.$dayjs(this.value2).format("YYYY年MM月")
    },
    addInput(row, column, cell, event) {
      // console.log(row);
      // console.log(column);
      // console.log(cell);
      // console.log(event);
    },
    clickCell(index, column, row) {
      this.columnId = column + index;
      console.log(index);
      console.log(column);
      console.log(row);
    },
    Addmore() {

      this.showMore = true;
      let a = {
        name: null,
        planMoney: null,
        actualMoney: 0,
        lastMonth: 0,
        thisMonth:null
      };
      this.tableData.push(a);
    },
    cancal() {
        this.tableData.pop();
      this.showMore = false;
       
    }
  },
  mounted() {
    this.payMsg();
  },
  watch: {
    payInfo(val) {
      this.tableData = val;
    }
  },
  computed: {
    ...payState(["payInfo"])
  }
};
</script>

<style scoped lang='scss'>
.heads {
  width: 100%;
  display: flex;
  margin-top: 20px;
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
.h-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  > div:first-child {
    font-size: 24px;
    font-weight: 700;
    padding-left: 15px;
    height: 80px;
    line-height: 80px;
  }
}
.h-desc {
  background: #e5f2e1;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  font-size: 14px;
}
.c-title {
  font-size: 24px;
  font-weight: 700;
}
.addMore {
  display: flex;
  margin-top: 20px;
  padding-left: 40px;
  > div:first-child {
    margin-right: 20px;
  }
}
.totle{
    display: flex;
    >div{
        text-align: center;
        flex: 1;
    }
    padding: 10px 0;
    color: #0285DC;
}
</style>