<template>
  <div>
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
            <div class="text-3xl mt-5">{{ $t('messages.be_patient') }}</div>
            <div class="text-gray-600 mt-2 mb-5">
              {{ $t('messages.content_is_loading') }}
            </div>
          </div>
        </div>
        <div class="box p-5" v-show="this.all_permissions.length > 0">
          <div class="flex justify-between mb-5">
            <div class="mb-5 text-xl font-medium">
              {{ $t('roles.permission_groups') }}
            </div>
            <div class="mb-5 text-sm self-center">
              {{ $t('roles.count_permissions', { count: this.all_permissions.length }) }}
            </div>
          </div>
          <!-- BEGIN: Box content -->
          <div class="accordion mb-5">
            <div class="accordion-item border-2 p-5 rounded-lg mb-3" v-for="(group, index) in this.permission_groups" v-bind:key="index">
              <div :id="'faq-accordion-collapse-' + index" class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#faq-accordion-collapse-' + index" aria-expanded="true" :aria-controls="'faq-accordion-collapse-' + index">
                  {{ $t('roles.permission_group_header', { group: capitalizeFirstLetter(index) }) }}
                </button>
              </div>
              <div :id="'faq-accordion-collapse-' + index" class="accordion-collapse collapse" :aria-labelledby="'faq-accordion-content-' + index" :data-bs-parent="'#faq-accordion-' + index">
                <div class="accordion-body text-gray-700 dark:text-gray-600 overflow-x-auto">
                  <table class="table table--sm">
                    <thead>
                    <tr>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap"></th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">{{ $t('roles.permission_name') }}</th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">{{ $t('attributes.updated_at') }}</th>
                      <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">{{ $t('attributes.created_at') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(permission, index) in group" v-bind:key="index">
                      <td class="border-b dark:border-dark-5"><input class="form-check-switch self-center" type="checkbox" @change="togglePermission(permission)" v-model="permission.active" :checked="permission?.active"></td>
                      <td class="border-b dark:border-dark-5">{{ permission?.name }}</td>
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
              <div class="text-gray-600">{{ $t('roles.search_permission') }}</div>
              <input id="form-role-color" type="text" class="form-control h-10 mt-2" placeholder="Search..." v-model="search_keyword"/>
            </div>
          </div>
          <div v-for="result in searchResults" v-bind:key="result" class="p-2 rounded-lg mt-2 flex justify-between dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 transition duration-100" @click="togglePermission(result)">
            <div>{{ result.name }}</div>
            <input class="form-check-switch self-center" type="checkbox" @change="togglePermission(result)" v-model="result.active" :checked="result?.active">
          </div>
          <div v-show="search_keyword.length === 0" class="mt-3 text-gray-500 text-center">
            {{ $t('roles.type_keyword') }}
          </div>
          <div v-show="search_keyword.length !== 0 && searchResults.length === 0" class="mt-3 text-red-500 text-center">
            {{ $t('roles.no_result') }}
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
            const permissionGroup = this.all_permissions[permission].name.split('_')[0] // Split the group name from permission name
            if (!Object.keys(this.permission_groups).includes(permissionGroup)) { this.permission_groups[permissionGroup] = [] } // Check if group is already set
            this.permission_groups[permissionGroup].push(this.all_permissions[permission]) // add Permission to group
          }
        })
        .catch()
    },
    togglePermission(permission) {
      if (permission.active) {
        axios.post('roles/' + this.role.id + '/permissions/' + permission.id + '/attach')
          .then(response => {
            toast.success('The permission ' + permission.name + ' was added successfully')
          })
          .catch()
      } else {
        axios.post('roles/' + this.role.id + '/permissions/' + permission.id + '/detach')
          .then(response => {
            toast.success('The permission ' + permission.name + ' was removed successfully')
          })
          .catch()
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
