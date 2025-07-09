<template>
  <div>
    <Navbar />
    <h1>Keranjang Belanja</h1>

    <div v-if="keranjang.items.length === 0">
      <p>Keranjang kosong.</p>
    </div>

    <div v-else>
      <div v-for="(item, index) in keranjang.items" :key="index">
        {{ item.nama }} - Rp {{ item.harga }}
      </div>
      <h3>Total: Rp {{ keranjang.totalHarga }}</h3>
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { useKeranjangStore } from '@/stores/keranjang'

const keranjang = useKeranjangStore()

function checkout() {
  keranjang.checkout()
  alert('Pesanan berhasil dikirim!')
}
</script>
