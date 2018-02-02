const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')

/* 系统权限角色 */
const Sys_menu = sequelize.define('sys_menu', {
	// 编号
	Menu_ID: {
		type: Sequelize.STRING(64),
		primaryKey: true,
		allowNull: false
	},
	// 父级编号
	Menu_PID: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 名称
	Name: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	// 排序
	SortNumber: {
		type: Sequelize.DECIMAL(10, 0),
		allowNull: false
	},
	// 链接路径
	Href: {
		type: Sequelize.STRING(2000)
	},
	// 目标组件
	Target: {
		type: Sequelize.STRING(20)
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
	// 权限标识
	Permission: {
		type: Sequelize.STRING(200)
	},
	// 创建者
	CreateBy: {
		type: Sequelize.BIGINT(64),
		allowNull: false
	},
	// 创建时间
	CreateDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.BIGINT(64),
		allowNull: false
	},
	// 更新时间
	UpdateDate: {
		type: Sequelize.DATE,
		allowNull: false
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

module.exports = Sys_menu

