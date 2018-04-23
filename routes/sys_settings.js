const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

const Sys_settings = require('../model/Sys_settings')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取系统配置列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let Code = req.query.Code
	let Name = req.query.Name

	pageIndex = Math.max( pageIndex, 1 )
	let offset = (pageIndex - 1) * pageSize
	let where = {
		'DeleteFlag': 'N'
	}
	if (Code) {
		where['Code'] = { $like: '%' + Code + '%' }
	}
	if (Name) {
		where['Name'] = { $like: '%' + Name + '%' }
	}
	Sys_settings.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['SortNumber']
		]
	}).then(sys_settings => {
		responseData.data = sys_settings
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

/* 获取系统配置详情 */
router.get('/info', (req, res) => {
	let Setting_ID = req.query.Setting_ID
	Sys_settings.findById(Setting_ID).then(sys_settings => {
		responseData.data = sys_settings
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加系统配置 */
router.post('/add', (req, res) => {
	let User_ID = req.user.userID
	let Setting_ID = snowflake.nextId()
	let Code = req.body.Code
	let Name = req.body.Name
	let Value = req.body.Value
	let SortNumber = req.body.SortNumber
	let Description = req.body.Description
	let CreateBy = User_ID
	let UpdateBy = User_ID
	let DeleteFlag = req.body.DeleteFlag || 'N'
	Sys_settings.create({
		Setting_ID,
		Code,
		Name,
		Value,
		SortNumber,
		Description,
		CreateBy,
		UpdateBy,
		DeleteFlag
	}).then(sys_settings => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改系统配置 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let Setting_ID = req.body.Setting_ID
	let Code = req.body.Code
	let Name = req.body.Name
	let Value = req.body.Value
	let SortNumber = req.body.SortNumber
	let Description = req.body.Description
	let UpdateBy = User_ID
	Sys_settings.update({
		Code,
		Name,
		Value,
		SortNumber,
		Description,
		UpdateBy,
		UpdateTime: new Date()
	}, {
		where: {
			Setting_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除系统配置 */
router.post('/delete', (req, res) => {
	let ids = req.body.ids
	Sys_settings.destroy({
		where: {
			Setting_ID: {
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