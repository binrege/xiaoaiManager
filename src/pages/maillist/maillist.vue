<template>
  <div class="wrap">
      <div class="tress">
            <el-tree :data="datas" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div>
          <mailLists :mailData="mailData"></mailLists>
      </div>
  
  </div>
</template>

<script>
import mailLists from '../../components/mailList/mailList';
import { createNamespacedHelpers } from "vuex";
const mailListModule = createNamespacedHelpers("mailList");
const { mapState: mailListState, mapActions: mailListAction } = mailListModule;
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      datas:[],
      mailData:[]
    };
  },
  components: {mailLists},
  props: {},
  methods: {
    ...mailListAction(["getMailList", "getTreeData"]),
     handleNodeClick(data) {
         console.log(data.children);
         if(!data.children){
             this.mailData=this.mailList.filter((item,index)=>{
                 return item.department===data.label
             })
         }else if(data.label==="区域中心"){
           this.mailData=this.mailList
         }
        console.log(data);
      }
  },
  mounted() {
    this.getMailList();
    this.getTreeData();
  },
  watch: {
      TreeData(val){
          console.log(val);
          this.datas=val
      },
      
      mailList(val){
          console.log(val);
          this.mailData=val
      },

  },
  computed: {
    ...mailListState(["TreeData",'mailList'])
  }
};
</script>

<style scoped lang='scss'>
.wrap{
    display: flex;
}
.tress{
    width: 200px;
}
</style>