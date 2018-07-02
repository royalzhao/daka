<template>
    <div>
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <div class="content">
            <div v-for="item in notice">
                <mu-card>
                    <mu-card-text>
                        <div v-html="item.html"></div>
                    </mu-card-text>
                </mu-card>
            </div>
            
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                Title_Data:'消息通知',
                notice:[
                    {html:'<h1>123</h1>'},
                    {html:'<h1>123</h1>'},
                    {html:'<h1>123</h1>'},
                    {html:'<h1>123</h1>'},
                ]
            }
        },
        methods:{
            RouterOne(){
                this.$router.go(-1);
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
</style>