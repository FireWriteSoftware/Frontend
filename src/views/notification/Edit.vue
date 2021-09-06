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
                          {{ $t('utils.contact_details') }}
                        </div>
                        <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                          <div class="truncate sm:whitespace-normal flex items-center">
                            <MailIcon class="w-4 h-4 mr-2"/>{{ this?.notification?.user?.email }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <UserIcon class="w-4 h-4 mr-2"/>{{ this?.notification?.user?.pre_name }} {{ this?.notification?.user?.last_name }}
                          </div>
                          <div class="truncate sm:whitespace-normal flex items-center mt-3">
                            <HashIcon class="w-4 h-4 mr-2"/>{{ $t('utils.user_id', { id: this?.notification?.user?.id }) }}
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
                                {{ $t('attributes.title') }}
                              </label>
                              <input
                                id="update-title-notification"
                                type="text"
                                :class="'form-control' + (this.validation_error?.title ? ' border-theme-6' : '')"
                                v-model="this.notification.title"
                              />
                              <div v-if="this.validation_error?.title" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.title[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-12 mb-4">
                            <div>
                              <label for="update-title-notification" class="form-label">
                                {{ $t('attributes.content') }}
                              </label>
                              <textarea
                                id="update-content-notification"
                                :class="'form-control' + (this.validation_error?.content ? ' border-theme-6' : '')"
                                rows="2"
                                v-model="this.notification.content"
                              />
                              <div v-if="this.validation_error?.content" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.content[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-6 mb-4">
                            <div>
                              <label for="update-color-notification" class="form-label">
                                {{ $t('attributes.color') }}
                              </label>
                              <input
                                id="update-color-notification"
                                type="color"
                                :class="'form-control' + (this.validation_error?.color ? ' border-theme-6' : '')"
                                v-model="this.notification.color"
                              />
                              <div v-if="this.validation_error?.color" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.color[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-6 mb-4">
                            <div>
                              <label class="form-label">
                                {{ $t('attributes.types') }}
                              </label>
                              <TailSelect
                                v-model="this.notification.type"
                                :class="'form-control' + (this.validation_error?.type ? ' border-theme-6' : '')"
                                :options="{
                                search: true,
                                classNames: 'w-full'
                              }"
                              >
                                <option value=1>{{ $t('attributes.type') }}</option>
                                <option value=2>{{ $t('attributes.user') }}</option>
                              </TailSelect>
                              <div v-if="this.validation_error?.type" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.type[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-12">
                            <div class="flex items-center">
                              <div class="border-l-2 border-theme-1 pl-4">
                                <a href="" class="font-medium">
                                  {{ $t('notifications.already_seen') }}
                                </a>
                                <div class="text-gray-600">
                                  {{ $t('notifications.select_read_status') }}
                                </div>
                              </div>
                              <input class="form-check-switch ml-auto" type="checkbox" v-model="this.notification.seen">
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-12">
                            <hr class="my-5">
                          </div>
                          <div class="col-span-12 xxl:col-span-6 mb-4">
                            <div>
                              <label for="update-icon-notification" class="form-label">
                                {{ $t('attributes.icon') }}
                              </label>
                              <input
                                id="update-icon-notification"
                                type="text"
                                :class="'form-control' + (this.validation_error?.icon ? ' border-theme-6' : '')"
                                v-model="this.notification.icon"
                                :disabled="parseInt(this.notification?.type) !== 1"
                              />
                              <div v-if="parseInt(this.notification?.type) !== 1" class="text-theme-6 mt-2 mb-4">
                                {{ $t('notifications.user_type_selected') }}
                              </div>
                              <div v-if="this.validation_error?.icon" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.type[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 xxl:col-span-6 mb-4">
                            <div>
                              <label class="form-label">
                                {{ $t('attributes.user') }}
                              </label>
                              <TailSelect
                                :class="'form-control' + (this.validation_error?.target_id ? ' border-theme-6' : '')"
                                :options="{
                                  search: true,
                                  classNames: 'w-full'
                                }"
                              >
                                <option :value="user.id" v-for="user in this.users" v-bind:key="user.id" :selected="this.notification.target_id === user.id">
                                  {{ user.name }}
                                </option>
                              </TailSelect>
                              <div v-if="parseInt(this.notification.type) !== 2" class="text-theme-6 mt-2 mb-4">
                                {{ $t('notifications.icon_type_selected') }}
                              </div>
                              <div v-if="this.validation_error?.target_id" class="text-theme-6 mt-2 mb-4">
                                {{ this.validation_error?.type[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 mb-4">
                            <div class="flow-root">
                              <p class="float-left"><button class="btn btn-primary btn-md" @click="updateNotification()"><SaveIcon class="w-4 h-4 mr-2"></SaveIcon>
                                {{ $t('utils.save') }}</button></p>
                              <p class="float-right"><button class="btn btn-danger btn-md" @click="deleteNotification()"><Trash2Icon class="w-4 h-4 mr-2"></Trash2Icon>
                                {{ $t('utils.delete') }}</button></p>
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
    testPagePermissions() {
      axios.post('permissions/test', {
        permissions: [
          'users_update'
        ]
      })
        .then((response) => {
          this.permissions = response.data.data
        })
        .catch()
    },
    fetchNotification() {
      axios.get('notifications/' + this.$route.params.id)
        .then(response => {
          this.notification = response.data.data
        })
        .catch(error => {
          toast.error(this.validation_error = error.response.data.message)
          this.$router.push({ name: 'categories' })
        })
    },
    updateNotification() {
      const loader = this.$loading.show()
      axios.put('notifications/' + this.notification.id, {
        title: this.notification.title,
        content: this.notification.content,
        type: this.notification.type,
        icon: this.notification.icon,
        target_id: this.notification.target_id,
        color: this.notification.color,
        seen: this.notification.seen
      })
        .then(response => {
          toast.success(response.data.message)
          loader.hide()
          this.fetchNotification()
        })
        .catch(error => {
          this.validation_error = error.response.data?.data?.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    deleteNotification() {
      const loader = this.$loading.show()
      axios.delete('notifications/' + this.notification.id)
        .then(response => {
          toast.success(response.data.message)
          loader.hide()
          this.fetchNotification()
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
