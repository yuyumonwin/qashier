import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import { i18n } from './plugins/i18n'

import './assets/main.css'

createApp(App).use(i18n).use(VueAxios, axios).mount('#app')
