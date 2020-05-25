<template>
  <div class="lunarFullCalendar">
    <div class="full-calendar"> 
      <LunarFullCalendar :config="config" :events="events" @event-render="eventRender" :plugins="calendarPlugins" />
    </div>
     <!-- 添加日程 -->
    <el-dialog :visible.sync="dialogVisible" width="650px">
      <span slot="title" class="dialog-header">日程</span>
      <el-form
        :model="ruleForm"
        label-width="100px"
        label-position="left"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="schedule" label="内容：" required>
          <el-input clearable placeholder="准备做什么..." v-model="ruleForm.schedule"></el-input>
        </el-form-item>
        <el-form-item label="时间：" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-time-select
                placeholder="起始时间"
                v-model="ruleForm.startTime"
                :picker-options="{
      start: '07:00',
      step: '00:15',
      end: '23:30',
        maxTime: ruleForm.endTime
    }"
              ></el-time-select>
            </el-form-item>
          </el-col>

          <el-col class="line" :span="1">~</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-time-select
                placeholder="结束时间"
                v-model="ruleForm.endTime"
                :picker-options="{
      start: '07:00',
      step: '00:15',
      end: '24:00',
      minTime: ruleForm.startTime
    }"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="参与人：">
          <div class="person flex a-center">
            <span>{{getUser}}</span>
            <el-popover placement="top" width="220" v-model="visible">
              <el-input clearable placeholder="请输入参与人的姓名" v-model="ruleForm.username"></el-input>
              <div style="text-align: right; marginTop: 10px">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="addUser">确定</el-button>
              </div>
              <span
                slot="reference"
                style="color: rgb(2, 133, 220); font-size: 18px; margin-left: 8px;"
                class="el-icon-circle-plus-outline"
              ></span>
              <!-- <i class=""></i> -->
            </el-popover>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlulgin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import "@fullcalendar/core/locales/zh-cn"; // 支持中文
