import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
import store from '../../store/index'

import {
    setStore,
    getStore,
    removeStore
} from '@/utils/store'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        menu: [],
        code: null,
        isLock: getStore({
            name: 'isLock'
        }) || false,
        lockPasswd: getStore({
            name: 'lockPasswd'
        }) || '',
    },
    mutations: {
        // setMenus(state, data) {
        //     state.menu = data
        // },
        setCode(state, data) {
            state.code = data
        },

    },
    actions: {
        //登录
        //action 方法只能传两个参数 第一个为store对象 第二个是接口需要的参数(多个参数写出对象的形式)
        async login({ commit }, params) {
            try {
                let res = await api.login(params)
                console.log(res);
                if (res.code === 200) {
                    //代表登录成功
                    //存用户
                    localStorage.setItem('adminUser', JSON.stringify(res.data))
                    store.state.userInfo = res.data
                        //存token
                    localStorage.setItem('adminToken', res.token)
                        //跳转页面
                    router.push('/')
                        //提示用户
                    Message.success('登录成功')
                }
            } catch (err) {
                console.log(err);
            }

        },
        async loginByPhone({ commit }, params) {
            try {
                let res = await api.loginByPhone(params)
                console.log(res);
                if (res.code === 200) {
                    //代表登录成功
                    //存用户
                    localStorage.setItem('adminUser', JSON.stringify(res.data))
                    store.state.userInfo = res.data
                        //存token
                    localStorage.setItem('adminToken', res.token)
                        //跳转页面
                    router.push('/')
                        //提示用户
                    Message.success('登录成功')
                }
            } catch (err) {
                console.log(err);
            }

        },
        async register({ commit }, params) {
            try {
                let res = await api.register(params)
                console.log(res);
                if (res.code === 200) {
                    Message.success('注册成功')
                }
            } catch (err) {
                console.log(err);
            }

        },
        async updatePwd({ commit }, params) {
            try {
                let res = await api.updatePwd(params)
                console.log(res);
                // if (res.code === 200) {
                //     Message.success('注册成功')
                // }
            } catch (err) {
                console.log(err);
            }

        },
        async logout({ commit }) {
            try {
                let res = await api.logout(params)
                console.log(res);
                // if (res.code === 200) {
                //     Message.success('注册成功')
                // }
            } catch (err) {
                console.log(err);
            }

        },
        async sendCode({ commit }, params) {
            try {
                if (params) {
                    let res = await api.sendCode(params)
                        // console.log(res);
                    if (res.data.code) {
                        Message.success(res.msg)
                        return res
                    }
                } else {
                    Message.error('请输入合法手机号')
                }
            } catch (err) {

                console.log(err);
            }

        },
        async getCode({ commit }) {
            try {

                let res = await api.getCode()
                    // console.log(res);
                commit('setCode', res)
                    // if (res.data.code) {
                    //     Message.success(res.msg)
                    //     return res
                    // }

            } catch (err) {

                console.log(err);
            }

        },
        async getMenus({ commit }) {
            let res = await api.getMenus()
            console.log(res);
            if (res.meta.status === 200) {
                commit('setMenus', res.data)
            }

        }
    },
}