<template>
    <div>
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <mu-card>
            <mu-text-field label="昵称" v-model="form.nickname" hintText="请输入昵称" fullWidth/><br/>
            <mu-text-field label="姓名" v-model="form.real_name"  hintText="请输入真实姓名" fullWidth/><br/>
            <mu-select-field v-model="form.sexNum" :labelFocusClass="['label-foucs']" label="性别">
                <mu-menu-item v-for="text,index in sex" :key="index" :value="index" :title="text" />
            </mu-select-field>
            <br/>
            
           
                <mu-text-field  label="手机号" hintText="请输入手机号码" v-model="form.phone_no" @change="phoneChange" fullWidth type="number"/><br/>
                <!-- 
              <div class="yanzhengma">
                    <mu-text-field  label="验证码" hintText="请输入您的验证码" v-model="VeriCode"  @change="VeriCode_LaBel" fullWidth/><br/>
                    <mu-flat-button  :label="VeriCodeBtnLaBel" class="VeriCodeBtn" @click="getCode()" primary fullWidth />
                    <mu-raised-button label="验证码" class="demo-raised-button code" primary/>
                </div>
           -->
            <!-- <mu-snackbar v-if="Codetoast" message="验证码错误(demo输入六位即可)" action="确定" @actionClick="hideToast" @close="hideToast"/> -->
            <mu-snackbar v-if="phonetoast" message="请填入正确的手机号" />
            <mu-snackbar v-if="coedSendToast" message="验证码发送成功" />
            <mu-snackbar v-if="allToast" message="请填入所有信息"  />

            <mu-text-field label="地区" hintText="请输入地区" v-model="address"  @focus="openBottomSheet" fullWidth/><br/>
            <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"/>
            </mu-bottom-sheet>

            <mu-text-field label="详细地址" hintText="请输入详细地址" v-model="form.address_info" fullWidth/><br/>
            <div class="save">
                <div v-if="changed">
                        <mu-raised-button label="保存修改" @click="submit" class="demo-raised-button" primary/>
                </div>
                <div v-else>
                        <mu-raised-button label="保存修改" class="demo-raised-button" disabled/>
                </div>
                
            </div>
            
        </mu-card>
    </div>
</template>
<script>
    const address = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
    '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
    '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
    '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
    '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
    '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
    '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
    '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
    '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
    '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
    '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
    '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
    '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
    '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
    '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
    '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
    '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
    '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
    '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
    }
    import url from '@/serviceAPI.config.js'
    export default {
        
        data(){
            return{
                Title_Data:'个人资料',
                sex:['未知','男','女'],
                addressSlots: [
                    {
                    width: '100%',
                    textAlign: 'right',
                    values: Object.keys(address)
                    }, {
                    width: '100%',
                    textAlign: 'left',
                    values: ['北京']
                    }
                ],
                address: ['北京', '北京'],
                addressProvince: '北京',
                addressCity: '北京',
                bottomSheet: false,
                VeriCode: '',
                phoneNum:'',
                Title_Data:'个人资料',
                phone:true,
                VeriCodeBtnLaBel: '获取验证码',
                show: true,
                Codetoast: false,
                phonetoast : false,
                coedSendToast : false,
                allToast : false,
                form:{
                    nickname:'',
                    real_name:'',
                    sexNum:0,
                    phone_no:'',
                    address:'',
                    address_info: '',
                },
                changed:false
            }
        },
        mounted() {
            this.init()
        },
        watch:{
            form:{
                handler:function(obj){
                   this.changed = true
                },
                deep:true
            },
            address(){
                this.form.address = this.address[0]+','+this.address[1]
            }
        },
        methods:{
            init(){
                this.$fetch(url.showAccountInfo).then(res => {
                    //this.messageList = res
                    console.log(res)
                    this.form.nickname = res.nickname
                    this.form.real_name = res.real_name
                    this.form.sexNum = Number(res.sexNum)
                    this.form.phone_no = res.phone_no
                    //this.form.address = res.address
                    this.form.address_info = res.address_info
                })
                
            },
            RouterOne(){
                this.$router.go(-1);
            },
            addressChange (value, index) {
                switch (index) {
                    case 0:
                    this.addressProvince = value
                    const arr = address[value]
                    this.addressSlots[1].values = arr
                    this.addressCity = arr[0]
                    break
                    case 1:
                    this.addressCity = value
                    break
                }
                //this.bottomSheet = false
                this.address = [this.addressProvince, this.addressCity]
            },
            closeBottomSheet () {
                this.bottomSheet = false
            },
            openBottomSheet () {
                this.bottomSheet = true
            },
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
            // submit(){
            //     if(this.phoneNum.length >= '11' && this.VeriCode.length > '1'){
            //         if(this.VeriCode.length < '6'){
            //             this.Codetoast = true
            //             if (this.toastTimer) clearTimeout(this.toastTimer)
            //             this.toastTimer = setTimeout(() => { this.Codetoast = false }, 2000)
            //         }else{
            //             console.log('修改成功')
            //         }
            //     }else{
            //         this.allToast = true
            //         if (this.toastTimer) clearTimeout(this.toastTimer)
            //         this.toastTimer = setTimeout(() => { this.allToast = false }, 2000)
            //     }
            // },
            submit(){   //发送修改内容到服务器
                if(this.form.nickname.length >= '1' && this.form.real_name.length >= '1' && this.form.phone_no.length >= '1' && this.form.address_info.length >= '1'){
                    var qs = require('qs');
                    this.$post(url.supplementUserinfo,qs.stringify(this.form)).then(res => {
                      
                        if(res.returnCode == 'success'){
                            this.changed = false
                        }else{
                            alert("网络错误")
                        }
                    })
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
.mu-card{
    width: 90%;
    margin: 1rem auto;
    padding: 10px;
}
.demo-picker-container{
  width: 256px;

}
.save{
    text-align: center;
}
.VeriCodeBtn{
    margin-top: -3.7em;
    float:right;
}
</style>