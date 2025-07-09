import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import View Komponen User
import HomeView from '@/views/HomeView.vue'
import ProdukView from '@/views/ProdukView.vue'
import KeranjangView from '@/views/KeranjangView.vue'
import RiwayatView from '@/views/RiwayatView.vue'
import LoginView from '@/views/LoginView.vue'

// Import View Komponen Admin
import DashboardView from '@/views/admin/DashboardView.vue'
import KelolaProdukView from '@/views/admin/KelolaProdukView.vue'
import DataTransaksiView from '@/views/admin/DataTransaksiView.vue'
import LaporanView from '@/views/admin/LaporanView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/produk', component: ProdukView },
  { path: '/keranjang', component: KeranjangView },
  { path: '/riwayat', component: RiwayatView },
  { path: '/login', component: LoginView },

  {
    path: '/admin',
    children: [
      { path: 'dashboard', component: DashboardView },
      { path: 'produk', component: KelolaProdukView },
      { path: 'transaksi', component: DataTransaksiView },
      { path: 'laporan', component: LaporanView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteksi akses admin route
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.path.startsWith('/admin') && !auth.isLoggedIn) {
    alert('Silakan login sebagai admin dulu!')
    next('/login')
  } else {
    next()
  }
})

export default router
