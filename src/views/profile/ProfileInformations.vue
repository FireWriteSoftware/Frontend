<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Sidebar -->
      <Sidebar :user="this.user"></Sidebar>
      <!-- END: Sidebar -->
      <div class="col-span-12 lg:col-span-8 xxl:col-span-9">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5">
          <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto">Display Information</h2>
          </div>
          <div class="p-5">
            <form @submit.prevent="handleSubmit">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-6">
                      <div>
                        <label for="update-profile-firstname" class="form-label">
                          Firstname
                        </label>
                        <input
                          id="update-profile-firstname"
                          type="text"
                          :class="'form-control' + (this.validation_error?.pre_name != null ? ' border-theme-6' : '')"
                          placeholder="Firstname"
                          v-model="user.pre_name"
                        />
                        <div v-if="this.validation_error?.pre_name != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.pre_name[0] }}
                        </div>
                      </div>
                      <div class="mt-3">
                        <label for="update-profile-username" class="form-label">
                          Username
                        </label>
                        <input
                          id="update-profile-username"
                          type="text"
                          :class="'form-control' + (this.validation_error?.name != null ? ' border-theme-6' : '')"
                          placeholder="Username"
                          v-model="user.name"
                        />
                        <div v-if="this.validation_error?.name != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.name[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-profile-lastname" class="form-label">
                          Lastname
                        </label>
                        <input
                          id="update-profile-lastname"
                          type="text"
                          :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                          placeholder="Lastname"
                          v-model="user.last_name"
                        />
                        <div v-if="this.validation_error?.last_name != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.last_name[0] }}
                        </div>
                      </div>
                      <div class="mt-3">
                        <label for="update-profile-email" class="form-label">
                          Email
                        </label>
                        <input
                          id="update-profile-email"
                          type="text"
                          :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                          placeholder="Email"
                          v-model="user.email"
                        />
                        <div v-if="this.validation_error?.email != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.email[0] }}
                        </div>
                      </div>
                      <div class="mt-3">
                        <div class="flex items-center">
                          <div class="pl-4">
                            <a href="" class="font-medium">
                              Darkmode
                            </a>
                            <div class="text-gray-600">
                              Enable darkmode on all wiki pages
                            </div>
                          </div>
                          <input class="form-check-switch ml-auto" type="checkbox" v-model='darkmode'>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary w-20 mt-3">
                    Save
                  </button>
                </div>
                <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                  <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                    <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                      <img
                        class="rounded-md"
                        alt=""
                        :src="this.user.profile_picture ?? require('@/assets/images/avatar.png')"
                      />
                      <Tippy
                        tag="div"
                        content="Remove this profile photo?"
                        class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-6 right-0 top-0 -mr-2 -mt-2"
                        @click="this.user.profile_picture = null"
                      >
                        <xIcon class="w-4 h-4" />
                      </Tippy>
                    </div>
                    <div class="mx-auto cursor-pointer relative mt-5">
                      <button type="button" class="btn btn-primary w-full">
                        Change Photo
                      </button>
                      <input
                        type="file"
                        class="w-full h-full top-0 left-0 absolute opacity-0 cursor-pointer"
                        @change="changePicture"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- END: Display Information -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import Sidebar from './Components/Sidebar'
import { useToast } from 'vue-toastification'
import { useStore } from '@/store'

const toast = useToast()

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      user: {},
      validation_error: {},
      darkmode: localStorage.getItem('darkmode') != null ? localStorage.getItem('darkmode') : false
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()

      const store = useStore()
      const loader = this.$loading.show()

      localStorage.setItem('darkmode', this.darkmode)
      this.darkmode
        ? cash('html').addClass('dark')
        : cash('html').removeClass('dark')
      store.dispatch('main/setDarkMode', this.darkmode)

      axios.post('auth/update-details/' + this.user.id, {
        name: this.user.name,
        pre_name: this.user.pre_name,
        last_name: this.user.last_name,
        email: this.user.email,
        profile_picture: this.user.profile_picture
      })
        .then(response => {
          toast.success('Profile successfully updated')
          loader.hide()
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
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          loader.hide()
        })
        .catch(error => {
          console.log(error)
          loader.hide()
        })
    },
    changePicture(event) {
      if (event.target.files.length <= 0) return
      const files = event.target.files
      const data = new FormData()

      data.append('image', files[0])

      const loader = this.$loading.show()

      axios.post('storage/uploadImage',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.user.profile_picture = res.data.data.url

          axios.post('auth/update-details/' + this.user.id, {
            name: this.user.name,
            pre_name: this.user.pre_name,
            last_name: this.user.last_name,
            email: this.user.email,
            profile_picture: this.user.profile_picture
          })
            .then(response => {
              toast.success('Profile picture successfully updated')
              loader.hide()

              const user = JSON.parse(localStorage.getItem('user'))
              user.profile_picture = res.data.data.url
              const userJson = JSON.stringify(user)
              localStorage.setItem('user', userJson)
            })
            .catch(error => {
              console.log(error.response)
              this.validation_error = error.response.data.data.errors
              toast.error(error.response.data.message)
              loader.hide()
            })
        })
        .catch((err) => {
          console.error(err)
          toast.error(err.response.data.message)
          loader.hide()
        })
    }
  }
})
</script>
