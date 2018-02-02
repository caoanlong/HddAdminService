const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const secret = require('../config/secret')

const Sys_user = require('../model/Sys_user')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 用户登录 */
router.post('/login', (req, res) => {
	let LoginName = req.body.LoginName
	let Password = req.body.Password
	if (!LoginName) {
		responseData.code = 1
		responseData.msg = '登录名不能为空'
		res.json(responseData)
	}
	if (!Password) {
		responseData.code = 2
		responseData.msg = '密码不能为空'
		res.json(responseData)
	}
	Sys_user.findOne({LoginName}).then(sys_user => {
		if (sys_user) {
			let token = jwt.encode({
				iss: sys_user.User_ID,
				exp: 1000*60*60*24*365
			},secret.jwtTokenSecret)
			res.set({'X-Access-Token': token})
			responseData.data = sys_user
			res.json(responseData)
		} else {
			responseData.code = 3
			responseData.msg = '用户不存在'
			res.json(responseData)
		}
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 获取用户列表 */
router.get('/list', (req, res) => {
	Sys_user.findAll().then(sys_users => {
		responseData.data = sys_users
		res.json(responseData)
	})
})

module.exports = router