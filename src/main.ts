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

const app = createApp(App)

import en from './locals/en.json'
import pl from './locals/pl.json'

const i18n = createI18n({
  locale: 'pl',
  messages: {
    pl, en
    }
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
