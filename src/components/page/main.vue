<template>
    <div class="main">
        <div class="head">
            <img src="./../../../static/img/head.png" alt="">
        </div>
        <div class="calendar">
            <show-calendar></show-calendar>
        </div>
        <div class="showState">
            <div class="message">
                {{stateMessage}}
            </div>
        </div>
        <div v-if='activityState' class="baoming-button" >
            <mu-raised-button label="点击报名" @click="join" class="demo-raised-button" fullWidth secondary />
        </div>
        <div v-if='dakaState' class="baoming-button" >
            <mu-raised-button label="点击打卡" @click="daka" class="demo-raised-button" fullWidth secondary />
        </div>
        <div class="block total-block">
            <p>{{todayPersonNum}}人早起打卡<br><span>{{totalPerson}}人参加，瓜分¥{{totalMoney}}</span></p>
            <div class="award">
                <award-scroll></award-scroll>
            </div>
        </div>
        <div class="block rule-block">
            <h3>活动规则</h3>
            <p class="line"></p>
            <p>
                未打卡扣10元/日，分给完成早起打卡的人。每日抽取两位幸运的早起者，各送派普肽一盒。
            </p>
        </div>
        <div class="block introduce-block">
            <h3>活动介绍</h3>
            <p class="line"></p>
            <div class="introduce-content">
                <ul>
                    <li>报名人数</li>
                    <li>{{totalPerson}}</li>
                </ul>
                <ul>
                    <li>总金额</li>
                    <li>¥{{totalMoney}}</li>
                </ul>
                <ul>
                    <li>每人缴纳</li>
                    <li>¥{{personPay}}</li>
                </ul>
            </div>
            <div class="awardAdd">
                <center>
                    <span>全勤奖新增¥{{newlyIncreased}}</span>
                </center>
            </div>
        </div>
        <div class="block tab-block">
            <main-tab></main-tab>
        </div>
        <!-- 写留言 -->
        <div class="write" @click="openBottomSheet" >
            
            <i class="iconfont icon-bi"></i>    
        </div>
        <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
            <div class="message-content">
                <mu-text-field hintText="输入你想说的话" v-model="message.content" multiLine :rows="2" :rowsMax="4"/><br/>
                <mu-raised-button label="发送" @click="sendCloseBottomSheet" class="demo-raised-button" primary/>
            </div>
        </mu-bottom-sheet>
        <!-- 点击参与 -->
        
        <div v-if='activityState' @click="join" class="involvement">
            报名
        </div>
        <mu-snackbar v-if="snackbar" :message="toastMessage" action="关闭"  @actionClick="hideSnackbar" @close="hideSnackbar"/>
    </div>
