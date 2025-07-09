import { defineStore } from 'pinia'

export const useKeranjangStore = defineStore('keranjang', {
  state: () => ({
    items: []
  }),
  actions: {
    tambahProduk(produk) {
      this.items.push(produk)
    },
    async checkout() {
      const total = this.items.reduce((acc, item) => acc + item.harga, 0)
      const tanggal = new Date().toISOString().split('T')[0]

      await fetch('http://localhost:3000/transaksi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tanggal: tanggal,
          total: total
        })
      })

      this.items = [] // Kosongkan keranjang setelah checkout
    }
  },
  getters: {
    totalHarga: (state) => state.items.reduce((acc, item) => acc + item.harga, 0)
  }
})
