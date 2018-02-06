const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')
const moment = require('moment')

/* 系统配置 */
const Sys_settings = sequelize.define('sys_settings', {
	// ID
	Setting_ID: {
		type: Sequelize.STRING(64),
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false
	},
	// 父ID
	Setting_PID: {
		type: Sequelize.STRING(64),
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
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 创建时间
	CreateDate: {
		type: Sequelize.DATE,
		defaultValue: moment()
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 更新时间
	UpdateDate: {
		type: Sequelize.DATE,
		defaultValue: moment()
	},
	// 删除标记
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		allowNull: false
	}
})

module.exports = Sys_settings