</template>
<script>
    import url from '@/serviceAPI.config.js'
    import showCalendar from '../other/calendar.vue'
    import awardScroll from '../other/awardScroll.vue'
    import mainTab from '../other/mainTab.vue'

    /* 日期解析，字符串转日期 
    * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16 
    * @returns {Date} 返回对应的日期对象 
    */  
    function dateParse(dateString){  
        var SEPARATOR_BAR = "-";  
        var SEPARATOR_SLASH = "/";  
        var SEPARATOR_DOT = ".";  
        var dateArray;  
        if(dateString.indexOf(SEPARATOR_BAR) > -1){  
            dateArray = dateString.split(SEPARATOR_BAR);    
        }else if(dateString.indexOf(SEPARATOR_SLASH) > -1){  
            dateArray = dateString.split(SEPARATOR_SLASH);  
        }else{  
            dateArray = dateString.split(SEPARATOR_DOT);  
        }  
        return new Date(dateArray[0], dateArray[1]-1, dateArray[2]);   
    };  

    function isEmpty(string){
        if(string == undefined){
            return false
        }else{
            return true;
        }
    }
    /** 
     * 日期比较大小 
     * compareDateString大于dateString，返回1； 
     * 等于返回0； 
     * compareDateString小于dateString，返回-1 
     * @param dateString 日期 
     * @param compareDateString 比较的日期 
     */  
    function dateCompare(dateString, compareDateString){  
        // if(isEmpty(dateString)){  
        //     alert("dateString不能为空");  
        //     return;  
        // }  
        // if(isEmpty(compareDateString)){  
        //     alert("compareDateString不能为空");  
        //     return;  
        // }  
        var dateTime = dateParse(dateString).getTime();  
        var compareDateTime = dateParse(compareDateString).getTime();  
        if(compareDateTime > dateTime){  
            return 1;  
        }else if(compareDateTime == dateTime){  
            return 0;  
        }else{  
            return -1;  
        }  
    };  
    
    /** 
     * 判断日期是否在区间内，在区间内返回true，否返回false 
     * @param dateString 日期字符串 
     * @param startDateString 区间开始日期字符串 
     * @param endDateString 区间结束日期字符串 
     * @returns {Number} 
     */  
    function isDateBetween(dateString, startDateString, endDateString){  
        // if(isEmpty(dateString)){  
        //     alert("dateString不能为空");  
        //     return;  
        // }  
        // if(isEmpty(startDateString)){  
        //     alert("startDateString不能为空");  
        //     return;  
        // }  
        // if(isEmpty(endDateString)){  
        //     alert("endDateString不能为空");  
        //     return;  
        // }  
        var flag = false;  
        var startFlag = (dateCompare(dateString, startDateString) < 1);  
        var endFlag = (dateCompare(dateString, endDateString) > -1);  
        if(startFlag && endFlag){  
            flag = true;  
        }  
        return flag;  
    };  

    const wx = require('weixin-js-sdk')
    const STATUS = 1
    export default {
        data(){
            return{
                todayPersonNum:0,
                totalPerson:2701,
                totalMoney:721560.00,
                personPay:210,
                newlyIncreased:0,
                arrDate: [],
                bottomSheet: false,
                stateMessage:'',
                activityState:false,
                message:{
                    content:'123'
                },
                snackbar:false,
                toastMessage:'',
                payData:{
                    openid:'',
					body:'幸运打卡第一期',
					total_fee:'10'
                },
               
                payUrl:{
                    url:'https://morning.yingtaizhenghe.com/#/'
                },
                dakaState:true
            }
        },
        components:{
            showCalendar,awardScroll,mainTab
        },
        
        mounted() {
            this.init()
        },
        methods: {
            init(){
                //console.log(JSON.parse(localStorage.getItem('userInfo')))
                //console.log(JSON.parse(localStorage.getItem('userInfo')).openid)
                this.payData.openid = JSON.parse(localStorage.getItem('userInfo')).openid
                 
                
                this.$fetch(url.newlyIncreased).then(res => {
                   this.totalPerson = res.IntegrationSum
                   this.newlyIncreased = res.newlyIncreased
                   this.totalMoney = res.IntegrationSum*210
                   this.todayPersonNum = res.todaySignIn
                   //console.log(res)
                })
                this.$fetch(url.activityNow).then(res => {
                    //console.log(res)
                    var myDateTime = new Date();//获取系统当前时间
                    var myData = myDateTime.toLocaleDateString(); //获取当前日期
                    if(isDateBetween(myData,res.begin_enroll_time,res.end_enroll_time)){
                        console.log('活动预报名中（点击下方按钮报名）')
                        this.stateMessage = '活动预报名中（点击下方按钮报名）'
                        this.activityState = true
                    }
                    else if(isDateBetween(myData,res.begin_sign_time,res.end_sign_time)){
                        this.stateMessage = '活动正在进行中，如需报名请等待下次活动开启'
                        console.log('活动正在进行中，如需报名请等待下次活动开启')
                        this.activityState = false
                        this.dakaState = true

                    }else{
                        this.stateMessage = '活动未开始'
                        console.log('活动未开始')
                        this.activityState = false
                    }
                    
                
                   
                })
            },
            closeBottomSheet () {           //关闭底部弹窗
                this.bottomSheet = false
            },
            openBottomSheet () {            //开启底部弹窗
                this.bottomSheet = true
            },
            sendCloseBottomSheet(){     //留言模块
                var qs = require('qs');
                this.$post(url.leaveWord,qs.stringify(this.message)).then(res => {
                  if(res.returnCode == 'success'){
                        this.toastMessage = '您的留言提交成功，请等待审核。'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
                        
                        if (this.toastTimer) clearTimeout(this.toastTimer)
                        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)

                        this.bottomSheet = false
                   }else{
                       alert("网络错误")
                   }
                })
                
            },
            hideSnackbar  () {
                this.snackbar = false
                if (this.snackTimer) clearTimeout(this.snackTimer)
            },
            join(){         //参加活动，调起支付接口
                this._getWxpayData()
            },
            daka(){
                this.$fetch(url.doSign).then(res => {
                  console.log(res)
                  if(res.resultCode == 'alreadyIn'){

                        this.toastMessage = '请勿重复打卡'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)

                  }else if(res.resultCode == 'overtime'){

                        this.toastMessage = '未在规定时间内打卡'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)

                  }else if(res.resultCode == 'success'){

                        this.toastMessage = '打卡成功'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)

                  }else if(res.resultCode == 'fail'){

                        this.toastMessage = '打卡失败'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)

                  }else if(res.resultCode == 'be-disqualified'){

                        this.toastMessage = '您非本次活动的参与者，无法打卡'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)

                  }
                })
            },
            _getWxpayData() { 
                let qs = require('qs');
                console.log(this.payData.openid)
                this.$post(url.baseUrl + '/wxpaySign/unifiedOrder',qs.stringify( this.payData)).then((res) => { 
                    // 这里的openid我存在了localStorage里面，获取授权进入时就进行了一次存入，方便调用。 
                    var that = res
                    if (res.checkResult == undefined) { 
                        this._wxpayConfig() 
                        wx.ready(() => { 
                            this._setWxpayInfo(that) 
                        }) 
                    }else{
                        console.log("以参与活动")
                    }
                }) 
            }, 
            _wxpayConfig() { 
                let qs = require('qs');
                this.$post(url.baseUrl + '/wxpaySign/js_access',qs.stringify( this.payUrl)).then((res) => {
                        console.log(res)
                        wx.config({
                            debug: false, 
                            appId: res.appId,
                            timestamp: res.timestamp, 
                            nonceStr: res.nonceStr, 
                            signature: res.signature, 
                            jsApiList: ['chooseWXPay'] 
                        }) 
                  
                }) 
            }, 
            _setWxpayInfo(data) { 
                
                wx.chooseWXPay({ 
                    timestamp : data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr : data.nonceStr, // 支付签名随机串，不长于 32 位
                    package : data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType : data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign : data.paySign, // 支付签名
                    success(res) { 
                       // 支付成功后的回调函数
                        if(res.errMsg === "chooseWXPay:ok" ) {
                                alert(res);
                        }else if(res.errMsg === "chooseWXPay:cancel") {
                            this.toastMessage = '取消付款。'
                            this.snackbar = true
                            if (this.snackTimer) clearTimeout(this.snackTimer)
                            this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
                            
                        }else if(res.errMsg === "chooseWXPay:fail") {
                            this.toastMessage = '支付失败'
                            this.snackbar = true
                            if (this.snackTimer) clearTimeout(this.snackTimer)
                            this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
                            
                        }else {
                            this.toastMessage = '未知异常'
                            this.snackbar = true
                            if (this.snackTimer) clearTimeout(this.snackTimer)
                            this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
                            
                        }
                    }, 
                    cancel() { 
                        this.toastMessage = '支付取消'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
                        //window.alert('支付取消') 
                        window.location.reload() 
                    }, error(res) { 
                        this.toastMessage = '支付失败'
                        this.snackbar = true
                        if (this.snackTimer) clearTimeout(this.snackTimer)
                        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
                        window.location.reload() 
                    } 
                }) 
            }
        }
    }
