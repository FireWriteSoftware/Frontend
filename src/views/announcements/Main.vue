<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Announcements</h2>
    <!-- BEGIN: Create Announcement Modal -->
    <div id="create-announcement-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState.create" @hide="modalState.create = false">
      <div class="modal-dialog">
        <form @submit.prevent="addAnnouncement(this.announcement)">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Create a new Announcement
              </h2>
            </div>
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-announcement-modal-name" class="form-label">Title</label>
                <input id="create-announcement-modal-name" type="text" class="form-control" placeholder="Your Title" v-model="announcement.title"/>
              </div>
              <div class="col-span-12">
                <label for="create-announcement-modal-description" class="form-label">Description</label>
                <textarea id="create-announcement-modal-description" class="form-control" placeholder="Your Content" v-model="announcement.description"/>
              </div>
              <div class="col-span-12" v-show="this.validation_error !== null">
                <h5 class="text-lg font-medium mr-auto">The following errors have occurred</h5>
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
                Cancel
              </button>
              <button type="submit" class="btn btn-primary w-20">
                Create
              </button>
            </div>
            <!-- END: Modal Footer -->
          </div>
        </form>
      </div>
    </div>
    <!-- END: Create Tag Modal -->
    <!-- BEGIN: Edit Announcement Modal -->
    <div id="edit-announcement-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="edit-role-modal" v-show="modalState.edit" @hide="modalState.edit = false">
      <div class="modal-dialog">
        <form @submit.prevent="updateAnnouncement()">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Edit a Announcement
              </h2>
            </div>
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="edit-announcement-modal-name" class="form-label">Title</label>
                <input id="edit-announcement-modal-name" type="text" class="form-control" placeholder="Your Title" v-model="edit_announcement.title"/>
              </div>
              <div class="col-span-12">
                <label for="edit-announcement-modal-description" class="form-label">Description</label>
                <textarea id="edit-announcement-modal-description" class="form-control" placeholder="Your Content" v-model="edit_announcement.description"/>
              </div>
              <div class="col-span-12" v-show="this.validation_error !== null">
                <h5 class="text-lg font-medium mr-auto">The following errors have occurred</h5>
                <ul class="list-disc mx-5">
                  <div class="text-theme-6 mt-2 mb-4">
                    <li v-for="error_message in this.validation_error" v-bind:key="error_message">
                      {{ error_message[0] }}
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div class="modal-footer text-right">
              <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary w-20">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- END: Edit Announcement Modal -->
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <a
          href="javascript:;"
          class="btn btn-primary btn-sm mr-2"
          data-toggle="modal"
          data-target="#create-announcement-modal"
          @click="modalState.create = true"
        >
          <PlusIcon class="w-4 h-4"></PlusIcon>
        </a>
        <a
          href="javascript:;"
          @click="fetchAnnouncements('announcements?page=' + pagination.current_page)"
          class="btn btn-primary btn-sm"
        >
          <RepeatIcon class="w-4 h-4"></RepeatIcon>
        </a>

        <div class="hidden md:block mx-auto text-gray-600">
          Showing {{ this.pagination.showing_from }} to {{ this.pagination.showing_to }} of {{ this.pagination.total }} entries
        </div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
              v-model="this.search.announcement"
            />
            <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
          </div>
        </div>
      </div>
      <!-- BEGIN: Ban Layout -->
      <div
        v-for="announce in this.filteredAnnouncements"
        v-bind:key="announce.id"
        class="intro-y col-span-12 md:col-span-6 xl:col-span-4 box"
      >
        <!-- BEGIN: Announcements -->
        <div class="flex items-center border-b border-gray-200 dark:border-dark-5 px-5 py-4">
          <div class="w-10 h-10 flex-none image-fit">
            <img
              alt=""
              class="rounded-full"
              :src="announce.user.profile_picture ?? require('@/assets/images/avatar.png')"
            />
          </div>
          <div class="ml-3 mr-auto">
            <router-link :to="{ name: 'admin.accounts.informations', params: { 'id': announce.id }}">
              <a href="javascript:;" class="font-medium">{{ announce.user.name }}</a>
            </router-link>
            <div class="flex text-gray-600 truncate text-xs mt-0.5">
              <a class="text-theme-1 dark:text-theme-10 inline-block truncate">
                {{ announce.user.role?.name }}
              </a>
              <span class="mx-1">•</span> {{ announce.created_at }}
            </div>
          </div>
          <div class="dropdown ml-3">
            <a href="javascript:;" class="dropdown-toggle w-5 h-5 text-gray-600 dark:text-gray-300" aria-expanded="false">
              <MoreVerticalIcon class="w-5 h-5"/>
            </a>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <a href="javascript:;"
                   data-dismiss="dropdown"
                   data-toggle="modal"
                   data-target="#edit-announcement-modal"
                   class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                   @click="this.edit_announcement = announce; modalState.edit = true"
                >
                  <EditIcon class="w-4 h-4 mr-2"/> Edit
                </a>
                <a href="javascript:;"
                   @click="deleteAnnouncement(announce.id)"
                   data-dismiss="dropdown"
                   class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                  <Trash2Icon class="w-4 h-4 mr-2"/> Delete
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <a class="block font-medium text-base">
            {{ announce.title }}
          </a>
          <div class="text-gray-700 dark:text-gray-600 mt-2">
            {{ announce.description }}
          </div>
        </div>
        <div class="px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
          <div class="w-full flex text-gray-600 text-xs sm:text-sm">
            <div class="mr-2">
              Last update: <span class="font-medium">{{ announce.updated_at }}</span>
            </div>
          </div>
        </div>
      <!-- END: Announcements -->
      </div>
      <!-- BEGIN: Datatable Pagination -->
      <div class="intro-y col-span-12 items-center">
        <div class="flex flex-col items-center mt-5">
          <ul class="flex">
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="fetchAnnouncements(pagination.first_page_url)">
                <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="fetchAnnouncements(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
                <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <a class="font-bold">{{ pagination.current_page }} / {{ pagination.last_page }}</a>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="fetchAnnouncements(pagination.next_page_url)" :disabled="!pagination.next_page_url">
                <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="fetchAnnouncements(pagination.last_page_url)">
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
      pagination: {},
      announcements: [],
      announcement: {
        title: 'New Title',
        description: 'New Description'
      },
      search: {
        announcement: ''
      },
      edit_announcement: {
        title: 'New Title',
        description: 'New Description'
      },
      validation_error: null,
      modalState: {
        create: false,
        edit: false
      }
    }
  },
  mounted() {
    this.fetchAnnouncements('announcements')
  },
  computed: {
    filteredAnnouncements: function () {
      return this.announcements.filter((announcement) => {
        return announcement?.title.toLowerCase().match(this.search.announcement.toLowerCase()) || announcement?.description.toLowerCase().match(this.search.announcement.toLowerCase()) || announcement?.user?.name.toLowerCase().match(this.search.announcement.toLowerCase()) || announcement?.created_at.toLowerCase().match(this.search.announcement.toLowerCase()) || announcement?.updated_at.toLowerCase().match(this.search.announcement.toLowerCase())
      })
    }
  },
  methods: {
    fetchAnnouncements(url) {
      const loader = this.$loading.show()
      axios.get(url)
        .then(response => {
          this.announcements = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          console.log(error)
          loader.hide()
        })
    },
    deleteAnnouncement(id) {
      const loader = this.$loading.show()
      axios.delete('announcements/' + id)
        .then(response => {
          toast.success('Announcement successfully deleted')
          loader.hide()
          this.fetchAnnouncements('announcements?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    addAnnouncement(announcement) {
      const loader = this.$loading.show()
      axios.post('announcements', {
        title: announcement.title,
        description: announcement.description
      })
        .then(response => {
          toast.success('Announcement added successfully')
          this.modalState.create = false
          loader.hide()
          this.fetchAnnouncements('announcements?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    updateAnnouncement() {
      const loader = this.$loading.show()
      axios.put('announcements/' + this.edit_announcement.id, {
        title: this.edit_announcement.title,
        description: this.edit_announcement.description
      })
        .then(response => {
          toast.success('Announcement updated successfully')
          this.modalState.edit = false
          loader.hide()
          this.fetchAnnouncements('announcements?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
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
