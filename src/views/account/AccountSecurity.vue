<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">User Account</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Sidebar -->
      <Sidebar :user="this.user"></Sidebar>
      <!-- END: Sidebar -->
      <div class="col-span-12 lg:col-span-8 xxl:col-span-9">
        <!-- BEGIN: Security / Passwords -->
        <form @submit.prevent="resetPassword">
          <div class="intro-y box lg:mt-5">
            <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto">Security</h2>
              <button class="btn btn-primary btn-sm ml-auto" type="submit"><LockIcon class="mr-2 w-4 h-4"></LockIcon>Change Password</button>
            </div>
            <div class="p-5">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-6">
                      <div>
                        <label for="accounts-new_password-edit" class="form-label">
                          New Password
                        </label>
                        <input
                          id="accounts-new_password-edit"
                          type="password"
                          :class="'form-control' + (this.validation_error?.password != null ? ' border-theme-6' : '')"
                          placeholder="Your new Password"
                          v-model="password"
                        />
                      </div>
                      <div v-if="this.validation_error?.password != null" class="text-theme-6 mt-2 mb-4">
                        {{ this.validation_error?.password[0] }}
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div>
                        <label for="accounts-password_confirmation-edit" class="form-label">
                          New Password confirmation
                        </label>
                        <input
                          id="accounts-password_confirmation-edit"
                          type="password"
                          :class="'form-control' + (this.validation_error?.password_confirmation != null ? ' border-theme-6' : '')"
                          placeholder="Your new Password confirmation"
                          v-model="password_confirmation"
                        />
                        <div v-if="this.validation_error?.password_confirmation != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.password_confirmation[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- END: Security / Passwords -->
        <!-- BEGIN: Verification -->
        <div class="intro-y box lg:mt-5">
          <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto">Verification</h2>
          </div>
          <div class="p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
              <div class="flex-1 mt-6 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 xxl:col-span-6">
                    <div class="flex items-center">
                      <div class="border-l-2 border-theme-1 pl-4">
                        <a href="" class="font-medium">
                          Verify Email
                        </a>
                        <div class="text-gray-600">
                          Send a Email for verification
                        </div>
                      </div>
                      <button @click="sendVerifyMail(this.$route.params.id)" class="btn btn-primary btn-sm ml-auto">Send</button>
                    </div>
                  </div>
                  <div class="col-span-12 xxl:col-span-6">
                    <div class="flex items-center">
                      <div class="border-l-2 border-theme-1 pl-4">
                        <a href="" class="font-medium">
                          Password Reset
                        </a>
                        <div class="text-gray-600">
                          Send a Password Reset link
                        </div>
                      </div>
                      <button @click="sendResetMail(this.$route.params.id)" class="btn btn-primary btn-sm ml-auto">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Verification -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Sidebar from './Components/Sidebar.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      password: '',
      password_confirmation: '',
      user: {},
      validation_error: {}
    }
  },
  setup() {
    const select = ref('1')
    return {
      select
    }
  },
  mounted() {
    this.fetchUser(this.$route.params.id)
  },
  methods: {
    sendVerifyMail(id) {
      const loader = this.$loading.show()
      axios.post('users/' + id + '/verify_email')
        .then(response => {
          toast.success('Verification mail sent')
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    sendResetMail(id) {
      const loader = this.$loading.show()
      axios.post('users/' + id + '/reset_password')
        .then(response => {
          toast.success('Password-reset mail sent')
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    resetPassword() {
      const loader = this.$loading.show()
      axios.post('users/' + this.$route.params.id + '/change_password', {
        password: this.password,
        password_confirmation: this.password_confirmation
      })
        .then(response => {
          toast.success('Password successfully changed')
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    fetchUser(id) {
      const loader = this.$loading.show()
      axios.get('users/' + id)
        .then(response => {
          this.user = response.data.data
          this.user_role = response.data.data.role.id
          loader.hide()
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
    }
  }
})
</script>
