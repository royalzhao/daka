<template>
    <div class="me">
        <div class="top">
            <div class="bg1">
                <img src="./../../../static/img/bg.png" alt="">
            </div>
            <div class="bg2">
                <img src="./../../../static/img/card.png" alt="">
                
            </div>
            <div class="face">
                <div class="circle_1">
                    <div class="circle_2">
                        <div class="circle_3">
                            <div class="circle_4">
                                <img class="face-img" :src="headImg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="username">
                <p>{{username}}</p>
            </div>
        </div>
        <div class="bottom">
            <div class="sign" @click="daka">
                <i class="iconfont icon-qiandao"></i>每日打卡
            </div>
            <div class="sign-person">
                <div class="person-left">
                    <ul>
                        <li v-for="item in faceList">
                            <img :src="item.headimgurl" alt="">
                        </li>
                        
                        <li>{{allUser}}位用户</li>
                    </ul>
                </div>
                <div class="person-right">
                    已有{{signUser}}位用户打卡
                </div>
            </div>
            
            <mu-list>
                  
                <mu-list-item title="交易通知" to="notice">
                <i slot="left" class="iconfont icon-tongzhi"/></i>

                <mu-badge content="1" secondary slot="right"/>
                    
                </mu-list-item>
                <mu-divider />
                <mu-list-item title="交易记录" to="record">
                <i slot="left" class="iconfont icon-dingdan"/></i>
                <i slot="right" class="iconfont icon-arrow-right-copy"/></i>
                </mu-list-item>
                <mu-divider />
                <!-- <mu-list-item title="绑定手机" to="bindPhone">
                <i slot="left" class="iconfont icon-shouji"/></i>
                <i slot="right" class="iconfont icon-arrow-right-copy"/></i>
                </mu-list-item>
                <mu-divider /> -->
                <!-- <mu-list-item title="修改密码" to="updatePassword">
                <i slot="left" class="iconfont icon-suo"/></i>
                <i slot="right" class="iconfont icon-arrow-right-copy"/></i>
                </mu-list-item>
                <mu-divider /> -->
                <mu-list-item title="我的钱包" to="wallet">
                <i slot="left" class="iconfont icon-qianbao"/></i>
                <i slot="right" class="iconfont icon-arrow-right-copy"/></i>
                </mu-list-item>
                <mu-divider />
                <mu-list-item title="个人资料" to="personalInfo">
                <i slot="left" class="iconfont icon-gerenziliao"/></i>
                <i slot="right" class="iconfont icon-arrow-right-copy"/></i>
                </mu-list-item>
            </mu-list>
                
                
           
        </div>
        <mu-snackbar v-if="snackbar" :message="toastMessage" action="关闭"  @actionClick="hideSnackbar" @close="hideSnackbar"/>
    </div>
</template>
<script>
    import url from '@/serviceAPI.config.js'
    export default {
        name: 'me',
        data(){
            return{
                username:JSON.parse(localStorage.getItem('userInfo')).nickname,
                allUser:0,
                signUser:0,
                headImg:JSON.parse(localStorage.getItem('userInfo')).headimgurl,
                snackbar:false,
                toastMessage:'',
                faceList:[]
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(){
                this.$fetch(url.signInStatistics).then(res => {
                    this.faceList = res[0]
                    this.allUser = res[1].nameListCount
                    this.signUser = res[1].todaySignInCount
                  
                    console.log(res)
                    console.log(this.faceList)
                    console.log(res[1].nameListCount)
                    console.log(this.signUser)
                })
            },
            hideSnackbar() {
                this.snackbar = false
                if (this.snackTimer) clearTimeout(this.snackTimer)
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

                  }
                })
            },
        }
    }
</script>
<style scoped>

.top{
    position: relative;
    background: #fff;
}
.top .bg1{
    height: 100%;
}
.top .bg1 img{
    width: 100%;
}
.top .bg2 img{
    width: 100%;
    position: absolute;
    bottom: 4px;
    z-index: 100;
}
/* .top .face img{
    width: 4rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2rem;
    margin-top:-1.5rem;
    border-radius: 50%;
} */
.top .face .circle_1{
    width: 4.8rem;
    height: 4.8rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2.4rem;
    margin-top:-2rem;
    border-radius: 50%;
    background: #9aaab7;
}
.top .face .circle_2{
    width: 4.6rem;
    height: 4.6rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2.3rem;
    margin-top:-2.3rem;
    border-radius: 50%;
    background: #8396a5;
}
.top .face .circle_3{
    width: 4.4rem;
    height: 4.4rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2.2rem;
    margin-top:-2.2rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
}
.top .face .circle_4{
    width: 4rem;
    height: 4rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2rem;
    margin-top:-2rem;
    border-radius: 50%;
    background: #fff;
}
.top .face .face-img{
    width: 3.8rem;
    height: 3.8rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1.9rem;
    margin-top:-1.9rem;
    border-radius: 50%;
    z-index: 101;
}
.top .username{
    text-align: center;
    z-index: 100;
    position:absolute;
    width:200px;
    left: 50%;
    right: 0;
    bottom: 5px;
    margin-left: -100px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-size: 1.1rem;
}
.top .username p{
    font-weight: bold;
    margin: 0;
}
.bottom{
    background: #fff;
}
.bottom .sign{
    border: 1px solid #ff4181;
    width: 100px;
    text-align: center;
    color: #ff4181;
    border-radius: 20px;
    margin: 0 auto;
}
.bottom .sign-person{
    display: flex;
    justify-content: space-around;
    font-size: 0.8rem;
    align-items: center;
    color: #999;
    margin: 10px 0;
}
.bottom .sign-person .person-left ul li{
    display: inline-block;
    line-height: 20px;
}
.bottom .sign-person .person-left ul{
    padding-left: 0;
    display: flex;
    align-items: center;
    margin: 0;
}
.bottom .sign-person .person-left ul li img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.mu-item-right{
    margin-top: 0  !important;
}
.icon-dingdan{
    color: #fec601;
    
}
.icon-shouji{
    color: #2095f4;
}
.icon-suo{
    color: #05e187;
}
.icon-qianbao{
    color: #ff4181;
}
.icon-gerenziliao{
    color: #fe605f;
}
.icon-tongzhi{
    color: rgb(241, 24, 24);
}
</style>