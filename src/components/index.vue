<template>
  <div v-if="showState" class="loading">
    <mu-circular-progress :size="60" :strokeWidth="5"/>
  </div>
  <div v-else>
    <div class="hello">
      <div class="main-content">
          <router-view/>
      </div>
      <div class="footer">
          <cfooter></cfooter>
      </div>
      
    </div>
  </div>
  
</template>

<script>
  import cfooter from './common/footer.vue'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        showState:false
      }
    },
    created(){
        this.init()
    },
    methods:{
      init(){
        this.$fetch('https://morning.yingtaizhenghe.com/wxpaySign/info').then(res => {
            //console.log(res)
            //this.payData.openid = res.openid
              const userInfo={
                openid:res.openid,
                nickname: res.nickname,
                headimgurl: res.headimgurl
              };
              //localstorage存储用户的所有信息，包含openid等
              localStorage.setItem('userInfo',JSON.stringify(userInfo));
            
        }).catch(res=>{
          //this.showState = true
        })
      }
    },
    components:{
      cfooter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-content{
  margin-bottom: 68px;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.loading{
  text-align: center;
  margin-top: 50%;
}
</style>
