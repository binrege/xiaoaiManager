import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        offer: [],
        TreeData: []
    },
    mutations: {
        setOffer(state, data) {
            state.offer = data
        }


    },
    actions: {
        async getOffer({ commit }) {
            let res = await api.getOffer()
                // console.log(res);
            if (res.code === 200) {
                commit('setOffer', res.data)
            }

        },


    },
}