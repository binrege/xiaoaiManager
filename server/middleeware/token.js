const jwt = require('jsonwebtoken');
const { secret } = require('../config')
exports.verToken = function(token) {
    return new Promise((resolve, reject) => {
        console.log(secret + '1111111111');
        let userInfo = jwt.verify(token.split(' ')[1], secret)
        resolve(userInfo)
    }).catch(err => {
        console.log(err)
    })
}