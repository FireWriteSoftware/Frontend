<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 lg:col-span-3 xxl:col-span-2">
      <h2 class="intro-y text-lg font-medium mr-auto mt-2">Wiki Settings</h2>
      <Sidebar :title="this.details.name"></Sidebar>
    </div>
    <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
      <div class="intro-y text-right items-center">
        <Tippy
          tag="a"
          href="javascript:;"
          class="tooltip btn px-2 box text-gray-700 dark:text-gray-300"
          content="These are the security wiki settings, here you can view your wiki settings around the topic of security, please pay close attention to what you do here!"
        >
          <span class="flex items-center justify-center">
            <InfoIcon class="w-5 h-5 mr-2"/>Informations
          </span>
        </Tippy>
      </div>
      <!-- BEGIN: Database Settings -->
      <div class="intro-y inbox box mt-5">
        <div class="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200 dark:border-dark-1">
          <h2 class="font-medium text-base mr-auto">Security Settings</h2>
        </div>
        <div class="overflow-x-auto sm:overflow-x-visible">
          <div class="intro-y p-5">
            <form @submit.prevent="">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-6 mb-5">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-security-password_lenght" class="form-label">
                          Minimum password length
                        </label>
                        <input
                          id="update-security-password_lenght"
                          type="text"
                          class="form-control"
                          placeholder="No minimum password length given."
                          v-model="details.password_lenght"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-5">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-security-default_role" class="form-label">
                          Default Role
                        </label>
                        <input
                          id="update-security-default_role"
                          type="text"
                          class="form-control"
                          placeholder="No default role given."
                          :value="details.default_role?.name?.length > 0 ? details.default_role.name : null"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- END: Database Settings -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from './Components/Sidebar'
import axios from 'axios'

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      details: {
        name: process.env.VUE_APP_NAME,
        description: process.env.VUE_APP_DESCRIPTION,
        domain: process.env.VUE_APP_DOMAIN,
        logo: process.env.VUE_APP_LOGO,
        password_lenght: process.env.VUE_APP_MINPASSWORD,
        default_role: {}
      },
      validation_error: {}
    }
  },
  mounted() {
    this.fetchDefaultRole()
  },
  methods: {
    fetchDefaultRole() {
      axios.get('roles')
        .then(response => {
          for (const role in response.data.data) {
            if (response.data.data[role].is_default) {
              this.details.default_role = response.data.data[role]
            }
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
})
</script>
