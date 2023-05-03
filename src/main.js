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
 
const app = createApp(App)

const i18n = createI18n({
  locale: 'pl',
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
