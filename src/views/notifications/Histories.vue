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
                      placeholder="Search user..."
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
                  @click="showUserHistory(user)"
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
              <div class="h-full flex flex-col">
                <div class="overflow-y-scroll">
                  <div class="px-5 pt-5 flex-1">
                    <div class="intro-y box px-5 pt-5">
                      <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
                        <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
                          <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                            <img
                              alt=""
                              class="rounded-full"
                              :src="this.history_notification_user?.profile_picture ?? require('@/assets/images/avatar.png')"
                            />
                          </div>
                          <div class="ml-5">
                            <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                              {{ this.history_notification_user?.name }}
                            </div>
                            <div class="text-gray-600">{{ this.history_notification_user.role?.name }}</div>
                          </div>
                        </div>
                        <div class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
                          <div class="font-medium text-center lg:text-left lg:mt-3">
                            Contact Details
                          </div>
                          <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                            <div class="truncate sm:whitespace-normal flex items-center">
                              <MailIcon class="w-4 h-4 mr-2"/>{{ this.history_notification_user?.email }}
                            </div>
                            <div class="truncate sm:whitespace-normal flex items-center mt-3">
                              <UserIcon class="w-4 h-4 mr-2"/>{{ this.history_notification_user?.pre_name }} {{ this.history_notification_user?.last_name }}
                            </div>
                            <div class="truncate sm:whitespace-normal flex items-center mt-3">
                              <HashIcon class="w-4 h-4 mr-2"/>User ID: {{ this.history_notification_user?.id }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-12 gap-6 p-5 flex">
                    <!-- BEGIN: Users Layout -->
                    <div
                      v-for="notification in notifications"
                      v-bind:key="notification.id"
                      class="intro-y col-span-12 md:col-span-6 lg:col-span-4"
                    >
                      <div class="box">
                        <div class="flex items-start pt-5 pl-1">
                          <div class="w-full flex flex-col lg:flex-row items-center">
                            <div class="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0 truncate">
                              <a href="" class="font-medium">{{ notification.title }}}</a>
                              <div class="text-gray-600 text-xs mt-0.5">
                                {{ notification.user.name }}
                              </div>
                            </div>
                          </div>
                          <div class="absolute right-0 top-0 mr-5 mt-3 dropdown" v-if="permissions.notifications_update || permissions.notifications_get_single">
                            <a
                              class="dropdown-toggle w-5 h-5 block"
                              href="javascript:;"
                              aria-expanded="false"
                            >
                              <MoreHorizontalIcon class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                            </a>
                            <div class="dropdown-menu w-40">
                              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                                <a href="javascript:;" v-if="permissions.notifications_get_single" @click="this.$router.push({ name: 'moderation.notifications.view', params: { id: notification.id } })" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                                  <EyeIcon class="w-4 h-4 mr-2" /> View
                                </a>
                                <a href="javascript:;" v-if="permissions.notifications_update" @click="this.$router.push({ name: 'moderation.notifications.edit', params: { id: notification.id } })" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                                  <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-center lg:text-left px-5 pb-5">
                          <div class="flex">
                            <!-- BEGIN: Notification Seen -->
                            <div class="flex items-center justify-center lg:justify-start text-gray-600 mt-5 self-center mr-3" v-if="notification.seen">
                              <EyeIcon class="w-3 h-3 mr-2"/>Seen
                            </div>
                            <div class="flex items-center justify-center lg:justify-start text-gray-600 mt-5 self-center mr-3" v-else>
                              <EyeOffIcon class="w-3 h-3 mr-2"/>Unseen
                            </div>
                            <!-- END: Notification Seen -->
                            <!-- BEGIN: Notification Type -->
                            <div class="flex items-center justify-center lg:justify-start text-gray-600 mt-5 self-center" v-if="notification.target_id">
                              <UserIcon class="w-3 h-3 mr-2" />User Notification
                            </div>
                            <div class="flex items-center justify-center lg:justify-start text-gray-600 mt-5self-center" v-else>
                              <component class="w-3 h-3 mr-2" :is="notification.icon"/>Icon Notification
                            </div>
                            <!-- END: Notification Type -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- END: Users Layout -->
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
      history_notification_user: {},
      users: [],
      notifications: [],
      permissions: {},
      validation_error: {},
      search: {
        user: ''
      }
    }
  },
  mounted() {
    this.testPagePermissions()
    this.fetchUsers('users?paginate=0')
  },
  methods: {
    testPagePermissions() {
      axios.post('permissions/test', {
        permissions: [
          'notifications_update',
          'notifications_get_single'
        ]
      })
        .then((response) => {
          this.permissions = response.data.data
        })
        .catch()
    },
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
    showUserHistory(user) {
      this.history_notification_user = user
      this.active_tab = true
      this.fetchNotifications('users/' + user.id + '/notifications')
    },
    fetchNotifications(url) {
      const loader = this.$loading.show()
      axios.get(url)
        .then(response => {
          this.notifications = response.data.data
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    }
  }
})
</script>
