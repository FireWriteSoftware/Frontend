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
              :src="this.wiki_settings.logo"
            />
            <span class="text-white text-lg ml-3">
              {{ this.wiki_settings.name }}
            </span>
          </a>
          <div class="my-auto">
            <img
              alt=""
              class="-intro-x w-1/2 -mt-16"
              :src="require(`@/assets/images/illustration.svg`)"
            />
            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              Welcome to the <br />
              {{ this.wiki_settings.name }}...
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">
              Free of charge and opensource developed by KRB-Development
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
              Sign In
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              A few more clicks to sign in to your account.
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="intro-x mt-8">
                <input
                  type="text"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block' + (this.validation_error?.email != null || this.validation_error?.user != null ? ' border-theme-6' : '')"
                  placeholder="Email / Username"
                  v-model="email"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.email != null || this.validation_error?.name != null'>
                  {{ this.validation_error?.email != null ? this.validation_error?.email[0] : this.validation_error?.name[0] }}
                </div>

                <input
                  type="password"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4' + (this.validation_error?.password != null ? ' border-theme-6' : '')"
                  placeholder="Password"
                  v-model="password"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.password != null'>
                  {{ this.validation_error?.password[0] }}
                </div>
              </div>
              <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <div class="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me">
                    Remember me
                  </label>
                </div>
                <router-link :to="{ name: 'password-forgot' }">Forgot Password?</router-link>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                  type="submit"
                >
                  Login
                </button>
                <router-link :to="{ name: 'register' }"
                  class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                >
                  Sign up
                </router-link>
              </div>
              <div
                class="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left"
              >
                By signin up, you agree to our <br />
                <router-link :to="{ name: 'tos' }">
                  <a class="text-theme-1 dark:text-theme-10">
                    Terms and Conditions
                  </a>
                </router-link>
                &
                <router-link :to="{ name: 'privacy' }">
                  <a class="text-theme-1 dark:text-theme-10">
                    Privacy Policy
                  </a>
                </router-link>
              </div>
            </form>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  components: {
    DarkModeSwitcher
  },
  setup() {
    onMounted(() => {
      cash('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login')
    })
  },
  data() {
    return {
      email: '',
      password: '',
      wiki_settings: {
        name: process.env.VUE_APP_NAME,
        logo: process.env.VUE_APP_LOGO
      },
      validation_error: {}
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.validation_error = {}

      const loader = this.$loading.show()

      const data = {
        password: this.password
      }

      if (this.isMail()) {
        data.email = this.email
      } else {
        data.name = this.email
      }

      axios.post('auth/login', data)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          localStorage.setItem('token', response.data.data.token)

          if (localStorage.getItem('token') != null) {
            axios.defaults.headers.common['Content-Type'] = 'application/json'
            axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.data.token
            loader.hide()
            this.$router.push({ name: 'categories' })
          }
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    isMail: function () {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return reg.test(this.email)
    }
  }
})
</script>
