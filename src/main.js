import { createApp } from 'vue'
import App from './App.vue'
import router from './features/Router'

const app = createApp(App)
app.use(router)
app.mount('#app')
