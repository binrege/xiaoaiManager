<template>
  <div>
    <div class="progress">
      <Progress :items="datas"></Progress>
    </div>
    <div class="middle">
      <div>
       <wordCloud :CityValue="CityValue"></wordCloud>
      </div>
      <div>
        <dynamic></dynamic>
      </div>
    </div>
    <div>
      <question></question>
    </div>
  </div>
</template>

<script>
import Progress from "../../components/progress/progress";
import wordCloud from "../../components/home/wordCloud";
import dynamic from "../../components/home/Dynamic";
import question from "../../components/home/question";
import { createNamespacedHelpers } from "vuex";
const indexModule = createNamespacedHelpers("indexs");
const { mapActions: indexActions, mapState: indexState } = indexModule;
export default {
  name: "home",
  components: {
    Progress,wordCloud,dynamic,question
  },
  data() {
    return {
       datas:[]
    };
  },
  methods: {
    ...indexActions(["getProgress",'getCityValue'])
  },
  mounted() {
    this.getProgress().then(res=>{
      console.log(res);
      this.datas=res.data
    });
    this.getCityValue()
  },
   computed: {
    ...indexState(["CityValue"])
  }
};
</script>

<style lang="scss" scoped>
.progress{
  display: flex;

}
.middle{
  display: flex;
  >div{
    flex:1;
  }
}
</style>