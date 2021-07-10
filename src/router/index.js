import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/panel-org',
    name: 'PanelOrg',
    component: () => import('../views/PanelOrg.vue')
  },
  {
    path: '/worker/:phone',
    name: 'PanelOrg',
    component: () => import('../views/Worker.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
