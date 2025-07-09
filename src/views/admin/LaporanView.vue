<template>
  <div>
    <AdminNavbar />
    <h1>Laporan Harian</h1>

    <!-- Tombol tambah -->
    <button @click="showTambah = true">Tambah Laporan</button>

    <!-- Daftar laporan -->
    <ul>
      <li v-for="lapor in laporan" :key="lapor.id">
        {{ lapor.tanggal }} - {{ lapor.keterangan }} - Rp {{ lapor.total }}
        <button @click="showEditModal(lapor)">Edit</button>
        <button @click="hapusLaporan(lapor.id)">Hapus</button>
      </li>
    </ul>

    <!-- Popup Tambah -->
    <div v-if="showTambah" class="popup">
      <h3>Tambah Laporan</h3>
      <input v-model="tanggal" type="date" />
      <input v-model="keterangan" placeholder="Keterangan" />
      <input v-model="total" type="number" placeholder="Total" />
      <button @click="tambahLaporan">Simpan</button>
      <button @click="showTambah = false">Batal</button>
    </div>

    <!-- Popup Edit -->
    <div v-if="showEdit" class="popup">
      <h3>Edit Laporan</h3>
      <input v-model="editData.tanggal" type="date" />
      <input v-model="editData.keterangan" placeholder="Keterangan" />
      <input v-model="editData.total" type="number" placeholder="Total" />
      <button @click="simpanEdit">Simpan Perubahan</button>
      <button @click="showEdit = false">Batal</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminNavbar from '@/components/AdminNavbar.vue'

const laporan = ref([])

// Tambah data
const showTambah = ref(false)
const tanggal = ref('')
const keterangan = ref('')
const total = ref(0)

// Edit data
const showEdit = ref(false)
const editData = ref({
  id: null,
  tanggal: '',
  keterangan: '',
  total: 0
})

// Ambil laporan saat halaman dibuka
onMounted(() => {
  loadLaporan()
})

async function loadLaporan() {
  const res = await fetch('http://localhost:3000/laporan')
  laporan.value = await res.json()
}

// Tambah laporan
async function tambahLaporan() {
  await fetch('http://localhost:3000/laporan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tanggal: tanggal.value,
      keterangan: keterangan.value,
      total: total.value
    })
  })
  tanggal.value = ''
  keterangan.value = ''
  total.value = 0
  showTambah.value = false
  loadLaporan()
}

// Hapus laporan
async function hapusLaporan(id) {
  await fetch(`http://localhost:3000/laporan/${id}`, {
    method: 'DELETE'
  })
  loadLaporan()
}

// Tampilkan modal edit
function showEditModal(lapor) {
  editData.value = { ...lapor }
  showEdit.value = true
}

// Simpan hasil edit
async function simpanEdit() {
  await fetch(`http://localhost:3000/laporan/${editData.value.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editData.value)
  })
  showEdit.value = false
  loadLaporan()
}
</script>

<style scoped>
.popup {
  padding: 10px;
  margin: 10px 0;
  background: #f4f4f4;
  border: 1px solid #ccc;
}
</style>
