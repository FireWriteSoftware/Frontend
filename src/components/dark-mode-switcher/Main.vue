<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <div v-if="allow_darkmode === 'true'">
    <div
      class="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10"
      @click="switchMode"
    >
      <div class="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
      <div
        :class="{ 'dark-mode-switcher__toggle--active': darkMode }"
        class="dark-mode-switcher__toggle border"
      ></div>
    </div>
  </div>
  <!-- END: Dark Mode Switcher-->
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  data() {
    return {
      allow_darkmode: process.env.VUE_APP_DARKMODE
    }
  },
  setup() {
    const store = useStore()
    const darkMode = computed(() => store.state.main.darkMode)

    const setDarkModeClass = () => {
      darkMode.value
        ? cash('html').addClass('dark')
        : cash('html').removeClass('dark')
    }

    const switchMode = () => {
      store.dispatch('main/setDarkMode', !darkMode.value)
      setDarkModeClass()
    }

    onMounted(() => {
      setDarkModeClass()
    })

    return {
      switchMode,
      darkMode
    }
  }
})
</script>
