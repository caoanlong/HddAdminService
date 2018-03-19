const express = require('express')
const router = express.Router()
const snowflake = require('../utils/snowflake')

const Base_truckbrand = require('../model/Base_truckbrand')

// 统一返回格式
let responseData
router.use((req, res, next) => {
	responseData = {
		code: 0,
		msg: '成功'
	}
	next()
})

/* 获取车辆品牌列表 */
router.get('/list', (req, res) => {
	let pageIndex = Number(req.query.pageIndex || 1)
	let pageSize = Number(req.query.pageSize || 10)
	let Code = req.query.Code
	let Name = req.query.Name

	pageIndex = Math.max( pageIndex, 1 )
	let offset = (pageIndex - 1) * pageSize
	let where
	if (Code || Name) {
		where = {
			$or: [
				{
					Code: {
						$like: '%' + Code + '%'
					},
					Name: {
						$like: '%' + Name + '%'
					}
				}
			]
		}
	} else {
		where = {}
	}
	Base_truckbrand.findAndCountAll({
		where: where,
		offset: offset,
		limit: pageSize,
		order: [
			['CreateTime', 'DESC']
		]
	}).then(base_truckbrands => {
		responseData.data = base_truckbrands
		responseData.data.pageIndex = pageIndex
		responseData.data.pageSize = pageSize
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 获取车辆品牌详情 */
router.get('/info', (req, res) => {
	let TruckBrand_ID = req.query.TruckBrand_ID
	Base_truckbrand.findById(TruckBrand_ID).then(base_truckbrand => {
		responseData.data = base_truckbrand
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 添加车辆品牌 */
router.post('/add', (req, res) => {
	let User_ID = req.user.userID
	let TruckBrand_ID = snowflake.nextId()
	let Name = req.body.Name
	let Code = req.body.Code
	let Enable = req.body.Enable
	let PictureURL = req.body.PictureURL
	let CreateBy = req.body.User_ID
	let UpdateBy = User_ID
	Base_truckbrand.create({
		TruckBrand_ID,
		Name,
		Code,
		Enable,
		PictureURL,
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

/* 修改车辆品牌 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let TruckBrand_ID = req.body.TruckBrand_ID
	let Name = req.body.Name
	let Code = req.body.Code
	let Enable = req.body.Enable
	let PictureURL = req.body.PictureURL
	let UpdateBy = User_ID
	Base_truckbrand.update({
		Name,
		Code,
		Enable,
		PictureURL,
		UpdateBy,
		UpdateTime: new Date()
	},{
		where: {
			TruckBrand_ID
		}
	}).then(() => {
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 删除车辆品牌 */
router.post('/delete', (req, res) => {
	let ids = req.body.ids
	Base_truckbrand.destroy({
		where: {
			TruckBrand_ID: {
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