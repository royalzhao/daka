<template>
    <div>
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <p class="noRecord" v-if="show">暂无记录</p>
        <mu-card v-else>
            <ul>
                <li v-for="item in list">
                    <div class="itemLeft">
                        <p class="title">{{item.record_info}}</p>
                        <p class="time">{{item.time}}</p>
                    </div>
                    <div class="itemRight">
                        {{item.transaction_amount}}
                    </div>
                </li>
               
            </ul>
        </mu-card>
        
    </div>
</template>
<script>
import url from '@/serviceAPI.config.js'
 export default {
     data(){
         return{
            Title_Data:'交易记录',
            show:false,
            list:[

            ]
         }
     },
     mounted() {
        this.init()
    },
     methods:{
        init(){
            this.$post(url.showTransactionRecord).then(res => {
                console.log(res.length)
                if(res.length>0){
                    this.list = res
                    this.show = false
                }else{
                    this.show=true
                }
                
              
               
                
            })
        },
        RouterOne(){
            this.$router.go(-1);
        },
     }
 }
</script>
<style scoped>
.noRecord{
    text-align: center;
    margin-top: 1rem;
    color: #999;
}
ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px 15px;
}
.itemLeft .title{
    font-size: 1rem;
}
.itemLeft .time{
    font-size: 0.8rem;
    color: #999;
}
.itemRight{
    display: flex;
    align-items: center;
    font-size: 1.2rem;
}
</style>