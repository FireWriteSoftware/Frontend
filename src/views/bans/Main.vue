<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Wiki Bans</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <a href="javascript:;" @click="fetchBans('bans?page=' + pagination.current_page)" class="btn btn-primary btn-sm"><RepeatIcon class="w-4 h-4"></RepeatIcon></a>
        <div class="hidden md:block mx-auto text-gray-600">
          Showing {{ this.pagination.showing_from }} to {{ this.pagination.showing_to }} of {{ this.pagination.total }} entries
        </div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
              v-model="this.search.ban"
            />
            <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
          </div>
        </div>
      </div>
      <!-- BEGIN: Ban Layout -->
      <div
        v-for="ban in this.filteredBans"
        v-bind:key="ban.id"
        class="intro-y col-span-12 md:col-span-6 xl:col-span-4 box"
      >
        <div class="flex items-center border-b border-gray-200 dark:border-dark-5 px-5 py-4">
          <div class="w-10 h-10 flex-none image-fit">
            <img
              alt=""
              class="rounded-full"
              :src="ban.target.profile_picture ?? require('@/assets/images/avatar.png')"
            />
          </div>
          <div class="ml-3 mr-auto">
            <router-link :to="{ name: 'admin.accounts.informations', params: { 'id': ban.target.id }}">
              <a href="javascript:;" class="font-medium">{{ ban.target.name }}</a>
            </router-link>
            <div class="flex text-gray-600 truncate text-xs mt-0.5">
              <a class="text-theme-1 dark:text-theme-10 inline-block truncate">
                {{ ban.type === 0 ? 'Global Ban' : ban.type === 1 ? 'Comment Ban' : 'Post Ban' }}
              </a>
              <span class="mx-1">•</span> {{ ban.created_at }}
            </div>
          </div>
          <div class="dropdown ml-3">
            <a href="javascript:;" class="dropdown-toggle w-5 h-5 text-gray-600 dark:text-gray-300" aria-expanded="false">
              <MoreVerticalIcon class="w-5 h-5"/>
            </a>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <router-link :to="{ name: 'admin.ban', params: { 'id': ban.id }}">
                  <a data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                    <SlashIcon class="w-4 h-4 mr-2"/> View Ban
                  </a>
                </router-link>
                <router-link :to="{ name: 'admin.accounts.informations', params: { 'id': ban.target.id }}">
                  <a data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                    <UserIcon class="w-4 h-4 mr-2"/> View Account
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <a class="block font-medium text-base">
            {{ ban.reason }}
          </a>
          <div class="text-gray-700 dark:text-gray-600 mt-2">
            {{ ban.description }}
          </div>
        </div>
        <div class="px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
          <div class="w-full flex text-gray-600 text-xs sm:text-sm">
            <div class="mr-2">
              Banned by:
              <router-link :to="{ name: 'admin.accounts.informations', params: { 'id': ban?.staff?.id }}" v-if="ban.staff">
                <span class="font-medium">{{ ban?.staff?.name }}</span>
              </router-link>
              <span class="font-medium" v-if="!ban.staff">Unknown</span>
            </div>
            <div class="ml-auto">
              <span v-if="ban.active">Until: <span class="font-medium">{{ ban.ban_until }}</span></span>
              <span v-if="!ban.active"><span class="px-2 py-1 rounded-full bg-theme-9 text-white mr-1">Closed</span></span>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Account Bans -->
      <!-- BEGIN: Datatable Pagination -->
      <div class="intro-y col-span-12 items-center">
        <div class="flex flex-col items-center mt-5">
          <ul class="flex">
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="fetchBans(pagination.first_page_url)">
                <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="fetchBans(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
                <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <a class="font-bold">{{ pagination.current_page }} / {{ pagination.last_page }}</a>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="fetchBans(pagination.next_page_url)" :disabled="!pagination.next_page_url">
                <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="fetchBans(pagination.last_page_url)">
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

export default defineComponent({
  data() {
    return {
      pagination: {},
      search: {
        ban: ''
      },
      bans: []
    }
  },
  computed: {
    filteredBans: function () {
      return this.bans.filter((ban) => {
        return ban?.reason.toLowerCase().match(this.search.ban.toLowerCase()) || ban?.description.toLowerCase().match(this.search.ban.toLowerCase()) || ban?.ban_until.toLowerCase().match(this.search.ban.toLowerCase()) || ban?.staff?.name.toLowerCase().match(this.search.ban.toLowerCase()) || ban?.target?.name.toLowerCase().match(this.search.ban.toLowerCase())
      })
    }
  },
  mounted() {
    this.fetchBans('bans')
  },
  methods: {
    fetchBans(url) {
      const loader = this.$loading.show()
      axios.get(url)
        .then(response => {
          this.bans = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          console.error(error)
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
    }
  }
})
</script>
