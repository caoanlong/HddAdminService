const express = require('express')
const router = express.Router()

const Sys_logapi = require('../model/Sys_logapi')
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

/* 获取api日志列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let ReqParams = req.query.ReqParams
	let DeviceType = req.query.DeviceType
	let LogType = req.query.LogType
	pageIndex = Math.max(pageIndex, 1)
	let offset = (pageIndex - 1) * pageSize
	let where = {}
	if (ReqParams) {
		where['ReqParams'] = { $like: '%' + ReqParams + '%' }
	}
	if (LogType) {
		where['LogType'] = { $like: '%' + LogType + '%' }
	}
	if (DeviceType) {
		where['DeviceType'] = DeviceType
	}
	
	Sys_logapi.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['CreateDate', 'DESC']
		],
		include: [
			{
				model: Mem_member
			}
		]
	}).then(sys_logapis => {
		responseData.data = sys_logapis
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

/* 获取api日志详情 */
router.get('/info', (req, res) => {
	let Log_ID = req.query.Log_ID
	Sys_logapi.findById(Log_ID).then((sys_logapi => {
		responseData.data = sys_logapi
		res.json(responseData)
	})).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

module.exports = router