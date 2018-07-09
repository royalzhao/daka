const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://192.168.0.126:8080/"
const LOCALURL2 = "http://192.168.0.126:8081/"
const URL ={
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
}

module.exports = URL
