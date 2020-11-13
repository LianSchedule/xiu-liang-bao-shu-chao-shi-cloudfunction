'use strict';
const mysql = require('mysql');
const find = require('./mysql/find')
//
/**
 * 封装mysql执行操作为Promise
 * 
 * @param {Object} sql
 * @param {Object} values
 */
const query = function (connection, sql, values) {
	return new Promise((resolve, reject) => {
		connection.query(sql, values, (error, results, fields) => {
			if (error) {
				reject({ r: false, result: error })
			} else {
				resolve({ r: true, result: results })
			}
		})
	})
}

module.exports = async (tableName, sql, params) => {
	let result
	try {
		const connectionConf = await find.findConnection(tableName)
		if (connectionConf.err) {
			result = {
				r: false,
				result: connectionConf.err,
				location: connectionConf.location
			}
		} else { 
			const connection = mysql.createConnection(connectionConf)
			connection.connect()
			result = await query(connection, sql, params)
			connection.end()
		} 
	} catch (e) {
		result = {
			r: false,
			result: e
		}
	}
	if (result.r === false) {
		const log = require('./log.js')
		await log.file('mysql失败', { result: result, sql: sql, params: params }, {}, null, null, null, {})
	}
	//{r:false,result:e} {r:true,result:results}
	//update {"r":true,"result":{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":34,"warningCount":0,"message":"(Rows matched: 0  Changed: 0  Warnings: 0","protocol41":true,"changedRows":0}}
	//insert {"r":true,"result":{"fieldCount":0,"affectedRows":1,"insertId":3,"serverStatus":2,"warningCount":3,"message":"","protocol41":true,"changedRows":0}}
	//select {"r":true,"result":[{"number":1,"id":"123456","nickname":"我不是奶茶","createTime":"2020-10-03T11:32:39.000Z","deleteTime":null,"loginPw":"35d8f3e1c44c87347da53e50acc191c3","payPw":"1","role":"[\"sex-man\"]","accountStatus":"AS1","mobile":"15695296156"}]}
	//delete {"r":true,"result":{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}}
	return result
};
