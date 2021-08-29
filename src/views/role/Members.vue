<template>
  <div>
    <!-- BEGIN: Header -->
    <Header :role="this.role"></Header>
    <!-- END: Header -->
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Role Content -->
      <div class="intro-y col-span-12 lg:col-span-9">
        <div class="box p-5">
          <table class="table table--sm">
            <thead>
            <tr>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap"></th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Username</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Firstname</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Lastname</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Email</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="member in role_members" v-bind:key="member">
              <td class="border-b dark:border-dark-5">
                <div class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" role="button" aria-expanded="false">
                  <img alt="" :src="member?.profile_picture ?? require('@/assets/images/avatar.png')"/>
                </div>
              </td>
              <td class="border-b dark:border-dark-5">{{ member?.name }}</td>
              <td class="border-b dark:border-dark-5">{{ member?.pre_name }}</td>
              <td class="border-b dark:border-dark-5">{{ member?.last_name }}</td>
              <td class="border-b dark:border-dark-5">{{ member?.email }}</td>
            </tr>
            </tbody>
          </table>
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
      role_members: {},
      validation_error: {}
    }
  },
  mounted() {
    this.fetchRole()
    this.fetchRoleMembers()
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
    fetchRole() {
      const loader = this.$loading.show()
      axios.get('roles/' + this.$route.params.id)
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
    fetchRoleMembers() {
      axios.get('roles/' + this.$route.params.id + '/users')
        .then(response => {
          console.error(response)
          this.role_members = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
})
</script>
