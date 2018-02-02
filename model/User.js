const Sequelize = require('Sequelize')
const sequelize = require('./sequelize')
const moment = require('moment')

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING
	},
	description: Sequelize.TEXT,
	create_time: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: moment().unix()
	}
})

module.exports = User