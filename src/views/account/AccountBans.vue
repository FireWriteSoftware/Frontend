<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">User Account</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Sidebar -->
      <Sidebar :user="this.user"></Sidebar>
      <!-- END: Sidebar -->
      <div class="col-span-12 lg:col-span-8 xxl:col-span-9">
        <!-- BEGIN: Roles & Tags -->
        <div class="intro-y box px-5 pt-5 mt-5">
          <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
            <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                <img
                  alt=""
                  class="rounded-full"
                  :src="this.user.profile_picture ?? require('@/assets/images/avatar.png')"
                />
              </div>
              <div class="ml-5">
                <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                  {{ this.user.name }}
                </div>
                <div class="text-gray-600">{{ this.user.pre_name }} {{ this.user.last_name }}</div>
              </div>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div class="font-medium text-center lg:text-left lg:mt-3">
                User Details
              </div>
              <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                <div class="truncate sm:whitespace-normal flex items-center">
                  <MailIcon class="w-4 h-4 mr-2"/>{{ this.user.email }}
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <ShieldIcon class="w-4 h-4 mr-2"/>{{ this.user.role?.name }}
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <HashIcon class="w-4 h-4 mr-2"/>User-ID: {{ this.user.id }}
                </div>
              </div>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-gray-200 dark:border-dark-5 pt-5 lg:pt-0">
              <div class="text-center rounded-md w-40 py-3">
                <div class="font-medium text-theme-1 dark:text-theme-10 text-xl">
                  {{ this.banCount?.global }}
                </div>
                <div class="text-gray-600">Global Bans</div>
              </div>
              <div class="text-center rounded-md w-40 py-3">
                <div class="font-medium text-theme-1 dark:text-theme-10 text-xl">
                  {{ this.banCount?.comments }}
                </div>
                <div class="text-gray-600">Comment Bans</div>
              </div>
              <div class="text-center rounded-md w-40 py-3">
                <div class="font-medium text-theme-1 dark:text-theme-10 text-xl">
                  {{ this.banCount?.posts }}
                </div>
                <div class="text-gray-600">Posting Bans</div>
              </div>
            </div>
          </div>
          <div class="nav nav-tabs flex-col sm:flex-row justify-center lg:justify-start" role="tablist">
            <a
              id="settings-tab"
              data-toggle="tab"
              data-target="#settings"
              href="javascript:;"
              class="py-4 sm:mr-8 flex items-center active"
              role="tab"
              aria-controls="settings"
              aria-selected="true"
            >
              <SlidersIcon class="w-4 h-4 mr-2" /> Settings
            </a>
            <a
              id="history-tab"
              data-toggle="tab"
              data-target="#history"
              href="javascript:;"
              class="py-4 sm:mr-8 flex items-center"
              role="tab"
              aria-selected="false"
            >
              <ArchiveIcon class="w-4 h-4 mr-2" /> History
            </a>
          </div>
        </div>
        <!-- END: Roles & Tags -->
        <!-- BEGIN: Settings -->
        <div class="tab-content mt-5">
          <div
            id="settings"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="settings-tab"
          >
            <div class="grid grid-cols-12 gap-6">
              <!-- BEGIN: Latest Uploads -->
              <div class="intro-y box col-span-12 lg:col-span-8">
                <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
                  <h2 class="font-medium text-base mr-auto">Create Ban</h2>
                  <button class="btn btn-primary btn-sm ml-auto" @click="createBan(this.ban)"><SendIcon class="w-4 h-4 mr-3"></SendIcon>Submit</button>
                </div>
                <div class="p-5">
                  <div class="flex flex-col-reverse xl:flex-row flex-col">
                    <div class="flex-1 mt-6 xl:mt-0">
                      <div class="grid grid-cols-12 gap-x-5 mb-4">
                        <div class="col-span-12 xxl:col-span-12 mb-4">
                          <div>
                            <label for="create-reason-ban" class="form-label">
                              Reason
                            </label>
                            <input
                              id="create-reason-ban"
                              type="text"
                              :class="'form-control' + (this.validation_error?.reason != null ? ' border-theme-6' : '')"
                              placeholder="Enter ban reason"
                              v-model="ban.reason"
                            />
                            <div v-if="this.validation_error?.reason != null" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.reason[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-12 mb-4">
                          <div>
                            <label for="create-description-ban" class="form-label">
                              Description
                            </label>
                            <textarea
                              id="create-description-ban"
                              :class="'form-control' + (this.validation_error?.reason != null ? ' border-theme-6' : '')"
                              placeholder="Enter a ban description"
                              v-model="ban.description"
                            />
                            <div v-if="this.validation_error?.description != null" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.description[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-6 mb-4">
                          <div>
                            <label for="create-date-ban" class="form-label">
                              Unban Date
                            </label>
                            <input
                              id="create-date-ban"
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
                            <label for="create-time-ban" class="form-label">
                              Ban Time
                            </label>
                            <input
                              id="create-time-ban"
                              type="time"
                              :class="'form-control' + (this.validation_error?.ban_until != null ? ' border-theme-6' : '')"
                              v-model="ban_time.time"
                            />
                            <div v-if="this.validation_error?.ban_until != null" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.ban_until[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-6 mb-4">
                          <div>
                            <label for="update-type-ban" class="form-label">
                              Ban type
                            </label>
                            <TailSelect
                              id="update-type-ban"
                              v-model="ban.type"
                              :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                              :options="{
                                classNames: 'w-full'
                              }"
                            >
                              <option value="0" :selected="ban.type === 0">Global Ban</option>
                              <option value="1" :selected="ban.type === 1">Comment Ban</option>
                              <option value="2" :selected="ban.type === 2">Posting Ban</option>
                            </TailSelect>
                            <div v-if="this.validation_error?.type != null" class="text-theme-6 mt-2 mb-4">
                              {{ this.validation_error?.type[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-3 mb-4">
                          <div>
                            <label for="create-target-ban" class="form-label">
                              Target
                            </label>
                            <input
                              id="create-target-ban"
                              type="text"
                              class="form-control"
                              :value="this.user.name"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-span-12 xxl:col-span-3 mb-4">
                          <div>
                            <label for="create-staff-ban" class="form-label">
                              Staff
                            </label>
                            <input
                              id="create-staff-ban"
                              type="text"
                              class="form-control"
                              :value="this.staff.name"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="intro-y box col-span-12 lg:col-span-4">
                <div class="flex items-center p-3 border-b border-gray-200 dark:border-dark-5">
                  <h2 class="font-medium text-base mr-auto">Current Ban</h2>
                </div>
                <div class="p-5">
                  <div class="flex flex-col-reverse xl:flex-row flex-col">
                    <div class="flex-1 mt-6 xl:mt-0">
                      <div class="grid grid-cols-12 gap-x-5 mb-4">
                        <div class="col-span-12">
                          <div v-if="this.isBanned === false" class="p-5 text-center">
                            <CheckCircleIcon class="w-16 h-16 text-theme-9 mx-auto mt-3"/>
                            <div class="text-3xl mt-5">Unbanned</div>
                            <div class="text-gray-600 mt-2">
                              This user is currently Unbanned!
                            </div>
                          </div>
                          <div v-else class="p-5 text-center">
                            <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                            <div class="text-3xl mt-5">Banned</div>
                            <div class="text-gray-600 mt-2">
                              This user is currently Banned!
                              <hr class="mt-4">
                              <div class="mt-4 flex-1 dark:text-gray-300 px-5 pt-5 lg:pt-0">
                                <div class="font-medium text-center lg:text-left lg:mt-3">
                                  Most recent Ban:
                                </div>
                                <div class="flex flex-col justify-center items-center lg:items-start mt-4">
                                  <div class="truncate sm:whitespace-normal flex items-center">
                                    <LockIcon class="w-4 h-4 mr-2"/>Type: {{ this.lastBan.type === 0 ? 'Global Ban' : this.lastBan.type === 1 ? 'Comment Ban' : 'Post Ban' }}
                                  </div>
                                  <div class="truncate sm:whitespace-normal flex items-center mt-3">
                                    <AlignLeftIcon class="w-4 h-4 mr-2"/>Reason: {{ this.lastBan.reason }}
                                  </div>
                                  <div class="truncate sm:whitespace-normal flex items-center mt-3">
                                    <ClockIcon class="w-4 h-4 mr-2"/>Until: {{ this.lastBan.ban_until }}
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
          <div
            id="history"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="history-tab"
          >
            <div class="grid grid-cols-12 gap-6 mt-5">
              <div v-if="this.bans.length <= 0" class="intro-y col-span-12">
                <div class="box">
                  <div class="p-5 text-center">
                    <ArchiveIcon class="w-16 h-16 text-theme-1 mx-auto mt-5"/>
                    <div class="text-3xl mt-5">No recent Bans</div>
                    <div class="text-gray-600 mt-2 mb-5">
                      This user have no recent bans!
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-for="ban in this.bans"
                :key="ban.id"
                class="intro-y col-span-12 md:col-span-6"
              >
                <div class="box">
                  <div class="flex flex-col lg:flex-row items-center p-5">
                    <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                      <img
                        alt=""
                        class="rounded-full"
                        :src="ban.staff?.profile_picture ?? require('@/assets/images/avatar.png')"
                      />
                    </div>
                    <div class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                      <a href="" class="font-medium">{{ ban.reason }}</a>
                      <div class="text-gray-600 text-xs mt-0.5">
                        {{ ban.staff?.name ? ban.staff?.name : 'Unknown' }}
                      </div>
                    </div>
                    <div class="lg:ml-2 text-center mt-3 lg:mt-0">
                      <small v-if="ban.active"><span class="px-2 py-1 rounded-full bg-theme-9 text-white mr-1">Active</span></small>
                      <small v-else><span class="px-2 py-1 rounded-full bg-theme-6 text-white mr-1">Closed</span></small>
                    </div>
                    <div class="flex mt-4 lg:mt-0">
                      <router-link :to="{ name: 'admin.ban', params: { 'id': ban.id } }">
                        <button class="btn btn-outline-secondary py-1 px-2">
                          View
                        </button>
                      </router-link>
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
const toast = useToast()

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      user: {},
      staff: {},
      ban: {
        reason: '',
        description: '',
        ban_until: {},
        type: 0
      },
      lastBan: {},
      banCount: {},
      isBanned: false,
      bans: [],
      ban_time: {
        date: '',
        time: ''
      },
      validation_error: {}
    }
  },
  mounted() {
    this.fetchUser(this.$route.params.id)
    this.fetchBans(this.$route.params.id)
    this.staff = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    fetchUser(id) {
      const loader = this.$loading.show()
      axios.get('users/' + id)
        .then(response => {
          this.user = response.data.data
          this.user_role = response.data.data.role.id
          loader.hide()
        })
        .catch(error => {
          loader.hide()
          console.error(error)
        })
    },
    fetchBanCount(id) {
      axios.get('users/' + id + '/bans/count')
        .then(response => {
          this.banCount = response.data.data
        })
    },
    fetchBans(id) {
      this.isBanned = false
      const loader = this.$loading.show()
      axios.get('users/' + id + '/bans?paginate=0')
        .then(response => {
          for (let ban in response.data.data.sort((a, b) => { return new Date(a.created_at) - new Date(b.created_at) })) {
            ban = response.data.data[ban]
            if (ban.active === true) {
              this.isBanned = true
              this.lastBan = ban
            }
          }
          this.bans = response.data.data
          loader.hide()
          this.fetchBanCount(id)
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
    },
    createBan(ban) {
      const loader = this.$loading.show()
      axios.post('users/' + this.$route.params.id + '/bans', {
        reason: ban.reason,
        description: ban.description,
        ban_until: this.ban_time.date + ' ' + this.ban_time.time + ':00',
        type: ban.type
      })
        .then(response => {
          loader.hide()
          toast.success('Ban successfully created')
          this.fetchBans(this.$route.params.id)
        })
        .catch(error => {
          loader.hide()
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
        })
    }
  }
})
</script>
