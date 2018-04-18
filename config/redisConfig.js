const redis = require('redis')
const client = redis.createClient({
	'host': '192.168.1.48',
	'port': 6379,
	'password': '123456'
})

client.select('6', (err) => {
	if (err) {
		console.log("Error " + err)
		return false
	} else {
		console.log('redis connect success!!!')
	}
})


module.exports = client