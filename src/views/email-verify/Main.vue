<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt=""
              class="w-6"
              :src="wiki_settings?.logo"
            />
            <span class="text-white text-lg ml-3">
              {{ wiki_settings.name }}
            </span>
          </a>
          <div class="my-auto">
            <img
              alt=""
              class="-intro-x w-1/2 -mt-16"
              :src="require(`@/assets/images/verify-email-illustration.svg`)"
            />
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2 class="intro-x font-bold text-2xl text-center xl:text-left">
              Please Wait...
            </h2>
            <div class="intro-x mt-2 text-gray-500 text-center">
              Your email will be verified
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  components: {
    DarkModeSwitcher
  },
  data() {
    return {
      wiki_settings: {
        name: process.env.VUE_APP_NAME,
        logo: process.env.VUE_APP_LOGO
      }
    }
  },
  mounted() {
    cash('body')
      .removeClass('main')
      .removeClass('error-page')
      .addClass('login')

    if (!this.$route.query.token) {
      toast.error('Invalid token')
      this.$router.push({ name: 'login' })
    }

    axios.post('auth/email/confirm', {
      token: this.$route.query.token
    })
      .then(response => {
        toast.success(response.data.message)
        this.$router.push({ name: 'login' })
      })
      .catch(error => {
        console.error(error.response)
        toast.error(error.response.data.message)
        this.$router.push({ name: 'login' })
      })
  }
})
</script>
