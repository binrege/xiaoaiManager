import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        menu: []
    },
    mutations: {
        setMenus(state, data) {
            state.menu = data
        }
    },
    actions: {
        //登录
        //action 方法只能传两个参数 第一个为store对象 第二个是接口需要的参数(多个参数写出对象的形式)
        async login({ commit }, params) {
            try {
                let res = await api.login(params)
                if (res.meta.status === 200) {
                    //代表登录成功
                    //存用户
                    localStorage.setItem('adminUser', JSON.stringify(res.data))
                        //存token
                    localStorage.setItem('adminToken', res.data.token)
                        //跳转页面
                    router.push('/')
                        //提示用户
                    Message.success('登录成功')
                }
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