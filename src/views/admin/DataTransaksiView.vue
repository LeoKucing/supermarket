<template>
  <div>
    <AdminNavbar /> <!-- ✅ tambahkan navbar admin di sini -->
    <h1>Data Transaksi</h1>
    <ul>
      <li v-for="trx in transaksi" :key="trx.id">
        {{ trx.tanggal }} - Total: Rp {{ trx.total }}
        <button @click="hapusTransaksi(trx.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminNavbar from '@/components/AdminNavbar.vue'

const transaksi = ref([])

async function loadRiwayat() {
  const res = await fetch('https://melodious-bravery-production.up.railway.app/api/transaksi')
  transaksi.value = await res.json()
}

async function hapusTransaksi(id) {
  await fetch(`https://melodious-bravery-production.up.railway.app/api/transaksi/${id}`, {
    method: 'DELETE'
  })
  loadRiwayat()
}

onMounted(() => {
  loadRiwayat()
})
</script>
