<template>
  <div>
    <el-button type="primary" @click="send">按钮</el-button>
    <child-one></child-one>
    <child-two></child-two>
    <div v-for="(item,index) in menu" :key="index">
      {{item.authName}}
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const userModule=createNamespacedHelpers('user')
const {mapActions:userActions,mapState:userState}=userModule
import childOne from '../components/Child1'
import childTwo from '../components/Child2'
export default {
  name: '',
  props: {
  },
  components: {
    childOne,
    childTwo
  },
  data() {
    return {
      msg: '我是home组件的数据'
    }
  },
  methods: {
    ...userActions(['getMenus']),
    send() {
      this.$bus.$emit('send', this.msg)
      this.$router.push('/login')
    }
  },
  mounted() {
    this.getMenus()
  },
  watch: {

  },
  computed: {
    ...userState(['menu'])
  }
}
</script>

<style scoped lang='scss'>
</style>