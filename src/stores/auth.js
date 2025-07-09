import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    login(username, password) {
      // Validasi manual
      if (username === 'admin' && password === '123') {
        this.user = {
          username: username
        }
        return true // sukses login
      } else {
        return false // gagal login
      }
    },
    logout() {
      this.user = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  }
})
