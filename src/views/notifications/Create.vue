<template>
  <div>
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-12 xxl:col-span-12">
        <!-- BEGIN: Notification Page -->
        <Header></Header>
        <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
          <!-- BEGIN: Notification Side Menu -->
          <div class="col-span-12 lg:col-span-4 xxl:col-span-3 chat__box overflow-y-auto">
            <div class="tab-content">
              <div class="pr-1">
                <div class="box p-5 mb-5">
                  <div class="relative text-gray-700 dark:text-gray-300">
                    <input
                      type="text"
                      class="form-control py-3 px-4 border-transparent bg-gray-200 pr-10 placeholder-theme-13"
                      placeholder="Search for user..."
                      v-model="this.search.user"
                      @change="this.fetchUsers(this.search.user ? 'users?search=' + this.search.user + '&paginate=0' : 'users?paginate=0')"
                    />
                    <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"/>
                  </div>
                </div>
              </div>
              <!-- BEGIN: Create Notifications Menu -->
              <div class="pr-1 pt-1">
                <div
                  v-for="user in this.users"
                  v-bind:key="user.id"
                  class="intro-x cursor-pointer box relative flex items-center p-5 mb-4"
                  @click="showCreateNotification(user)"
                >
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt=""
                      class="rounded-full"
                      :src="user?.profile_picture ?? require('@/assets/images/avatar.png')"
                    />
                    <div class="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center">
                      <a class="font-medium">
                        {{ user.name }}
                      </a>
                    </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- END: Create Notifications Menu -->
            </div>
          </div>
          <!-- END: Notification Side Menu -->

          <DefaultTab v-if="!this.active_tab"></DefaultTab>

          <!-- BEGIN: Notification Creation Tab -->
          <div class="intro-y col-span-12 lg:col-span-8 xxl:col-span-9" v-if="this.active_tab">
            <div class="chat__box box">
              <div class="h-full flex flex-col overflow-y-scroll scrollbar-hidden">
                <div class="px-5 pt-5 flex-1">
                  <div class="intro-y box px-5 pt-5">
                    <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
                      <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
                        <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                          <img
                            alt=""
                            class="rounded-full"
                            :src="this.create_notification.user?.profile_picture ?? require('@/assets/images/avatar.png')"
                          />
                        </div>
                        <div class="ml-5">
                          <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                            {{ this.create_notification.user?.name }}
                          </div>
                          <div class="text-gray-600">{{ this?.create_notification?.user.role?.name }}</div>
                        </div>
                      </div>
                      <div class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
                        <div class="font-medium text-center lg:text-left lg:mt-3">
                          Contact Details
                        </div>
                        <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                          <div class="truncate sm:whitespace-normal flex items-center">
                            <MailIcon class="w-4 h-4 mr-2"/>{{ this?.create_notification?.user.email }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <UserIcon class="w-4 h-4 mr-2"/>{{ this?.create_notification?.user?.pre_name }} {{ this?.create_notification?.user?.last_name }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <HashIcon class="w-4 h-4 mr-2"/>User ID: {{ this?.create_notification?.user.id }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-5">
                  <div class="flex flex-col-reverse xl:flex-row flex-col">
                    <div class="flex-1 mt-6 xl:mt-0">
                      <div class="grid grid-cols-12 gap-x-5 mb-3">
                        <div class="col-span-12 xxl:col-span-12 mb-4">
                          <div>
                            <label for="create-title-notification" class="form-label">
                              Title
                            </label>
                            <input
                              id="create-title-notification"
                              type="text"
                              :class="'form-control' + (this.validation_error?.title ? ' border-theme-6' : '')"
                              placeholder="Enter Title"
                              v-model="this.create_notification.title"
                            />
                            <div v-if="this.validation_error?.title" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.title[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-12 mb-4">
                          <div>
                            <label for="create-title-notification" class="form-label">
                              Content
                            </label>
                            <textarea
                              id="create-content-notification"
                              :class="'form-control' + (this.validation_error?.content ? ' border-theme-6' : '')"
                              placeholder="Enter Content"
                              rows="5"
                              v-model="this.create_notification.content"
                            />
                            <div v-if="this.validation_error?.content" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.content[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-6 mb-4">
                          <div>
                            <label for="create-color-notification" class="form-label">
                              Color
                            </label>
                            <input
                              id="create-color-notification"
                              type="color"
                              :class="'form-control' + (this.validation_error?.color ? ' border-theme-6' : '')"
                              placeholder="Enter notification reason"
                              v-model="this.create_notification.color"
                            />
                            <div v-if="this.validation_error?.color" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.color[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-6 mb-4">
                          <div>
                            <label class="form-label">
                              Type
                            </label>
                            <TailSelect
                              v-model="this.create_notification.type"
                              :class="'form-control' + (this.validation_error?.type ? ' border-theme-6' : '')"
                              :options="{
                                search: true,
                                classNames: 'w-full'
                              }"
                            >
                              <option value=1>Icon</option>
                              <option value=2>User</option>
                            </TailSelect>
                            <div v-if="this.validation_error?.type" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.type[0] }}
                            </div>
                            {{ this.create_notification.type }}
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-12">
                          <hr class="my-5">
                        </div>
                        <div class="col-span-12 xxl:col-span-6 mb-4">
                          <div>
                            <label for="create-icon-notification" class="form-label">
                              Icon
                            </label>
                            <input
                              id="create-icon-notification"
                              type="text"
                              :class="'form-control' + (this.validation_error?.icon ? ' border-theme-6' : '')"
                              placeholder="Enter Icon"
                              v-model="this.create_notification.icon"
                              :disabled="parseInt(this.create_notification.type) !== 1"
                            />
                            <div v-if="parseInt(this.create_notification.type) !== 1" class="text-theme-6 mt-2 mb-4">
                              User Type is selected!
                            </div>
                            <div v-if="this.validation_error?.icon" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.type[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-6 mb-4">
                          <div>
                            <label class="form-label">
                              User
                            </label>
                            <TailSelect
                              v-model="this.create_notification.target_id"
                              :class="'form-control' + (this.validation_error?.target_id ? ' border-theme-6' : '')"
                              :options="{
                                  search: true,
                                  classNames: 'w-full'
                              }"
                            >
                              <option :value="user.id" v-for="user in this.users" v-bind:key="user.id" :selected="this.create_notification.target_id === user.id">
                                {{ user.name }}
                              </option>
                            </TailSelect>
                            <div v-if="parseInt(this.create_notification.type) !== 2" class="text-theme-6 mt-2 mb-4">
                              Icon Type is selected!
                            </div>
                            <div v-if="this.validation_error?.target_id" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.type[0] }}
                            </div>
                          </div>
                        </div>
                        <button class="btn btn-primary w-20" @click="createNotification(this.create_notification)">
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Notification Creation Tab -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './Components/Header'
import axios from 'axios'
import DefaultTab from './Components/DefaultTab'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  components: {
    DefaultTab,
    Header
  },
  data() {
    return {
      active_tab: false,
      users: [],
      validation_error: {},
      search: {},
      create_notification: {
        type: 1,
        icon: 'BellIcon'
      }
    }
  },
  mounted() {
    this.fetchUsers('users?paginate=0')
  },
  methods: {
    fetchUsers(page) {
      const loader = this.$loading.show()
      axios.get(page)
        .then(response => {
          this.users = response.data
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    createNotification(notification) {
      const loader = this.$loading.show()
      axios.post('notifications', {
        title: notification.title,
        content: notification.content,
        type: notification.type,
        icon: notification.icon,
        seen: 0,
        target_id: notification.target_id,
        color: notification.color
      })
        .then(response => {
          toast.success('Notification created successfully')
          loader.hide()
          this.fetchUsers('users?paginate=0')
        })
        .catch(error => {
          this.validation_error = error.response.data?.data?.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    showCreateNotification(user) {
      this.create_notification.user = user
      this.create_notification.user_id = user.id
      this.active_tab = true
    }
  }
})
</script>
