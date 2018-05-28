<template>
        <div class="bindPhone">
            <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
            </mu-appbar>
            <div class="content">
                <mu-text-field hintText="请输入新密码" v-model="password"  fullWidth  icon="lock_open"/><br/>
                <mu-text-field hintText="请再次输入密码" v-model="commitPassword" fullWidth @click="commitPasswordMethod"  icon="lock_open"/><br/>
            </div>
            <mu-raised-button label="确认修改" @click="submit" class="demo-raised-button submit" fullWidth primary/>
            <mu-snackbar v-if="commitPasswordToast" message="两次密码输入不正确" action="确定" @actionClick="hideToast" @close="hideToast"/>
            <mu-snackbar v-if="allToast" message="请填入所有信息" action="确定" @actionClick="hideToast" @close="hideToast"/>
        </div>
    </template>
    <script>
        export default {
            data(){
                return{
                    password: '',
                    commitPassword:'',
                    Title_Data:'密码修改',
                    commitPasswordToast:false,
                    allToast:false,
                }
            },
            methods:{
                
                RouterOne(){
                    this.$router.go(-1);
                },
                commitPasswordMethod(){
                    if(this.commitPassword != this.password){
                        this.commitPasswordToast = true
                        if (this.toastTimer) clearTimeout(this.toastTimer)
                        this.toastTimer = setTimeout(() => { this.commitPasswordToast = false }, 2000)
                    }
                },
                submit(){
                    if(this.password.length >= '1' && this.commitPassword.length >= '1'){
                        
                            console.log('修改成功')
                        
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
       
        
        .Top-Class{
           
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
        
    </style>
        
        