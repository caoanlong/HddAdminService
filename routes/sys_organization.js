const express = require('express')
const router = express.Router()
const uuidNum = require('../utils/randomNumber')

const Sys_organization = require('../model/Sys_organization')
const Base_area = require('../model/Base_area')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取机构列表 */
router.get('/list', (req, res) => {
	let Organization_PID = req.query.Organization_PID || '0'
	Sys_organization.findAll({
		where: {
			Organization_PID: Organization_PID
		}
	}).then(sys_organizations => {
		responseData.data = sys_organizations
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 获取机构详情 */
router.get('/info', (req, res) => {
	let Organization_ID = req.query.Organization_ID
	Sys_organization.findById(Organization_ID, {
		include: [{
			model: Base_area
		}]
	}).then(sys_organization => {
		responseData.data = sys_organization
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加机构 */
router.post('/add', (req, res) => {
	let Organization_PID = req.body.Organization_PID || '0'
	let Area_ID = req.body.Area_ID
	let Name = req.body.Name
	let Grade = req.body.Grade
	let PrimaryPerson = req.body.PrimaryPerson
	let DeputyPerson = req.body.DeputyPerson
	let Master = req.body.Master
	let Phone = req.body.Phone
	let Useable = req.body.Useable
	let Code = req.body.Code
	let Type = req.body.Type
	let ZipCode = req.body.ZipCode
	let Fax = req.body.Fax
	let Email = req.body.Email
	let Address = req.body.Address
	let Remark = req.body.Remark
	let SortNumber = req.body.SortNumber
	let CreateBy = req.body.CreateBy || '1'
	let UpdateBy = req.body.UpdateBy || '1'
	let DelFlag = req.body.DelFlag || ''
	Sys_organization.create({
		Organization_PID,
		Area_ID,
		Name,
		Grade,
		PrimaryPerson,
		DeputyPerson,
		Master,
		Phone,
		Useable,
		Code,
		Type,
		ZipCode,
		Fax,
		Email,
		Address,
		Remark,
		SortNumber,
		CreateBy,
		UpdateBy,
		DelFlag
	}).then(sys_organization => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 修改机构 */
router.post('/update', (req, res) => {
	let Organization_ID = req.body.Organization_ID || '0'
	let Organization_PID = req.body.Organization_PID || '0'
	let Area_ID = req.body.Area_ID
	let Name = req.body.Name
	let Grade = req.body.Grade
	let PrimaryPerson = req.body.PrimaryPerson
	let DeputyPerson = req.body.DeputyPerson
	let Master = req.body.Master
	let Phone = req.body.Phone
	let Useable = req.body.Useable
	let Code = req.body.Code
	let Type = req.body.Type
	let ZipCode = req.body.ZipCode
	let Fax = req.body.Fax
	let Email = req.body.Email
	let Address = req.body.Address
	let Remark = req.body.Remark
	let SortNumber = req.body.SortNumber
	let CreateBy = req.body.CreateBy || '1'
	let UpdateBy = req.body.UpdateBy || '1'
	let DelFlag = req.body.DelFlag || ''
	Sys_organization.update({
		Organization_ID,
		Organization_PID,
		Area_ID,
		Name,
		Grade,
		PrimaryPerson,
		DeputyPerson,
		Master,
		Phone,
		Useable,
		Code,
		Type,
		ZipCode,
		Fax,
		Email,
		Address,
		Remark,
		SortNumber,
		CreateBy,
		UpdateBy,
		DelFlag,
		UpdateDate: new Date()
	}, {
		where: {
			Role_ID
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