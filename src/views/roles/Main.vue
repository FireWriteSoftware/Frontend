<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8 mb-4">
      <h2 class="text-lg font-medium mr-auto">{{ $t('roles.overview') }}</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <div class="w-56 relative text-gray-700 dark:text-gray-300 mr-3">
          <input
            type="text"
            class="form-control w-56 box pr-10 placeholder-theme-13"
            :placeholder="$t('utils.search')"
            v-model="search.role"
            @change="this.fetchRoles(this.search.role ? 'roles?search=' + this.search.role : 'roles')"
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
        </div>
        <a href="javascript:;" data-toggle="modal" data-target="#create-role-modal" class="btn btn-primary" @click="this.modalState.create = true">{{ $t('roles.add_role') }}</a>
      </div>
    </div>

    <!-- BEGIN: Create Role Modal -->
    <div id="create-role-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState.create" @hide="modalState.create = false">
      <div class="modal-dialog">
        <form @submit.prevent="addRole(this.role)">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('roles.create_role') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-role-modal-name" class="form-label">{{ $t('attributes.name') }}</label>
                <input id="create-role-modal-name" type="text" class="form-control" v-model="role.name"/>
              </div>
              <div class="col-span-12">
                <label for="create-role-modal-description" class="form-label">{{ $t('attributes.description') }}</label>
                <textarea id="create-role-modal-description" class="form-control" rows="5" v-model="role.description"/>
              </div>
              <div class="col-span-12">
                <label for="create-role-modal-color" class="form-label">{{ $t('attributes.color') }}</label>
                <input id="create-role-modal-color" type="color" class="form-control" v-model="role.color"/>
              </div>
              <div class="col-span-12">
                <div class="flex items-center">
                  <div>
                     <a>
                       {{ $t('roles.default_role') }}
                     </a>
                     <div class="text-gray-600">
                       {{ $t('roles.is_default_role') }}
                     </div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" v-model="role.is_default">
                </div>
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
    <!-- END: Create Role Modal -->

    <!-- BEGIN: Edit Role Modal -->
    <div id="edit-role-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState.edit" @hide="modalState.edit = false">
      <div class="modal-dialog">
        <form @submit.prevent="editRole">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('roles.edit_role') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="edit-role-modal-name" class="form-label">{{ $t('attributes.name') }}</label>
                <input id="edit-role-modal-name" type="text" class="form-control" v-model="edit_role.name"/>
              </div>
              <div class="col-span-12">
                <label for="edit-role-modal-description" class="form-label">{{ $t('attributes.description') }}</label>
                <textarea id="edit-role-modal-description" class="form-control" rows="5" v-model="edit_role.description"/>
              </div>
              <div class="col-span-12">
                <label for="edit-role-modal-color" class="form-label">{{ $t('attributes.color') }}</label>
                <input id="edit-role-modal-color" type="color" class="form-control" v-model="edit_role.color"/>
              </div>
              <div class="col-span-12">
                <div class="flex items-center">
                  <div>
                    <a>
                      {{ $t('roles.default_role') }}
                    </a>
                    <div class="text-gray-600">
                      {{ $t('roles.is_default_role') }}
                    </div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" v-model="edit_role.is_default" :checked="edit_role.is_default">
                </div>
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
                {{ $t('utils.save') }}
              </button>
            </div>
            <!-- END: Modal Footer -->
          </div>
        </form>
      </div>
    </div>
    <!-- END: Edit Role Modal -->
    <!-- BEGIN: Datatable -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
        <tr>
          <th class="text-center whitespace-nowrap">#</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.name') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.description') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.color') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.updated_at') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.created_at') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('utils.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="role in this.roles"
          v-bind:key="role.id"
          class="intro-x"
        >

          <td class="text-center">
            {{ role.id }}
          </td>
          <td class="text-center">
            {{ role.name }}
          </td>
          <td class="text-center">
            {{ role.description?.substring(0, 30) }}{{ role.description?.length > 30 ? '...' : '' }}
          </td>
          <td class="text-center">
            <span class="px-3 py-2 rounded-full text-white mr-1" :style="'background: '+ role.color">{{ role.color }}</span>
          </td>
          <td class="text-center">
            {{ this.formatDate(role.updated_at) }}
          </td>
          <td class="text-center">
            {{ this.formatDate(role.created_at) }}
          </td>

          <td class="table-report__action w-56">
            <div class="flex justify-center items-center">
              <router-link :to="{ 'name': 'admin.role.view.preferences', 'params': { id: role.id }}">
                <a href="javascript:;" class="text-small">
                  <EyeIcon class="w-5 h-5 mr-5 hover:text-blue-700"></EyeIcon>
                </a>
              </router-link>
              <a @click="this.edit_role = role; this.modalState.edit = true" class="text-small" href="javascript:;" data-toggle="modal" data-target="#edit-role-modal">
                <edit2-icon class="w-5 h-5 mr-5 hover:text-blue-700"></edit2-icon>
              </a>
              <a href="javascript:;" @click="deleteRole(role.id)" class="text-small">
                <Trash2Icon class="w-5 h-5 hover:text-blue-700"></Trash2Icon>
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Datatable -->
    <!-- BEGIN: Datatable Pagination -->
    <div class="flex flex-col items-center mt-5">
      <ul class="flex">
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="this.search.role ? fetchRoles(pagination.first_page_url + '&search=' + this.search.role) : fetchRoles(pagination.first_page_url)">
            <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" @click="this.search.role ? fetchRoles(pagination.prev_page_url + '&search=' + this.search.role) : fetchRoles(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
            <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <a class="font-bold">{{ $t('utils.pagination', { first: pagination.current_page, last: pagination.last_page }) }}</a>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" @click="this.search.role ? fetchRoles(pagination.next_page_url + '&search=' + this.search.role) : fetchRoles(pagination.next_page_url)" :disabled="!pagination.next_page_url">
            <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="this.search.role ? fetchRoles(pagination.last_page_url + '&search=' + this.search.role) : fetchRoles(pagination.last_page_url)">
            <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
          </button>
        </li>
      </ul>
    </div>
    <!-- END: Datatable Pagination -->
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
      modalState: {
        create: false,
        edit: false
      },
      roles: [],
      edit_role: {},
      role: {
        name: 'New Role',
        description: null,
        color: '#000000',
        is_default: 0
      },
      search: {
        role: ''
      },
      pagination: {},
      validation_error: null
    }
  },
  mounted() {
    this.fetchRoles('roles')
  },
  methods: {
    fetchRoles(page) {
      const loader = this.$loading.show()
      axios.get(page)
        .then(response => {
          this.roles = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
      return this.roles
    },
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
    deleteRole(id) {
      const loader = this.$loading.show()
      axios.delete('roles/' + id)
        .then(response => {
          this.fetchRoles('roles?page=' + this.pagination.current_page)
          toast.success('Role successfully deleted')
          loader.hide()
        })
        .catch(error => {
          toast.error(error.response.data.message)
          this.validation_error = error.response.data.data.errors
          loader.hide()
        })
    },
    addRole(role) {
      const loader = this.$loading.show()
      axios.post('roles', {
        name: role.name,
        description: role.description,
        color: role.color,
        is_default: role.is_default
      })
        .then(response => {
          toast.success('Role was created successfully')
          loader.hide()
          this.modalState.create = false
          this.fetchRoles('roles?page=' + this.pagination.current_page)
        })
        .catch(error => {
          toast.error(error.response.data.message)
          this.validation_error = error.response.data.data.errors
          loader.hide()
        })
    },
    editRole() {
      const loader = this.$loading.show()

      axios.put('roles/' + this.edit_role.id, {
        name: this.edit_role.name,
        description: this.edit_role.description,
        color: this.edit_role.color,
        is_default: !!this.edit_role.is_default
      })
        .then(response => {
          toast.success('Role was successfully edited')
          loader.hide()
          this.modalState.edit = false
          this.fetchRoles('roles?page=' + this.pagination.current_page)
        })
        .catch(error => {
          toast.error(error.response.data.message)
          this.validation_error = error.response.data.data.errors
          console.log(this.validation_error)
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
