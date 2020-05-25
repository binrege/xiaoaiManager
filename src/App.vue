<template>
  <div id="app">
    <transition name="rotate-fall">
      <router-view class="app-router-view"></router-view>
    </transition>
  </div>
</template>
<script>
import 'vue-transition.css'
export default {
  // beforeMount(){
  //   if(sessionStorage.getItem('lockPasswd')){
  //     this.$store.state.isLock=true
  //   }
  // }
}
</script>
<style lang="scss">
@import "./styles/common";
// #nprogress .bar {
//     background: red !important; //自定义颜色
//   }
  .app .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    // transition: all 12s ease-in;
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>