import { createNamespacedHelpers } from "vuex";
const calendarModule = createNamespacedHelpers("calendar");
const { mapActions: calendarActions, mapState: calendarState } = calendarModule;
export default {
  data() {
    return {
      dialogVisible: false,
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlulgin,
        momentPlugin,
        interactionPlugin
      ],
      events: [
        {
          title: "参加区政府组织的会议",
          start: "2019-11-19 08:30:00",
          end: "2019-11-17 10:00:00",
          color: "#FF8600"
        },
        {
          title: "参加市政府组织的会议",
          start: "2019-11-21 08:30:00",
          end: "2019-11-19 10:00:00",
          color: "#019C51"
        },
        {
          title: "带队视察辖区冬季供热工作",
          start: "2019-11-21 10:30:00",
          end: "2019-11-19 12:00:00",
          color: "#1C44BD"
        },
        {
          title: "带队视察辖区冬季供热工作",
          start: "2019-11-23 10:30:00",
          end: "2019-11-19 12:00:00",
          color: "#1C44BD"
        }
      ],
      config: {
        header: {
          left: "prev,next",
          right: "month,basicWeek,agendaDay",
          center: "title"
        },
        eventClick: this.eventClick, // 点击事件
        dayClick: this.dayClick, // 点击日程表上面某一天
        // lunarCalendar: true, //控制中文日历是否显示为真
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        height: 770,
        editable: true, // 是否允许修改事件
        selectable: true,
        eventLimit: 4, // 事件个数
        allDaySlot: true, // 是否显示allDay
        defaultView: "month", // 显示默认视图
        titleFormat: "YYYY年MM月",

        // dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        ignoreTimezone: true
      },
      calendarEvent: [],
       ruleForm: {
        schedule: "",
        startTime: "",
        endTime: "",
        users: [],
        username: "",
        currentDay: null
      },
      visible: false,
      rules: {
        schedule: [
          { required: true, message: "日常内容不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: { LunarFullCalendar },
  props: {},
  methods: {
    ...calendarActions(["getCalendar","addCalendar","delCalendar",'repeatDynamic']),
    // 点击事件
    eventClick(event, jsEvent, pos) {
      console.log(event);
           let _this = this;
      if (event.schedule) {
        // 删除日程
        this.$confirm("此操作将永久删除该日程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            _this.delCalendar({id:event._id});
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        // 重复上周
        this.$confirm("是否重复上周日程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            _this.repeatDynamic({currentDay:event.start.format("YYYY-MM-DD")});
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    // 点击当天
    dayClick(date, allDay, jsEvent, view) {
       if (date._d <=this.$dayjs(new Date()).subtract(1, "days")) {
        this.$message({
          message: "不能安排今天之前的日程",
          type: "warning"
        });
      } else {
        this.ruleForm.currentDay = this.$dayjs(date._d).format("YYYY-MM-DD");
        this.dialogVisible = true;
      }
      console.log("dayClick", date, allDay, jsEvent, view);
    },
     // 添加参与人
    addUser() {
      if (this.ruleForm.username.trim().length > 0) {
        let flage = this.ruleForm.users.includes(this.ruleForm.username);
        if (!flage) {
          this.ruleForm.users.push(this.ruleForm.username);
        } else {
          this.$message({
            message: "已有该参与人",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "输入为空",
          type: "warning"
        });
      }
      this.visible = false;
    },
     // 确认添加
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let obj = Object.assign({}, this.ruleForm);
          obj.startTime = `${obj.currentDay} ${obj.startTime}:00`;
          obj.endTime = `${obj.currentDay} ${obj.endTime}:00`;
          obj.currentDay = this.$dayjs(obj.currentDay).format("YYYY-MM-DD");
          let flage = await this.addCalendar(obj);
          if (flage) {
            this.$refs.ruleForm.resetFields();
          }
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
      // 展示日程
    viewRender(view, element) {
      var time = view.calendar.currentDate._i;
      this.years = this.$dayjs(time).format("YYYYMM");
      // this.initData(this.years);
    },
    // 渲染展示日程
    eventRender(event, element) {
      if (event.schedule) {
        let a =
          this.$dayjs(event.startTime).format("hh:mm") +
          " - " +
          this.$dayjs(event.endTime).format("hh:mm") +
          event.schedule;
        element[0].innerHTML =
          a +
          "<br/>" +
          `参与人：${event.users.join(" ")} ` +
          "<br/>" +
          `参与人数: <i class="el-icon-user-solid"></i>${event.users.length}`;
      }
    }
  },
  mounted() {
  
  },
  beforeMount() {
    // 获取日程
    this.getCalendar();
    if (localStorage.getItem("adminUser")) {
      let username = JSON.parse(localStorage.getItem("adminUser")).username;
      this.ruleForm.users.push(username);
    }
  },
  watch: {
    calendarList(val) {
      this.events = val;
      let arr = [];
      // 处理日程
      this.events.map(item => {
        item.start = item.currentDay + " 00:00:00";
        item.end = item.currentDay + " 00:00:00";
        item.title = item.schedule;
        let a =
          new Date(item.currentDay + " 00:00:00").valueOf() * 1 +
          86400 * 7 * 1000;
        let b = this.$dayjs(a).format("YYYY-MM-DD");
        let flage = val.some(items => items.currentDay === b);
        if (!flage) {
          let c = {
            start: b + " 00:00:00",
            end: b + " 00:00:00",
            title: "重复上周",
            backgroundColor: "pink!important"
          };
          arr.push(c);
        }
      });
      this.events = this.events.concat(arr);
    }
  },
  computed: {
    ...calendarState(["calendarList"]),
     // 处理参与人
    getUser() {
      return this.ruleForm.users.join(" ");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/calendar";
//修改日历组件样式
::v-deep .fc-toolbar h2 {
  font-size: 14px;
  line-height: 38px;
  display: inline;
}
::v-deep .fc .fc-toolbar > * > * {
  margin-left: 0;
}
::v-deep .fc th,
.fc td {
  font-weight: normal;
  color: #565a66;
}
::v-deep .fc-day-grid-event .fc-content {
  white-space: normal;
}
::v-deep .fc-day-grid-event .fc-time {
  display: block;
}
::v-deep .fc-unthemed td.fc-today {
  background: #f7f9ff;
}

::v-deep .fc-state-default {
  background: #fff;
  box-shadow: none;
  border-color: #d9d9d9;
  color: #000;
  font-size: 14px;
  margin-top: 5px;
}
::v-deep .fc-state-active {
  background-color: #fff;
  box-shadow: none;
  color: #446bde;
  border-color: #446bde;
}
::v-deep .fc-prev-button {
  border: 0;
}
::v-deep .fc-next-button {
  border: 0;
}
::v-deep .fc-event-container {
  opacity: 0.5;
}
::v-deep .fc-day-header {
  padding: 5px;
  color: #565a66;
}

</style>

