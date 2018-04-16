import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import main from '@/components/page/main'
import live from '@/components/page/live'
import me from '@/components/page/me'

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
  }
];

const router = new Router({
  routes
})

export default router;


