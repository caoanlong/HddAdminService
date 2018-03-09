const jwtConfig = {
	'secret': 'secret',
	'iss': {
		'iss': 'hdd-auth',
		'exp': 1000*60*60*24*365
	}
}

module.exports = jwtConfig