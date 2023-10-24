import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiresAuth: true },
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
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación y si el usuario está autenticado
  if (to.meta.requiresAuth && !store.getters["usuarios/isAuthenticated"]) {
    // Redirige al usuario a la página de inicio de sesión
    next('/login');
  } else if(to.name == 'Login' && !!store.getters["usuarios/isAuthenticated"]){
    next('tabs')
  }else {
    console.log("from", from)
    console.log("to", to)
    next(); // Continúa la navegación
  }
});

export default router
