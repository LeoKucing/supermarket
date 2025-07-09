<template>
  <div class="product-card">
    <h3>{{ produk.nama }}</h3>
    <p>Rp {{ produk.harga }}</p>
    <button @click="tambahKeKeranjang">Tambah ke Keranjang</button>
  </div>
</template>

<script setup>
import { useKeranjangStore } from '@/stores/keranjang'

const props = defineProps({
  produk: Object
})

const keranjang = useKeranjangStore()

function tambahKeKeranjang() {
  keranjang.tambahProduk(props.produk)
}
</script>
