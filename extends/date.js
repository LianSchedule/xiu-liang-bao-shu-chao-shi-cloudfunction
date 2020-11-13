module.exports = function (type, timeStamp, offset = 8) {
	let D
	if (timeStamp === undefined) {
		//uniCloud云端的云函数使用的时区是utc+0，本地运行时使用的是本机时间，中国一般是+8
		D = new Date(Date.now() + (new Date().getTimezoneOffset() + (offset || 0) * 60) * 60000)
	} else {
		D = new Date(timeStamp)
	}
	let myN
	let myY
	let myR
	let myh
	let mym
	let mys
	switch (type) {
		case 1: //2020年4月21日 21时23分3秒
			return D.getFullYear() + '年' + (D.getMonth() + 1) + '月' + D.getDate() + '日 ' + D.getHours() + '时' + D.getMinutes() +
				'分' + D.getSeconds() + '秒'
		case 2: //1587557374535 毫秒时间戳
			return D.getTime()
		case 3: //2020-4-21 21:23:3
			return D.getFullYear() + '-' + (D.getMonth() + 1) + '-' + D.getDate() + ' ' + D.getHours() + ':' + D.getMinutes() +
				':' + D.getSeconds()
		case 4: //2020-4-21 21:23:03
			myN = D.getFullYear();
			myY = D.getMonth() + 1;
			myR = D.getDate();
			myh = D.getHours();
			mym = D.getMinutes();
			mys = D.getSeconds();
			if (myh < 10) {
				myh = '0' + myh
			}
			if (mym < 10) {
				mym = '0' + mym
			}
			if (mys < 10) {
				mys = '0' + mys
			}
			if (myR < 10) {
				myR = '0' + myR
			}
			return myN + '-' + myY + '-' + myR + ' ' + myh + ':' + mym + ':' + mys
		case 5: //2020-04-21 21:23:03
			myN = D.getFullYear();
			myY = D.getMonth() + 1;
			myR = D.getDate();
			myh = D.getHours();
			mym = D.getMinutes();
			mys = D.getSeconds();
			if (myh < 10) {
				myh = '0' + myh
			}
			if (myY < 10) {
				myY = '0' + myY
			}
			if (mym < 10) {
				mym = '0' + mym
			}
			if (mys < 10) {
				mys = '0' + mys
			}
			if (myR < 10) {
				myR = '0' + myR
			}
			return myN + '-' + myY + '-' + myR + ' ' + myh + ':' + mym + ':' + mys
		case 6: //2020-04-21
			myN = D.getFullYear();
			myY = D.getMonth() + 1;
			myR = D.getDate();
			if (myY < 10) {
				myY = '0' + myY
			}
			if (myR < 10) {
				myR = '0' + myR
			}
			return myN + '-' + myY + '-' + myR
		case 7: //21:23:03
			myh = D.getHours();
			mym = D.getMinutes();
			mys = D.getSeconds();
			if (myh < 10) {
				myh = '0' + myh
			}
			if (mym < 10) {
				mym = '0' + mym
			}
			if (mys < 10) {
				mys = '0' + mys
			}
			return myh + ':' + mym + ':' + mys
		case 8: //1604564200 秒时间戳
			return Math.floor(D.getTime()/1000)
		default:
			return null
	}
}
