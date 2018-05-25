const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

/* 会员 */
const Mem_member = sequelize.define('mem_member', {
	// 会员ID
	Mem_ID: {
		type: Sequelize.BIGINT(20),
		primaryKey: true,
		allowNull: false
	},
	// 会员类型
	Type: {
		type: Sequelize.STRING(50)
	},
	// 所属企业会员ID
	Mem_EntID: {
		type: Sequelize.BIGINT(20)
	},
	// 企业标识
	EntFlag: {
		type: Sequelize.CHAR(1)
	},
	// 手机号码
	Mobile: {
		type: Sequelize.STRING(11)
	},
	// 昵称
	NickName: {
		type: Sequelize.STRING(20)
	},
	// 真实姓名
	RealName: {
		type: Sequelize.STRING(20)
	},
	// 性别
	Sex: {
		type: Sequelize.CHAR(1)
	},
	// 业务介绍
	Introduction: {
		type: Sequelize.STRING(320)
	},
	// 公司所在区域
	Area_ID: {
		type: Sequelize.STRING(32)
	},
	// 账户余额
	AccountBalance: {
		type: Sequelize.DOUBLE
	},
	// 登录密码
	LogonPassword: {
		type: Sequelize.STRING(32)
	},
	// 密码Salt
	Salt: {
		type: Sequelize.STRING(10)
	},
	// 支付密码
	PayPassword: {
		type: Sequelize.STRING(32)
	},
	// 分值
	Score: {
		type: Sequelize.INTEGER(11)
	},
	// 星级
	Level: {
		type: Sequelize.INTEGER(11)
	},
	// 是否认证通过
	CertifyStatus: {
		type: Sequelize.CHAR(1)
	},
	// 是否锁定
	Status: {
		type: Sequelize.CHAR(1)
	},
	// 创建时间
	CreateTime: {
		type: Sequelize.DATE
	},
	// 
	CertifyPerson_ID: {
		type: Sequelize.STRING(32)
	},
	// 
	CertifyEnterprice_ID: {
		type: Sequelize.STRING(32)
	},
	// 会员车辆认证ID
	TruckCertify_ID: {
		type: Sequelize.BIGINT(20)
	},
	// 关联车辆表的主键
	Truck_ID: {
		type: Sequelize.BIGINT(20)
	},
	// 会员头像URL
	HeadPicture: {
		type: Sequelize.STRING(300)
	}
})

module.exports = Mem_member

