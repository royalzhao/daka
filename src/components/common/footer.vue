<template>
    <div class="footer">
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" icon=":iconfont icon-icon_home" @click="goMain" title="打卡"/>
            <mu-tab value="tab2" icon=":iconfont icon-xin2" @click="goLive" title="直播"/>
            <mu-tab value="tab3" icon=":iconfont icon-ziyuan" @click="goMe" title="我的"/>
        </mu-tabs>
    </div>
</template>
<script>
    export default {
      data () {
        return {
          activeTab: 'tab1'
        }
      },
      methods: {
        handleTabChange (val) {
          this.activeTab = val
        },
        goMain(){
            this.$router.push({name:'main'})
        },
        goLive(){
            this.$router.push({name:'live'})
        },
        goMe(){
            this.$router.push({name:'me'})
        },

      }
    }
</script>