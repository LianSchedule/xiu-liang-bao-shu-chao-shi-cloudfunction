const getRawBody = require('raw-body');
const login = require('./event/user/login.js')
const role = require('./event/user/role.js')
const routeList = require('./common/route.js')
const global = require('./common/global.js')
const conf=require('./common/conf')
/*
if you open the initializer feature, please implement the initializer function, as below:
module.exports.initializer = function(context, callback) {
	console.log('initializing');
	callback(null, '');
};
*/
function getData(req) {
	return new Promise((resolve, reject) => {
		getRawBody(req, async function (err, body) {
			if (err) {
				reject({ err: err })
			} else {
				if (body.length > 0) {
					resolve(JSON.parse(body.toString('utf-8')))
				} else {
					resolve({})
				}
			}
		});
	})
}
module.exports.handler = async function (req, resp, context) {
	try {
		const data = await getData(req)
		const dataCheck = await data_.checkFunc(data)
		if (dataCheck.err) {
			returnData = dataCheck
		} else {
			returnData = await route.exec(dataCheck, context)
		}
		//返回数据
		returnData = await data_.returnFunc(returnData)
		console.log(returnData)
		resp.send(JSON.stringify({r:true,result:returnData}))
	} catch (e) {
		Object.defineProperty(e, 'toJSON', {
			configurable: true,
			value: function () {
				var alt = {}
				var storeKey = function (key) {
					alt[key] = this[key]
				}
				Object.getOwnPropertyNames(this).forEach(storeKey, this);
				return alt
			}
		})
		console.log(e)
		resp.send(JSON.stringify({ r: false, err: e }))
	}

}
const route = {
	async exec(data, context) {
		//return [typeof data,data]
		const route = data.params.route
		const id = data.id
		const at = data.at
		const ci = data.ci
		const routeConf = routeList.route[route]
		//路由配置检查
		const checkRoute = await this.checkRoute(data, routeConf, data.id, data.at, data.ci)
		if (checkRoute.err) {
			return checkRoute
		} else {
			//执行路由
			data = checkRoute
			return await this.execRoute(context, data.params.params, routeConf, data.id, data.at, data.ci)
		}
	},
	//执行路由
	async execRoute(context, params, routeConf, id, at, ci) {
		const routeArray = routeConf.route.split('/')
		const arrayLength = routeArray.length
		const path = './controller/' + routeArray.slice(0, arrayLength - 1).join('/') + '.js'
		const entry = require(path)
		//return [routeArray]
		return await eval(' entry.' + routeArray[arrayLength - 1] + '(params,id,at,ci,context)')
	},
	//路由配置检查
	async checkRoute(data, routeConf, id, at, ci) {
		if (routeConf) {
			//需要登录
			if (routeConf.login) {
				if (id) {
					//检查at或者ci
					//{err} {result}
					const loginInfo = await login.getLoginInfo(id)
					if (loginInfo.err) {
						return loginInfo
					} else {
						const type = loginInfo.result.type
						if (routeConf.login.indexOf(type) === -1) {
							return {
								err: '访问路由受限：登录状态错误',
								location: 1603210236
							}
						} else {
							//类型为clientId时，accessToken不可信
							switch (type) {
								case 'ci':
									data['at'] = null
									break
								case 'at':
									if (data.at !== loginInfo.result.value.at) {
										return {
											err: '访问路由受限：用户密钥错误',
											location: 1603210237
										}
									}
									break
								default:
									return {
										err: '访问路由受限：用户密钥错误',
										location: 1603210238
									}
							}

							//权限检查
							if (routeConf.permission) {
								//用户的角色ID
								const roleIds = loginInfo.result.value.role
								//用户的排除权限ID
								const permissionExcept = loginInfo.result.value.permissionExcept
								//用户的角色ID所拥有的权限ID
								const permissionIds = await role.getPermissionIdsWithRoleIdsFromRedis(roleIds)
								
								for (let i in routeConf.permission) {
									const permissionId = routeConf.permission[i]
									//该权限没有被排除
									if (permissionExcept.indexOf(permissionId) === -1) {
										//该权限在用户所属角色拥有的权限ID中
										if (permissionIds.indexOf(permissionId) > -1) {
											return data
										}
									}
								}
								return {
									err: '访问路由受限：用户权限',
									location: 1603210239
								}

							}
						}
					}
				} else {
					return {
						err: '未传递用户ID',
						location: 1603210240
					}
				}
			} else {
				data.at = null
				data.ci = null
			}
		} else {
			return {
				err: '未定义路由',
				location: 1603210241
			}
		}
		return data
	}
}

const data_ = {
	async returnFunc(returnData) {
		if (returnData !== undefined && typeof returnData === 'object' && returnData.err !== undefined && typeof returnData
			.err === 'number') {
			const value = global.returnCode[returnData.err]
			if (value) {
				returnData.err = value.info
			}
		}
		return returnData
	},
	async checkFunc(data) {
		
		//检查route
		const route = data.params.route
		//return data
		//console.log('4')
		if (route) {
			//检查params
			const params = data.params.params
			if (params === undefined) {
				data.params.params = {}
			}
			return data
		} else {
			return {
				err: '未配置路由',
				location: 1603210242
			}
		}
	},
}
