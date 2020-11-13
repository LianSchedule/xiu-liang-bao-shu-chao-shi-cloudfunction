const development = require('./development')
const log = require('../extends/log')
const coMode=require('./mode')
module.exports = async function (name, mode = 'auto') {
	const conf = {
		'mysql': {
			'connection': {
				'connection1': {
					host: '',
					port: 3306,
					user: '',
					password: '',
					database: '',
					charset: 'utf8mb4',
				},
				'connection2': {
					host: '',
					port: 3306,
					user: '',
					password: '',
					database: '',
					charset: 'utf8mb4',
				},
			}
		}
	}
	if (mode !== null) {
		if (mode === 'auto') {
			const mode_=await coMode.getMode()
			mode=mode_.mode
		}
	}

	const nameArr = name.split('/')
	const location = "['" + nameArr.join("']['") + "']"
	let v
	try {
		eval('v=conf' + location)
	} catch (e) {
		v = undefined
	}
	
	if (v === undefined) {
		await log.file('conf key或者key的value不存在', { name: name, mode: mode })
		return null
	} else {
		if (mode !== null) {
			v = v[mode]
		}
		if (v) {
			return v
		} else {
			await log.file('conf key的model不存在', { name: name, mode: mode })
			return null
		}
	}
	//不存在时返回null
}