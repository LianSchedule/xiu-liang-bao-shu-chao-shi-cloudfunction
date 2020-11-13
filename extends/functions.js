module.exports = {
	async randomString(len) {
		const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
		const maxPos = chars.length;
		let pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	async randomInt(len) {
		const chars = '123456789';
		const maxPos = chars.length;
		let pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	async randId(len) {
		const time = new Date().getTime()
		const arr = [
			'Q', 'T', 'I', 'P', 'A', 'G', 'K', 'Z', 'V', 'M'
		];
		let str =await this.randomString(len)
		for (let i = 0; i < time.toString().length; i++) {
			str = str + arr[time.toString()[i]]
		}
		return str
	}
}
