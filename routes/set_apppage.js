const express = require('express')
const router = express.Router()

const Set_apppage = require('../model/Set_apppage')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取所有app页面列表 */
router.get('/listall', (req, res) => {
	Set_apppage.findAll({
		order: [
			['CreateTime', 'DESC']
		]
	}).then(set_apppages => {
		responseData.data = set_apppages
		res.json(responseData)
	})
})

module.exports = router