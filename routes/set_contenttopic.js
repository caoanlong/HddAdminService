const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')
const set_contenttopicsTree = require('../utils/sortTree').set_contenttopicsTree

const Set_contenttopic = require('../model/Set_contenttopic')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取内容栏目列表 */
router.get('/list', (req, res) => {
	Set_contenttopic.findAll().then(set_contenttopics => {
		set_contenttopicsTree(set_contenttopics).then(contenttopics => {
			responseData.data = contenttopics
			res.json(responseData)
		})
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})
router.get('/list2', (req, res) => {
	Set_contenttopic.findAll({
		order: [
			['CreateTime', 'DESC']
		]
	}).then(set_contenttopics => {
		responseData.data = set_contenttopics
		res.json(responseData)
	})
})

/* 获取内容栏目详情 */
router.get('/info', (req, res) => {
	let ContentTopic_ID = req.query.ContentTopic_ID
	Set_contenttopic.findById(ContentTopic_ID).then(set_contenttopic => {
		responseData.data = set_contenttopic
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加内容栏目 */
router.post('/add', (req, res) => {
	let ContentTopic_ID = snowflake.nextId()
	let ContentTopic_PID = req.body.ContentTopic_PID
	let Name = req.body.Name
	let Code = req.body.Code
	let Type = req.body.Type
	let isEnable = req.body.isEnable
	let CreateBy = req.body.CreateBy || '1'
	Set_contenttopic.create({
		ContentTopic_ID,
		ContentTopic_PID,
		Name,
		Code,
		Type,
		isEnable,
		CreateBy
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改内容栏目 */
router.post('/update', (req, res) => {
	let ContentTopic_ID = req.body.ContentTopic_ID
	let ContentTopic_PID = req.body.ContentTopic_PID
	let Name = req.body.Name
	let Code = req.body.Code
	let Type = req.body.Type
	let isEnable = req.body.isEnable
	let UpdateBy = req.body.UpdateBy || '1'
	Set_contenttopic.update({
		ContentTopic_PID,
		Name,
		Code,
		Type,
		isEnable,
		UpdateTime: new Date()
	},{
		where: {
			ContentTopic_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除内容栏目 */
router.post('/delete', (req, res) => {
	let ContentTopic_ID = req.body.ContentTopic_ID
	Set_contenttopic.destroy({
		where: {
			ContentTopic_ID
		}
	}).then(() => {
		res.json(responseData)
	})
})

module.exports = router