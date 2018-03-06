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
	if (req.url.includes('login') 
		|| req.url.includes('base_truckbrand') 
		|| req.url.includes('sys_menu')
		|| req.url.includes('sys_user')
		|| req.url.includes('set_message')) {
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
router.use('/sys_organization', require('./sys_organization'))
router.use('/sys_log', require('./sys_log'))
router.use('/sys_logapi', require('./sys_logapi'))
router.use('/sys_logsms', require('./sys_logsms'))
router.use('/set_message', require('./set_message'))
router.use('/set_messagetemplate', require('./set_messagetemplate'))
router.use('/pay_loginvoke', require('./pay_loginvoke'))
router.use('/set_contenttopic', require('./set_contenttopic'))
router.use('/set_content', require('./set_content'))
router.use('/set_apppage', require('./set_apppage'))
router.use('/base_truckbrand', require('./base_truckbrand'))

module.exports = router
