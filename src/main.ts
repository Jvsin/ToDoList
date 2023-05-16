import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createI18n } from 'vue-i18n'
import { aliases, fa } from 'vuetify/iconsets/fa'
import '@fortawesome/fontawesome-free/css/all.css'
//import { getAuth } from 'firebase/auth'

import en from './locals/en.json'
import pl from './locals/pl.json'

const i18n = createI18n({
  locale: 'pl',
  messages: {
    pl,
    en
  }
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  }
})

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCQGwKC7yTRfyiW7aSchwDBgCP-yOddmdw',
  authDomain: 'project-jvsin.firebaseapp.com',
  projectId: 'project-jvsin',
  storageBucket: 'project-jvsin.appspot.com',
  messagingSenderId: '834202757982',
  appId: '1:834202757982:web:e2c676d2a8f45e84a77dcf',
  measurementId: 'G-L1KCWXNRBP',
  FIREBASE_TOKEN:
    '1//0cywBikIT4orsCgYIARAAGAwSNwF-L9IryHq6t8Brb66KCigNBlou58SSOkKwj5G5_gXhpX7MhiXGeM_FurSXUdYpcQXhN5hIMCA'
}

initializeApp(firebaseConfig)
export const db = getFirestore()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
