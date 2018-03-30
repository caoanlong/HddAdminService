const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

const Base_conststand = require('../model/Base_conststand')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取标准常量列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let Type = req.query.Type
	let Name = req.query.Name

	pageIndex = Math.max( pageIndex, 1 )
	let offset = (pageIndex - 1) * pageSize

	let where = {}
	if (Type) {
		where['Type'] = Type
	}
	if (Name) {
		where['Name'] = { $like: '%' + Name + '%' }
	}
	Base_conststand.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['SortNumber']
		]
	}).then(base_conststands => {
		responseData.data = base_conststands
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 根据类型获取标准常量 */
router.get('/list/type', (req, res) => {
	let Type = req.query.Type
	Base_conststand.findAll({
		where: {
			Type
		},
		order: [
			['CreateTime', 'DESC']
		]
	}).then(base_conststands => {
		responseData.data = base_conststands
		res.json(responseData)
	})
})

/* 获取标准常量详情 */
router.get('/info', (req, res) => {
	let ConstStd_ID = req.query.ConstStd_ID
	Base_conststand.findById(ConstStd_ID).then(base_conststand => {
		responseData.data = base_conststand
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加标准常量 */
router.post('/add', (req, res) => {
	let User_ID = req.user.userID
	let ConstStd_ID = snowflake.nextId()
	let Code = req.body.Code
	let Name = req.body.Name
	let Value = req.body.Value
	let Type = req.body.Type
	let Description = req.body.Description
	let SortNumber = req.body.SortNumber
	let CreateBy = User_ID
	let UpdateBy = User_ID
	Base_conststand.create({
		ConstStd_ID,
		Code,
		Name,
		Value,
		Type,
		Description,
		SortNumber,
		CreateBy,
		UpdateBy
	}).then(base_conststand => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 批量添加标准常量 */
router.post('/addmutip', (req, res) => {
	let User_ID = req.user.userID
	let consts = req.body.consts
	for (let i = 0; i < consts.length; i++) {
		consts[i].ConstStd_ID = uuidNum()
		consts[i].CreateBy = User_ID
		consts[i].UpdateBy = User_ID
	}
	Base_conststand.bulkCreate(consts).then(base_conststand => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改标准常量 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let ConstStd_ID = req.body.ConstStd_ID
	let Code = req.body.Code
	let Name = req.body.Name
	let Value = req.body.Value
	let Type = req.body.Type
	let Description = req.body.Description
	let SortNumber = req.body.SortNumber
	let UpdateBy = User_ID
	Base_conststand.update({
		Code,
		Name,
		Value,
		Type,
		Description,
		SortNumber,
		UpdateBy,
		UpdateTime: new Date()
	}, {
		where: {
			ConstStd_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除标准常量 */
router.post('/delete', (req, res) => {
	let ids = req.body.ids
	Base_conststand.destroy({
		where: {
			ConstStd_ID: {
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