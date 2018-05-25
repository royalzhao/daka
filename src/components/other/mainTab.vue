<template>
    <div>
        <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="留言"/>
        <mu-tab value="tab2" title="打卡说明"/>
        
        </mu-tabs>
        <div v-if="activeTab === 'tab1'">
        <p>
            
                <mu-list>
                  <mu-list-item title="张三">
                    <mu-avatar src="../../../static/img/avatar1.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                      <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
                    </span>
                    <span slot="right" class="time">一周前</span>
                  </mu-list-item>
                  <mu-divider inset/>
                  <mu-list-item title="李四">
                    <mu-avatar src="../../../static/img/avatar2.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                      <span style="color: rgba(0, 0, 0, .87)">看电影啊</span>
                      我们去看电影，最近有部烂片上映，又有吐槽的了
                    </span>
                    <span slot="right" class="time">一周前</span>
                  </mu-list-item>
                  <mu-divider inset/>
                  <mu-list-item title="王五">
                    <mu-avatar src="../../../static/img/avatar3.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                      <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
                      周末一起 LOL
                    </span>
                    <span slot="right" class="time">一周前</span>
                  </mu-list-item>
                  <mu-divider inset/>
                  <mu-list-item title="赵六">
                    <mu-avatar src="../../../static/img/uicon.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                      <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/> 实在编不下去，这就是个demo
                    </span>
                    <span slot="right" class="time">一周前</span>
                  </mu-list-item>
                </mu-list>
            
        </p>
        </div>
        <div v-if="activeTab === 'tab2'">
        <h2>打卡说明</h2>
        <p>
            这是第二个 tab
        </p>
        </div>
        
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
        }
    }
}
</script>
<style scoped>
    .mu-tabs{
        background: #fff;
    }
    .mu-tab-link{
        color: #666;
    }
    .mu-tab-active{
        color: #2196f3;
    }
    .mu-tabs .mu-tab-link-highlight{
        background-color:#2196f3 !important;
    }
    .mu-item-right{
        top:-10px !important;
        width: 50px !important;
    }
</style>
        
        