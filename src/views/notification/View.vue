<template>
  <div>
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-12 xxl:col-span-12">
        <!-- BEGIN: Notification Page -->
        <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
          <!-- BEGIN: Notification Latest Tab -->
          <div class="intro-y col-span-12">
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
                            :src="this.notification.user?.profile_picture ?? require('@/assets/images/avatar.png')"
                          />
                        </div>
                        <div class="ml-5">
                          <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                            {{ this.notification.user?.name }}
                          </div>
                          <div class="text-gray-600">{{ this?.notification?.user?.role?.name }}</div>
                        </div>
                      </div>
                      <div class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
                        <div class="font-medium text-center lg:text-left lg:mt-3">
                          Contact Details
                        </div>
                        <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                          <div class="truncate sm:whitespace-normal flex items-center">
                            <MailIcon class="w-4 h-4 mr-2"/>{{ this?.notification?.user?.email }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <UserIcon class="w-4 h-4 mr-2"/>{{ this?.notification?.user?.pre_name }} {{ this?.notification?.user?.last_name }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <HashIcon class="w-4 h-4 mr-2"/>User ID: {{ this?.notification?.user?.id }}
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
                                v-model="this.notification.title"
                                disabled
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
                                rows="10"
                                v-model="this.notification.content"
                                disabled
                              />
                              <div v-if="this.validation_error?.content != null" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.content[0] }}
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
          </div>
          <!-- END: Notification Latest Tab -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  data() {
    return {
      active_tab: false,
      validation_error: {},
      notification: {}
    }
  },
  mounted() {
    this.fetchNotification()
  },
  methods: {
    fetchNotification() {
      axios.get('notifications/' + this.$route.params.id)
        .then(response => {
          this.notification = response.data.data
        })
        .catch(error => {
          console.error(error.response)
          toast.error(this.validation_error = error.response.data.message)
          this.$router.push({ name: 'categories' })
        })
    }
  }
})
</script>
