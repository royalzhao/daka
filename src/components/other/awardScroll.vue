<template>
    <div class="scroll">
        <!-- <ul ref="con1" id="con1" :class="{anim:animate==true}">
            <li v-for='item in items'>
                恭喜<span style="color:rgb(33,150,243)">{{item.name}}</span>获得<span style="color:rgb(33,150,243)">{{item.award}}</span>
            </li>
        </ul> -->
        <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
            <ul class="item">
                <li v-for="item in listData">
                    恭喜<span style="color:rgb(33,150,243)">{{item.name}}</span>获得<span style="color:rgb(33,150,243)">{{item.award}}</span>
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>

<script>
        
export default {
    data() {
        return {
            animate:false,
            listData:[  //消息列表对应的数组
                {
                    name:"马云",
                    award:'派普肽一盒'
                },
                {
                    name:"雷军",
                    award:'派普肽一盒'
                },
                {
                    name:"王勤",
                    award:'派普肽一盒'
                },
                {
                    name:"王勤",
                    award:'派普肽一盒'
                },
                {
                    name:"王勤",
                    award:'派普肽一盒'
                },
                {
                    name:"王勤",
                    award:'派普肽一盒'
                },
            ]
        }
        },
        mounted(){
            //setInterval(this.scroll,1000) // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
            //console.log(this.$refs.con1.style.cssText)
        },
        
        methods: {
            scroll(){
                let con1 = document.querySelector('#con1');
                con1.style.marginTop='-30px';
                this.animate=!this.animate;
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function(){
                    that.items.push(that.items[0]);
                    that.items.shift();
                    con1.style.marginTop='0px';
                    that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                },500)
            }
        },
        computed: {
            optionSingleHeight () {
                return {
                    singleHeight: 30
                }
            }
        }
       
    }
</script>

<style>

*{
    margin: 0 ;
    padding: 0;
}
.scroll{
    width: 300px;
    height: 32px;
    line-height: 30px;
    overflow: hidden;
    margin: 0 auto;
    transition: all 0.5s;
}
.seamless-warp {
    height: 30px;
    overflow: hidden;
}
.anim{
    transition: all 0.5s;
}
#con1 li{
    list-style: none;
    line-height: 30px;
    height: 30px;
    text-align: center;
}
</style>