<template>
  <div>
    <Navbar />
    <h1>Riwayat Transaksi</h1>

    <div v-if="riwayat.length === 0">
      <p>Belum ada transaksi.</p>
    </div>

    <ul>
      <li v-for="trx in riwayat" :key="trx.id">
        {{ trx.tanggal }} - Total: Rp {{ trx.total }}
        <button @click="hapusTransaksi(trx.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'

const riwayat = ref([])

async function loadRiwayat() {
  const res = await fetch('http://localhost:3000/transaksi')
  riwayat.value = await res.json()
}

async function hapusTransaksi(id) {
  await fetch(`http://localhost:3000/transaksi/${id}`, {
    method: 'DELETE'
  })
  loadRiwayat()
}

onMounted(() => {
  loadRiwayat()
})
</script>
