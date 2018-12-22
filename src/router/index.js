import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home',
            component: () => import('@/components'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/components/home/home'),
                    meta: {
                        title: '首页',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/agent',
                    name: 'agent',
                    component: () => import('@/components/agent/agent'),
                    meta: {
                        title: '代理区',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/shopCar',
                    name: 'shopCar',
                    component: () => import('@/components/shopCar/shopCar'),
                    meta: {
                        title: '购物车',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/member',
                    name: 'member',
                    component: () => import('@/components/member/member'),
                    meta: {
                        title: '会员中心',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/order',
                    name: 'order',
                    component: () => import('@/components/order/order'),
                    meta: {
                        title: '订单管理',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/proDetail',
                    name: 'proDetail',
                    component: () => import('@/components/proDetail/proDetail'),
                    meta: {
                        title: '产品详情',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/indexlist',
                    name: 'indexlist',
                    component: () => import('@/components/indexlist/indexlist'),
                    meta: {
                        title: 'indexlist',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/rain',
                    name: 'rain',
                    component: () => import('@/components/drawc/rain'),
                    meta: {
                        title: 'rain',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/fireWork',
                    name: 'fireWork',
                    component: () => import('@/components/drawc/fireWork'),
                    meta: {
                        title: 'canvas-fireWork',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/visualize',
                    name: 'visualize',
                    component: () => import('@/components/drawc/visualize'),
                    meta: {
                        title: 'canvas-visualize',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
                {
                    path: '/promise',
                    name: 'promise',
                    component: () => import('@/components/promise/promise'),
                    meta: {
                        title: 'promise对象',
                        showTitle: true,
                        showBack: true,
                        showMore: false,
                        showBottom: true
                    },
                },
            ]
        },
        {
            path: '/404',
            name: 'page404',
            component: () => import('@/components/error')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/login/login'),
        }
    ]
})
