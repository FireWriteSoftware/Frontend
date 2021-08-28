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
          content="These are the database wiki settings, here you can change connection settings to the database. Please be careful what you do, because these settings can damage your system!"
        >
          <span class="flex items-center justify-center">
            <InfoIcon class="w-5 h-5 mr-2"/>Informations
          </span>
        </Tippy>
      </div>
      <!-- BEGIN: Submit Database Modal -->
      <div
        id="submit-database-modal"
        class="modal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <AlertCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
                <div class="text-3xl mt-5">Are you sure?</div>
                <div class="text-gray-600 mt-2">
                  Are you really sure you want to change the connection <br>information, this can do a lot of damage!
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1">
                  Cancel
                </button>
                <button type="button" data-dismiss="modal" @click="changeDatabase" class="btn btn-danger w-24">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: Submit Database Modal -->
      <!-- BEGIN: Database Settings -->
      <div class="intro-y inbox box mt-5">
        <div class="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200 dark:border-dark-1">
          <h2 class="font-medium text-base mr-auto">Database Settings</h2>
        </div>
        <div class="overflow-x-auto sm:overflow-x-visible">
          <div class="intro-y p-5">
            <form @submit.prevent="">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-12">
                      <div class="mb-5">
                        <label for="update-database-hostname" class="form-label">
                          Hostname
                        </label>
                        <input
                          id="update-database-hostname"
                          type="text"
                          class="form-control"
                          placeholder="Enter Hostname"
                          v-model="database.hostname"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-5">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-database-database" class="form-label">
                          Database
                        </label>
                        <input
                          id="update-database-database"
                          type="text"
                          class="form-control"
                          placeholder="Enter Database"
                          v-model="database.database"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-5">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-database-port" class="form-label">
                          Port
                        </label>
                        <input
                          id="update-database-port"
                          type="number"
                          class="form-control"
                          placeholder="Enter Port"
                          v-model="database.port"
                        />
                      </div>
                    </div>
                    <div class="col-span-12">
                      <hr class="mt-5 mb-3">
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-database-username" class="form-label">
                          Username
                        </label>
                        <input
                          id="update-database-username"
                          type="text"
                          class="form-control"
                          placeholder="Enter Username"
                          v-model="database.username"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-database-password" class="form-label">
                          Password
                        </label>
                        <input
                          id="update-database-password"
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          v-model="database.password"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end mt-4">
                    <a href="javascript:;" data-toggle="modal" data-target="#submit-database-modal" class="btn btn-danger w-20 mr-auto">
                      Save
                    </a>
                    <a href="javascript:;" class="btn btn-primary w-35">
                      Test connection
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="p-3 flex flex-col sm:flex-row items-center text-center sm:text-left text-gray-600">
          <div class="sm:ml-auto mt-5 sm:mt-0 dark:text-gray-300">
            Please be aware of what you are doing here. These settings can cause a lot of damage!
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
import { useToast } from 'vue-toastification'
const toast = useToast()

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      details: {
        name: process.env.VUE_APP_NAME,
        logo: process.env.VUE_APP_LOGO,
        description: process.env.VUE_APP_DESCRIPTION
      },
      database: {
        hostname: '127.0.0.1',
        port: 3306,
        database: 'wiki',
        username: 'root',
        password: ''
      }
    }
  },
  mounted() {
    console.log('Wikisettings')
  },
  methods: {
    changeDatabase() {
      const loader = this.$loading.show()
      axios.post('environment/mysql', {
        hostname: this.hostname,
        port: this.port,
        database: this.database,
        username: this.username,
        password: this.password
      })
        .then(response => {
          console.log(response)
          toast.success('Connection successfully updated')
          loader.hide()
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    }
  }
})
</script>
