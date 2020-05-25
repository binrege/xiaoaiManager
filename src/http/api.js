import service from './index'

export default {
    // 3. 用户名登录(post)
    // users/login
    // 参数:
    // username: 用户名
    // password: 密码
    login(params) {
        return service.post('users/login', params)
    },
    // 4. 手机号登录
    // users/phoneLogin
    // 参数: 
    // phone: 手机号
    // code: 短信验证码
    loginByPhone(params) {
        return service.post('users/phoneLogin', params)
    },
    // 根据id查询用户
    getUser(id) {
        return service.get(`users/${id}`)
    },
    // 9.获取菜单(get)
    // users/menus

    getMenus() {
        return service.get('users/menus')
    },
    // 2. 注册(post)
    // users/register
    // 参数:
    // username: 用户名
    // password: 密码
    // phone: 电话
    // email: 邮箱
    register(params) {
        return service.post('users/register', params)
    },
    // 7.发送短信验证码(post)
    // users/sendMsg
    // 参数:
    // phone: 手机号
    // 需要修改server文件夹下routes下user.js, 发送短信接口里面的签名和模板code

    sendCode(phone) {
        return service.post('users/sendMsg', { phone })
    },
    // 1. 图形验证码(get)
    // users/captcha
    getCode() {
        return service.get('users/captcha')
    },
    // 17.首页进度条数据(get)
    // /progress
    getProgress() {
        return service.get('/progress')
    },
    // 18.首页利润(get)
    // /cityValue

    getCityValue() {
        return service.get('/cityValue')
    },

    // 5. 修改密码(post)
    // users/updatePwd
    // 参数:
    // username: 用户名
    // password: 密码
    // id:用户id
    // newPwd:新密码
    updatePwd(params) {
        return service.post('users/updatePwd', params)
    },
    // 6.找回密码(post)
    // users/findPwd
    // 需要修改server文件夹下routes下user.js, 找回密码接口里面的邮箱
    // 参数:
    // username: 用户名
    // email: 邮箱
    findPwd(params) {
        return service.post('users/findPwd', params)
    },

    // 8.退出登录(get)
    // users/logout
    logout() {
        return service.get('users/logout')
    },
    // 10.获取日程(get)
    // /calendar
    getCalendar() {
        return service.get('/calendar')
    },
    // 11. 添加日程(post)
    // /calendar
    // 参数:
    // users: 参与人(数组)
    // startTime: 开始时间(date类型)
    // endTime: 结束时间(date类型)
    // schedule: 日程内容
    // currentDay: 当前日期(string类型)
    addCalendar(params) {
        return service.post('/calendar', params)
    },
    // 12.删除日程(post)
    // /delCalendar
    // 参数:
    // id: 日程id
    delCalendar(params) {
        return service.post('/delCalendar', params)
    },
    // 13. 重复上周(post)
    // /repeatDynamic
    // 参数:
    // currentDay: 当前日期
    repeatDynamic(currentDay) {
        return service.post('/repeatDynamic', currentDay)
    },

    // 14. 上传图片(post)
    // /upload/image
    // 参数:
    // file: 图片
    uploadImg(params) {
        return service.post('/upload/image', params)
    },
    // 15.发布动态(post)
    // /addDynamic
    // 参数:
    // username: 发布人
    // date: 发布时间
    // dynamic: 动态内容
    // classification: 动态类型
    // reportUsers: 汇报人(可选)
    addDynamic(params) {
        return service.post('/addDynamic', params)
    },
    // 16.获取动态(get)
    // /getDynamic
    getDynamic() {
        return service.get('/getDynamic')
    },


    // 19. 动态汇报人(get)
    // /report
    getReport() {
        return service.get('/report')
    },
    // 20. 网站调查(get)
    // /question
    question() {
        return service.get('/question')
    },
    // 21. 通讯录(get)
    // /getMailList
    getMailList() {
        return service.get('/getMailList')
    },
    // 22. 通讯录部门(get)
    // /getTreeData
    getTreeData() {
        return service.get('/getTreeData')
    },
    // 23. offer状态(get)
    // /getOffer
    getOffer() {
        return service.get('/getOffer')
    },
    // 24.获取员工信息(get)
    // /userInfo
    userInfo() {
        return service.get('/userInfo')
    },
    // 25.薪酬信息(get)
    // /pay
    payMsg() {
        return service.get('/pay')
    },
}