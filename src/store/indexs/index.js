import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        menu: [],
        CityValue: [],
        Report: [],
        Dynamic: [],
        questionData: []
    },
    mutations: {
        setMenus(state, data) {
            state.menu = data
        },
        setCityValue(state, data) {
            state.CityValue = data
        },
        setReport(state, data) {
            state.Report = data
        },
        setDynamic(state, data) {
            state.Dynamic = data
        },
        setQuestion(state, data) {
            state.questionData = data
        },

    },
    actions: {
        async getMenus({ commit }) {
            let res = await api.getMenus()
            console.log(res);
            if (res.code === 200) {
                commit('setMenus', res.data)
            }

        },
        async getProgress({ commit }) {
            let res = await api.getProgress()
            console.log(res);
            // if (res.code === 200) {
            //     commit('setMenus', res.data)
            // }
            return res

        },
        async getCityValue({ commit }) {
            let res = await api.getCityValue()
            console.log(res);
            if (res.code === 200) {
                commit('setCityValue', res.data)
            }
            return res

        },
        async addDynamic({ commit, dispatch }, params) {
            let res = await api.addDynamic(params)
            console.log(res);

            dispatch('getDynamic')

            return res

        },
        async getDynamic({ commit }) {
            let res = await api.getDynamic()
            console.log(res);
            if (res.code === 200) {
                commit('setDynamic', res.data.filter(item => {
                    return item.username === JSON.parse(localStorage.getItem("adminUser")).username
                }))
            }
            return res

        },
        async getReport({ commit }) {
            let res = await api.getReport()
            console.log(res);
            if (res.code === 200) {
                commit('setReport', res.data)
            }
            return res

        },
        async question({ commit }) {
            let res = await api.question()
            if (res.code === 200) {
                commit('setQuestion', res.data)
            }
            console.log(res);
        }
    },
}