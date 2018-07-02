<template>
    <div class="calender">
        <mu-card>
            <!-- 年份 月份 -->
            <div class="month">
                
                <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
                <div class="year-month" @click="pickYear(currentYear,currentMonth)">
                    <span class="choose-year">{{ currentYear }}</span>&nbsp;-&nbsp;<span class="choose-month">{{ currentMonth }}月</span>
                </div>
                
            </div>
            <mu-divider />
            <!-- 星期 -->
            <ul class="weekdays">
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
                <li>日</li>
            </ul>
            <!-- 日期 -->
            <ul class="days">
                <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                <li  v-for="dayobject in days">
                    <!--本月-->
                    <!--如果不是本月  改变类名加灰色-->
        
                    <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
        
                    <!--如果是本月  还需要判断是不是这一天-->
                    <span v-else>
                <!--今天  同年同月同日-->
                        <span v-if=" dayobject.isSign===true" class="sign">
                            {{ dayobject.day.getDate() }}
                            <span class="bag"></span>
                        </span>
                        <span v-else-if=" dayobject.isNoSign===true" class="nosign">
                            {{ dayobject.day.getDate() }}
                            <span class="bag"></span>
                        </span>
                        <span v-else-if="dayobject.isToday===true" class="active">
                            {{ dayobject.day.getDate() }}
                            
                        </span>
                        <span v-else>
                            {{ dayobject.day.getDate() }}
                            
                        </span>
                    </span>
        
                </li>
            </ul>
        </mu-card>
    </div>
</template>
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    export default {
        data(){
            return{
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                arrDate: [],
                noSignDate:[]
            }
        },
        mounted(){
            this.initData(null);
            this.getData();
        },
        methods: {
            getData:function(){
                
                // this.$fetch(url.userSignDate).then(res => {
                //     var arr = []
                //     for(let item of res){
                //         console.log(item)
                //         arr.push(Number(item.s_date))
                //     }
                //     JSON.parse(JSON.stringify(arr));
                //    this.arrDate = [].concat(arr)
                  
                  
                //    console.log(arr)
                //     console.log(this.arrDate)
                   
                // });
                
            },
            initData: function(cur) {
                this.$fetch(url.userSignDate).then(res => {
                    var arr = []
                    for(let item of res){
                        console.log(item)
                        arr.push(Number(item.s_date))
                    }
                   
                   this.arrDate = [].concat(arr)
                  
                   

                   var leftcount=0; //存放剩余数量
                    var date;
                    if (cur) {
                    console.log(cur)
                        date = new Date(cur);
                    } else {
                        var now=new Date();
                        var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                        d.setDate(42);
                        date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                    }
                    this.currentDay = date.getDate();
                    this.currentYear = date.getFullYear();
                    this.currentMonth = date.getMonth() + 1;

                    this.currentWeek = date.getDay(); // 1...6,0
                    if (this.currentWeek == 0) {
                        this.currentWeek = 7;
                    }
                    var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                    this.days.length = 0;
                    // 今天是周日，放在第一行第7个位置，前面6个
                    //初始化本周
                    for (var i = this.currentWeek - 1; i >= 0; i--) {
                        var d = new Date(str);
                        d.setDate(d.getDate() - i);
                        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                        dayobject.day=d;
                        this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                    }
                    //其他周
                    for (var i = 1; i <= 42 - this.currentWeek; i++) {
                        var d = new Date(str);
                        d.setDate(d.getDate() + i);
                        var dayobject={};
                        // dayobject.day=d;
                        dayobject = {day: d,isSign: this.isVerDate(d.getDate()),isNoSign: this.isNoSign(d.getDate()),isToday: this.isToday(d.getDate())}
                        this.days.push(dayobject);
                    }

                });


                

            },
            isVerDate (v) {
                //console.log(this.arrDate.includes(v))
                return this.arrDate.includes(v)
                
            },
            isNoSign (v) {
                //console.log(this.noSignDate.includes(v))
                return this.noSignDate.includes(v)
            },
            isToday(v){
                let date = new Date();
                
                if(date.getDate() == v){
                    return true;
                }else{
                    return false;
                }
                
            },
            pickPre: function(year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickNext: function(year, month) {
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(42);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickYear: function(year, month) {
                alert(year + "," + month);
            },

            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function(year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            },


        }
    }
</script>
<style scoped>
    li{
        list-style: none;
    }
    .calender .mu-card{
        webkit-box-shadow: 0 1px 15px #2196f347, 0 2px 10px #f5f5f5;
        box-shadow: 0 1px 15px #2196f347, 0 2px 10px #f5f5f5;
        
    }
    .month .year-month{
        text-align: center;
        padding: 0.5rem 0;
    }
    .weekdays{
        margin: 0;
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        color: #999;
        justify-content: space-around;
    }
    .weekdays li{
        display: inline-block;
        width: 13.6%;
        text-align: center;
    }
    .days {
        padding: 0;
        background: #FFFFFF;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        height: 35px;
        text-align: center;
        padding-bottom: 5px;
        padding-top: 5px;
        font-size: 1rem;
        color: #000;
    }

    .days li .active {
        padding: 6px;
        border-radius: 50%;
        background: #2196f3;
        color: #fff;
    }

    .days li .other-month {
        padding: 5px;
        color: gainsboro;
    }   
    .sign .bag{
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin: 0 auto;
        background: #ff4081;
    }
    .nosign .bag{
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin: 0 auto;
        background: #ccc;
    }
    
</style>