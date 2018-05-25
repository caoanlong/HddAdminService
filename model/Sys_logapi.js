const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Mem_member = require('./Mem_member')

/* api日志 */
const Sys_logapi = sequelize.define('sys_logapi', {
	// 日志ID
	Log_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 设备类型
	DeviceType: {
		type: Sequelize.STRING(10)
	},
	// 系统类型
	SystemOs: {
		type: Sequelize.STRING(30)
	},
	// 日志类型
	LogType: {
		type: Sequelize.STRING(50)
	},
	// 请求Uri
	Uri: {
		type: Sequelize.STRING(255)
	},
	// 请求方式
	Method: {
		type: Sequelize.STRING(10)
	},
	// 会员ID
	Mem_ID: {
		type: Sequelize.BIGINT(20)
	},
	// 客户端IP
	IP: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	// 
	IMEI: {
		type: Sequelize.STRING(50)
	},
	// 
	Mac: {
		type: Sequelize.STRING(50)
	},
	// 请求时间
	RequestDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	// 响应时间
	ResponseDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	// 客户端代理类型
	UserAgent: {
		type: Sequelize.STRING(320)
	},
	// 请求参数
	ReqParams: {
		type: Sequelize.TEXT
	},
	// 响应参数
	RespParams: {
		type: Sequelize.TEXT
	},
	// 异常信息
	ExceptionInfo: {
		type: Sequelize.TEXT
	},
	// 创建时间
	CreateDate: {
		type: Sequelize.DATE,
		allowNull: false
	}
})

Sys_logapi.belongsTo(Mem_member, {foreignKey: 'Mem_ID'})

module.exports = Sys_logapi

