module.exports = {
    async strPad(str, char, length, start = false) {
        const currentLength = str.length
        //生成
        let fixstr = ''
        const fixstrLength = length - currentLength
        for (let index = 0; index < fixstrLength; index++) {
            fixstr = fixstr + char
        }
        //添加
        if (start) {
            str = fixstr + str
        } else {
            str = str + fixstr
        }
        return str
    }
}