import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user"
import indexs from "./indexs"
import calendar from "./calendar"
import mailList from "./mailList"
import offer from "./offer"
import userInfo from "./userInfo"
import pay from "./pay"
import getters from './getters'
import router from '../router/index'
import {
    setStore,
    getStore,
    removeStore
} from '../utils/store.js'
Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {
        isLock: getStore({
            name: 'isLock'
        }) || false,
        lockPasswd: getStore({
            name: 'lockPasswd'
        }) || '',
        userInfo: {}
    },
    mutations: {
        SET_LOCK_PASSWD: (state, lockPasswd) => {
            state.lockPasswd = lockPasswd
            setStore({
                name: 'lockPasswd',
                content: state.lockPasswd,
                type: 'session'
            })
        },
        SET_LOCK: (state, action) => {
            state.isLock = true
            setStore({
                name: 'isLock',
                content: state.isLock,
                type: 'session'
            })
        },
        CLEAR_LOCK: (state, action) => {
            state.isLock = false
            state.lockPasswd = ''
            removeStore({
                name: 'lockPasswd'
            })
            removeStore({
                name: 'isLock'
            })

            router.push('/')

        },
    },
    actions: {},
    modules: {
        user,
        indexs,
        calendar,
        mailList,
        offer,
        userInfo,
        pay
    },
    getters
})