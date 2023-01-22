import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
const LoginForm = () => import('../components/LoginForm.vue')
const RegisterForm = () => import('../components/RegisterForm.vue')
const Dashboard = () => import('../components/Dashboard.vue')
const DatePage = () => import('../components/DatePage.vue')

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/',
        name: 'home',
        redirect: to => ({path:'/login'})
    
    },
        {path:'/login',
        name: 'login',
        component: LoginForm
    },
        {path:'/register',
        name: 'register',
        component: RegisterForm
    },
        {path:'/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta:{needsAuth: true},
    },
        {path:'/transactions/:date',
        name: 'date-transaction',
        component: DatePage,
        meta:{needsAuth: true},
    },
    ]
})

router.beforeEach((to)=>{
    if (!to.meta.needsAuth) return true
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) return {name:'login'}
    const userDetail = JSON.parse(localStorage.getItem(`${currentUser.username}`))
    if (!userDetail) return {name:'login'}
    if (userDetail.password !== currentUser.password) return {name:'login'}
})

export default router