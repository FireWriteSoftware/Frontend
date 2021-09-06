<template>
  <div>
    <!-- BEGIN: Create Modal -->
    <div id="create-account-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState" @hide="modalState = false">
      <div class="modal-dialog">
        <form @submit.prevent="handleSubmit">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('accounts.create_account') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-account-modal-username" class="form-label">{{ $t('attributes.username') }}</label>
                <input id="create-account-modal-username" type="text" class="form-control" v-model="account.name"/>
              </div>
              <div class="col-span-6">
                <label for="create-account-modal-firstname" class="form-label">{{ $t('attributes.firstname') }}</label>
                <input id="create-account-modal-firstname" type="text" class="form-control" v-model="account.pre_name"/>
              </div>
              <div class="col-span-6">
                <label for="create-account-modal-lastname" class="form-label">{{ $t('attributes.lastname') }}</label>
                <input id="create-account-modal-lastname" type="text" class="form-control" v-model="account.last_name"/>
              </div>
              <div class="col-span-12">
                <label for="create-account-modal-email" class="form-label">{{ $t('attributes.email') }}</label>
                <input id="create-account-modal-email" type="text" class="form-control" v-model="account.email"/>
              </div>
              <div class="col-span-6">
                <label for="create-account-modal-password" class="form-label">{{ $t('attributes.password') }}</label>
                <input id="create-account-modal-password" type="password" class="form-control" v-model="account.password"/>
              </div>
              <div class="col-span-6">
                <label for="create-account-modal-password_confirmation" class="form-label">{{ $t('attributes.password_confirmation') }}</label>
                <input id="create-account-modal-password_confirmation" type="password" class="form-control" v-model="account.password_confirmation"/>
              </div>
              <div class="col-span-12" v-show="this.validation_error !== null">
                <h5 class="text-lg font-medium mr-auto">{{ $t('messages.following_errors') }}</h5>
                <ul class="list-disc mx-5">
                  <div class="text-theme-6 mt-2 mb-4">
                    <li v-for="error_message in this.validation_error" v-bind:key="error_message">
                      {{ error_message[0] }}
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <!-- END: Modal Body -->
            <!-- BEGIN: Modal Footer -->
            <div class="modal-footer text-right">
              <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                {{ $t('utils.cancel') }}
              </button>
              <button type="submit" class="btn btn-primary w-20">
                {{ $t('utils.create') }}
              </button>
            </div>
            <!-- END: Modal Footer -->
          </div>
        </form>
      </div>
    </div>
    <!-- END: Create Modal -->
    <h2 class="intro-y text-lg font-medium mt-10">{{ $t('accounts.overview') }}</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <a href="javascript:;" data-toggle="modal" data-target="#create-account-modal" class="btn btn-primary" @click="this.modalState = true">{{ $t('accounts.add_account') }}</a>
        <div class="hidden md:block mx-auto text-gray-600">
          {{ $t('utils.dataset_overview', { from: this.pagination.showing_from, to: this.pagination.showing_to, total: this.pagination.total }) }}
        </div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              :placeholder="$t('utils.search')"
              v-model="this.search.account"
              @change="this.fetchAccounts(this.search.account ? 'users?search=' + this.search.account : 'users')"
            />
            <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
          </div>
        </div>
      </div>
      <!-- BEGIN: Users Layout -->
      <div
        v-for="account in this.accounts"
        v-bind:key="account.id"
        class="intro-y col-span-12 md:col-span-6"
      >
        <div class="box">
          <div class="flex flex-col lg:flex-row items-center p-5">
            <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
              <img
                alt=""
                class="rounded-full"
                :src="account.profile_picture ?? require('@/assets/images/avatar.png')"
              />
            </div>
            <div class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
              <router-link :to="{ 'name': 'admin.accounts.informations', 'params': { 'id': account.id }}">
                <a class="font-medium">{{ account?.name }}</a>
              </router-link>
              <div class="text-gray-600 text-xs mt-0.5">
                {{ account.role?.name }}
              </div>
            </div>
            <div class="flex mt-4 lg:mt-0">
              <div class="dropdown">
                <button class="dropdown-toggle btn btn-transparent border-0 shadow-none py-1 px-1 mr-2" aria-expanded="false">
                  <span class="w-5 h-5 flex items-center justify-center">
                    <SettingsIcon class="w-4 h-4"/>
                  </span>
                </button>
                <div class="dropdown-menu w-40">
                  <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                    <router-link :to="{ 'name': 'admin.accounts.informations', 'params': { 'id': account.id }}">
                      <a href="javascript:;" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <Edit2Icon class="w-4 h-4 mr-2"/> {{ $t('utils.edit') }}
                      </a>
                    </router-link>
                    <router-link :to="{ 'name': 'admin.accounts.bans', 'params': { 'id': account.id }}">
                      <a href="javascript:;" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <SlashIcon class="w-4 h-4 mr-2"/> {{ $t('attributes.bans') }}
                      </a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: Users Layout -->
      <!-- BEGIN: Datatable Pagination -->
      <div class="intro-y col-span-12 items-center">
        <div class="flex flex-col items-center mt-5">
          <ul class="flex">
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="this.search.account ? fetchAccounts(pagination.first_page_url + '&search=' + this.search.account) : fetchAccounts(pagination.first_page_url)">
                <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="this.search.account ? fetchAccounts(pagination.prev_page_url + '&search=' + this.search.account) : fetchAccounts(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
                <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <a class="font-bold">{{ $t('utils.pagination', { first: pagination.current_page, last: pagination.last_page }) }}</a>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="this.search.account ? fetchAccounts(pagination.next_page_url + '&search=' + this.search.account) : fetchAccounts(pagination.next_page_url)" :disabled="!pagination.next_page_url">
                <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="this.search.account ? fetchAccounts(pagination.last_page_url + '&search=' + this.search.account) : fetchAccounts(pagination.last_page_url)">
                <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    <!-- END: Datatable Pagination -->
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
      modalState: false,
      pagination: {},
      accounts: [],
      validation_error: null,
      search: {
        account: ''
      },
      account: {
        name: '',
        pre_name: '',
        last_name: '',
        password: '',
        email: '',
        role: {
          name: 'Not set'
        }
      }
    }
  },
  mounted() {
    this.fetchAccounts('users')
  },
  methods: {
    fetchAccounts(url) {
      const loader = this.$loading.show()
      axios.get(url)
        .then(response => {
          this.accounts = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(() => {
          loader.hide()
        })
    },
    makePagination(meta, links) {
      const pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        last_page_url: links.last,
        first_page_url: links.first,
        next_page_url: links.next,
        prev_page_url: links.prev,
        showing_from: meta.from,
        showing_to: meta.to,
        total: meta.total
      }
      this.pagination = pagination
    },
    handleSubmit(e) {
      e.preventDefault()
      if (this.account.password === this.account.password_confirmation && this.account.password.length > 0) {
        const loader = this.$loading.show()
        console.log(this.account)
        axios.post('auth/register', {
          name: this.account.name,
          pre_name: this.account.pre_name,
          last_name: this.account.last_name,
          email: this.account.email,
          password: this.account.password,
          password_confirmation: this.account.password_confirmation
        })
          .then(response => {
            toast.success(response.data.message)
            this.modalState = false
            loader.hide()
            this.fetchAccounts('users?page=' + this.pagination.current_page)
          })
          .catch(error => {
            this.validation_error = error.response.data.data.errors
            toast.error(error.response.data.message)
            loader.hide()
          })
      } else {
        this.account.password = ''
        this.account.password_confirmation = ''
        toast.error(this.$t('messages.passwords_matches'))
        this.validation_error = { password: [this.$t('messages.passwords_matches')] }
      }
    }
  }
})
</script>
