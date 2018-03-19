const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const jwt = require('jwt-simple')
const jwtConfig = require('../config/jwtConfig')

const Sys_user = require('../model/Sys_user')
const Sys_role = require('../model/Sys_role')
const Sys_user_role = require('../model/Sys_user_role')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

// 测试token
router.post('/token', (req, res) => {
	let token = req.body.token
	console.log(token)
	let result = jwt.decode(token, jwtConfig.secret)
	res.send(result)
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
			let payload = {
				User_ID: sys_user.User_ID
			}
			let token = jwt.encode(payload, jwtConfig.secret)
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

/* 获取个人资料详情 */
router.get('/info', (req, res) => {
	let User_ID = req.user.userID
	Sys_user.findById(User_ID, {
		include: [{
			model: Sys_role
		}]
	}).then(sys_user => {
		responseData.data = sys_user
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改个人资料 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let Photo = req.body.Photo
	let Name = req.body.Name
	let Email = req.body.Email
	let Mobile = req.body.Mobile
	let Phone = req.body.Phone
	let Remark = req.body.Remark

	Sys_user.update({
		Photo,
		Name,
		Email,
		Mobile,
		Phone,
		Remark
	}, {
		where: {
			User_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

module.exports = router