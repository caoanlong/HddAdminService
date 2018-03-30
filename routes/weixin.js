const express = require('express')
const router = express.Router()
const axios = require('axios')
const fs = require('fs')

router.get('/', (req, res) => {
	new Promise((resolve, reject) => {
		let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3214c4139b06a8e5&secret=601637cf99b47e236e77d647a91b3707'
		axios.get(url).then(response => {
			resolve(response)
		}).catch(response => {
			reject(response)
		})
	}).then(response => {
		console.log(response.data.access_token)
		let url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${response.data.access_token}`
		let data = {
			scene: 'nima',
            width: 150,
            page: 'pages/newCardDetail/newCardDetail'
		}
		axios.post(url, data).then(result => {
			let base64 = new Buffer(result.data,'binary').toString('base64')
			// fs.writeFile('./public/nima.png', result.data, err => {
			// 	if(err) {console.log(err)}
			// })
			res.send('data:image/png;base64,' + base64)
		})
	})
})

module.exports = router