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
        <!-- BEGIN: Roles & Tags -->
        <form @submit.prevent="submitCredentials()">
          <div class="intro-y box lg:mt-5">
            <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto">Roles & Badges</h2>
              <button class="btn btn-primary btn-sm ml-auto" type="submit"><SaveIcon class="mr-2 w-5 h-5"></SaveIcon>Save</button>
            </div>
            <div class="p-5">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-6">
                      <div>
                        <label class="form-label">
                          Role
                        </label>
                        <TailSelect
                          v-model="user.role.id"
                          :class="'form-control' + (this.validation_error?.role_id != null ? ' border-theme-6' : '')"
                          :options="{
                            search: true,
                            classNames: 'w-full'
                          }"
                        >
                          <option :value="role.id" v-for="role in roles" v-bind:key="role.id" :selected="role.id === this.user.role.id">{{ role.name }}</option>
                        </TailSelect>
                        <div v-if="this.validation_error?.role_id != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.role_id[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div>
                        <label class="form-label">
                          Badges
                        </label>
                        <TailSelect
                          :class="'form-control' + (this.validation_error?.badges != null ? ' border-theme-6' : '')"
                          v-model="selected_badges"
                          :options="{
                            search: true,
                            descriptions: true,
                            hideSelected: true,
                            hideDisabled: true,
                            multiLimit: 15,
                            multiShowCount: false,
                            multiContainer: true,
                            classNames: 'w-full'
                          }"
                          multiple
                        >
                          <option :value=badge.id v-for="badge in this.badges" v-bind:key="badge.id" :selected="this.old_account_badges.some(account_badge => account_badge.id === badge.id)">{{ badge.title }} - {{ badge.id }}</option>
                        </TailSelect>
                        <div v-if="this.validation_error?.badges != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.badges[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- END: Roles & Tags -->
        <!-- BEGIN: Settings -->
        <div class="intro-y box lg:mt-5">
          <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto">Account Settings</h2>
            <button class="btn btn-primary btn-sm ml-auto" v-on:click='saveSettings()'>
              <SaveIcon class="mr-2 w-5 h-5"></SaveIcon>
              Save
            </button>
          </div>
          <div class="p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
              <div class="flex-1 mt-6 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5 mb-4">
                  <div class="col-span-12 xxl:col-span-6">
                    <div class="flex items-center">
                      <div class="border-l-2 border-theme-1 pl-4">
                        <a href="" class="font-medium">
                          Verified E-Mail address
                        </a>
                        <div class="text-gray-600">
                          Is the account-email verified?
                        </div>
                      </div>
                      <input class="form-check-switch ml-auto" type="checkbox" v-model="new_verified">
                    </div>
                  </div>
                  <div class="col-span-12 xxl:col-span-6 mb-4">
                    <div class="flex items-center">
                      <div class="border-l-2 border-theme-1 pl-4">
                        <a href="" class="font-medium">
                          Newsletter
                        </a>
                        <div class="text-gray-600">
                          Does the user get newsletter?
                        </div>
                      </div>
                      <input class="form-check-switch ml-auto" type="checkbox" v-model='new_newsletter'>
                    </div>
                  </div>
                  <div class="col-span-12 xxl:col-span-6 mb-4">
                    <div class="flex items-center">
                      <div class="border-l-2 border-theme-1 pl-4">
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
            </div>
          </div>
        </div>
        <!-- END: Settings -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from './Components/Sidebar.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useStore } from '@/store'
const toast = useToast()

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      validation_error: {},
      selected_badges: [],
      account_badges: [],
      user: {
        role: {
          id: 0
        }
      },
      new_verified: false,
      new_newsletter: false,
      darkmode: localStorage.getItem('darkmode') != null ? localStorage.getItem('darkmode') : false,
      badges: [],
      roles: []
    }
  },
  mounted() {
    this.fetchUser(this.$route.params.id)
    this.fetchUserBadges(this.$route.params.id)
    this.fetchRoles()
    this.fetchBadges()
  },
  methods: {
    submitCredentials() {
      const loader = this.$loading.show()

      axios.put('users/' + this.$route.params.id, {
        name: this.user.name,
        pre_name: this.user.pre_name,
        last_name: this.user.last_name,
        email: this.user.email,
        role_id: this.user.role.id
      })
        .then(response => {
          toast.success('Role successfully updated')
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
          loader.hide()

          this.new_verified = (this.user.email_verified_at != null)
          this.new_newsletter = this.user.subscribed_newsletter
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
    },
    fetchRoles() {
      axios.get('roles')
        .then(response => {
          this.roles = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchBadges() {
      axios.get('badges')
        .then(response => {
          this.badges = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchUserBadges(id) {
      axios.get('users/' + id + '/badges')
        .then(response => {
          this.old_account_badges = response.data.data
          for (const badge in response.data.data) {
            this.account_badges.push(response.data.data[badge].id.toString())
            this.selected_badges.push(response.data.data[badge].id.toString())
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    saveSettings() {
      const store = useStore()
      const loader = this.$loading.show()

      localStorage.setItem('darkmode', this.darkmode)
      this.darkmode
        ? cash('html').addClass('dark')
        : cash('html').removeClass('dark')
      store.dispatch('main/setDarkMode', this.darkmode)

      axios.put('users/' + this.user.id, {
        verify_mail: this.new_verified,
        subscribed_newsletter: this.new_newsletter
      })
        .then(response => {
          this.user = response.data.data
          this.new_verified = (this.user.email_verified_at != null)
          this.new_newsletter = this.user.subscribed_newsletter
          loader.hide()
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  watch: {
    selected_badges: function (val) {
      const addBadges = this.selected_badges.filter(x => !this.account_badges.includes(x))
      for (const badge in addBadges) {
        axios.post('users/' + this.$route.params.id + '/badges/' + addBadges[badge] + '/attach')
      }

      for (const badge in this.account_badges) {
        if (!this.selected_badges.includes(this.account_badges[badge])) {
          axios.post('users/' + this.$route.params.id + '/badges/' + this.account_badges[badge] + '/detach')
        }
      }

      this.account_badges = this.selected_badges
    }
  }
})
</script>
