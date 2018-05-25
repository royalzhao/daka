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
    import store from '@/vuex/store'
    import { mapGetters, mapActions,mapState } from 'vuex'
    export default {
      data () {
        return {
          
        }
      },
      computed: {
        activeTab:{
            get: function () {
                return this.$store.state.activeTab;
            },
            set: function () {
            }
        }
      },
      methods: {
        handleTabChange (val) {
          this.activeTab = val
        },
        goMain(){
            this.$router.push({name:'main'})
            this.$store.commit('change','tab1')
        },
        goLive(){
            this.$router.push({name:'live'})
            this.$store.commit('change','tab2')
        },
        goMe(){
            this.$router.push({name:'me'})
            this.$store.commit('change','tab3')
        },

      },
      store
    }
</script>