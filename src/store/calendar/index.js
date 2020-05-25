import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        calendarList: []
    },
    mutations: {
        setcalendarList(state, data) {
            state.calendarList = data
        },


    },
    actions: {
        async getCalendar({ commit }) {
            let res = await api.getCalendar()
            console.log(res);
            if (res.code === 200) {
                commit('setcalendarList', res.data)
            }

        },
        async addCalendar({ commit }, params) {
            let res = await api.addCalendar(params)
            console.log(res);
            // if (res.code === 200) {
            //     commit('setcalendarList', res.data)
            // }

        },
        async delCalendar({ commit, dispatch }, params) {
            let res = await api.delCalendar(params)

            if (res.code === 200) {
                dispatch('getCalendar')
            }

        },
        async repeatDynamic({ commit, dispatch }, params) {
            let res = await api.repeatDynamic(params)
            console.log(res);
            if (res.code === 200) {
                dispatch('getCalendar', res.data)
            }

        },

    },
}