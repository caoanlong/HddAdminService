const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const secret = require('../config/secret')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

//设置跨域
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token')
	res.header('Access-Control-Expose-Headers', 'Content-Type,Accept,X-Access-Token')
	next()
})

router.use((req, res, next) => {
	if (req.url.includes('login')) {
		next()
		return
	}
	let token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token']
	if (token) {
		try {
			let decoded = jwt.decode(token, secret.jwtTokenSecret)
			if (decoded) {
				next()
			}else {
				responseData.code = '1003'
				responseData.msg = '非法的Token!'
				res.json(responseData)
				return
			}
		} catch (err) {
			if (err) {
				responseData.code = '1002'
				responseData.msg = '非法的Token!'
				res.json(responseData)
				return
			}
		}
	}else {
		responseData.code = '1001'
		responseData.msg = '未登录!'
		res.json(responseData)
		return
	}
})

router.use('/user', require('./user'))
router.use('/sys_user', require('./sys_user'))
router.use('/sys_menu', require('./sys_menu'))
router.use('/sys_role', require('./sys_role'))
router.use('/sys_dict', require('./sys_dict'))
router.use('/sys_settings', require('./sys_settings'))
router.use('/base_conststand', require('./base_conststand'))
router.use('/base_area', require('./base_area'))

module.exports = router
