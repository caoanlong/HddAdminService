const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

const Set_messagetemplate = require('../model/Set_messagetemplate')
const Sys_user = require('../model/Sys_user')
const Set_apppage = require('../model/Set_apppage')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取消息模板列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	pageIndex = Math.max(pageIndex, 1)
	let offset = (pageIndex - 1) * pageSize
	Set_messagetemplate.findAndCountAll({
		offset: offset,
		limit: pageSize,
		order: [
			['CreateTime', 'DESC']
		],
		include: [
			{
				model: Set_apppage,
				as: 'AppPage'
			},
			{
				model: Sys_user,
				as: 'createBy'
			}
		]
	}).then(set_messagetemplates => {
		responseData.data = set_messagetemplates
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

/* 获取消息模板详情 */
router.get('/info', (req, res) => {
	let MessageTemplate_ID = req.query.MessageTemplate_ID
	Set_messagetemplate.findById(MessageTemplate_ID, {
		include: [
			{
				model: Set_apppage,
				as: 'AppPage'
			},
			{
				model: Sys_user,
				as: 'createBy'
			},
			{
				model: Sys_user,
				as: 'updateBy'
			},
			{
				model: Sys_user,
				as: 'deleteBy'
			},
		]
	}).then(set_messagetemplate => {
		responseData.data = set_messagetemplate
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加消息模板 */
router.post('/add', (req, res) => {
	let User_ID = req.user.userID
	let MessageTemplate_ID = snowflake.nextId()
	let AppPage_ID = req.body.AppPage_ID
	let ForwardURL = req.body.ForwardURL
	let JSONForward = req.body.JSONForward
	let Name = req.body.Name
	let Code = req.body.Code
	let Title = req.body.Title
	let type = req.body.type
	let IconURL = req.body.IconURL
	let Content = req.body.Content
	let JSONSample = req.body.JSONSample
	let isEnable = req.body.isEnable
	let PushType = req.body.PushType
	let CreateBy = User_ID
	Set_messagetemplate.create({
		MessageTemplate_ID,
		AppPage_ID,
		ForwardURL,
		JSONForward,
		Name,
		Code,
		Title,
		type,
		IconURL,
		Content,
		JSONSample,
		isEnable,
		PushType,
		CreateBy
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改消息模板 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let MessageTemplate_ID = req.body.MessageTemplate_ID
	let AppPage_ID = req.body.AppPage_ID
	let ForwardURL = req.body.ForwardURL
	let JSONForward = req.body.JSONForward
	let Name = req.body.Name
	let Code = req.body.Code
	let Title = req.body.Title
	let type = req.body.type
	let IconURL = req.body.IconURL
	let Content = req.body.Content
	let JSONSample = req.body.JSONSample
	let isEnable = req.body.isEnable
	let PushType = req.body.PushType
	let UpdateBy = User_ID
	Set_messagetemplate.update({
		AppPage_ID,
		ForwardURL,
		JSONForward,
		Name,
		Code,
		Title,
		type,
		IconURL,
		Content,
		JSONSample,
		isEnable,
		PushType,
		UpdateBy,
		UpdateTime: new Date()
	},{
		where: {
			MessageTemplate_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 批量添加消息模板 */
router.post('/addmutip', (req, res) => {
	let User_ID = req.user.userID
	let messagetemplates = req.body.messagetemplates
	for (let i = 0; i < messagetemplates.length; i++) {
		messagetemplates[i].CreateBy = User_ID
		messagetemplates[i].UpdateBy = User_ID
	}
	Sys_user.bulkCreate(users).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除消息模板 */
router.post('/delete', (req, res) => {
	let ids = req.body.ids
	Set_messagetemplate.destroy({
		where: {
			MessageTemplate_ID: {
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