import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout =()=>import('@/views/Layout')
const View =()=>import('@/views/View')
const NotFound =()=>import('@/views/NotFound')
const News =()=>import('@/views/pages/News')
const CesiumView =()=>import('@/views/pages/CesiumView')
const Terrain =()=>import('@/views/pages/Terrain')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect:"/layout"
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        children:[
            {
                path:'/news',
                name:"news",
                component:News,
            },
            {
                path:'/cesiumView',
                name:"cesiumView",
                component:CesiumView,
            },
            {
                path:'/terrain',
                name:"terrain",
                component:Terrain,
            },
        ]
    },
    {
        path: '/view/:id',
        name: 'view',
        component: View,
        meta:{
            title:"动态路由"
        }
    },
    
    {
        path: '*',
        name: '404',
        component: NotFound,
        meta:{
            title:"404"
        }
    }
]

const router = new VueRouter({
    routes,
    mode:"hash",
    linkActiveClass:'active',    
})

export default router
