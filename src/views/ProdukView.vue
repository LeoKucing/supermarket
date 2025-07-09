<template>
  <div>
    <Navbar />
    <h1>Daftar Produk</h1>
    <div v-for="item in produk" :key="item.id">
      <ProductCard :produk="item" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProductCard from '@/components/ProductCard.vue'

const produk = ref([])

onMounted(async () => {
  const res = await fetch('https://melodious-bravery-production.up.railway.app/api/produk')
  produk.value = await res.json()
})
</script>
