const express = require('express')
const router = express.Router()

const Sys_role = require('../model/Sys_role')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取角色列表 */
router.get('/list', (req, res) => {
	Sys_role.findAll().then(sys_role => {
		responseData.data = sys_role
		res.json(responseData)
	})
})

/* 添加角色 */
router.post('/add', (req, res) => {
	let Role_ID = req.body.Role_ID
	let Name = req.body.Name
	let EnName = req.body.EnName
	let CreateBy = req.body.CreateBy
	let CreateDate = req.body.CreateDate
	let UpdateBy = req.body.UpdateBy
	let UpdateDate = req.body.UpdateDate
	let DelFlag = req.body.DelFlag
	Sys_role.create({
		Role_ID,
		Name,
		EnName,
		CreateBy,
		CreateDate,
		UpdateBy,
		UpdateDate,
		DelFlag
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

module.exports = router