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
    <!-- BEGIN: Header -->
    <Header :role="this.role"></Header>
    <!-- END: Header -->
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Role Content -->
      <div class="intro-y col-span-12 lg:col-span-9">
        <div class="box p-5">
          <!-- BEGIN: Role Title/Color -->
          <div class="grid lg:grid-cols-2 gap-6">
            <div>
              <label for="form-role-name" class="form-label">Name</label>
              <input id="form-role-name" type="text" class="form-control h-10" placeholder="Role Name" v-model="role.name"/>
            </div>
            <div>
              <label for="form-role-color" class="form-label">Color</label>
              <input id="form-role-color" type="color" class="form-control h-10" placeholder="Role Color" v-model="role.color"/>
            </div>
          </div>
          <!-- END: Role Title/Color -->
          <br>
          <!-- BEGIN: Role Description -->
          <div>
            <label for="form-role-description" class="form-label">Description</label>
            <textarea autocomplete="false" tabindex="0" id="form-role-description" type="text" class="form-control" v-model="role.description"/>
          </div>
          <!-- END: Role Description -->
          <br>

          <!-- BEGIN: Default role -->
          <div>
            <label for="form-role-description" class="form-label">Default Role</label>
            <div class="form-control">
              <div class="flex justify-between">
                <p class="self-center">Is the role a default user role?</p>
                <p class="focus:text-indigo-800 focus:outline-none text-sm leading-normal cursor-pointer text-right self-justify-end">
                  <input class="form-check-switch self-center" type="checkbox" v-model="role.is_default" :checked="role.is_default">
                </p>
              </div>
            </div>
          </div>
          <!-- END: Default role -->
        </div>
      </div>
      <!-- END: Role Content -->
      <!-- BEGIN: Role Info -->
      <div class="col-span-12 lg:col-span-3">
        <Sidebar :role="this.role"></Sidebar>
      </div>
      <!-- END: Role Info -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
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
      validation_error: {}
    }
  },
  mounted() {
    this.fetchRole(this.$route.params.id)
  },
  methods: {
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
        color: this.role.color,
        is_default: this.role.is_default
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
          console.error(response)
          this.role = response.data.data
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
          this.$router.push({ name: 'admin.roles' })
        })
    }
  }
})
</script>
