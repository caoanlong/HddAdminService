const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Sys_user = require('./Sys_user')
const Set_apppage = require('./Set_apppage')

/* 交易管理短信日志 */
const Set_messagetemplate = sequelize.define('set_messagetemplate', {
	// 消息模板ID
	MessageTemplate_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// APP页面ID
	AppPage_ID: {
		type: Sequelize.BIGINT(20)
	},
	// 跳转URL
	ForwardURL: {
		type: Sequelize.STRING(255)
	},
	// JSON跳转样例
	JSONForward: {
		type: Sequelize.TEXT
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
	// 标题
	Title: {
		type: Sequelize.STRING(100)
	},
	// 图标
	IconURL: {
		type: Sequelize.STRING(255)
	},
	// 格式
	Content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	// JSON样例
	JSONSample: {
		type: Sequelize.TEXT
	},
	// 有效
	IsEnable: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N',
		allowNull: false
	},
	// 极光类型
	PushType: {
		type: Sequelize.STRING(20)
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date(),
		allowNull: false
	},
	// 创建人
	CreateBy: {
		type: Sequelize.BIGINT(20),
		allowNull: false
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE
	},
	// 更新人
	UpdateBy: {
		type: Sequelize.BIGINT(20)
	},
	// 删除标识
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N'
	},
	// 删除时间
	DeleteTime: {
		type: Sequelize.DATE
	},
	// 删除人
	DeleteBy: {
		type: Sequelize.BIGINT(20)
	},
	// 页面透传参数
	PageExtendJSON: {
		type: Sequelize.TEXT
	}
})

Set_messagetemplate.belongsTo(Set_apppage, {as: 'AppPage', foreignKey: 'AppPage_ID'})
Set_messagetemplate.belongsTo(Sys_user, {as: 'createBy', foreignKey: 'CreateBy'})
Set_messagetemplate.belongsTo(Sys_user, {as: 'updateBy', foreignKey: 'UpdateBy'})
Set_messagetemplate.belongsTo(Sys_user, {as: 'deleteBy', foreignKey: 'DeleteBy'})

module.exports = Set_messagetemplate

