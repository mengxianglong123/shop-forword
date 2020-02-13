import VueRouter from 'vue-router'
import Vue from 'vue'

// 挂载路由
Vue.use(VueRouter);

// 引入组件
const Login = () => import("@/views/login/Login.vue")
const Main = () => import("@/views/main/Main.vue")
const Goods = () => import("@/views/goods/Goods.vue")
const Seller = () => import("@/views/seller/Seller.vue")
const Welcome = () => import("@/views/welcome/Welcome.vue")
// 路由规则
const routes = [
    {
        path:'',
        redirect:"/toLogin"
    },
    {
        path:'/toLogin',
        component:Login
    },
    {
        path:'/main',
        component:Main,
        children:[
            {
                path:'',
                redirect:'/welcome'
            },
            {
                path:'/welcome',
                component:Welcome
            },
            {
                path:'/goods',
                component:Goods
            },
            {
                path:'/seller',
                component:Seller
            }
        ]
    }
]
const router = new VueRouter({
    routes,
    mode:"history"
})
// 前置守卫(guard)
router.beforeEach((to, from, next) => {
    if (to.fullPath !== "/toLogin"){
        var login = sessionStorage.getItem("Authorization");
        // 已登录
        if (login !== null)
        {
            // 存储活跃标签
            sessionStorage.setItem("currentIndex",to.fullPath);
            next();
        }
        // 未登录
        else router.replace("/toLogin")
    }
    // 到登录界面直接放行
    else next();
})
export default router