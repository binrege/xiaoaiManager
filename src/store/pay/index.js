import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        payInfo: [],
        TreeData: []
    },
    mutations: {
        setpayInfo(state, data) {
            state.payInfo = data
        }


    },
    actions: {
        async payMsg({ commit }) {
            let res = await api.payMsg()
            console.log(res);
            if (res.code === 200) {
                commit('setpayInfo', res.data)
            }

        },


    },
}