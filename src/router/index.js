import Vue from 'vue'
import VueRouter from 'vue-router'
import Common from '../pages/Common.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Common,
        children: [{
            path: '/',
            name: 'home',
            meta: {
                name: '首页',
                enName: "dashboard"
            },
            component: () =>
                import ('../pages/home/Home')
        }]
    },
    {
        path: '/',
        component: Common,
        children: [{
            path: 'maillist',
            name: 'maillist',
            meta: {
                name: '通讯录',
                enName: "mailList"
            },
            component: () =>
                import ('../pages/maillist/maillist')
        }]
    },
    {
        path: '/',
        component: Common,
        children: [{
            path: 'calendar',
            name: 'calendar',
            meta: {
                name: '日程',
                enName: "calendar"
            },
            component: () =>
                import ('../pages/calendar/calendar')
        }]
    },
    {
        path: '/organization',
        meta: {
            name: '组织员工',
            enName: "organize"
        },
        component: Common,
        children: [{
            path: 'offer',
            name: 'offer',
            meta: {
                name: 'offer管理',
                enName: "offer"
            },
            component: () =>
                import ('../pages/offer/offer')
        }]
    },
    {
        path: '/organization',
        meta: {
            name: '组织员工',
            enName: "organize"
        },
        component: Common,
        children: [{
            path: 'userInfo',
            name: 'userInfo',
            meta: {
                name: '人员信息',
                enName: "userInfo"
            },
            component: () =>
                import ('../pages/userInfo/userInfo')
        }]
    },
    {
        path: '/organization',
        meta: {
            name: '组织员工',
            enName: "organize"
        },
        component: Common,
        children: [{
            path: 'pay',
            name: 'pay',
            meta: {
                name: '薪酬管理',
                enName: "payMent"
            },
            component: () =>
                import ('../pages/pay/pay')
        }]
    },
    {
        path: '/form',
        meta: {
            name: '表单页',
            enName: "form"
        },
        component: Common,
        children: [{
            path: 'stepForm',
            name: 'stepForm',
            meta: {
                name: '分布表单',
                enName: "stepForm"
            },
            component: () =>
                import ('../pages/stepForm/stepForm')
        }]
    },
    {
        path: '/form',
        meta: {
            name: '表单页',
            enName: "form"
        },
        component: Common,
        children: [{
            path: 'checkForm',
            name: 'checkForm',
            meta: {
                name: '查看账单',
                enName: "checkForm"
            },
            component: () =>
                import ('../pages/stepForm/checkForm')
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../pages/Login')
    },
    {
        path: '/lock',
        name: 'lock',
        component: () =>
            import ('../pages/common/lock')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../pages/register')
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.name
    if (store.state.isLock && to.path !== '/lock') {
        next('/lock')
    } else {
        next()
    }
})
export default router