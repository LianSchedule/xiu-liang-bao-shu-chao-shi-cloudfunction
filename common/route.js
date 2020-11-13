module.exports = {
	//仅把需要自定义配置的路由写到此处即可
	//login表示需要登录访问，at表示用户以accessToken方式登录（正常用户），ci表示用户以clientId方式登录（临时用户）（ci方式登录时前端参数at的值将被清除，无login限制时at和ci将被清除）
	//permission表示需要用户具备权限，用户存在其中任一权限即可访问（只有在设置login限制后permission限制才有效）
	route: {
		't': {
			route: 't/c',
			//login:['at'],
			//permission:["a"]
		},
		
	},
}
