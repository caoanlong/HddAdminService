const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Mem_member = require('./Mem_member')

/* 交易管理短信日志 */
const Set_message = sequelize.define('set_message', {
	// 消息ID
	Msg_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 消息模板ID
	MsgTemplate_ID: {
		type: Sequelize.BIGINT(20),
		allowNull: false
	},
	// 接收人
	Mem_RecID: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	// 发布人
	Mem_SendID: {
		type: Sequelize.BIGINT(20),
		allowNull: false
	},
	// 内容
	Content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	// 业务ID
	OpID: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	// 参数JSON
	ParameterJSON: {
		type: Sequelize.TEXT
	},
	// 推送状态
	PushStatus: {
		type: Sequelize.STRING(10),
		defaultValue: 'Success',
		allowNull: false
	},
	// 推送时间
	PushTime: {
		type: Sequelize.DATE
	},
	// 推送结果
	PushResult: {
		type: Sequelize.STRING(320)
	},
	// 极光类型
	PushType: {
		type: Sequelize.STRING(20)
	},
	// 极光ID
	PushID: {
		type: Sequelize.STRING(50)
	},
	// 创建人
	CreateBy: {
		type: Sequelize.BIGINT(20)
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		allowNull: false
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		allowNull: false
	},
	// 
	IsView: {
		type: Sequelize.CHAR(1)
	},
	// App类型
	AppType: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	// 手机类型
	PhoneType: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	// 推送消息标题
	Title: {
		type: Sequelize.STRING(50),
		allowNull: false
	}
})

Set_message.belongsTo(Mem_member, {as: 'mem_rec', foreignKey: 'Mem_RecID'})
Set_message.belongsTo(Mem_member, {as: 'mem_send', foreignKey: 'Mem_SendID'})

module.exports = Set_message

