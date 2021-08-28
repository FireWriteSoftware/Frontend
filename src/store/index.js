import { createStore } from 'vuex'
import main from './main'
import topMenu from './top-menu'

const store = createStore({
  modules: {
    main,
    topMenu
  }
})

export function useStore() {
  return store
}

export default store
