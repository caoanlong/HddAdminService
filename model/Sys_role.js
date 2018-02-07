const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

/* 系统权限角色 */
const Sys_role = sequelize.define('sys_role', {
	// 编号
	Role_ID: {
		type: Sequelize.STRING(64),
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false
	},
	// 归属机构
	Organization_ID: {
		type: Sequelize.STRING(64)
	},
	// 角色名称
	Name: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 英文名称
	EnName: {
		type: Sequelize.STRING(100)
	},
	// 权限类型
	RoleType: {
		type: Sequelize.STRING(50)
	},
	// 数据范围
	DataScope: {
		type: Sequelize.CHAR(1)
	},
	// 是否系统数据
	Issys: {
		type: Sequelize.CHAR(1)
	},
	// 是否可用
	Useable: {
		type: Sequelize.CHAR(1)
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
	// 备注信息
	Remark: {
		type: Sequelize.STRING(255)
	},
	// 删除标记
	DelFlag: {
		type: Sequelize.CHAR(1),
		allowNull: false
	}
})

module.exports = Sys_role

