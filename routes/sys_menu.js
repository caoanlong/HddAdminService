const express = require('express')
const router = express.Router()
const menusTree = require('../utils/sortTree')
// const Promise = require('bluebird')

const Sys_menu = require('../model/Sys_menu')
const Sys_role = require('../model/Sys_role')
const Sys_role_menu = require('../model/Sys_role_menu')

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
		menusTree(sys_menus).then(menus => {
			responseData.data = menus
			res.json(responseData)
		})
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 获取菜单详情 */
router.get('/info', (req, res) => {
	let Menu_ID = req.query.Menu_ID
	Sys_menu.findById(Menu_ID, {
		include: [{
			model: Sys_role
		}]
	}).then(sys_menu => {
		responseData.data = sys_menu
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
	let title = req.body.title
	let name = req.body.name
	let SortNumber = req.body.SortNumber
	let path = req.body.path
	let Icon = req.body.Icon
	let IsShow = req.body.IsShow
	let sys_roles = req.body.sys_roles || []
	let CreateBy = req.body.CreateBy || '1'
	let UpdateBy = req.body.UpdateBy || '1'
	let Remark = req.body.Remark || '1'
	Sys_menu.create({
		Menu_PID,
		title,
		name,
		SortNumber,
		path,
		Icon,
		IsShow,
		CreateBy,
		UpdateBy,
		Remark
	}).then(sys_menu => {
		for (let i = 0; i < sys_roles.length; i++) {
			Sys_role_menu.create({
				menu_id: sys_menu.Menu_ID,
				role_id: sys_roles[i]
			})
		}
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改菜单 */
router.post('/update', (req, res) => {
	let Menu_ID = req.body.Menu_ID
	let Menu_PID = req.body.Menu_PID
	let title = req.body.title
	let name = req.body.name
	let SortNumber = req.body.SortNumber
	let path = req.body.path
	let Icon = req.body.Icon
	let IsShow = req.body.IsShow
	let sys_roles = req.body.sys_roles || []
	let CreateBy = req.body.CreateBy || '1'
	let UpdateBy = req.body.UpdateBy || '1'
	let Remark = req.body.Remark || ''
	Sys_menu.update({
		Menu_PID, 
		title, 
		name, 
		SortNumber, 
		path, 
		Icon,
		IsShow,
		CreateBy,
		UpdateBy,
		Remark,
		UpdateDate: new Date()
	},{
		where: {
			Menu_ID
		}
	}).then(() => {
		Sys_role_menu.destroy({
			where: {
				menu_id: Menu_ID
			}
		}).then(() => {
			for (let i = 0; i < sys_roles.length; i++) {
				Sys_role_menu.create({
					menu_id: Menu_ID,
					role_id: sys_roles[i]
				})
			}
			res.json(responseData)
		})
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除菜单 */
router.post('/delete', (req, res) => {
	let Menu_ID = req.body.Menu_ID
	Sys_menu.destroy({
		where: {
			Menu_ID
		}
	}).then(() => {
		Sys_role_menu.destroy({
			where: {
				menu_id: Menu_ID
			}
		}).then(() => {
			res.json(responseData)
		})
	})
})

module.exports = router