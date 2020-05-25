let menus = [{
        name: '首页',
        icon: 'home',
        icons: 'location',
        url: '/home',
        enName: 'dashboard',
        children: []
    },
    {
        name: '日程管理',
        icon: 'credit-card',
        icons: 'date',
        url: '/calendar',
        enName: 'calendar',
        children: []
    },
    {
        name: '通讯录',
        icon: 'profile',
        icons: 'document',
        url: '/maillist',
        enName: 'mailList',
        children: []
    },
    {
        name: '组织员工',
        icon: 'user',
        icons: 'user',
        url: '/organization',
        enName: 'organize',
        children: [{
                name: 'offer管理',
                icon: 'diff',
                icons: 'c-scale-to-original',
                url: '/organization/offer',
                enName: 'offer',
            },
            {
                name: '人员信息',
                icon: 'audit',
                icons: 'folder-checked',
                url: '/organization/userInfo',
                enName: 'userInfo',
            },
            {
                name: '薪酬管理',
                icon: 'money-collect',
                icons: 'coin',
                enName: 'payMent',
                url: '/organization/pay',
            }
        ]
    },
    {
        name: '表单页',
        icon: 'form',
        icons: 'files',
        url: '/form',
        enName: 'form',
        children: [{
            name: '分步表单',
            icon: 'file-done',
            icons: 'edit',
            enName: 'stepForm',
            url: '/form/stepForm',
        }]
    },
]

module.exports = menus