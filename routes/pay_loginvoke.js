const express = require('express')
const router = express.Router()

const Pay_loginvoke = require('../model/Pay_loginvoke')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取第三方支付接口日志列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let PayLogInvoke_ID = req.query.PayLogInvoke_ID
	pageIndex = Math.max(pageIndex, 1)
	let offset = (pageIndex - 1) * pageSize
	let where
	if (PayLogInvoke_ID) {
		where = {
			$or: [
				{
					PayLogInvoke_ID: {
						$like: '%' + PayLogInvoke_ID + '%'
					}
				}
			]
		}
	} else {
		where = {}
	}
	Pay_loginvoke.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['ReqTime', 'DESC']
		]
	}).then(set_message => {
		responseData.data = set_message
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

module.exports = router