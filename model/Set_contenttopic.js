const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

/* 内容栏目 */
const Set_contenttopic = sequelize.define('set_contenttopic', {
	// 内容栏目ID
	ContentTopic_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 内容栏目父ID
	ContentTopic_PID: {
		type: Sequelize.BIGINT(20),
		defaultValue: 0
	},
	// 类型
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
	// 是否启用
	isEnable: {
		type: Sequelize.CHAR(1),
		defaultValue: 'Y',
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
	// 更新人
	UpdateBy: {
		type: Sequelize.BIGINT(20)
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 删除标志
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		defaultValue: 'N',
		allowNull: false
	},
	// 删除人
	DeleteBy: {
		type: Sequelize.BIGINT(50)
	},
	// 删除时间
	DeleteTime: {
		type: Sequelize.DATE
	}
})

Set_contenttopic.hasMany(Set_contenttopic, {as: 'children', foreignKey: 'ContentTopic_PID'})

module.exports = Set_contenttopic

