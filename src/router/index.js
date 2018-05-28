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

Vue.use(Router)

const routes=[
  {
    path: '/',
    component: index,
    children:[
      {
        path:'',
        name:'main',
        component:main
      },
      {
        path:'/me',
        name:'me',
        component:me
      },
      {
        path:'/live',
        name:'live',
        component:live
      },
      
    ]
  },{
    path: '/bindPhone',//绑定手机
    name:'bindPhone',
    component: bindPhone
  },{
    path: '/updatePassword',//修改密码
    name:'updatePassword',
    component: updatePassword
  },{
    path:'/wallet',
    name:'wallet',
    component:wallet
  },{
    path:'/personalInfo',
    name:'personalInfo',
    component:personalInfo
  },{
    path:'/record',
    name:'record',
    component:record
  },
];

const router = new Router({
  routes
})

export default router;


