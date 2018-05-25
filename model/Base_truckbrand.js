const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

/* 车辆品牌 */
const Base_truckbrand = sequelize.define('base_truckbrand', {
	// 车牌类型ID
	TruckBrand_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 代码
	Code: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	// 名称
	Name: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 图片
	PictureURL: {
		type: Sequelize.STRING(255)
	},
	// 是否生效
	Enable: {
		type: Sequelize.CHAR(1),
		allowNull: false
	},
	// 创建人
	CreateBy: {
		type: Sequelize.BIGINT(20)
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.BIGINT(20),
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 删除标志
	DeleteFlag: {
		type: Sequelize.CHAR(1)
	},
	// 删除人
	DeleteBy: {
		type: Sequelize.BIGINT(20)
	},
	// 删除时间
	DeleteTime: {
		type: Sequelize.DATE
	}
})

module.exports = Base_truckbrand

