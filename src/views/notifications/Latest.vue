<template>
  <div>
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-12 xxl:col-span-12">
        <!-- BEGIN: Notification Page -->
        <Header></Header>
        <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
          <!-- BEGIN: Notification Side Menu -->
          <div class="col-span-12 lg:col-span-4 xxl:col-span-3">
            <div class="tab-content">
              <!-- BEGIN: Lastest Notifications Menu -->
              <div class="overflow-y-auto pr-1 pt-1 chat__box">
                <div
                  v-for="notification in this.recent_notifications"
                  v-bind:key="notification.id"
                  class="intro-x cursor-pointer box relative flex items-center p-5 mb-4"
                  @click="showSingleNotification(notification)"
                >
                  <div class="w-12 h-12 flex-none mr-1" v-if="notification.type === 1">
                    <a class="flex items-center absolute top-0 bottom-0">
                      <component class="w-8 h-8 text-gray-600" :is="notification?.icon"/>
                    </a>
                  </div>
                  <div class="w-12 h-12 flex-none image-fit mr-1" v-if="notification.type === 2">
                    <img
                      alt=""
                      class="rounded-full"
                      :src="notification.target_id?.profile_picture ?? require('@/assets/images/avatar.png')"
                    />
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center">
                      <a href="javascript:;" class="font-medium">
                        {{ notification.title }}
                      </a>
                    </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">
                      {{ notification.content }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- END: Lastest Notifications Menu -->
            </div>
          </div>
          <!-- END: Notification Side Menu -->

          <DefaultTab v-if="!this.active_tab"></DefaultTab>

          <!-- BEGIN: Notification Latest Tab -->
          <div class="intro-y col-span-12 lg:col-span-8 xxl:col-span-9" v-if="this.active_tab">
            <div class="chat__box box h-4 flex-grow">
              <div class="h-full flex flex-col">
                <div class="px-5 pt-5 flex-1 overflow-y-scroll scrollbar-hidden">
                  <div class="intro-y box px-5 pt-5">
                    <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
                      <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
                        <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                          <img
                            alt=""
                            class="rounded-full"
                            :src="this.single_notification.user?.profile_picture ?? require('@/assets/images/avatar.png')"
                          />
                        </div>
                        <div class="ml-5">
                          <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                            {{ this.single_notification.user?.name }}
                          </div>
                          <div class="text-gray-600">{{ this?.single_notification?.user.role?.name }}</div>
                        </div>
                      </div>
                      <div class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
                        <div class="font-medium text-center lg:text-left lg:mt-3">
                          Contact Details
                        </div>
                        <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                          <div class="truncate sm:whitespace-normal flex items-center">
                            <MailIcon class="w-4 h-4 mr-2"/>{{ this?.single_notification?.user.email }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <UserIcon class="w-4 h-4 mr-2"/>{{ this?.single_notification?.user?.pre_name }} {{ this?.single_notification?.user?.last_name }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <HashIcon class="w-4 h-4 mr-2"/>User ID: {{ this?.single_notification?.user.id }}
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
                              <label for="update-title-notification" class="form-label">
                                Title
                              </label>
                              <input
                                id="update-title-notification"
                                type="text"
                                :class="'form-control' + (this.validation_error?.title != null ? ' border-theme-6' : '')"
                                placeholder="Enter Title"
                                v-model="this.single_notification.title"
                              />
                              <div v-if="this.validation_error?.title != null" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.title[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-12 mb-4">
                            <div>
                              <label for="update-title-notification" class="form-label">
                                Content
                              </label>
                              <textarea
                                id="update-content-notification"
                                :class="'form-control' + (this.validation_error?.content != null ? ' border-theme-6' : '')"
                                placeholder="Enter Content"
                                rows="2"
                                v-model="this.single_notification.content"
                              />
                              <div v-if="this.validation_error?.content != null" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.content[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-6 mb-4">
                            <div>
                              <label for="update-color-notification" class="form-label">
                                Color
                              </label>
                              <input
                                id="update-color-notification"
                                type="color"
                                :class="'form-control' + (this.validation_error?.color != null ? ' border-theme-6' : '')"
                                placeholder="Enter notification reason"
                                v-model="this.single_notification.color"
                              />
                              <div v-if="this.validation_error?.color != null" class="text-theme-6 mt-2 mb-4">
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
                                v-model="this.single_notification.type"
                                :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                                :options="{
                                search: true,
                                classNames: 'w-full'
                              }"
                              >
                                <option value=1>Icon</option>
                                <option value=2>User</option>
                              </TailSelect>
                              <div v-if="this.validation_error?.type != null" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.type[0] }}
                              </div>
                              {{ this.single_notification.type }}
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-12">
                            <div class="flex items-center">
                              <div class="border-l-2 border-theme-1 pl-4">
                                <a href="" class="font-medium">
                                  Has the notification already been seen?
                                </a>
                                <div class="text-gray-600">
                                  Select this option to mark the notification as read.
                                </div>
                              </div>
                              <input class="form-check-switch ml-auto" type="checkbox" v-model="this.single_notification.seen">
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-12">
                            <hr class="my-5">
                          </div>
                          <div class="col-span-12 xxl:col-span-6 mb-4">
                            <div>
                              <label for="update-icon-notification" class="form-label">
                                Icon
                              </label>
                              <input
                                id="update-icon-notification"
                                type="text"
                                :class="'form-control' + (this.validation_error?.icon != null ? ' border-theme-6' : '')"
                                placeholder="Enter Icon"
                                v-model="this.single_notification.icon"
                                :disabled="parseInt(this.single_notification.type) !== 1"
                              />
                              <div v-if="parseInt(this.single_notification.type) !== 1" class="text-theme-6 mt-2 mb-4">
                                User Type is selected!
                              </div>
                              <div v-if="this.validation_error?.icon != null" class="text-theme-6 mt-2 mb-4">
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
                                :class="'form-control' + (this.validation_error?.target_id != null ? ' border-theme-6' : '')"
                                :options="{
                                  search: true,
                                  classNames: 'w-full'
                                }"
                              >
                                <option :value="user.id" v-for="user in this.users" v-bind:key="user.id" :selected="this.single_notification.target_id === user.id">
                                  {{ user.name }}
                                </option>
                              </TailSelect>
                              <div v-if="parseInt(this.single_notification.type) !== 2" class="text-theme-6 mt-2 mb-4">
                                Icon Type is selected!
                              </div>
                              <div v-if="this.validation_error?.target_id != null" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.type[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 mb-4">
                            <div class="flow-root">
                              <p class="float-left"><button class="btn btn-primary btn-md" @click="updateNotification(this.single_notification)"><SaveIcon class="w-4 h-4 mr-2"></SaveIcon>Save</button></p>
                              <p class="float-right"><button class="btn btn-danger btn-md" @click="deleteNotification(this.single_notification.id)"><Trash2Icon class="w-4 h-4 mr-2"></Trash2Icon>Delete</button></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Notification Latest Tab -->
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
      recent_notifications: [],
      validation_error: {},
      single_notification: {}
    }
  },
  mounted() {
    this.fetchRecentNotifications()
  },
  methods: {
    fetchRecentNotifications() {
      axios.get('notifications?recent=15')
        .then(response => {
          this.recent_notifications = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    showSingleNotification(notification) {
      this.single_notification = notification
      this.active_tab = true
    },
    updateNotification(notification) {
      const loader = this.$loading.show()
      axios.put('notifications/' + notification.id, {
        title: notification.title,
        content: notification.content,
        type: notification.type,
        icon: notification.icon,
        target_id: notification.target_id,
        color: notification.color,
        seen: notification.seen
      })
        .then(response => {
          toast.success('Notification updated successfully')
          loader.hide()
          this.fetchRecentNotifications()
        })
        .catch(error => {
          this.validation_error = error.response.data?.data?.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    deleteNotification(id) {
      const loader = this.$loading.show()
      axios.delete('notifications/' + id)
        .then(response => {
          toast.success('Notification deleted successfully')
          loader.hide()
          this.fetchRecentNotifications()
          this.active_tab = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
          loader.hide()
        })
    }
  }
})
</script>
