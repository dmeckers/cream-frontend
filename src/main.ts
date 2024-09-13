import './assets/main.css'
import { } from 'http'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/userStore'
import { axiosInstance } from './services/axios.service'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const telegramUser = Telegram.WebApp.initDataUnsafe;
const userStore = useUserStore();

userStore.$patch({
    auth_date: telegramUser.auth_date,
    hash: telegramUser.hash,
    user: {
        id: telegramUser.user?.id,
        name: telegramUser.user?.first_name,
        username: telegramUser.user?.username,
    }
})

app.config.globalProperties.$axios = axiosInstance;

app.mount('#app')
