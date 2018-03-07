const express = require('express')
const router = express.Router()

const Set_message = require('../model/Set_message')
const Set_messagetemplate = require('../model/Set_messagetemplate')
const Mem_member = require('../model/Mem_member')
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

/* 获取消息列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let PushStatus = req.query.PushStatus
	pageIndex = Math.max(pageIndex, 1)
	let offset = (pageIndex - 1) * pageSize
	let where
	if (PushStatus) {
		where = {
			$or: [
				{
					PushStatus
				}
			]
		}
	} else {
		where = {}
	}
	Set_message.findAndCountAll({
		where: where,
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
			},
			{
				model: Set_messagetemplate,
				as: 'msgTemplate',
				include: [
					{
						model: Set_apppage,
						as: 'AppPage'
					}
				]
			}
		]
	}).then(set_message => {
		responseData.data = set_message
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

/* 获取消息详情 */
router.get('/info', (req, res) => {
	let Msg_ID = req.query.Msg_ID
	Set_message.findById(Msg_ID, {
		include: [
			{
				model: Mem_member,
				as: 'mem_rec'
			},
			{
				model: Mem_member,
				as: 'mem_send'
			},
			{
				model: Set_messagetemplate,
				as: 'msgTemplate',
				include: [
					{
						model: Set_apppage,
						as: 'AppPage'
					}
				]
			}
		]
	}).then(set_message => {
		responseData.data = set_message
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

module.exports = router