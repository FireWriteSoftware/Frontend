<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8 mb-4">
      <h2 class="text-lg font-medium mr-auto">{{ $t('permissions.overview') }}</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <div class="w-56 relative text-gray-700 dark:text-gray-300 mr-3">
          <input
            type="text"
            class="form-control w-56 box pr-10 placeholder-theme-13"
            :placeholder="$t('utils.search')"
            v-model="this.search.permission"
            @change="this.fetchPermissions(this.search.permission ? 'permissions?search=' + this.search.permission : 'permissions')"
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
        </div>
        <a href="javascript:;" data-toggle="modal" data-target="#create-permission-modal" class="btn btn-primary" @click="this.modalState.create = true">{{ $t('permissions.add_permission') }}</a>
      </div>
    </div>
    <!-- BEGIN: Create Permission Modal -->
    <div id="create-permission-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState.create" @hide="modalState.create = false">
      <div class="modal-dialog">
        <form @submit.prevent="createPermission(this.permission)">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('permissions.create_permission') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-permission-modal-name" class="form-label">{{ $t('attributes.name') }}</label>
                <input id="create-permission-modal-name" type="text" class="form-control" v-model="permission.name"/>
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
    <!-- END: Create Permission Modal -->
    <!-- BEGIN: Edit Permission Modal -->
    <div id="edit-permission-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="edit-permission-modal" v-show="modalState.edit" @hide="modalState.edit = false">
      <div class="modal-dialog">
        <form @submit.prevent="editPermission">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('permissions.edit_permission') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="edit-permission-modal-name" class="form-label">{{ $t('attributes.name') }}</label>
                <input id="edit-permission-modal-name" type="text" class="form-control" v-model="edit_permission.name"/>
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
    <!-- END: Edit Permission Modal -->
    <!-- BEGIN: Datatable -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
        <tr>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.id') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.name') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.created_at') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('attributes.updated_at') }}</th>
          <th class="text-center whitespace-nowrap">{{ $t('utils.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="permission in this.permissions"
          v-bind:key="permission.id"
          class="intro-x"
        >
          <td class="text-center">
            {{ permission.id }}
          </td>
          <td class="text-center">
            {{ permission.name }}
          </td>
          <td class="text-center">
            {{ this.formatDate(permission.created_at) }}
          </td>
          <td class="text-center">
            {{ this.formatDate(permission.updated_at) }}
          </td>
          <td class="table-report__action w-56">
            <div class="flex justify-center items-center">
              <a href="javascript:;" @click="this.edit_permission = permission; this.modalState.edit = true" data-toggle="modal" data-target="#edit-permission-modal" class="text-small">
                <edit2-icon class="mr-5 hover:text-blue-700"></edit2-icon>
              </a>
              <Trash2Icon class="hover:text-blue-700" @click="deletePermission(permission.id)"></Trash2Icon>
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
          <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="this.search.permission ? fetchPermissions(pagination.first_page_url + '&search=' + this.search.permission) : fetchPermissions(pagination.first_page_url)">
            <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" @click="this.search.permission ? fetchPermissions(pagination.prev_page_url + '&search=' + this.search.permission) : fetchPermissions(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
            <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <a class="font-bold">{{ $t('utils.pagination', { first: pagination.current_page, last: pagination.last_page }) }}</a>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" @click="this.search.permission ? fetchPermissions(pagination.next_page_url + '&search=' + this.search.permission) : fetchPermissions(pagination.next_page_url)" :disabled="!pagination.next_page_url">
            <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="this.search.permission ? fetchPermissions(pagination.last_page_url + '&search=' + this.search.permission) : fetchPermissions(pagination.last_page_url)">
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
      permissions: [],
      edit_permission: {},
      permission: {
        name: 'new_permission'
      },
      search: {
        permission: ''
      },
      pagination: {},
      validation_error: null,
      modalState: {
        create: false,
        edit: false
      }
    }
  },
  mounted() {
    this.fetchPermissions('permissions')
  },
  methods: {
    fetchPermissions(page) {
      const loader = this.$loading.show()
      axios.get(page)
        .then(response => {
          this.permissions = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
      return this.permissions
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
    deletePermission(id) {
      const loader = this.$loading.show()
      axios.delete('permissions/' + id)
        .then(response => {
          toast.success(response.data.message)
          loader.hide()
          this.fetchPermissions('permissions?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    createPermission(permission) {
      const loader = this.$loading.show()
      axios.post('permissions', {
        name: permission.name
      })
        .then(response => {
          toast.success(response.data.message)
          loader.hide()
          this.modalState.create = false
          this.fetchPermissions('permissions?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    editPermission() {
      const loader = this.$loading.show()
      axios.put('permissions/' + this.edit_permission.id, {
        name: this.edit_permission.name
      })
        .then(response => {
          toast.success(response.data.message)
          loader.hide()
          this.modalState.edit = false
          this.fetchPermissions('permissions?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
