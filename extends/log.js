const date = require('./date.js')
const functions = require('./functions.js')
const oss = require('./oss')
module.exports = {
	//await log.err(commit,data,params,id,at,ci,context)
	async err(commit = null, data = {}, params = {}, id = null, at = null, ci = null, context = {}) {
		const createTime = await date(5)
		//{r:false,result:e} {"r":true,"result":{"fieldCount":0,"affectedRows":1,"insertId":3,"serverStatus":2,"warningCount":3,"message":"","protocol41":true,"changedRows":0}}
		const mysql = require('./mysql.js')
		const i = await mysql(
			'insert into errorLog (createTime,commit,params,userId,accessToken,clientId,context,fixTime,fixResult,fixUserId,data) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
			[createTime, commit, JSON.stringify(params), id, at, ci, JSON.stringify(context), null, null, null, JSON.stringify(
				data)])
		//insert into errorLog (createTime,commit,params,userId,accessToken,clientId,context,fixTime,fixResult,fixUserId) VALUES ('2020-10-5 23:33:33','commit','{"a":1,"b":2}','userId','at','ci','{"a":1,"b":2}','2020-10-6 23:33:33','dsddsdsd','aa')
		if (i.r) {
			return {
				r: true
			}
		} else {
			return {
				r: false
			}
		}
		//{r:bool}
	},
	//await file(commit,data,params,id,at,ci,context)
	async file(commit = null, data = {}, params = {}, id = null, at = null, ci = null, context = {}) {
		const date1 = await date(6)
		const date2 = await date(7)
		const rand = await functions.randomString(20)
		const value = JSON.stringify({
			commit: commit,
			data: data,
			params: params,
			id: id,
			at: at,
			ci: ci,
			context: context
		})
		//{r:bool,result}
		const r = await oss.putBuffer('tongchenggu/log/err/' + date1 + '/' + date2 + '-' + commit + '-' + rand + '.txt', value, 'bucket2')
		return { r: true }
		//{r:bool,result}
	}
}
