const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

/* 字典 */
const Sys_dict = sequelize.define('sys_dict', {
	// 编号
	Dict_ID: {
		type: Sequelize.BIGINT(32),
		primaryKey: true,
		allowNull: false
	},
	// 父级编号
	Dict_PID: {
		type: Sequelize.BIGINT(32),
		defaultValue: '1'
	},
	// 类型
	TYPE: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 标签名
	NAME: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 数据值
	VALUE: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 描述
	Description: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 排序（升序）
	SortNumber: {
		type: Sequelize.CHAR(1),
		allowNull: false
	},
	// 创建者
	CreateBy: {
		type: Sequelize.BIGINT(32),
		allowNull: false
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.BIGINT(32),
		allowNull: false
	},
	// 更新时间
	UpdateTime: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 删除标记
	DeleteFlag: {
		type: Sequelize.CHAR(1),
		allowNull: false
	}
})

module.exports = Sys_dict

