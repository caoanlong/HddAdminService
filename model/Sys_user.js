const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')

/* 系统权限角色 */
const Sys_user = sequelize.define('sys_user', {
	// 编号
	User_ID: {
		type: Sequelize.BIGINT(32),
		primaryKey: true,
		allowNull: false
	},
	// 归属公司
	Company_ID: {
		type: Sequelize.BIGINT(64)
	},
	// 归属部门
	Organization_ID: {
		type: Sequelize.BIGINT(64)
	},
	// 登录名
	LoginName: {
		type: Sequelize.STRING(100)
	},
	// 密码
	Password: {
		type: Sequelize.STRING(100)
	},
	// 支付密码
	PayPassword: {
		type: Sequelize.STRING(100)
	},
	// 工号
	JobNo: {
		type: Sequelize.STRING(100)
	},
	// 姓名
	Name: {
		type: Sequelize.STRING(100)
	},
	// 性别
	Sex: {
		type: Sequelize.CHAR(1)
	},
	// 邮箱
	Email: {
		type: Sequelize.STRING(200)
	},
	// 电话
	Phone: {
		type: Sequelize.STRING(200)
	},
	// 手机
	Mobile: {
		type: Sequelize.STRING(200)
	},
	// 用户类型
	Type: {
		type: Sequelize.INTEGER
	},
	// 用户头像
	Photo: {
		type: Sequelize.STRING(1000)
	},
	// 最后登陆IP
	PCID: {
		type: Sequelize.STRING(100)
	},
	// 最后登陆时间
	LastLoginTime: {
		type: Sequelize.DATE
	},
	// 是否可登录
	LoginFlag: {
		type: Sequelize.STRING(64)
	},
	// 创建者
	CreateBy: {
		type: Sequelize.BIGINT(32)
	},
	// 创建时间
	CreateDate: {
		type: Sequelize.DATEONLY
	},
	// 更新者
	UpdateBy: {
		type: Sequelize.BIGINT(32)
	},
	// 更新时间
	UpdateDate: {
		type: Sequelize.DATEONLY
	},
	// 备注信息
	Remark: {
		type: Sequelize.STRING(255)
	},
	// 删除标记
	DelFlag: {
		type: Sequelize.CHAR(1)
	},
	// 二维码
	QrCode: {
		type: Sequelize.STRING(1000)
	},
	// 个性签名
	Sign: {
		type: Sequelize.STRING(450)
	}
})

module.exports = Sys_user

