const express = require('express')
const router = express.Router()

const Sys_log = require('../model/Sys_log')
const Sys_user = require('../model/Sys_user')
const Sys_organization = require('../model/Sys_organization')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取系统日志列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let Title = req.query.Title
	let CreateBy = req.query.CreateBy
	let RequestUri = req.query.RequestUri
	let startDate = req.query.startDate
	let endDate = req.query.endDate
	let Exception = req.query.isException
	pageIndex = Math.max( pageIndex, 1 )
	let offset = (pageIndex - 1) * pageSize
	let where
	if (Title || CreateBy || RequestUri || Exception == 'true' || startDate != 0 || endDate != 0) {
		if (Exception) {
			where = {
				$or: [
					{
						Title: {
							$like: '%' + Title + '%'
						},
						CreateBy: {
							$like: '%' + CreateBy + '%'
						},
						RequestUri: {
							$like: '%' + RequestUri + '%'
						},
						Exception: {
							$ne: ''
						},
						CreateDate: {
							$gte: startDate,
							$lte: endDate
						}
					}
				]
			}
		} else {
			where = {
				$or: [
					{
						Title: {
							$like: '%' + Title + '%'
						},
						CreateBy: {
							$like: '%' + CreateBy + '%'
						},
						RequestUri: {
							$like: '%' + RequestUri + '%'
						},
						CreateDate: {
							$gte: startDate,
							$lte: endDate
						}
					}
				]
			}
		}
	} else {
		where = {}
	}
	Sys_log.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['CreateDate', 'DESC']
		],
		include: [
			{
				model: Sys_user,
				include: [
					{
						model: Sys_organization,
						as: 'company'
					},
					{
						model: Sys_organization,
						as: 'department'
					}
				]
			}
		]
	}).then(sys_logs => {
		responseData.data = sys_logs
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

module.exports = router