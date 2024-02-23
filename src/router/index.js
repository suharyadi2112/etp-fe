import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestingView from '../views/TestingView.vue'
import LoginView from '../views/LoginView.vue'

//roles
import RolesDashboard from '../views/roles/RolesViews.vue'
import PermissionDashboard from '../views/permission/PermissionViews.vue'
//reference data
import SemesterDashboard from '../views/semester/SemesterViews.vue'
import MataPelajaranDashboard from '../views/mata_pelajaran/MataPelajaran.vue'
import BaseMatPelDashboard from '../views/base_mata_pelajaran/BaseMataPelajaran.vue'
import BaseKelasDashboard from '../views/base_kelas/BaseKelas.vue'
import SiswaDashboard from '../views/siswa/SiswaViews.vue'
import SiswaDetail from '../views/siswa/SiswaDetail.vue'
import GuruDashboard from '../views/guru/GuruViews.vue'
import GuruDetail from '../views/guru/GuruDetail.vue'

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
  { path: '/mata-pelajaran', name: 'matapelajaran', components: { default: MataPelajaranDashboard }, meta: { requiresAuth: true } },
  { path: '/base-mata-pelajaran', name: 'basematapelajaran', components: { default: BaseMatPelDashboard }, meta: { requiresAuth: true } },
  { path: '/base-kelas', name: 'basekelas', components: { default: BaseKelasDashboard }, meta: { requiresAuth: true } },
  //siswa
  { path: '/siswa', name: 'siswadashboard', components: { default: SiswaDashboard }, meta: { requiresAuth: true } },
  { path: '/detail-siswa/:id', name: 'siswadetail', components: { default: SiswaDetail }, meta: { requiresAuth: true } },
  //guru
  { path: '/guru', name: 'gurudashboard', components: { default: GuruDashboard }, meta: { requiresAuth: true } },
  { path: '/detail-guru/:id', name: 'gurudetail', components: { default: GuruDetail }, meta: { requiresAuth: true } },

  
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
