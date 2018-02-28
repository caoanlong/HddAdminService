const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

/* 第三方支付接口日志 */
const Pay_loginvoke = sequelize.define('pay_loginvoke', {
	// 三方支付请求日志ID
	PayLogInvoke_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 支付订单ID
	PayOrder_ID: {
		type: Sequelize.BIGINT(20)
	},
	// 三方支付平台代码
	PayPlatformCode: {
		type: Sequelize.STRING(50)
	},
	// 三方交易记录ID
	Pay3rdOrderCode: {
		type: Sequelize.STRING(50)
	},
	// 接口URI
	Uri: {
		type: Sequelize.STRING(255)
	},
	// 接口名称
	ApiName: {
		type: Sequelize.STRING(100)
	},
	// 是否回调
	Async: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N',
		allowNull: false
	},
	// 请求参数
	ReqParams: {
		type: Sequelize.TEXT
	},
	// 响应参数
	RespParams: {
		type: Sequelize.TEXT
	},
	// 请求时间
	ReqTime: {
		type: Sequelize.DATE
	},
	// 响应时间
	RespTime: {
		type: Sequelize.DATE
	}
})

module.exports = Pay_loginvoke

