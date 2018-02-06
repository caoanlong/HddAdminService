const crypto = require('crypto')

let uuidNum = () => {
	crypto.randomBytes(16, (ex, buf) => {
		return buf.toString('hex')
	})
}

module.exports = uuidNum