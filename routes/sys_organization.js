const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

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

/* 获取所有机构列表 */
router.get('/list/all', (req, res) => {
	Sys_organization.findAll().then(sys_organizations => {
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
	let User_ID = req.user.userID
	let Organization_ID = snowflake.nextId()
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
	let CreateBy = User_ID
	let UpdateBy = User_ID
	let DelFlag = req.body.DelFlag || 'N'
	let ParentIds = ''
	Sys_organization.findById(Organization_PID).then(sys_organization => {
		if (sys_organization) {
			ParentIds = sys_organization.ParentIds + Organization_PID + ','
		} else {
			ParentIds = '0'
		}
		Sys_organization.create({
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
			ParentIds
		}).then(sys_organization => {
			res.json(responseData)
		}).catch(err => {
			responseData.code = 100
			responseData.msg = '错误：' + err
			res.json(responseData)
		})
	})
})

/* 修改机构 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let Organization_ID = req.body.Organization_ID
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
	let UpdateBy = User_ID
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
		UpdateBy,
		DelFlag,
		UpdateDate: new Date()
	}, {
		where: {
			Organization_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除机构 */
router.post('/delete', (req, res) => {
	let Organization_ID = req.body.Organization_ID
	Sys_organization.destroy({
		where: {
			Organization_ID
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