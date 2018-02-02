const config = require('../config/db').get('test-mysql')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	dialect: 'mysql',
	pool: {
		idle: 30000,
		min: 20,
		max: 30
	},
	define: {
		engine: 'innodb',
		freezeTableName: true, // 使用define中的名字
		timestamps: false, // 取消字段updateAt,createAt
	},
	operatorsAliases: false
})

// sequelize.sync()

console.log('mysql connect success!!!')

module.exports = sequelize