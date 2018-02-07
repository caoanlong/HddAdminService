const express = require('express')
const router = express.Router()

//设置跨域
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token')
	res.header('Access-Control-Expose-Headers', 'Content-Type,Accept,X-Access-Token')
	next()
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
