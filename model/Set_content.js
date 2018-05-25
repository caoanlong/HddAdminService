const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Set_contenttopic = require('../model/Set_contenttopic')

/* 内容 */
const Set_content = sequelize.define('set_content', {
	// 内容ID
	Content_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 内容栏目ID
	ContentTopic_ID: {
		type: Sequelize.BIGINT(20),
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
	// 序号
	Sort: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	// 图片
	PictureURL: {
		type: Sequelize.STRING(255)
	},
	// URL
	URL: {
		type: Sequelize.STRING(255)
	},
	// 标题
	Title: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 
	Content: {
		type: Sequelize.TEXT
	},
	// 提示
	Tips: {
		type: Sequelize.TEXT
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

Set_content.belongsTo(Set_contenttopic, {foreignKey: 'ContentTopic_ID'})

module.exports = Set_content

