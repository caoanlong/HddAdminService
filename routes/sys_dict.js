const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

const Sys_dict = require('../model/Sys_dict')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取字典列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let TYPE = req.query.TYPE
	let Description = req.query.Description

	pageIndex = Math.max( pageIndex, 1 )
	let offset = (pageIndex - 1) * pageSize
	let where
	if (TYPE) {
		where = {
			$or: [
				{
					TYPE: {
						$eq: TYPE
					},
					Description: {
						$like: '%' + Description + '%'
					}
				}
			]
		}
	} else {
		where = {
			$or: [
				{
					Description: {
						$like: '%' + Description + '%'
					}
				}
			]
		}
	}
	Sys_dict.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['CreateTime', 'DESC']
		]
	}).then(sys_dicts => {
		responseData.data = sys_dicts
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

/* 通过类型参数获取字典列表 */
router.get('/list/type', (req, res) => {
	let TYPE = req.query.TYPE
	Sys_dict.findAll({
		where: {
			TYPE
		},
		order: [
			['CreateTime', 'DESC']
		]
	}).then(sys_dicts => {
		responseData.data = sys_dicts
		res.json(responseData)
	})
})

/* 获取字典的所有类型列表 */
router.get('/type/list', (req, res) => {
	Sys_dict.findAll({
		attributes: ['TYPE'],
		group: ['TYPE']
	}).then(types => {
		responseData.data = types
		res.json(responseData)
	})
})

/* 获取字典详情 */
router.get('/info', (req, res) => {
	let Dict_ID = req.query.Dict_ID
	Sys_dict.findById(Dict_ID).then(sys_dict => {
		responseData.data = sys_dict
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})


/* 添加字典 */
router.post('/add', (req, res) => {
	let Dict_ID = snowflake.nextId()
	let VALUE = req.body.VALUE
	let TYPE = req.body.TYPE
	let SortNumber = req.body.SortNumber
	let NAME = req.body.NAME
	let Description = req.body.Description
	let CreateBy = req.body.CreateBy || '1'
	let UpdateBy = req.body.UpdateBy || '1'
	let DeleteFlag = req.body.DeleteFlag || ''
	Sys_dict.create({
		Dict_ID,
		VALUE,
		TYPE,
		SortNumber,
		NAME,
		Description,
		CreateBy,
		UpdateBy,
		DeleteFlag
	}).then(sys_dict => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改字典 */
router.post('/update', (req, res) => {
	let Dict_ID = req.body.Dict_ID
	let VALUE = req.body.VALUE
	let TYPE = req.body.TYPE
	let SortNumber = req.body.SortNumber
	let NAME = req.body.NAME
	let Description = req.body.Description
	let CreateBy = req.body.CreateBy || '1'
	let UpdateBy = req.body.UpdateBy || '1'
	let DeleteFlag = req.body.DeleteFlag || ''
	Sys_dict.update({
		VALUE,
		TYPE,
		SortNumber,
		NAME,
		Description,
		CreateBy,
		UpdateBy,
		DeleteFlag,
		UpdateTime: new Date()
	}, {
		where: {
			Dict_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除字典 */
router.post('/delete', (req, res) => {
	let ids = req.body.ids
	Sys_dict.destroy({
		where: {
			Dict_ID: {
				$in: ids
			}
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

module.exports = router