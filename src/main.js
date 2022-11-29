import { createApp } from 'vue'
import { Quasar } from 'quasar';
import pinia from '@/pinia';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import router from './router'
import config from '@/quasar.config.js'


const app = createApp(App)
app.use(pinia).use(Quasar, config).use(router)
app.mount('#app')
