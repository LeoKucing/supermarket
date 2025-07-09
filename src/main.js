// Import library & komponen dulu
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css' // ✅ import global css di paling atas setelah library

// Baru buat app instance-nya
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
