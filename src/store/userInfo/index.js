import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        userInfo: [],

    },
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
        }


    },
    actions: {
        async userInfoS({ commit }) {
            let res = await api.userInfo()
            console.log(res);
            if (res.code === 200) {
                commit('setUserInfo', res.data)
            }

        },


    },
}