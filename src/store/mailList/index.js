import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        mailList: [],
        TreeData: []
    },
    mutations: {
        setMailList(state, data) {
            state.mailList = data
        },
        setTreeData(state, data) {
            state.TreeData = data
        },


    },
    actions: {
        async getMailList({ commit }) {
            let res = await api.getMailList()
            console.log(res);
            if (res.code === 200) {
                commit('setMailList', res.data)
            }

        },
        async getTreeData({ commit }) {
            let res = await api.getTreeData()
            console.log(res);
            if (res.code === 200) {
                commit('setTreeData', res.data.data)
            }

        },

    },
}