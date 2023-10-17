import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        name: 'Tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        name: 'Tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        name: 'Tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  },
  {
    path: '/incidence/:id',
    name: 'DetalleIncidencia',
    component: () => import('@/views/IncidenciaPage.vue')
  },
  {
    path: '/incidence/add',
    name: 'AgregarIncidencia',
    component: () => import('@/views/AddIncidence.vue')
  },
  {
    path: '/user/add',
    name: 'AgregarUsuario',
    component: () => import('@/views/AddUser.vue')
  },
  {
    path: '/user/edit/:id',
    name: 'EditarUsuario',
    component: () => import('@/views/EditUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
