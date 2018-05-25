const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

/* App页面 */
const Set_apppage = sequelize.define('set_apppage', {
	// APP页面ID
	AppPage_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// APP页面父ID
	AppPage_PID: {
		type: Sequelize.BIGINT(20),
		defaultValue: 0
	},
	// APP类型
	Type: {
		type: Sequelize.STRING(20),
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
	// 描述
	Content: {
		type: Sequelize.TEXT
	},
	// 创建人
	CreateBy: {
		type: Sequelize.BIGINT(20),
		allowNull: false
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date(),
		allowNull: false
	},
	// 更新人
	UpdateBy: {
		type: Sequelize.BIGINT(20)
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	}
})

module.exports = Set_apppage

