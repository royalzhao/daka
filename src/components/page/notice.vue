<template>
    <div>
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <div class="content">
            <p class="noRecord" v-if="show">暂无记录</p>
            <div class="v-else">
                <div v-for="item in notice">
                    <mu-card>
                        <mu-card-text>
                            恭喜您在{{item.time}}的抽奖中获得{{item.p_name}},
                            <span v-if="address">
                                请完善您的地址信息，我们将马上为您发货
                            </span>
                            <span v-else>
                                请耐心等待，我们将马上为您发货
                            </span>
                        </mu-card-text>
                    </mu-card>
                </div>
            </div>
            
            
        </div>
        
    </div>
</template>
<script>
    import url from '@/serviceAPI.config.js'
    export default {
        data(){
            return{
                Title_Data:'消息通知',
                notice:[],
                address:true,
                show:false,
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            RouterOne(){
                this.$router.go(-1);
            },
            init(){
                this.$fetch(url.checkIsLucky).then(res => {
                    console.log(res)
                  if(res[0].address == 'undefind'){
                      this.address = false
                  }
                   
                   if(res[0].length>0){
                        this.show = false
                        this.notice = res[0]
                   }else{
                        this.show=true
                   }
                })
            },
        }
    }
</script>
<style scoped>
.content{
    background: #fff;
    width: 95%;
    margin: 0 auto;
    border-radius: 5px;
}
.mu-card{
    margin: 10px 0;
}
.noRecord{
    text-align: center;
    margin-top: 1rem;
    color: #999;
    background: #f9f9f9;
}
</style>