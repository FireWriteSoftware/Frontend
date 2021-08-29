<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">User Account</h2>
    </div>
    <DeleteModal :user="this.user"></DeleteModal>
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
            <form @submit.prevent="updatedUser(user)">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-6">
                      <div>
                        <label for="update-profile-form-1" class="form-label">
                          Display Name
                        </label>
                        <input
                          id="update-profile-form-1"
                          type="text"
                          :class="'form-control' + (this.validation_error?.name != null ? ' border-theme-6' : '')"
                          placeholder="Enter Username"
                          v-model="user.name"
                        />
                        <div v-if="this.validation_error?.name != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.name[0] }}
                        </div>
                      </div>
                      <div class="mt-3">
                        <label for="accounts-firstname-edit" class="form-label">
                          Firstname
                        </label>
                        <input
                          id="accounts-firstname-edit"
                          type="text"
                          :class="'form-control' + (this.validation_error?.pre_name != null ? ' border-theme-6' : '')"
                          placeholder="Enter Firstname"
                          v-model="user.pre_name"
                        />
                        <div v-if="this.validation_error?.pre_name != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.pre_name[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="accounts-email-edit" class="form-label">
                          Email address
                        </label>
                        <input
                          id="accounts-email-edit"
                          type="text"
                          :class="'form-control' + (this.validation_error?.email != null ? ' border-theme-6' : '')"
                          placeholder="Enter Email"
                          v-model="user.email"
                        />
                        <div v-if="this.validation_error?.email != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.email[0] }}
                        </div>
                      </div>
                      <div class="mt-3">
                        <label for="accounts-lastname-edit" class="form-label">
                          Lastname
                        </label>
                        <input
                          id="accounts-lastname-edit"
                          type="text"
                          :class="'form-control' + (this.validation_error?.last_name != null ? ' border-theme-6' : '')"
                          placeholder="Enter Lastname"
                          v-model="user.last_name"
                        />
                        <div v-if="this.validation_error?.last_name != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.last_name[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12">
                      <hr class="mt-5 mb-3">
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="accounts-email_verify-edit" class="form-label">
                          Email verified at
                        </label>
                        <input
                          id="accounts-email_verify-edit"
                          type="text"
                          class="form-control"
                          placeholder="Input text"
                          :value="user.email_verified_at ? user.email_verified_at : 'Unknown'"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="accounts-id-edit" class="form-label">
                          Account ID
                        </label>
                        <input
                          id="accounts-id-edit"
                          type="text"
                          class="form-control"
                          placeholder="Input text"
                          :value="user.id"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end mt-4">
                    <button type="submit" class="btn btn-primary w-20 mr-auto">
                      Save
                    </button>
                    <a href="javascript:;" data-toggle="modal" data-target="#delete-account-modal" class="text-theme-6 flex items-center">
                      <Trash2Icon class="w-4 h-4 mr-1"/> Delete Account
                    </a>
                  </div>
                </div>
                <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                  <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                    <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                      <img
                        class="rounded-md"
                        alt=""
                        :src="user.profile_picture ?? require('@/assets/images/avatar.png')"
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
                        class="w-full h-full top-0 left-0 absolute opacity-0"
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
import Sidebar from './Components/Sidebar.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import DeleteModal from './Components/DeleteModal'
const toast = useToast()

export default defineComponent({
  components: {
    DeleteModal,
    Sidebar
  },
  mounted() {
    this.fetchUser(this.$route.params.id)
  },
  data() {
    return {
      user: {},
      validation_error: {}
    }
  },
  methods: {
    fetchUser(id) {
      const loader = this.$loading.show()
      axios.get('users/' + id)
        .then(response => {
          this.user = response.data.data
          loader.hide()
        })
        .catch(error => {
          console.error(error)
          loader.hide()
          this.$router.push({ name: 'admin.accounts' })
        })
    },
    updatedUser(user) {
      const loader = this.$loading.show()
      axios.put('users/' + user.id, {
        name: user.name,
        pre_name: user.pre_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture
      })
        .then(response => {
          toast.success('Account successfully updated')
          loader.hide()
          this.fetchUser(this.$route.params.id)
        })
        .catch(error => {
          console.error(error)
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
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

          axios.post('auth/update-details/' + this.$route.params.id, {
            name: this.user.name,
            pre_name: this.user.pre_name,
            last_name: this.user.last_name,
            email: this.user.email,
            profile_picture: this.user.profile_picture
          })
            .then(response => {
              toast.success('Profile picture successfully updated')
              loader.hide()
            })
            .catch(error => {
              console.error(error.response)
              this.validation_error = error.response.data.data.errors
              toast.error(error.response.data.message)
              loader.hide()
            })
        })
        .catch((error) => {
          console.error(error)
          toast.error(error.response.data.message)
          loader.hide()
        })
    }
  }
})
</script>
