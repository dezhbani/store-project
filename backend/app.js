			const request = require('request');
const sendSMS = (mobile, code) =>{
	return request.post({
		url: 'http://ippanel.com/api/select',
		body: {
			"op":"pattern",
			"user":"u-9906345580",
			"pass":"MATINdezhbani",
			"fromNum":"+9850001040241565",
			"toNum": `${mobile}`,
			"patternCode":"6x5e01fhw2",
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
