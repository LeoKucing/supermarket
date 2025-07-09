<template>
  <div>
    <Navbar />
    <h1>Login</h1>

    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

function login() {
  const sukses = auth.login(username.value, password.value)
  if (sukses) {
    alert('Login Berhasil!')
    router.push('/admin/dashboard')
  } else {
    alert('Username atau password salah!')
  }
}
</script>
