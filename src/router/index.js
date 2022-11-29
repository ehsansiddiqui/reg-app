import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {isGuest: true},
      component: () => import('@/pages/auth/AdminLogin.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && userStore.user.token == null) {
    next({ name: "login" });
  } if (to.meta.isGuest && userStore.user.token != null) {
    next({ name: "admin-dashboard" });
  } else {
    next();
  }
})

export default router
