const express = require('express')
const router = express.Router()

const Set_message = require('../model/Set_message')
const Mem_member = require('../model/Mem_member')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取交易管理短信日志列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	pageIndex = Math.max(pageIndex, 1)
	let offset = (pageIndex - 1) * pageSize
	Set_message.findAndCountAll({
		offset: offset,
		limit: pageSize,
		order: [
			['CreateTime', 'DESC']
		],
		include: [
			{
				model: Mem_member,
				as: 'mem_rec'
			},
			{
				model: Mem_member,
				as: 'mem_send'
			}
		]
	}).then(set_message => {
		responseData.data = set_message
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

module.exports = router