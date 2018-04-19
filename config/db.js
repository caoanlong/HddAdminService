const config = new Map()

// mysql
config.set('mysql', {
	host: '192.168.1.48',
	port: 3306,
	user: 'root',
	password: 'We@123456',
	database: 'hdd_v2_0_4'
})

// test-mysql 测试
config.set('test-mysql', {
	host: '192.168.1.48',
	port: 3306,
	user: 'root',
	password: 'We@123456',
	database: 'hdd_v3_2_test'
})

// test-mysql 演练
config.set('practice-mysql', {
	host: '192.168.1.110',
	port: 3306,
	user: 'root',
	password: 'We@123456',
	database: 'hdd'
})

module.exports = config