<template>
    <div class="main">
        <div class="head">
            <img src="./../../../static/img/head.png" alt="">
        </div>
        <div class="calendar">
            <show-calendar></show-calendar>
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
                <mu-text-field hintText="输入你想说的话" multiLine :rows="2" :rowsMax="4"/><br/>
                <mu-raised-button label="发送" @click="sendCloseBottomSheet" class="demo-raised-button" primary/>
            </div>
        </mu-bottom-sheet>
        <!-- 点击参与 -->
        <div class="involvement">
            参与
        </div>
    </div>
</template>
<script>
    import url from '@/serviceAPI.config.js'
    import showCalendar from '../other/calendar.vue'
    import awardScroll from '../other/awardScroll.vue'
    import mainTab from '../other/mainTab.vue'
    
    export default {
        data(){
            return{
                todayPersonNum:0,
                totalPerson:2701,
                totalMoney:721560.00,
                personPay:210,
                newlyIncreased:0,
                arrDate: [],
                bottomSheet: false
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
                this.$fetch(url.newlyIncreased).then(res => {
                   this.totalPerson = res.IntegrationSum
                   this.newlyIncreased = res.newlyIncreased
                   this.totalMoney = res.IntegrationSum*210
                   this.todayPersonNum = res.todaySignIn
                   console.log(res)
                })
            },
            closeBottomSheet () {
                this.bottomSheet = false
            },
            openBottomSheet () {
                this.bottomSheet = true
            },
            sendCloseBottomSheet(){
                this.bottomSheet = false
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
        font-size: 0.5rem;
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
</style>