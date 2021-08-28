<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Change Password</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Sidebar -->
      <Sidebar :user="this.user"></Sidebar>
      <!-- END: Sidebar -->
      <div class="col-span-12 lg:col-span-8 xxl:col-span-9">
        <!-- BEGIN: Change Password -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Password</h2>
          </div>
          <div class="p-5">
            <form @submit.prevent="handleSubmit">
              <div class="mt-3">
                <label for="change-password-form-1" class="form-label">
                  Old Password
                </label>
                <input
                  id="change-password-form-1"
                  type="password"
                  class="form-control"
                  placeholder="Input old password"
                  v-model="old_password"
                />
                <div v-if="this.validation_error?.old_password != null" class="text-theme-6 mt-2 mb-4">
                  {{ this.validation_error?.old_password[0] }}
                </div>
              </div>
              <div class="mt-3">
                <label for="change-password-form-2" class="form-label">
                  New Password
                </label>
                <input
                  id="change-password-form-2"
                  type="password"
                  class="form-control"
                  placeholder="Input new password"
                  v-model="password"
                />
                <div v-if="this.validation_error?.password != null" class="text-theme-6 mt-2 mb-4">
                  {{ this.validation_error?.password[0] }}
                </div>
              </div>
              <div class="mt-3">
                <label for="change-password-form-3" class="form-label">
                  Confirm New Password
                </label>
                <input
                  id="change-password-form-3"
                  type="password"
                  class="form-control"
                  placeholder="Input new password again"
                  v-model="password_confirmation"
                />
                <div v-if="this.validation_error?.password_confirmation != null" class="text-theme-6 mt-2 mb-4">
                  {{ this.validation_error?.password_confirmation[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-4">
                Change Password
              </button>
            </form>
          </div>
        </div>
        <!-- END: Change Password -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import Sidebar from './Components/Sidebar'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      old_password: '',
      password: '',
      password_confirmation: '',
      user: {},
      validation_error: {}
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const loader = this.$loading.show()
      axios.post('auth/password/change', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        email: this.user.email,
        old_password: this.old_password,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
        .then(response => {
          loader.hide()
          toast.success('Password successfully updated')
          this.fetchUser()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    fetchUser() {
      const loader = this.$loading.show()
      axios.get('auth/user')
        .then(response => {
          this.user = response.data.data.user
          loader.hide()
        })
        .catch(error => {
          console.log(error)
          loader.hide()
        })
    }
  }
})
</script>
