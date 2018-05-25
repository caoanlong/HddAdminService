const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

/* 标准常量 */
const Base_conststand = sequelize.define('base_conststand', {
	// 常量ID
	ConstStd_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		// defaultValue: Sequelize.UUIDV1,
		allowNull: false
	},
	// 常量类型
	Type: {
		type: Sequelize.STRING(20),
		defaultValue: '1'
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
	// 值
	Value: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 描述
	Description: {
		type: Sequelize.STRING(320)
	},
	// 序号
	SortNumber: {
		type: Sequelize.BIGINT(11),
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
	StdConstFlag: {
		type: Sequelize.CHAR(1)
	},
	// 删除标志
	DeleteFlag: {
		type: Sequelize.CHAR(1)
	},
	// 删除人
	DeleteBy: {
		type: Sequelize.BIGINT(32)
	},
	// 删除时间
	DeleteTime: {
		type: Sequelize.DATE
	}
})

module.exports = Base_conststand

