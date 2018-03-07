const config = new Map()

// mysql
config.set('mysql', {
	host: '192.168.1.48',
	port: 3306,
	user: 'root',
	password: 'We@123456',
	database: 'hdd_v2_0_4'
})

// test-mysql
config.set('test-mysql', {
	host: '192.168.1.48',
	port: 3306,
	user: 'root',
	password: 'We@123456',
	database: 'hdd_admin_2'
})

module.exports = config