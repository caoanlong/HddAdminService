const express = require('express')
const router = express.Router()

const Sys_logsms = require('../model/Sys_logsms')

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
	// let Phones = req.query.Phones
	let BusinessType = req.query.BusinessType
	// let Status = req.query.Status
	pageIndex = Math.max(pageIndex, 1)
	let offset = (pageIndex - 1) * pageSize
	let where
	if (BusinessType) {
		where = {
			$or: [
				{
					BusinessType: {
						$like: '%' + BusinessType + '%'
					}
				}
			]
		}
	} else {
		where = {}
	}
	// if (Phones || BusinessType || Status) {
	// 	if (BusinessType && Status) {
	// 		where = {
	// 			$or: [
	// 				{
	// 					Phones: {
	// 						$like: '%' + Phones + '%'
	// 					},
	// 					BusinessType,
	// 					Status
	// 				}
	// 			]
	// 		}
	// 	} else if (BusinessType) {
	// 		where = {
	// 			$or: [
	// 				{
	// 					Phones: {
	// 						$like: '%' + Phones + '%'
	// 					},
	// 					BusinessType
	// 				}
	// 			]
	// 		}
	// 	} else if (Status) {
	// 		where = {
	// 			$or: [
	// 				{
	// 					Phones: {
	// 						$like: '%' + Phones + '%'
	// 					},
	// 					Status
	// 				}
	// 			]
	// 		}
	// 	} else {
	// 		where = {
	// 			$or: [
	// 				{
	// 					Phones: {
	// 						$like: '%' + Phones + '%'
	// 					}
	// 				}
	// 			]
	// 		}
	// 	}
	// } else {
	// 	where = {}
	// }
	Sys_logsms.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['CreateTime', 'DESC']
		]
	}).then(sys_logsms => {
		responseData.data = sys_logsms
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

module.exports = router