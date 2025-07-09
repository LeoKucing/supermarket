<template>
  <nav>
    <router-link to="/admin/dashboard">Dashboard</router-link> |
    <router-link to="/admin/produk">Kelola Produk</router-link> |
    <router-link to="/admin/transaksi">Data Transaksi</router-link> |
    <router-link to="/admin/laporan">Laporan</router-link> |
    <button @click="logout">Logout</button>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  alert('Logout berhasil')
  router.push('/')
}
</script>
