<template>
    <div>
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <mu-card>
            <mu-card-title title="钱包余额"/>
            <mu-card-text>
                <div class="num">¥0.00</div>
            </mu-card-text>
            <mu-card-actions>
                <mu-flat-button v-if="cash" label="提现"/>
                <mu-flat-button v-else label="低于1元不能提现"/>
            </mu-card-actions>
        </mu-card>

        <mu-card>
            <mu-flexbox class="mt8">
                <mu-flexbox-item class="flex-demo">
                    <p class="title">累计收入</p>
                    <p>0元</p>
                </mu-flexbox-item>
                <mu-flexbox-item class="flex-demo">
                    <p class="title">累计提现</p>
                    <p>0元</p>
                </mu-flexbox-item>
            </mu-flexbox>
        </mu-card>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                cash:false,
                Title_Data:'我的钱包',
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
.mu-card{
    background-color: #2196f3;
    width: 90%;
    margin: 1rem auto;
}

.mu-card-text {
    color: #fff;
    font-size: 2.5rem;
    padding: 0;
    text-align: center;
}
.mu-card-actions{
    text-align: center;
}
.mu-flat-button {
    color: #fff;
    background-color: transparent;
    border: 1px solid;
    border-radius: 5px;
}
.mu-card-actions{
    padding: 17px;
}
.mt8{
    background: #fff;
    text-align: center;
    padding: 1rem 0;
}
.mt8 .flex-demo .title{
    color: #666;
}
</style>