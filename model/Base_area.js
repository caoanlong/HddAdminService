const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')

/* 标准常量 */
const Base_area = sequelize.define('base_area', {
	// 区域ID
	Area_ID: {
		type: Sequelize.STRING(32),
		primaryKey: true,
		allowNull: false
	},
	// 区域父ID
	Area_PID: {
		type: Sequelize.STRING(32)
	},
	OldCode: {
		type: Sequelize.STRING(100)
	},
	OldName: {
		type: Sequelize.STRING(100)
	},
	// 行政编码
	Code: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 原始名称
	OriginalName: {
		type: Sequelize.STRING(100)
	},
	// 名称
	Name: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 经度
	Lng: {
		type: Sequelize.DOUBLE
	},
	// 纬度
	Lat: {
		type: Sequelize.DOUBLE
	},
	// 是否热点
	HotspotStatus: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N'
	},
	// ID路径
	Path: {
		type: Sequelize.STRING(200)
	},
	// 区域全名
	FullName: {
		type: Sequelize.STRING(200)
	},
	// 层级
	Depth: {
		type: Sequelize.BIGINT(11)
	},
	// 序号
	SortNumber: {
		type: Sequelize.BIGINT(11),
		allowNull: false
	},
	// 创建者
	CreateBy: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 删除标志
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N'
	},
	// 删除人
	DeleteBy: {
		type: Sequelize.STRING(64)
	},
	// 删除时间
	DeleteTime: {
		type: Sequelize.DATE
	},
	FullOriginalName: {
		type: Sequelize.STRING(200)
	}
})

module.exports = Base_area

