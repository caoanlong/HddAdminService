const Sequelize = require('sequelize')
const sequelize = require('./sequelize')
const moment = require('moment')

/* 系统配置 */
const Sys_settings = sequelize.define('sys_settings', {
	// ID
	Setting_ID: {
		type: Sequelize.BIGINT(32),
		primaryKey: true,
		allowNull: false
	},
	// 父ID
	Setting_PID: {
		type: Sequelize.BIGINT(32),
		defaultValue: '1'
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
	// 值
	Value: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 描述
	Description: {
		type: Sequelize.STRING(320),
		allowNull: false
	},
	// 序号
	SortNumber: {
		type: Sequelize.BIGINT(11),
		allowNull: false
	},
	// 创建者
	CreateBy: {
		type: Sequelize.BIGINT(32),
		allowNull: false
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.BIGINT(32),
		allowNull: false
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 删除标记
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		allowNull: false
	}
})

module.exports = Sys_settings

