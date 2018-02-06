const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')

/* 字典 */
const Sys_dict = sequelize.define('sys_dict', {
	// 编号
	Dict_ID: {
		type: Sequelize.STRING(64),
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false
	},
	// 父级编号
	Dict_PID: {
		type: Sequelize.STRING(64),
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
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 创建时间
	CreateDate: {
		type: Sequelize.DATE,
		defaultValue: new Date()
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 更新时间
	UpdateDate: {
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

