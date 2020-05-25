<template>
  <div class="wrap">
    <div v-for="(item,index) in dataList" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="imgs">
            <img :src="item.img" alt />
          </div>
          <div class="left">
            <div>{{item.name}}</div>
            <div class="position">{{item.department}}/{{item.position}}</div>
            <div class="tags">
              <div v-for="(items,indexs) in item.tag" :key="indexs">
                <el-tag size="mini" :type="tags[parseInt(Math.random()*5)]">{{items.name}}</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">

        <div>
            <div>邮箱:</div>
            <div>{{item.email}}</div>
        </div>
        <div>
            <div>手机号码:</div>
            <div>{{item.phone}}</div>
        </div>
        <div>
            <div>办公电话:</div>
            <div>{{item.tel}}</div>
        </div>
        <div>
            <div>性别:</div>
            <div v-if="item.gender===1">女</div>
            <div v-else>男</div>
        </div>
        <div>
            <div>QQ:</div>
            <div>{{item.qq}}</div>
        </div>


        </div>
      </el-card>
    </div>
    <div v-if="dataList.length===0">暂无数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      tags: [
         '',
         'success',
        'info',
         'warning',
          'danger'
        ]
      };
    
  },
  components: {},
  props: {
    mailData: {
      type: Array,
      default: () => []
    }
  },
//   
  methods: {
      getRandom(){
        //   return Random()
      }
  },
  mounted() {
      console.log();
  },
  watch: {
    mailData(val) {
      console.log(val);
      this.dataList = val;
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrap {
  width: 1011px;
  display: flex;
//   justify-content: space-around;
  flex-wrap: wrap;

  > div {
      margin-bottom: 10px;
      margin-right: 10px;
  }
}
.box-card {
  width: 323.63px;
  height: 252px;
}
.clearfix,
.tags {
  font-size: 18px;
  display: flex;
  align-items: center;
}
.tags > div {
  margin-right: 5px;
}
img {
  border-radius: 50%;
}
.imgs {
  margin-right: 20px;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.position {
  margin: 3px 0;
  font-size: 14px;
  color: #303133;
}
.bottom{
    >div{
        display: flex;
    }
    font-size: 14px;
    color:#303133;
    padding:0 20px;
}
</style>