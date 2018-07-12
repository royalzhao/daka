import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import main from '@/components/page/main'
import live from '@/components/page/live'
import me from '@/components/page/me'
import bindPhone from '@/components/page/bindPhone'
import updatePassword from '@/components/page/updatePassword'
import wallet from '@/components/page/wallet'
import personalInfo from '@/components/page/personalInfo'
import record from '@/components/page/record'
import notice from '@/components/page/notice'

Vue.use(Router)

const routes=[
  {
    path: '/show/pay',
    component: index,
    children:[
      {
        path:'',
        name:'main',
        component:main
      },
      {
        path:'/show/pay/me',
        name:'me',
        component:me
      },
      {
        path:'/show/pay/live',
        name:'live',
        component:live
      },
      
    ]
  },{
    path: '/show/pay/bindPhone',//绑定手机
    name:'bindPhone',
    component: bindPhone
  },{
    path: '/show/pay/updatePassword',//修改密码
    name:'updatePassword',
    component: updatePassword
  },{
    path:'/show/pay/wallet',
    name:'wallet',
    component:wallet
  },{
    path:'/show/pay/personalInfo',
    name:'personalInfo',
    component:personalInfo
  },{
    path:'/show/pay/record',
    name:'record',
    component:record
  },{
    path:'/show/pay/notice',
    name:'notice',
    component:notice
  
  }
];

const router = new Router({
  //mode:'history',
  routes
})

export default router;


