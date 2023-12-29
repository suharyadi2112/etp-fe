import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestingView from '../views/TestingView.vue'
import LoginView from '../views/LoginView.vue'

//roles
import RolesDashboard from '../views/roles/RolesViews.vue'
import PermissionDashboard from '../views/permission/PermissionViews.vue'
//reference data
import SemesterDashboard from '../views/semester/SemesterViews.vue'

//permission
import NProgress from 'nprogress';

const routes = [
  { path: '/', name: '/', components: { default: HomeView }, meta: { requiresAuth: true } },
  { path: '/testing', name: 'testing', components: { default: TestingView }, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', components: { default: LoginView }, meta: { layout: 'login' } },
  //roles
  { path: '/roles', name: 'rolesdashboard', components: { default: RolesDashboard }, meta: { requiresAuth: true } },
  //permission
  { path: '/permission', name: 'permisdashboard', components: { default: PermissionDashboard }, meta: { requiresAuth: true } },
  //referencedata
  { path: '/semester', name: 'semesterdashboard', components: { default: SemesterDashboard }, meta: { requiresAuth: true } },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  // Cek apakah rute memerlukan autentikasi dan pengguna belum login
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    // Jika belum login, arahkan ke halaman login
    next({ name: 'login' });
  } else {
    next();
  }
});

// Fungsi untuk mengecek apakah pengguna sudah login
function isLoggedIn() {
  const token = localStorage.getItem('tokenETP');
  return token !== null && token !== undefined;
}

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
