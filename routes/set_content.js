const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

const Set_content = require('../model/Set_content')
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

/* 获取内容列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	pageIndex = Math.max( pageIndex, 1 )
	let offset = (pageIndex - 1) * pageSize
	Set_content.findAndCountAll({
		offset: offset,
		limit: pageSize,
		order: [
			['CreateTime', 'DESC']
		],
		include: [
			{
				model: Set_contenttopic
			}
		]
	}).then(set_content => {
		responseData.data = set_content
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	})
})

/* 获取内容详情 */
router.get('/info', (req, res) => {
	let Content_ID = req.query.Content_ID
	Set_content.findById(Content_ID).then(set_content => {
		responseData.data = set_content
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加内容 */
router.post('/add', (req, res) => {
	let User_ID = req.user.userID
	let Content_ID = snowflake.nextId()
	let ContentTopic_ID = req.body.ContentTopic_ID
	let Name = req.body.Name
	let Code = req.body.Code
	let Title = req.body.Title
	let Content = req.body.Content
	let PictureURL = req.body.PictureURL
	let URL = req.body.URL
	let Sort = req.body.Sort
	let isEnable = req.body.isEnable
	let Tips = req.body.Tips
	let CreateBy = User_ID
	let UpdateBy = User_ID
	Set_content.create({
		Content_ID,
		ContentTopic_ID,
		Name,
		Code,
		Title,
		Content,
		PictureURL,
		URL,
		Sort,
		isEnable,
		Tips,
		CreateBy,
		UpdateBy
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改内容 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let Content_ID = req.body.Content_ID
	let ContentTopic_ID = req.body.ContentTopic_ID
	let Name = req.body.Name
	let Code = req.body.Code
	let Title = req.body.Title
	let Content = req.body.Content
	let PictureURL = req.body.PictureURL
	let URL = req.body.URL
	let Sort = req.body.Sort
	let isEnable = req.body.isEnable
	let Tips = req.body.Tips
	let UpdateBy = User_ID
	Set_content.update({
		Content_ID,
		ContentTopic_ID,
		Name,
		Code,
		Title,
		Content,
		PictureURL,
		URL,
		Sort,
		isEnable,
		Tips,
		UpdateTime: new Date()
	},{
		where: {
			Content_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除内容 */
router.post('/delete', (req, res) => {
	let ids = req.body.ids
	Set_content.destroy({
		where: {
			Content_ID: {
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