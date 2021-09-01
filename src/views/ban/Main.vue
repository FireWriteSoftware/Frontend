<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">{{ $t('bans.overview') }}</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 lg:col-span-12 xxl:col-span-12">
        <!-- BEGIN: Roles & Tags -->
        <div class="intro-y box px-5 pt-5 mt-5">
          <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
            <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                <img
                  alt=""
                  class="rounded-full"
                  :src="this.ban.target?.profile_picture ?? require('@/assets/images/avatar.png')"
                />
              </div>
              <div class="ml-5">
                <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                  {{ this.ban.target.name }}
                </div>
                <div class="text-gray-600">{{ this.ban.target.pre_name }} {{ this.ban.target.last_name }}</div>
              </div>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div class="font-medium text-center lg:text-left lg:mt-3">
                {{ $t('utils.contact_details') }}
              </div>
              <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                <div class="truncate sm:whitespace-normal flex items-center">
                  <MailIcon class="w-4 h-4 mr-2"/>{{ this.ban.target.email }}
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <ShieldIcon class="w-4 h-4 mr-2"/>{{ this.ban.target.role?.name }}
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <HashIcon class="w-4 h-4 mr-2"/>
                  {{ $t('utils.user_id', { id: this.ban.target.id }) }}
                </div>
              </div>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-gray-200 dark:border-dark-5 pt-5 lg:pt-0">
              <div class="text-center rounded-md py-3">
                <div class="font-medium text-theme-1 dark:text-theme-10 text-xl">
                  {{ this.banCount.global }}
                </div>
                <div class="text-gray-600">{{ $t('bans.global_ban') }}</div>
              </div>
              <div class="text-center rounded-md py-3 mx-5">
                <div class="font-medium text-theme-1 dark:text-theme-10 text-xl">
                  {{ this.banCount.comments }}
                </div>
                <div class="text-gray-600">{{ $t('bans.comment_ban') }}</div>
              </div>
              <div class="text-center rounded-md py-3">
                <div class="font-medium text-theme-1 dark:text-theme-10 text-xl">
                  {{ this.banCount.posts }}
                </div>
                <div class="text-gray-600">{{ $t('bans.posting_ban') }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Roles & Tags -->
        <!-- BEGIN: Settings -->
        <div class="grid grid-cols-12 gap-6 mt-5">
          <!-- BEGIN: Latest Uploads -->
          <div class="intro-y box col-span-12 lg:col-span-9">
            <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto">{{ $t('bans.selected_ban') }}</h2>
              <button class="btn btn-primary btn-sm ml-auto" @click="updateBan(this.ban)"><SaveIcon class="w-4 h-4 mr-3"></SaveIcon>
                {{ $t('utils.save') }}</button>
            </div>
            <div class="p-5">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5 mb-4">
                    <div class="col-span-12 xxl:col-span-12 mb-4">
                      <div>
                        <label for="update-reason-ban" class="form-label">
                          {{ $t('attributes.reason') }}
                        </label>
                        <input
                          id="update-reason-ban"
                          type="text"
                          :class="'form-control' + (this.validation_error?.reason != null ? ' border-theme-6' : '')"
                          v-model="ban.reason"
                        />
                        <div v-if="this.validation_error?.reason != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.reason[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-12 mb-4">
                      <div>
                        <label for="update-description-ban" class="form-label">
                          {{ $t('attributes.description') }}
                        </label>
                        <textarea
                          id="update-description-ban"
                          :class="'form-control' + (this.validation_error?.description != null ? ' border-theme-6' : '')"
                          v-model="ban.description"
                        />
                        <div v-if="this.validation_error?.description != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.description[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-4">
                      <div>
                        <label for="update-date-ban" class="form-label">
                          {{ $t('attributes.unban_date') }}
                        </label>
                        <input
                          id="update-date-ban"
                          type="date"
                          :class="'form-control' + (this.validation_error?.ban_until != null ? ' border-theme-6' : '')"
                          v-model="ban_time.date"
                        />
                        <div v-if="this.validation_error?.ban_until != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.ban_until[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-4">
                      <div>
                        <label for="update-time-ban" class="form-label">
                          {{ $t('attributes.ban_time') }}
                        </label>
                        <input
                          id="update-time-ban"
                          type="time"
                          :class="'form-control' + (this.validation_error?.ban_until != null ? ' border-theme-6' : '')"
                          v-model="ban_time.time"
                          step="60"
                        />
                        <div v-if="this.validation_error?.ban_until != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.ban_until[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-4">
                      <div>
                        <label for="update-type-ban" class="form-label">
                          {{ $t('attributes.ban_type') }}
                        </label>
                        <TailSelect
                          id="update-type-ban"
                          v-model="ban.type"
                          :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                          :options="{
                            classNames: 'w-full'
                            }"
                          >
                          <option value="0" :selected="ban.type === 0">{{ $t('bans.global_ban') }}</option>
                          <option value="1" :selected="ban.type === 1">{{ $t('bans.comment_ban') }}</option>
                          <option value="2" :selected="ban.type === 2">{{ $t('bans.posting_ban') }}</option>
                        </TailSelect>
                        <div v-if="this.validation_error?.type != null" class="text-theme-6 mt-2 mb-4">
                          {{ this.validation_error?.type[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-3 mb-4">
                      <div>
                        <label for="update-target-ban" class="form-label">
                          {{ $t('attributes.target') }}
                        </label>
                        <input
                          id="update-target-ban"
                          type="text"
                          class="form-control"
                          :value="ban.target.name"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-3 mb-4">
                      <div>
                        <label for="update-staff-ban" class="form-label">
                          {{ $t('attributes.staff') }}
                        </label>
                        <input
                          id="update-staff-ban"
                          type="text"
                          class="form-control"
                          :value="ban.staff.name"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="intro-y box col-span-12 lg:col-span-3">
            <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto">{{ $t('bans.current_ban_state') }}</h2>
            </div>
            <div class="p-5">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5 mb-4">
                    <div class="col-span-12">
                      <div v-if="this.isBanned === false" class="text-center pt-10">
                        <CheckCircleIcon class="w-16 h-16 text-theme-9 mx-auto mt-3"/>
                        <div class="text-3xl mt-5">{{ $t('bans.unbanned') }}</div>
                        <div class="text-gray-600 mt-2">
                          {{ $t('bans.unbanned_subtitle') }}
                        </div>
                      </div>
                      <div v-else class="p-5 text-center">
                        <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                        <div class="text-3xl mt-5">{{ $t('bans.banned') }}</div>
                        <div class="text-gray-600 mt-2">
                          {{ $t('bans.banned_subtitle') }}
                          <hr class="mt-4">
                          <div class="mt-4 flex-1 dark:text-gray-300 px-5 pt-5 lg:pt-0">
                            <div class="font-medium text-center lg:text-left lg:mt-3">
                              {{ $t('bans.most_recent_ban') }}
                            </div>
                            <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                              <div class="truncate sm:whitespace-normal flex items-center">
                                <LockIcon class="w-4 h-4 mr-2"/>{{ this.lastBan.type === 0 ? $t('bans.global_ban') : this.lastBan.type === 1 ? $t('bans.comment_ban') : $t('bans.posting_ban') }}
                              </div>
                              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                                <AlignLeftIcon class="w-4 h-4 mr-2"/>{{ this.lastBan.reason.substring(0, 25) }}{{ this.lastBan.reason.length > 25 ? '...' : '' }}
                              </div>
                              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                                <ClockIcon class="w-4 h-4 mr-2"/>{{ formatDate(this.lastBan.ban_until) }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'
const toast = useToast()

export default defineComponent({
  data() {
    return {
      banCount: {},
      validation_error: {},
      isBanned: false,
      lastBan: {},
      ban_time: {
        date: '',
        time: ''
      },
      ban: {
        id: 0,
        target: {
          id: 0,
          name: '',
          pre_name: '',
          last_name: '',
          email: '',
          email_verified_at: null,
          created_at: '',
          updated_at: '',
          role_id: 0,
          role: {},
          deleted_at: null,
          profile_picture: ''
        },
        staff: {
          id: 0,
          name: '',
          pre_name: '',
          last_name: '',
          email: '',
          email_verified_at: null,
          created_at: '',
          updated_at: '',
          role_id: 0,
          deleted_at: null,
          profile_picture: ''
        },
        reason: '',
        description: '',
        ban_until: '',
        type: 0,
        active: false,
        created_at: '',
        updated_at: ''
      }
    }
  },
  mounted() {
    this.fetchBan(this.$route.params.id)
  },
  methods: {
    fetchBan(id) {
      const loader = this.$loading.show()
      axios.get('bans/' + id)
        .then(response => {
          // Set General ban
          this.ban = response.data.data
          // Split Ban time
          this.ban_time.date = response.data.data.ban_until.split(' ')[0]
          this.ban_time.time = response.data.data.ban_until.split(' ')[1]
          // Stop Animation, Load other values
          loader.hide()
          this.fetchBanCount(response.data.data.target.id)
          this.fetchRole(response.data.data.target.role.id)
          this.checkBans(response.data.data.target.id)
        })
        .catch(() => {
          loader.hide()
        })
    },
    fetchBanCount(id) {
      axios.get('users/' + id + '/bans/count')
        .then(response => {
          this.banCount = response.data.data
        })
        .catch()
    },
    fetchRole(id) {
      axios.get('roles/' + id)
        .then(response => {
          this.ban.target.role = response.data.data
        })
        .catch()
    },
    updateBan(ban) {
      const loader = this.$loading.show()
      axios.put('bans/' + this.$route.params.id, {
        target_id: ban.target.id,
        reason: ban.reason,
        description: ban.description,
        type: ban.type,
        ban_until: this.ban_time.date !== null && this.ban_time.time !== null ? (this.ban_time.date + ' ' + this.ban_time.time) : '01-01-1970 00:00:00'
      })
        .then(response => {
          this.checkBans(ban.target.id)
          toast.success('Ban successfully updated')
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    checkBans(id) {
      this.isBanned = false
      const loader = this.$loading.show()
      axios.get('users/' + id + '/bans')
        .then(response => {
          for (let ban in response.data.data.sort((a, b) => { return new Date(a.created_at) - new Date(b.created_at) })) {
            ban = response.data.data[ban]
            if (ban.active === true) {
              this.isBanned = true
              this.lastBan = ban
            }
          }
          loader.hide()
        })
        .catch(() => {
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
