<template>
  <div class="wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>网站问卷调查</span>
      </div>
      <el-table :data="questionDatas" align="center">
        <el-table-column prop="name" align="center" label="问卷名称" :width="lableWidth"></el-table-column>
        <el-table-column prop="desc" align="center" label="问卷描述" :width="lableWidth"></el-table-column>
        <el-table-column prop="startTime" align="center" label="创建时间" sortable :width="lableWidth"></el-table-column>
        <el-table-column prop="endTime" align="center" label="截止时间" sortable :width="lableWidth"></el-table-column>
        <el-table-column prop="status" align="center" label="问卷状态" :width="lableWidth">
          <template slot-scope="scope">
            <el-tag type="primary" disable-transitions v-if="scope.row.status=='0'">未发布</el-tag>
            <el-tag type="primary" disable-transitions v-if="scope.row.status=='1'">已发布</el-tag>
            <el-tag type="primary" disable-transitions v-if="scope.row.status=='2'">已截至</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="url" align="center" label="网站名称" :width="lableWidth">
          <template slot-scope="scope">
            <el-tag type="warning" disable-transitions v-if="scope.row.url=='https://juejin.im/'">掘金</el-tag>
            <el-tag
              type="success"
              disable-transitions
              v-if="scope.row.url=='https://www.baidu.com'"
            >百度</el-tag>
            <el-tag
              type="info"
              disable-transitions
              v-if="scope.row.url=='https://github.com/'"
            >Github</el-tag>
            <el-tag
              type="danger"
              disable-transitions
              v-if="scope.row.url=='https://www.douban.com/'"
            >豆瓣</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" :width="lableWidth">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.url)">查看网站详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="复制地址" :visible.sync="dialogFormVisible">
      <div class="urlInput">
        <el-input v-model="urls" autocomplete="off"></el-input>
        <el-button
          type="danger "
          v-clipboard:copy="urls"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</el-button>
      </div>
      <div class="desc">如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。</div>
      <div class="qrcode">
        <qrcode-vue size="200" background="#fff" foreground="#FF78AE" :value="urls"></qrcode-vue>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { createNamespacedHelpers } from "vuex";
const indexModule = createNamespacedHelpers("indexs");
const { mapActions: indexActions, mapState: indexState } = indexModule;
export default {
  data() {
    return {
      urls:null,
      dialogFormVisible: false,
      lableWidth: 168,
      questionDatas: []
    };
  },
  components: {
    QrcodeVue
  },
  props: {},
  methods: {
    ...indexActions(["question"]),
    handleEdit(url) {
      this.dialogFormVisible = true;
      this.urls = url;
      console.log(url);
    },
    // 复制成功时的回调函数
    onCopy(e) {
      this.$message.success("内容已复制到剪切板！");
    },
    // 复制失败时的回调函数
    onError(e) {
      this.$message.error("抱歉，复制失败！");
    }
  },
  mounted() {
    this.question();
  },
  watch: {
    questionData(val) {
      this.questionDatas = val;
    }
  },
  computed: {
    ...indexState(["questionData"])
  }
};
</script>

<style scoped lang='scss'>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.wrap {
  margin-top: 10px;
}
.urlInput {
  display: flex;
}
.desc {
  background: #ebf5ff;
  color: #657180;
  font-size: 14px;
  padding: 15px 10px;
  margin-top: 20px;
  line-height: 1.5;
  border-radius: 8px;
}
.qrcode {
  display: flex;
  justify-content: center;
}
</style>