const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

/* 短信发送日志 */
const Sys_logsms = sequelize.define('sys_logsms', {
	// 短信发送日志ID
	LogSms_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 业务类型
	BusinessType: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	// 短信模板ID
	SmsTemplateId: {
		type: Sequelize.BIGINT(20)
	},
	// 模板内容
	TemplateContent: {
		type: Sequelize.STRING(320),
		allowNull: false
	},
	// 手机号列表
	Phones: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	// 发送状态
	Status: {
		type: Sequelize.STRING(50),
		defaultValue: 'Sending',
		allowNull: false
	},
	// 发送内容
	SendData: {
		type: Sequelize.STRING(320),
		allowNull: false
	},
	// 成功数量
	SuccessCounts: {
		type: Sequelize.INTEGER(11),
		defaultValue: 0,
		allowNull: false
	},
	// 响应消息ID
	ResultId: {
		type: Sequelize.STRING(50)
	},
	// 响应码
	ResultCode: {
		type: Sequelize.STRING(50)
	},
	// 响应内容
	ResultMsg: {
		type: Sequelize.STRING(320)
	},
	// 提交时间
	CreateTime: {
		type: Sequelize.DATE,
		allowNull: false
	},
	// 发送时间
	SendTime: {
		type: Sequelize.STRING(320)
	},
	// 
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N',
		allowNull: false
	}
})

module.exports = Sys_logsms

