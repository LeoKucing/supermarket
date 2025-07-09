<template>
  <div>
    <AdminNavbar />
    <h1>Kelola Produk</h1>

    <div>
      <input v-model="nama" placeholder="Nama Produk" />
      <input v-model="harga" type="number" placeholder="Harga Produk" />
      <button @click="tambahProduk">Tambah Produk</button>
    </div>

    <ul>
      <li v-for="item in produk" :key="item.id">
        {{ item.nama }} - Rp {{ item.harga }}
        <button @click="hapusProduk(item.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminNavbar from '@/components/AdminNavbar.vue'

const produk = ref([]) // daftar produk
const nama = ref('')   // input nama produk baru
const harga = ref(0)   // input harga produk baru

// Ambil data produk dari json-server saat halaman dibuka
onMounted(() => {
  loadProduk()
})

// Fungsi ambil produk dari json-server
async function loadProduk() {
  const res = await fetch('https://melodious-bravery-production.up.railway.app/api/produk')
  produk.value = await res.json()
}

// Fungsi tambah produk baru
async function tambahProduk() {
  if (nama.value === '' || harga.value <= 0) {
    alert('Nama dan harga wajib diisi!')
    return
  }

  await fetch('https://melodious-bravery-production.up.railway.app/api/produk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nama: nama.value,
      harga: harga.value
    })
  })

  nama.value = ''
  harga.value = 0
  loadProduk() // refresh daftar produk
}

// Fungsi hapus produk
async function hapusProduk(id) {
  await fetch(`https://melodious-bravery-production.up.railway.app/api/produk/${id}`, {
    method: 'DELETE'
  })
  loadProduk() // refresh daftar produk
}
</script>
