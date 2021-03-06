import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import globalComponents from './global-components'
import utils from './utils'
import './libs'
import Toast, { POSITION, TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// import axios from 'axios'
import i18n from './i18n'

// SASS Theme
import './assets/sass/app.scss'
// import { DateTime } from 'litepicker/dist/types/datetime'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n)

globalComponents(app)
utils(app)

app.mount('#app')
app.use(VueLoading, {
  color: '#6772E4',
  loader: 'spinner',
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999
}, {})

const toastOptions = {
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: 10000,
      closeButton: false
    },
    [TYPE.SUCCESS]: {
      timeout: 5000,
      hideProgressBar: true
    }
  },
  position: POSITION.TOP_RIGHT
}
app.use(Toast, toastOptions)
