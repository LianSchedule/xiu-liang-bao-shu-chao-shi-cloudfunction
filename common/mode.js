const development=require('./development')
module.exports={
    modes:{
        mode1:{
            //是否内网，针对线上数据库、云服务器来说
            internal:true,
        },
        mode2:{
            //是否内网，针对线上数据库、云服务器来说
            internal:false,
        },
    },
    async getMode(){
        if (development.development === true) {
            //外网调试模式
            return {mode:'mode2',conf:this.modes.mode2}
        } else {
            return {mode:'mode1',conf:this.modes.mode1}
        }
    }
}