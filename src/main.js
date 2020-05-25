import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'
import i18n from './i18n/i18n'
import Progress from 'vue-multiple-progress'
import VueCountUp from 'vue-countupjs'
import VCharts from 'v-charts'
import VueClipboard from 'vue-clipboard2'
import Print from 'vue-print-nb'

　　
Vue.use(Print); //注册

Vue.use(VueClipboard)
    // Vue.use(I18n) // 通过插件的形式挂载

Vue.use(Progress)
Vue.use(ElementUI)
Vue.use(VueCountUp)
Vue.use(VCharts)
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')