const express = require('express')
const router = express.Router()

const Sys_menu = require('../model/Sys_menu')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取菜单列表 */
router.get('/list', (req, res) => {
	Sys_menu.findAll().then(sys_menus => {
		responseData.data = sys_menus
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加菜单 */
router.post('/add', (req, res) => {
	let Menu_PID = req.body.Menu_PID
	let Name = req.body.Name
	let SortNumber = req.body.SortNumber
	let Href = req.body.Href
	let Icon = req.body.Icon
	let IsShow = req.body.IsShow
	let Target = req.body.Target
	let Permission = req.body.Permission
	let CreateBy = req.body.CreateBy
	let CreateDate = req.body.CreateDate
	let UpdateBy = req.body.UpdateBy
	let UpdateDate = req.body.UpdateDate
	let Remark = req.body.Remark
	let DelFlag = req.body.DelFlag
	Sys_menu.create({}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})