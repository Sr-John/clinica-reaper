import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // <-- Placa de "Área Restrita"
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

// O nosso "Segurança" da catraca
router.beforeEach((to, from, next) => {
  // Ele olha se existe um token salvo no navegador
  const temToken = localStorage.getItem('token');

  // Se a tela tem a placa de Área Restrita E o usuário NÃO tem o token...
  if (to.meta.requiresAuth && !temToken) {
    next('/'); // ...ele barra e chuta de volta para o Login!
  } else {
    next(); // Se tiver o token (ou se for uma tela pública), deixa passar.
  }
});

export default router