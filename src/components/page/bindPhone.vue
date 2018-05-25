<template>
    <div class="bindPhone">
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <div class="content">
            <mu-text-field hintText="请输入手机号码" v-model="phoneNum" @change="phoneChange" fullWidth type="number" icon="settings_cell"/><br/>
            
            <div class="yanzhengma">
                <mu-text-field hintText="请输入您的验证码" v-model="VeriCode"  @change="VeriCode_LaBel" icon="verified_user" fullWidth/><br/>
                <mu-flat-button  :label="VeriCodeBtnLaBel" class="VeriCodeBtn" @click="getCode()" primary fullWidth />
                <!-- <mu-raised-button label="验证码" class="demo-raised-button code" primary/> -->
            </div>
            
            
        </div>
        <mu-raised-button label="确认修改" @click="submit" class="demo-raised-button submit" fullWidth primary/>
        <mu-snackbar v-if="Codetoast" message="验证码错误(demo输入六位即可)" action="确定" @actionClick="hideToast" @close="hideToast"/>
        <mu-snackbar v-if="phonetoast" message="请填入正确的手机号" action="确定" @actionClick="hideToast" @close="hideToast"/>
        <mu-snackbar v-if="coedSendToast" message="验证码发送成功" action="确定" @actionClick="hideToast" @close="hideToast"/>
        <mu-snackbar v-if="allToast" message="请填入所有信息" action="确定" @actionClick="hideToast" @close="hideToast"/>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                VeriCode: '',
                phoneNum:'',
                Title_Data:'手机号码绑定',
                phone:true,
                VeriCodeBtnLaBel: '获取验证码',
                show: true,
                Codetoast: false,
                phonetoast : false,
                coedSendToast : false,
                allToast : false,
            }
        },
        methods:{
            VeriCode_LaBel () {
                if(this.VeriCodeLaBel.length > '1'){
                    this.VeriCodeLaBel = ' ';
                }else{
                    this.VeriCodeLaBel = '请输入您的验证码';
                }
            },
            phoneChange(){
                var reg=11 && /^((13|14|15|17|16|18)[0-9]{1}\d{8})$/;
                if (!reg.test(this.phoneNum)) {

                    this.phonetoast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.phonetoast = false }, 2000)

                } else if(!this.phoneNum) {

                    this.phonetoast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.phonetoast = false }, 2000)
                    
                }
            },
            RouterOne(){
                this.$router.go(-1);
            },
            getCode(){
                if(this.show === true){
                    this.coedSendToast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.coedSendToast = false }, 2000)
                        const TIME_COUNT = '60';
                            if (!this.timer) {
                                this.count = TIME_COUNT;
                                this.show = false;
                                this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                    this.VeriCodeBtnLaBel = this.count + '秒后重试'
                                } else {
                                    this.VeriCodeBtnLaBel = '重新获取'
                                    this.show = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                }
            },
            submit(){
                if(this.phoneNum.length >= '11' && this.VeriCode.length > '1'){
                    if(this.VeriCode.length < '6'){
                        this.Codetoast = true
                        if (this.toastTimer) clearTimeout(this.toastTimer)
                        this.toastTimer = setTimeout(() => { this.Codetoast = false }, 2000)
                    }else{
                        console.log('修改成功')
                    }
                }else{
                    this.allToast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => { this.allToast = false }, 2000)
                }
            }
        }
    }
</script>

<style scoped>
    .yanzhengma{
        position: relative;
    }
    .titleClass{
        text-align:center;
        font-size: 1.15em;
        margin-right: 15.2%;
    }
    .code{
        position: absolute;
        position: absolute;
        right: 0;
        top: 0;
    }
    .Top-Class{
        background: #f9f9f9;
        color: #666;
        margin-bottom: 20px;
    }
    p{
        text-align: center;
        margin: 0;
        padding: 20px 0;
        font-size: 1.2rem;
        color: #999;
    }
    .content{
        background: #fff;
        width: 95%;
        margin: 0 auto;
        border-radius: 5px;
    }
    .submit{
        margin-top: 20px;
    }
    .VeriCodeBtn{
        margin-top: -3.7em;
        float:right;
    }
</style>
    
    