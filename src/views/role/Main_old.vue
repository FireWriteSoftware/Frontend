<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Edit Role</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button type="button" @click="editRole" class="btn box text-gray-700 dark:text-gray-300 mr-2 flex items-center ml-auto sm:ml-0">
          <SaveIcon class="w-4 h-4 mr-2"/> Save
        </button>
        <div class="dropdown">
          <button
            class="dropdown-toggle btn btn-primary shadow-md flex items-center"
            aria-expanded="false"
          >
            <SettingsIcon class="w-4 h-4 mr-2"></SettingsIcon> Settings <ChevronDownIcon class="w-4 h-4 ml-2" />
          </button>
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <a href="#" @click="deleteRole" aria-expanded="false" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                <Trash2Icon class="w-4 h-4 mr-2"/> Delete Role
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Role Content -->
      <div class="intro-y col-span-12 lg:col-span-9">
        <div class="intro-y">
          <div class="box p-2">
            <div class="pos__tabs nav nav-tabs justify-center" role="tablist">
              <a
                id="content-tab"
                data-toggle="tab"
                data-target="#content"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center active"
                role="tab"
                aria-controls="content"
                aria-selected="true"
              >
                Content
              </a>
              <a
                id="permissions-tab"
                data-toggle="tab"
                data-target="#permissions"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="permissions"
                aria-selected="false"
              >
                Permissions
              </a>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div
            id="content"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="content-tab"
          >
            <div class="box p-5 mt-5">
              <!-- BEGIN: Role Title/Color -->
              <div class="grid lg:grid-cols-2 gap-6 my-5">
                <div class="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1 dark:border-dark-5">
                  <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                    <p>
                      <label for="name" class="bg-white text-gray-600 px-1 dark:bg-dark-3 dark:text-gray-300">Name</label>
                    </p>
                  </div>
                  <p>
                    <input id="name" autocomplete="false" tabindex="0" type="text" class="py-1 px-1 text-gray-900 outline-none block h-full w-full dark:bg-dark-5 dark:text-gray-300" v-model="role.name">
                  </p>
                </div>
                <div class="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1 dark:border-dark-5">
                  <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                    <p>
                      <label for="color" class="bg-white text-gray-600 px-1 dark:bg-dark-3 dark:text-gray-300">Color</label>
                    </p>
                  </div>
                  <p>
                    <input id="color" autocomplete="false" tabindex="0" type="color" class="py-1 px-1 outline-none block h-full w-full dark:bg-dark-5 dark:text-gray-300" v-model="role.color">
                  </p>
                </div>
              </div>
              <!-- END: Role Title/Color -->
              <br>
              <!-- BEGIN: Role Description -->
              <div class="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1 mb-5 dark:border-dark-5">
                <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                  <p>
                    <label class="bg-white text-gray-600 px-1 dark:bg-dark-3 dark:text-gray-300">Description</label>
                  </p>
                </div>
                <p>
                  <textarea autocomplete="false" tabindex="0" class="py-1 px-1 text-gray-900 outline-none block h-full w-full dark:bg-dark-5 dark:text-gray-300" v-model="role.description"></textarea>
                </p>
              </div>
              <!-- END: Role Description -->
              <br>
              <!-- BEGIN: Role Description -->
              <div class="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1 mb-5 dark:border-dark-5">
                <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                  <p>
                    <label class="bg-white text-gray-600 px-1 dark:bg-dark-3 dark:text-gray-300">Default Role</label>
                  </p>
                </div>
                <div class="flex items-center">
                  <div>
                    <div class="text-gray-600">
                      Is the role a default user role?
                    </div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" v-model="role.is_default">
                </div>
              </div>
              <!-- END: Role Description -->
            </div>
          </div>
          <div
            id="permissions"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="permissions-tab"
          >
            <div class="box p-5 mt-5">
              <!-- BEGIN: Permission Tab -->
              <div class="grid lg:grid-cols-1 gap-6 my-5">
                <!-- BEGIN: Table Buttons -->
                <div class="intro-y flex flex-col sm:flex-row items-center">
                  <h2 class="text-lg font-medium mr-auto">Permissions</h2>
                </div>
                <!-- END: Table Buttons -->
                <!-- BEGIN: Datatable -->
                <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                  <table class="table table-report -mt-2">
                    <thead>
                    <tr>
                      <th class="text-center whitespace-nowrap">#</th>
                      <th class="text-center whitespace-nowrap">NAME</th>
                      <th class="text-center whitespace-nowrap">CREATOR</th>
                      <th class="text-center whitespace-nowrap">LAST UPDATE</th>
                      <th class="text-center whitespace-nowrap">CREATED AT</th>
                      <th class="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                      v-for="permission in role_permissions"
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
                        {{ permission.user.name }}
                      </td>
                      <td class="text-center">
                        {{ this.formatDate(permission.updated_at) }}
                      </td>
                      <td class="text-center">
                        {{ this.formatDate(permission.created_at) }}
                      </td>

                      <td class="table-report__action w-56">
                        <div class="flex justify-center items-center">
                          <a class="text-small" href="javascript:;" @click="deletePermission(permission)">
                            <Trash2Icon class="hover:text-blue-700"></Trash2Icon>
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
                      <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="fetchPagePermissions(pagination.first_page_url)">
                        <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
                      </button>
                    </li>
                    <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                      <button class="flex items-center font-bold" @click="fetchPagePermissions(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
                        <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
                      </button>
                    </li>
                    <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                      <a class="font-bold">{{ pagination.current_page }} / {{ pagination.last_page }}</a>
                    </li>
                    <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                      <button class="flex items-center font-bold" @click="fetchPagePermissions(pagination.next_page_url)" :disabled="!pagination.next_page_url">
                        <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
                      </button>
                    </li>
                    <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                      <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="fetchPagePermissions(pagination.last_page_url)">
                        <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- END: Datatable Pagination -->
              <!-- END: Permission Tab -->
            </div>
          </div>
        </div>
      </div>
      <!-- END: Role Content -->
      <!-- BEGIN: Role Info -->
      <div class="col-span-12 lg:col-span-3">
        <div class="box p-5">
          <div class="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
            <div>
              <div class="text-gray-600">Role ID</div>
              <div class="mt-1">{{ this.role?.id ?? 'Unknown' }}</div>
            </div>
            <ShieldIcon class="w-4 h-4 text-gray-600 ml-auto" />
          </div>
          <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
            <div>
              <div class="text-gray-600">Created by</div>
              <div class="mt-1">{{ this.role?.user?.name ?? 'Unknown' }}</div>
            </div>
            <UserIcon class="w-4 h-4 text-gray-600 ml-auto" />
          </div>
          <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
            <div>
              <div class="text-gray-600">Created at</div>
              <div class="mt-1">{{ this.role.created_at ? formatDate(this.role.created_at) : 'Unknown' }}</div>
            </div>
            <PlusCircleIcon class="w-4 h-4 text-gray-600 ml-auto" />
          </div>
          <div class="flex items-center pt-5">
            <div>
              <div class="text-gray-600">Updated at</div>
              <div class="mt-1">{{ this.role.updated_at ? formatDate(this.role.updated_at) : 'Unknown' }}</div>
            </div>
            <ClockIcon class="w-4 h-4 text-gray-600 ml-auto" />
          </div>
        </div>
        <!-- END: Role Info -->
        <!-- END: Add Permissions -->
        <div class="box p-5 mt-5">
          <form @submit.prevent="addPermission">
            <label>Add Permission</label>
            <div class="mt-2">
              <TailSelect
                v-model="newPermission"
                :options="{
                  search: true,
                  classNames: 'w-full'
                }"
              >
                <option :value="permission.id" v-for="permission in this.selectable_permissions" v-bind:key="permission.id">{{ permission?.name }}</option>
              </TailSelect>
            </div>
            <button type="submit" class="btn btn-primary btn-sm w-20 mt-3">
              Save
            </button>
          </form>
        </div>
        <!-- END: Add Permission -->
      </div>
      <!-- END: Role Info -->
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
      role: {},
      role_permissions: [],
      page_role_permissions: [],
      all_permissions: [],
      all_role_permissions: [],
      selectable_permissions: [],
      pagination: {},
      validation_error: {},
      newPermission: null
    }
  },
  mounted() {
    this.fetchRole(this.$route.params.id)
    this.fetchPagePermissions('roles/' + this.$route.params.id + '/permissions')
    this.fetchPermissions()
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
    deleteRole() {
      const loader = this.$loading.show()
      axios.delete('roles/' + this.role.id)
        .then(response => {
          toast.success('Role deleted successfully')
          loader.hide()
          this.$router.push({ name: 'admin.roles' })
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    editRole() {
      const loader = this.$loading.show()
      axios.put('roles/' + this.role.id, {
        name: this.role.name,
        description: this.role.description,
        color: this.role.color
      })
        .then(response => {
          toast.success('Role edited successfully')
          loader.hide()
          this.fetchRole(this.role.id)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    fetchRole(id) {
      const loader = this.$loading.show()
      axios.get('roles/' + id)
        .then(response => {
          this.role = response.data.data
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
          this.$router.push({ name: 'admin.roles' })
        })
    },
    fetchPagePermissions(page) {
      const loader = this.$loading.show()
      axios.get(page)
        .then(response => {
          this.role_permissions = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
    },
    deletePermission(permission) {
      const loader = this.$loading.show()
      axios.post('roles/' + this.$route.params.id + '/permissions/' + permission.id + '/detach')
        .then(response => {
          loader.hide()
          toast.success('Permission removed successfully')
          this.fetchPagePermissions('roles/' + this.$route.params.id + '/permissions')
          this.fetchRolePermissions()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    fetchPermissions() {
      axios.get('permissions?paginate=0')
        .then(response => {
          this.all_permissions = response.data
          this.fetchRolePermissions()
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchRolePermissions() {
      axios.get('roles/' + this.$route.params.id + '/permissions?paginate=0')
        .then(response => {
          this.all_role_permissions = response.data.data
          this.fetchSelectablePermissions()
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchSelectablePermissions() {
      this.selectable_permissions = this.all_permissions.filter(all => !this.all_role_permissions.map(rolePerm => rolePerm.id).includes(all.id))
    },
    addPermission() {
      const loader = this.$loading.show()
      axios.post('roles/' + this.$route.params.id + '/permissions/' + this.newPermission + '/attach')
        .then(response => {
          toast.success('Permission successfully added')
          this.newPermission = null
          loader.hide()
          this.fetchPagePermissions('roles/' + this.$route.params.id + '/permissions')
          this.fetchRolePermissions()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error('No permission selected')
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
