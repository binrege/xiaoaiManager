<template>
  <div class="wrap">
    <div
    v-for="(item,index) in items" :key="index"
      class="progress"
      :style="{'border-top':`8px solid ${getBorderColor(index)}`}"
      @click="handleClick(index)"
      
    >
    <div :id="`progress${index}`">
      <div >
        <div class="money">{{item.name}}(元)</div>
        <div class="price">
          ￥
          <v-countup :start-value="1" :end-value="item.money"></v-countup>
        </div>
      </div>
      <div class="CircleProgress" >
        <CircleProgress
          :id="index"
          :radius="10"
          :progress="item.value"
          :isAnimation="true"
          :barColor="getBarColor(index)"
          :backgroundColor="getBgColor(index)"
        >
        <div class="finosh" v-show="active===index">
          <div>
             完成率
          </div>
          <div>
            {{item.value}}%
          </div>
         
        </div>
        
        </CircleProgress>
      </div>
    </div>
      
    </div>
  </div>
</template>

<script>
import CircleProgress from "vue-circleprogressbar";
export default {
  components: {
    CircleProgress
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      barColor: "#F2AE57",
      backgroundColor: "#FFE8CC",
      isAnimation: true,
      percentage: 30,
      active: 0,
     colorLost: [
        { barColor: "rgb(94, 176, 254)", bgColor: "rgb(169, 208, 255)" },
        { barColor: "rgb(128, 227, 19)", bgColor: "rgb(211, 244, 175)" },
        { barColor: "rgb(242, 174, 87)", bgColor: "rgb(255, 232, 204)" }
      ]
    };
  },

  methods: {
    handleClick(index) {
       if (this.active !== index) {
        this.changeSwitch(this.active);
        this.changeSwitch(index);
        this.active = index;
      }
  
     
     
    },
     changeSwitch(index) {
      let a = `#progress${index}`;
      document.querySelector(a).style.display = "none";
      setTimeout(() => {
        document.querySelector(a).style.display = "flex";
      }, 10);
    },
     getBarColor(index) {
      if (this.active === index) return this.colorLost[index].barColor;
      else return "rgb(159, 178, 189)";
    },
     getBorderColor(index){
      if (this.active === index) return this.colorLost[index].barColor;
      else return "rgb(255, 255, 255)";
    },
    getBgColor(index) {
      if (this.active === index) return this.colorLost[index].bgColor;
      else return "rgb(220, 226, 230)";
    },
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex: 1;
  > div{
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
  }
  >div>div{
    display: flex;
    justify-content: space-around;
    align-items: center;
   >div{
     flex:1;
   }
  }
}
.progress {
  box-sizing: border-box;
  border-top: 8px solid white;
  padding: 20px;
}
.borderTop {
  border-top: 8px solid #5EB0FE;
}
.CircleProgress{
  width: 80px;
  font-size: 12px;
  flex:1;
  margin-right: 20px;
}
.finosh{
  font-size: 12px;
}

.title{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.money{
  font-size: 14px;
  color: #ccc;
  width: 100px;
  margin-bottom: 10px;
}
.price{
  font-size: 20px;
}
</style>