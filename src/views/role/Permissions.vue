<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Edit Role</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
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
    <!-- BEGIN: Header -->
    <Header :role="this.role"></Header>
    <!-- END: Header -->
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <div class="intro-y col-span-12 lg:col-span-9">
        <div class="box p-5" v-show="!this.all_permissions.length > 0">
          <div class="p-5 text-center">
            <div class="mx-auto mt-5 w-80">
              <img alt="" :src="require(`@/assets/images/loading-data-illustration.svg`)"/>
            </div>
            <div class="text-3xl mt-5">Please be patient</div>
            <div class="text-gray-600 mt-2 mb-5">
              The content is about to be loaded
            </div>
          </div>
        </div>
        <div class="box p-5" v-show="this.all_permissions.length > 0">
          <div class="flex justify-between mb-5">
            <div class="mb-5 text-xl font-medium">
              Permission Groups
            </div>
            <div class="mb-5 text-sm self-center">
              {{ this.all_permissions.length }} Permissions
            </div>
          </div>
          <!-- BEGIN: Box content -->
          <div class="accordion mb-5">
            <div class="accordion-item border-2 p-5 rounded-lg mb-3" v-for="(group, index) in this.permission_groups" v-bind:key="index">
              <div :id="'faq-accordion-collapse-' + index" class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#faq-accordion-collapse-' + index" aria-expanded="true" :aria-controls="'faq-accordion-collapse-' + index">
                  {{ capitalizeFirstLetter(index) }} Permissions
                </button>
              </div>
              <div :id="'faq-accordion-collapse-' + index" class="accordion-collapse collapse" :aria-labelledby="'faq-accordion-content-' + index" :data-bs-parent="'#faq-accordion-' + index">
                <div class="accordion-body text-gray-700 dark:text-gray-600 overflow-x-auto">
                  <table class="table table--sm">
                    <thead>
                    <tr>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap"></th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Permission Name</th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Creator</th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Last update</th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Created at</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(permission, index) in group" v-bind:key="index">
                      <td class="border-b dark:border-dark-5"><input class="form-check-switch self-center" type="checkbox" @change="togglePermission(permission)" v-model="permission.active" :checked="permission?.active"></td>
                      <td class="border-b dark:border-dark-5">{{ permission?.name }}</td>
                      <td class="border-b dark:border-dark-5">{{ permission?.user?.name }}</td>
                      <td class="border-b dark:border-dark-5">{{ formatDate(permission?.updated_at) }}</td>
                      <td class="border-b dark:border-dark-5">{{ formatDate(permission?.created_at) }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Box content -->
        </div>
      </div>
      <!-- BEGIN: Role Info -->
      <div class="col-span-12 lg:col-span-3">
        <Sidebar :role="this.role" class="mb-5"></Sidebar>

        <div class="box p-5">
          <div class="flex border-b border-gray-200 dark:border-dark-5 pb-5">
            <div class="w-full">
              <div class="text-gray-600">Search for Permission</div>
              <input id="form-role-color" type="text" class="form-control h-10 mt-2" placeholder="Search..." v-model="search_keyword"/>
            </div>
          </div>
          <div v-for="result in searchResults" v-bind:key="result" class="bg-gray-200 p-2 rounded-lg mt-2 hover:bg-gray-400 flex justify-between" @click="togglePermission(result)">
            <div>{{ result.name }}</div>
            <input class="form-check-switch self-center" type="checkbox" @change="togglePermission(result)" v-model="result.active" :checked="result?.active">
          </div>
          <div v-show="search_keyword.length === 0" class="mt-3 text-gray-500 text-center">
            Please type a keyword to search
          </div>
          <div v-show="search_keyword.length !== 0 && searchResults.length === 0" class="mt-3 text-red-500 text-center">
            No search result found, please try another search query
          </div>
        </div>
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
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
const toast = useToast()

export default defineComponent({
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      role: {},
      permission_groups: {},
      all_permissions: [],
      pagination: {},
      search_keyword: '',
      validation_error: {}
    }
  },
  mounted() {
    this.fetchRole(this.$route.params.id)
    this.fetchPermissions()
  },
  computed: {
    searchResults: function () {
      return this.all_permissions.filter((permission) => {
        if (this.search_keyword.length > 0) { return permission?.name.toLowerCase().match(this.search_keyword.toLowerCase()) }
      })
    }
  },
  methods: {
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
    fetchPermissions() {
      axios.get('permissions/active/' + this.$route.params.id + '?paginate=0')
        .then(response => {
          this.all_permissions = response.data.data // set all permissions
          for (const permission in this.all_permissions) {
            const permissionGroup = this.all_permissions[permission].name.split('_')[0] // Spit the group name from permission name
            if (!Object.keys(this.permission_groups).includes(permissionGroup)) { this.permission_groups[permissionGroup] = [] } // Check if group is already set
            this.permission_groups[permissionGroup].push(this.all_permissions[permission]) // add Permission to group
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    togglePermission(permission) {
      if (permission.active) {
        axios.post('roles/' + this.role.id + '/permissions/' + permission.id + '/attach')
          .then(response => {
            toast.success('The permission ' + permission.name + ' was added successfully')
          })
      } else {
        axios.post('roles/' + this.role.id + '/permissions/' + permission.id + '/detach')
          .then(response => {
            toast.success('The permission ' + permission.name + ' was removed successfully')
          })
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
