<template>
  <div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <a class="btn btn-primary shadow-md mr-2" data-toggle='modal' data-target='#create-badge-modal' @click="modalState.create = true">Add new Badge</a>

        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
              v-model='search.badges'
              @change="this.fetchBadges(this.search.badges ? 'badges?search=' + this.search.badges : 'badges')"
            />
            <SearchIcon
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
          <tr>
            <th class="text-center whitespace-nowrap">TITLE</th>
            <th class="text-center whitespace-nowrap">ICON</th>
            <th class="text-center whitespace-nowrap">RELATION</th>
            <th class="text-center whitespace-nowrap">CREATOR</th>
            <th class="text-center whitespace-nowrap">CREATED AT</th>
            <th class="text-center whitespace-nowrap">LAST UPDATE</th>
            <th class="text-center whitespace-nowrap">ACTIONS</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="badge in badges"
            :key="badge.id"
            class="intro-x"
          >
            <td class="text-center">
              <div class="font-medium whitespace-nowrap">
                {{ badge.title }}
              </div>
              <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                {{ badge.description.substring(0, 15) }}{{ badge.description?.length > 15 ? '...' : '' }}
              </div>
            </td>

            <td class="text-center" :style="'color: ' + badge.color + ';'">
              <component :is='badge.icon'></component>
            </td>

            <td class="text-center">
              <p v-if='badge.is_role_badge === 1'>{{ badge.role.name }}</p>
              <p v-else>--</p>
            </td>

            <td class="text-center">
              {{ badge.user.name }}
            </td>

            <td class="text-center">
              {{ this.formatDate(badge.created_at) }}
            </td>

            <td class="text-center">
              {{ this.formatDate(badge.updated_at) }}
            </td>

            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <a
                  v-on:click='this.editModal = badge; modalState.edit = true'
                  href='javascript:;'
                  data-toggle='modal'
                  data-target='#edit-badge-modal'
                  class="text-small">
                  <edit2-icon class="w-5 h-5 mr-5 hover:text-blue-700"></edit2-icon>
                </a>
                <a
                  v-on:click='this.deleteModal = badge'
                  href='javascript:;'
                  data-toggle="modal"
                  data-target="#delete-confirmation-modal"
                  class="text-small">
                  <Trash2Icon class="w-5 h-5 hover:text-blue-700"></Trash2Icon>
                </a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Datatable Pagination -->
      <div class="flex flex-col col-span-12 items-center mt-5">
        <ul class="flex">
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="this.search.badges ? fetchBadges(pagination.first_page_url + '&search=' + this.search.badges) : fetchBadges(pagination.first_page_url)">
              <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
            </button>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" @click="this.search.badges ? fetchBadges(pagination.prev_page_url + '&search=' + this.search.badges) : fetchBadges(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
              <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
            </button>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <a class="font-bold">Page {{ pagination.current_page }} / {{ pagination.last_page }}</a>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" @click="this.search.badges ? fetchBadges(pagination.next_page_url + '&search=' + this.search.badges) : fetchBadges(pagination.next_page_url)" :disabled="!pagination.next_page_url">
              <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
            </button>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="this.search.badges ? fetchBadges(pagination.last_page_url + '&search=' + this.search.badges) : fetchBadges(pagination.last_page_url)">
              <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
            </button>
          </li>
        </ul>
      </div>
      <!-- END: Datatable Pagination -->
    </div>

    <!-- BEGIN: Delete Confirmation Modal -->
    <div
      id="delete-confirmation-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon
                class="w-16 h-16 text-theme-6 mx-auto mt-3"
                v-on:click='this.deleteModal = {}'
              />

              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete this record? <br />This process
                cannot be undone.
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-24 mr-1"
                v-on:click='this.deleteModal = {}'
              >
                Cancel
              </button>
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-danger w-24"
                v-on:click='this.deleteBadge(this.deleteModal.id)'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Edit Badge Modal -->
    <div id="edit-badge-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="edit-badge-modal" v-show="modalState.edit" @hide="modalState.edit = false">
      <div class="modal-dialog">
        <form @submit.prevent="editBadge">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Edit a Badge
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="edit-badge-modal-name" class="form-label">Title</label>
                <input id="edit-badge-modal-name" type="text" class="form-control" placeholder="Your Name" v-model="editModal.title"/>
              </div>
              <div class="col-span-12">
                <label for="edit-badge-modal-description" class="form-label">Description</label>
                <textarea id="edit-badge-modal-description" class="form-control" placeholder="Your Description" v-model="editModal.description"/>
              </div>
              <div class="col-span-12">
                <label for="edit-badge-modal-color" class="form-label">Color</label>
                <input id="edit-badge-modal-color" type="color" class="form-control" v-model="editModal.color"/>
              </div>
              <div class="col-span-12">
                <label for="edit-badge-modal-icon" class="form-label">Icon</label>
                <input id="edit-badge-modal-icon" type="text" class="form-control" placeholder="Icon Name" v-model="editModal.icon"/>
              </div>
              <div class="col-span-12">
                <div class="flex items-center mt-3">
                  <div>
                    <a href="" class="font-medium">Is role badge?</a>
                    <div class="text-gray-600">A role badge is connected to a role</div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" :checked="editModal.is_role_badge" v-model="editModal.is_role_badge">
                </div>
                <div class="col-span-12" v-if="editModal.is_role_badge">
                  <hr class="my-5">
                  <label class="form-label">Role</label>

                  <TailSelect
                    v-model="this.editModal.role_id"
                    :class="'form-control' + (this.validation_error?.role_id != null ? ' border-theme-6' : '')"
                    :options="{
                      search: true,
                      classNames: 'w-full'
                    }"
                  >
                    <option :value="role.id" v-for="role in this.roles" v-bind:key="role.id" :selected="role.id === this.editModal.role?.id">{{ role.name }}</option>
                  </TailSelect>
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
            </div>
            <!-- END: Modal Body -->
            <!-- BEGIN: Modal Footer -->
            <div class="modal-footer text-right">
              <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary w-20">
                Save
              </button>
            </div>
            <!-- END: Modal Footer -->
          </div>
        </form>
      </div>
    </div>
    <!-- END: Edit Badge Modal -->

    <!-- BEGIN: Create Badge Modal -->
    <div id="create-badge-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="create-badge-modal" v-show="modalState.create" @hide="modalState.create = false">
      <div class="modal-dialog">
        <form @submit.prevent="createBadge">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Create a new Badge
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-badge-modal-name" class="form-label">Title</label>
                <input id="create-badge-modal-name" type="text" class="form-control" placeholder="Your Name" v-model="createModal.title"/>
              </div>
              <div class="col-span-12">
                <label for="create-badge-modal-description" class="form-label">Description</label>
                <textarea id="create-badge-modal-description" class="form-control" placeholder="Your Description" v-model="createModal.description"/>
              </div>
              <div class="col-span-12">
                <label for="create-badge-modal-color" class="form-label">Color</label>
                <input id="create-badge-modal-color" type="color" class="form-control" v-model="createModal.color"/>
              </div>
              <div class="col-span-12">
                <label for="create-badge-modal-icon" class="form-label">Icon</label>
                <input id="create-badge-modal-icon" type="text" class="form-control" placeholder="Icon Name" v-model="createModal.icon"/>
              </div>
              <div class="col-span-12">
                <div class="flex items-center mt-3">
                  <div>
                    <a href="" class="font-medium">Is role badge?</a>
                    <div class="text-gray-600">A role badge is connected to a role</div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" :checked="createModal.is_role_badge" v-model="createModal.is_role_badge">
                </div>
                <div class="col-span-12" v-if="createModal.is_role_badge">
                  <hr class="my-5">
                  <label class="form-label">Role</label>

                  <TailSelect
                    v-model="this.createModal.role_id"
                    :class="'form-control' + (this.validation_error?.role_id != null ? ' border-theme-6' : '')"
                    :options="{
                      search: true,
                      classNames: 'w-full'
                    }"
                  >
                    <option :value="role.id" v-for="role in this.roles" v-bind:key="role.id">{{ role.name }}</option>
                  </TailSelect>
                </div>
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
    <!-- END: Create Badge Modal -->
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
      badges: [],
      pagination: {
        links: {},
        meta: {}
      },
      search: {
        badges: ''
      },
      deleteModal: {},
      editModal: {},
      roles: [],
      validation_error: null,
      modalState: {
        create: false,
        edit: false
      },
      createModal: {
        title: '',
        description: '',
        icon: '',
        color: '#000000',
        is_role_badge: 0,
        role_id: 0
      }
    }
  },
  mounted() {
    this.fetchBadges('badges')
    this.fetchRoles()
  },
  methods: {
    makePagination(meta, links) {
      const pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        last_page_url: links.last,
        first_page_url: links.first,
        next_page_url: links.next,
        prev_page_url: links.prev
      }
      this.pagination = pagination
    },
    fetchBadges(page) {
      axios.get(page, {
        params: {
          per_page: this.per_page
        }
      })
        .then((response) => {
          this.badges = response.data.data
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchRoles() {
      axios.get('roles')
        .then((response) => {
          this.roles = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    createBadge() {
      axios.post('badges', {
        title: this.createModal.title,
        description: this.createModal.description,
        color: this.createModal.color,
        icon: this.createModal.icon,
        is_role_badge: this.createModal.is_role_badge,
        role_id: this.createModal.role_id
      })
        .then(response => {
          toast.success('Badge successfully added')
          this.modalState.create = false
          this.fetchBadges('badges?page=' + this.pagination.meta.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
        })

      this.createModal = {}
    },
    editBadge() {
      axios.put('badges/' + this.editModal.id, {
        title: this.editModal.title,
        description: this.editModal.description,
        color: this.editModal.color,
        icon: this.editModal.icon,
        is_role_badge: this.editModal.is_role_badge,
        role_id: this.editModal?.role?.id
      })
        .then(response => {
          toast.success('Badge successfully edited')
          this.modalState.edit = false
          this.editModal = {}
          this.fetchBadges('badges?page=' + this.pagination.meta.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
        })
    },
    deleteBadge(id) {
      axios.delete('badges/' + id)
        .then(response => {
          toast.success('Badge successfully deleted')
          this.fetchBadges('badges?page=' + this.pagination.meta.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
        })
      this.deleteModal = {}
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
