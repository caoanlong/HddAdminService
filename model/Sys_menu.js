const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')

const Sys_role = require('../model/Sys_role')
const Sys_role_menu = require('../model/Sys_role_menu')

/* 系统菜单 */
const Sys_menu = sequelize.define('sys_menu', {
	// 编号
	Menu_ID: {
		type: Sequelize.STRING(64),
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false
	},
	// 父级编号
	Menu_PID: {
		type: Sequelize.STRING(64),
		defaultValue: '',
		allowNull: false
	},
	// 英文名称
	name: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 名称
	title: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 排序
	SortNumber: {
		type: Sequelize.BIGINT(11),
		allowNull: false
	},
	// 链接路径
	path: {
		type: Sequelize.STRING(2000)
	},
	// 重定向
	redirect: {
		type: Sequelize.STRING(100)
	},
	// 目标组件
	component: {
		type: Sequelize.STRING(100)
	},
	// 图标
	Icon: {
		type: Sequelize.STRING(100)
	},
	// 是否在菜单中显示
	IsShow: {
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
	// 备注信息
	Remark: {
		type: Sequelize.STRING(255)
	}
})
Sys_menu.hasMany(Sys_menu, {as: 'children', foreignKey: 'Menu_PID'})
Sys_menu.belongsToMany(Sys_role, {through: Sys_role_menu, foreignKey: 'menu_id'})
Sys_role.belongsToMany(Sys_menu, {through: Sys_role_menu, foreignKey: 'role_id'})

// Sys_menu.sync()
// Sys_role.sync()

module.exports = Sys_menu

