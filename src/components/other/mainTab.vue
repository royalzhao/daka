<template>
    <div>
        <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="留言"/>
        <mu-tab value="tab2" title="打卡说明"/>
        
        </mu-tabs>
        <div v-if="activeTab === 'tab1'">
            <p>
                <mu-list>
                    <mu-list-item title="张三">
                    <mu-avatar src="../../../static/img/avatar1.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                        <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
                    </span>
                    <span slot="right" class="time">一周前</span>
                    </mu-list-item>
                    <mu-divider inset/>
                    <mu-list-item title="李四">
                    <mu-avatar src="../../../static/img/avatar2.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                        <span style="color: rgba(0, 0, 0, .87)">看电影啊</span>
                        我们去看电影，最近有部烂片上映，又有吐槽的了
                    </span>
                    <span slot="right" class="time">一周前</span>
                    </mu-list-item>
                    <mu-divider inset/>
                    <mu-list-item title="王五">
                    <mu-avatar src="../../../static/img/avatar3.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                        <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
                        周末一起 LOL
                    </span>
                    <span slot="right" class="time">一周前</span>
                    </mu-list-item>
                    <mu-divider inset/>
                    <mu-list-item title="赵六">
                    <mu-avatar src="../../../static/img/uicon.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                        <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/> 实在编不下去，这就是个demo
                    </span>
                    <span slot="right" class="time">一周前</span>
                    </mu-list-item>
                </mu-list>
            </p>
        </div>
        <div v-if="activeTab === 'tab2'">
            <h2>打卡说明</h2>
            <p>
                这是第二个 tab
                <div v-time="timeNow"></div>
                <div v-time="timeBefore"></div>
            </p>
        </div>
        
    </div>
</template>
    
<script>
    import Vue from 'vue'
    var Time = {
        //获取当前时间戳
        getUnix:function(){
        var date = new Date();
        return date.getTime();
        },
        //获取今天0点0分0秒的时间戳
        getTodayUnix:function(){
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
        },
        //获取今年1月1日0点0分0秒的时间戳
        getYearUnix:function(){
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
        },
        //获取标准年月日
        getLastDate:function(time){
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
        },
        //转换时间
        getFormatTime:function(timestamp){
        var now = this.getUnix(); // 当前时间戳
        var today = this.getTodayUnix(); // 今天0点的时间戳
        var year = this.getYearUnix(); // 今年0点的时间戳
        var timer = (now - timestamp) / 1000; // 转换为秒级时间戳
        var tip = '';
    
        if(timer <= 0){
            tip = '刚刚';
        }else if(Math.floor(timer/60) <= 0){
            tip = '刚刚';
        }else if(timer < 3600){
            tip = Math.floor(timer/60) + '分钟前';
        }else if(timer >= 3600 && (timestamp - today >= 0)){
            tip = Math.floor(timer/3600) + '小时前';
        }else if(timer/86400 <= 31){
            tip = Math.ceil(timer/86400) + '天前';
        }else{
            tip = this.getLastDate(timestamp);
        }
        return tip;
        }
   }
   Vue.directive('time',{
        bind:function(el, binding){
            el.innerHTML = Time.getFormatTime(binding.value);
            el.__timeout__ = setInterval(function(){
            el.innerHTML = Time.getFormatTime(binding.value);
            }, 60000)
        },
        unbind:function(el){
            clearInterval(el.__timeout__);
            delete el.__timeout__;
        }
    })
    export default {
        data () {
            return {
                activeTab: 'tab1',
                timeNow:(new Date()).getTime(),
                timeBefore:686219755822
            }
        },
        methods: {
            handleTabChange (val) {
                this.activeTab = val
            }
        }
    }
</script>
<style scoped>
    .mu-tabs{
        background: #fff;
    }
    .mu-tab-link{
        color: #666;
    }
    .mu-tab-active{
        color: #2196f3;
    }
    .mu-tabs .mu-tab-link-highlight{
        background-color:#2196f3 !important;
    }
    .mu-item-right{
        top:-10px !important;
        width: 50px !important;
    }
</style>
        
        