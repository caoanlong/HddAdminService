const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Sys_user = require('./Sys_user')

/* 系统日志 */
const Sys_log = sequelize.define('sys_log', {
	// 编号
	Log_ID: {
		type: Sequelize.BIGINT(32),
		primaryKey: true,
		allowNull: false
	},
	// 日志类型
	Type: {
		type: Sequelize.CHAR(1)
	},
	// 日志标题
	Title: {
		type: Sequelize.STRING(255)
	},
	// 操作IP地址
	RemoteAddr: {
		type: Sequelize.STRING(255)
	},
	// 用户代理
	UserAgent: {
		type: Sequelize.STRING(255)
	},
	// 请求URI
	RequestUri: {
		type: Sequelize.STRING(255)
	},
	// 操作方式
	Method: {
		type: Sequelize.STRING(5)
	},
	// 操作提交的数据
	Params: {
		type: Sequelize.TEXT
	},
	// 异常信息
	Exception: {
		type: Sequelize.TEXT
	},
	// 创建者
	CreateBy: {
		type: Sequelize.BIGINT(32)
	},
	// 创建时间
	CreateDate: {
		type: Sequelize.DATE
	}
})

Sys_log.belongsTo(Sys_user, {foreignKey: 'CreateBy'})

module.exports = Sys_log

