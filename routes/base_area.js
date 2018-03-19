const express = require('express')
const router = express.Router()
const uuidNum = require('../utils/randomNumber')

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

/* 获取地区列表 */
router.get('/list', (req, res) => {
	let Area_PID = req.query.Area_PID || '100000'
	Base_area.findAll({
		where: {
			Area_PID: Area_PID
		}
	}).then(base_areas => {
		responseData.data = base_areas
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

/* 获取地区详情 */
router.get('/info', (req, res) => {
	let Area_ID = req.query.Area_ID
	Base_area.findById(Area_ID).then(base_area => {
		responseData.data = base_area
		res.json(responseData)
	}).catch(err => {
		responseData.code = 100
		responseData.msg = '错误：' + err
		res.json(responseData)
	})
})

function nameTrans (Depth, Name) {
	if (Depth == 1) {
		return Name + '省'
	} else if (Depth == 2) {
		return Name + '市'
	} else {
		return Name + '区'
	}
}

/* 添加地区 */
router.post('/add', (req, res) => {
	let User_ID = req.user.userID
	let Area_PID = req.body.Area_PID
	let Depth = req.body.Depth
	let Code = req.body.Code
	let Name = req.body.Name
	let Lng = req.body.Lng
	let Lat = req.body.Lat
	let HotspotStatus = req.body.HotspotStatus
	let SortNumber = req.body.SortNumber
	let CreateBy = User_ID
	let UpdateBy = User_ID
	let transName = nameTrans(Depth, Name)

	// 查找父级节点
	Base_area.findById(Area_PID).then(base_area => {
		Base_area.create({
			Area_ID: Code,
			Area_PID: Area_PID,
			OldCode: Code,
			OldName: transName,
			Code,
			OriginalName: transName,
			Name,
			Lng,
			Lat,
			HotspotStatus,
			Path: base_area.Path + Code + ',',
			FullName: base_area.FullName + Name + ',',
			Depth,
			SortNumber,
			FullOriginalName: base_area.FullOriginalName + transName + ',',
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
})

/* 修改地区 */
router.post('/update', (req, res) => {
	let User_ID = req.user.userID
	let Area_ID = req.body.Area_ID
	let Area_PID = req.body.Area_PID
	let Depth = req.body.Depth
	let Code = req.body.Code
	let Name = req.body.Name
	let Lng = req.body.Lng
	let Lat = req.body.Lat
	let HotspotStatus = req.body.HotspotStatus
	let SortNumber = req.body.SortNumber
	let UpdateBy = User_ID
	let transName = nameTrans(Depth, Name)

	// 查找父级节点
	Base_area.findById(Area_PID).then(base_area => {
		Base_area.update({
			Area_ID: Code,
			Area_PID: Area_PID,
			OldCode: Code,
			OldName: transName,
			Code,
			OriginalName: transName,
			Name,
			Lng,
			Lat,
			HotspotStatus,
			Path: base_area.Path + Code + ',',
			FullName: base_area.FullName + Name + ',',
			Depth,
			SortNumber,
			FullOriginalName: base_area.FullOriginalName + transName + ',',
			UpdateBy,
			UpdateTime: new Date()
		},{
			where: {
				Area_ID
			}
		}).then(() => {
			res.json(responseData)
		}).catch(err => {
			responseData.code = 100
			responseData.msg = '错误：' + err
			res.json(responseData)
		})
	})
})

/* 删除区域 */
router.post('/delete', (req, res) => {
	let Area_ID = req.body.Area_ID
	Base_area.destroy({
		where: {
			Area_ID
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