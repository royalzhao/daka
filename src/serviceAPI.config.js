// if (process.env.NODE_ENV === 'production') {
//     var BASEURL = "https://morning.yingtaizhenghe.com"
//     var LOCALURL = "http://192.168.0.192/"
//     var LOCALURL2 = "https://morning.yingtaizhenghe.com/core/"
// } else {
    var BASEURL = "https://morning.yingtaizhenghe.com"
    var LOCALURL = "https://morning.yingtaizhenghe.com/wxpaySign/"
    var LOCALURL2 = "https://morning.yingtaizhenghe.com/core/"
// }

const URL ={
    baseUrl:BASEURL,
    userSignDate : LOCALURL+'userSignDate',    //首页日期记录信息
    showLuckyUserList:LOCALURL2+'showLuckyUserList', //首页文字轮播
    newlyIncreased:LOCALURL2+'newlyIncreased', //首页新增人数金额统计
    wallet:LOCALURL+'wallet', //我的钱包
    checkIsLucky:LOCALURL+'checkIsLucky', //交易通知
    supplementUserinfo:LOCALURL+'supplementUserinfo', //用户信息补全
    activityNow:LOCALURL2+'activityNow', //显示当前活动日期规则
    showChoice:LOCALURL2+'showChoice', //精选留言
    leaveWord:LOCALURL+'leaveWord', //发送留言
    showAccountInfo:LOCALURL+'showAccountInfo', //个人信息
    doSign:LOCALURL+'doSign', //打卡
    signInStatistics:LOCALURL2+'signInStatistics', //我的界面显示活动人数和打卡人数等信息
    showTransactionRecord:LOCALURL+'showTransactionRecord', //我的界面显示活动人数和打卡人数等信息
    recharge:LOCALURL+'recharge', //报名充值
}

module.exports = URL
