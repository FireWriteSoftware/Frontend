<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
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
              :src="require(`@/assets/images/register-illustration.svg`)"
            />
            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              A few more clicks to <br />
              sign up to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">
              Free of charge and opensource developed by KRB-Development
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <form @submit.prevent="handleSubmit">
              <h2
                class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
              >
                Sign Up
              </h2>
              <div
                class="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center"
              >
                A few more clicks to sign in to your account.
              </div>
              <div class="intro-x mt-8">
                <input
                  type="text"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4' + (this.validation_error?.first_name != null ? ' border-theme-6' : '')"
                  placeholder="Firstname"
                  v-model="first_name"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.first_name != null'>
                  {{ this.validation_error?.first_name[0] }}
                </div>

                <input
                  type="text"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4' + (this.validation_error?.last_name != null ? ' border-theme-6' : '')"
                  placeholder="Lastname"
                  v-model="last_name"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.last_name != null'>
                  {{ this.validation_error?.last_name[0] }}
                </div>

                <input
                  type="text"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4' + (this.validation_error?.name != null ? ' border-theme-6' : '')"
                  placeholder="Username"
                  v-model="name"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.name != null'>
                  {{ this.validation_error?.name[0] }}
                </div>

                <input
                  type="text"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4' + (this.validation_error?.email != null ? ' border-theme-6' : '')"
                  placeholder="Email"
                  v-model="email"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.email != null'>
                  {{ this.validation_error?.email[0] }}
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

                <input
                  type="password"
                  :class="'intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4' + (this.validation_error?.password_confirmation != null ? ' border-theme-6' : '')"
                  placeholder="Password Confirmation"
                  v-model="password_confirmation"
                />

                <div class="text-theme-6 mt-2 mb-4" v-if='this.validation_error?.password_confirmation != null'>
                  {{ this.validation_error?.password_confirmation[0] }}
                </div>
              </div>
              <div class="intro-x flex items-center text-gray-700 dark:text-gray-600 mt-4 text-xs sm:text-sm">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="form-check-input border mr-2"
                />
                <label class="cursor-pointer select-none" for="remember-me">
                  I agree to the
                </label>
                <router-link :to="{ name: 'privacy' }">
                  <a class="text-theme-1 dark:text-theme-10 ml-1">
                    Privacy Policy.
                  </a>
                </router-link>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button type="submit" class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                  Register
                </button>
                <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                  Sign in
                </router-link>
              </div>
            </form>
          </div>
        </div>
        <!-- END: Register Form -->
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
      first_name: '',
      last_name: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
      const loader = this.$loading.show()
      axios.post('auth/register', {
        pre_name: this.first_name,
        last_name: this.last_name,
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          localStorage.setItem('token', response.data.data.token)
          loader.hide()
          if (localStorage.getItem('token') != null) {
            this.$router.push({ name: 'categories' })
          }
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.data.error)
          loader.hide()
        })
    }
  }
})
</script>
