<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 lg:col-span-3 xxl:col-span-2">
      <h2 class="intro-y text-lg font-medium mr-auto mt-2">{{ $t('settings.header') }}</h2>
      <Sidebar :title="this.details.name"></Sidebar>
    </div>
    <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
      <div class="intro-y text-right items-center">
        <Tippy
          tag="a"
          href="javascript:;"
          class="tooltip btn px-2 box text-gray-700 dark:text-gray-300"
          :content="$t('settings.informations_text')"
        >
          <span class="flex items-center justify-center">
            <InfoIcon class="w-5 h-5 mr-2"/>{{ $t('settings.informations') }}
          </span>
        </Tippy>
      </div>
      <!-- BEGIN: Submit Mail Modal -->
      <div
        id="submit-mail-modal"
        class="modal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <AlertCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
                <div class="text-3xl mt-5">{{ $t('messages.you_sure') }}</div>
                <div class="text-gray-600 mt-2">
                  {{ $t('settings.change_email_connection') }}
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1">
                  {{ $t('utils.cancel') }}
                </button>
                <button type="button" data-dismiss="modal" @click="changeMail" class="btn btn-danger w-24">
                  {{ $t('utils.submit') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Submit Mail Modal -->
      <!-- BEGIN: Database Settings -->
      <div class="intro-y inbox box mt-5">
        <div class="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200 dark:border-dark-1">
          <h2 class="font-medium text-base mr-auto">{{ $t('settings.mail_settings') }}</h2>
        </div>
        <div class="overflow-x-auto sm:overflow-x-visible">
          <div class="intro-y p-5">
            <form @submit.prevent="">
              <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 xxl:col-span-12">
                      <div class="mb-5">
                        <label for="update-mail-hostname" class="form-label">
                          {{ $t('settings.hostname') }}
                        </label>
                        <input
                          id="update-mail-hostname"
                          type="text"
                          class="form-control"
                          v-model="mail.hostname"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-5">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-mail-encryption" class="form-label">
                          {{ $t('settings.encryption') }}
                        </label>
                        <input
                          id="update-mail-encryption"
                          type="text"
                          class="form-control"
                          v-model="mail.encryption"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6 mb-5">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-mail-port" class="form-label">
                          {{ $t('settings.port') }}
                        </label>
                        <input
                          id="update-mail-port"
                          type="number"
                          class="form-control"
                          v-model="mail.port"
                        />
                      </div>
                    </div>
                    <div class="col-span-12">
                      <hr class="mt-5 mb-3">
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-mail-username" class="form-label">
                          {{ $t('attributes.username') }}
                        </label>
                        <input
                          id="update-mail-username"
                          type="text"
                          class="form-control"
                          v-model="mail.username"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-mail-password" class="form-label">
                          {{ $t('attributes.password') }}
                        </label>
                        <input
                          id="update-mail-password"
                          type="password"
                          class="form-control"
                          v-model="mail.password"
                        />
                      </div>
                    </div>
                    <div class="col-span-12">
                      <hr class="mt-5 mb-3">
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-mail-from_name" class="form-label">
                          {{ $t('settings.senders_name') }}
                        </label>
                        <input
                          id="update-mail-from_name"
                          type="text"
                          class="form-control"
                          v-model="mail.from_name"
                        />
                      </div>
                    </div>
                    <div class="col-span-12 xxl:col-span-6">
                      <div class="mt-3 xxl:mt-0">
                        <label for="update-mail-from_address" class="form-label">
                          {{ $t('settings.senders_email') }}
                        </label>
                        <input
                          id="update-mail-from_address"
                          type="password"
                          class="form-control"
                          v-model="mail.from_address"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end mt-4">
                    <a href="javascript:;" data-toggle="modal" data-target="#submit-mail-modal" class="btn btn-danger w-20 mr-auto">
                      {{ $t('utils.save') }}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="p-3 flex flex-col sm:flex-row items-center text-center sm:text-left text-gray-600">
          <div class="sm:ml-auto mt-5 sm:mt-0 dark:text-gray-300">
            {{ $t('settings.be_aware') }}
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
      mail: {
        hostname: '',
        port: 587,
        username: '',
        password: '',
        encryption: '',
        from_address: '',
        from_name: ''
      },
      validation_error: {}
    }
  },
  methods: {
    changeMail() {
      const loader = this.$loading.show()
      axios.post('environment/mail', {
        hostname: this.hostname,
        port: this.port,
        username: this.username,
        password: this.password,
        encryption: this.encryption,
        from_address: this.from_address,
        from_name: this.from_name
      })
        .then(response => {
          toast.success(response.data.message)
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
