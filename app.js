const request = require('request');
const sendSMS = (mobile, code) =>{
	return request.post({
		url: 'http://ippanel.com/api/select',
		body: {
			"op":"pattern",
			"user":"",
			"pass":"",
			"fromNum":"",
			"toNum": `${mobile}`,
			"patternCode":"",
			"inputData":[
					{"code":`${code}`},
					]
		},
		json: true,
		}, (error, response, body) => {
		if (!error && response.statusCode === 200) return true
	});
}

module.exports = {
	sendSMS
}
