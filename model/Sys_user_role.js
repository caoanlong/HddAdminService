const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')

/* 权限角色与用户关联 */
const Sys_user_role = sequelize.define('sys_user_role', {
	// 用户编号
	user_id: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	// 角色编号
	role_id: {
		type: Sequelize.STRING(64),
		allowNull: false
	}
})

module.exports = Sys_user_role