</script>
<style scoped>
    .head img{
        width:100%;
    }
    .calendar{
        width: 90%;
        margin: 0 auto;
        margin-top: -3rem;
    }
    .block{
        background: #fff;
        padding: 1rem 0.5rem 1rem 0.5rem;
        margin: 1rem 0;
    }
    .total-block{
        text-align: center;
        box-sizing: border-box;
        
    }
    .total-block p:nth-child(1){
        font-size: 0.8rem;
    }
    .total-block p:nth-child(1) span{
        font-size: 1rem;
        font-weight: bold;
    }
    .rule-block h3{
        font-size: 1.2rem;
        text-align: center;
    }
    .introduce-block h3{
        font-size: 1.2rem;
        text-align: center;
    }
    .introduce-block .introduce-content{
        display: flex;
        justify-content: space-around;
    }
    .introduce-block .introduce-content ul{
        text-align: center;
    }
    .introduce-block .introduce-content ul li:nth-child(2){
        font-weight: bold;
    }
    .introduce-block .awardAdd{
        margin-top: 1rem;
    }
    .introduce-block .awardAdd span{
        background: #2196f3;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        padding: 0.3rem 1rem;
        webkit-box-shadow: 0 1px 15px #2196f347, 0 2px 10px #f5f5f5;
        box-shadow: 0 5px 15px #2196f347, 0 2px 10px #f5f5f5;
    }
    .tab-block{
        padding: 0;
        margin: 0;
    }
    .block .line{
        width: 40px;
        height: 1px;
        background: #000;
        margin: 8px auto;
    }
    .award{
        margin: 1rem 0 0 0;
    }
    .involvement {
        text-align: center;
        line-height: 40px;
        width: 40px;
        height: 40px;
        border-radius:50%; 
        box-shadow: 0px 0px 19px 3px #999;
        position: fixed;
        bottom: 140px;
        right: 10px;
        background: #fff;
        z-index: 999;
    }
    .write{
        text-align: center;
        line-height: 40px;
        width: 40px;
        height: 40px;
        border-radius:50%; 
        box-shadow: 0px 0px 19px 3px #999;
        position: fixed;
        bottom: 80px;
        right: 10px;
        background: #fff;
        z-index: 999;
    }
    .message-content{
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
    }
    .showState{
        margin: 15px 0;
        background: #2196f3;
        color: #fff;
        text-align: center;
        padding: 10px 0;
        font-size: 20px;
    }
    .mu-raised-button-full{
        width: 90%;
    }
    .baoming-button{
        text-align: center;
    }
</style>