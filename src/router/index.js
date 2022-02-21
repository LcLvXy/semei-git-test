import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/index.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
      import PersonalChild from './personal.js'
const routes = [
  {
    name:'index',
    path:'/',
    component:index
  },
  {
    name:'register',
    path:'/register',
    component:Register
  },{
    name:'login',
    path:'/login',
    component:Login
  },{
    name:'personal',
    path:'/personal',
    component:Personal,
    children:PersonalChild
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
