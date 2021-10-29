<template>
  <div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">{{ $t('webhooks.overview') }}</h2>
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300 mr-3">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
              v-model='search.webhooks'
              @change="this.fetchWebhooks(this.search.webhooks ? 'webhooks?search=' + this.search.webhooks : 'webhooks')"
            />
            <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
          </div>
          <a class="btn btn-primary shadow-md" data-toggle='modal' data-target='#create-webhook-modal' @click="modalState.create = true">{{ $t('webhooks.add_webhook') }}</a>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
          <tr>
            <th class="text-center whitespace-nowrap">{{ $t('attributes.id') }}</th>
            <th class="text-center whitespace-nowrap">{{ $t('attributes.type') }}</th>
            <th class="text-center whitespace-nowrap">{{ $t('webhooks.url') }}</th>
            <th class="text-center whitespace-nowrap">{{ $t('utils.actions') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="webhook in webhooks"
            :key="webhook.id"
            class="intro-x"
          >
            <td class="text-center">
              {{ webhook.id }}
            </td>

            <td class="text-center">
              {{ webhook.type }}
            </td>

            <td class="text-center">
              <a :href='webhook.url'>
                {{ webhook.url.substring(0,75) }}{{ webhook.url.length > 75 ? '...' : '' }}</a>
            </td>

            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <a
                  v-on:click='this.editModal = webhook; modalState.edit = true'
                  href='javascript:;'
                  data-toggle='modal'
                  data-target='#edit-webhook-modal'
                  class="text-small">
                  <edit2-icon class="w-5 h-5 mr-5 hover:text-blue-700"></edit2-icon>
                </a>
                <a
                  v-on:click='this.deleteModal = webhook'
                  href='javascript:;'
                  data-toggle="modal"
                  data-target="#delete-confirmation-modal"
                  class="text-small">
                  <Trash2Icon class="w-5 h-5 hover:text-blue-700"></Trash2Icon>
                </a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Datatable Pagination -->
      <div class="flex flex-col col-span-12 items-center mt-5">
        <ul class="flex">
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="this.search.badges ? fetchWebhooks(pagination.first_page_url + '&search=' + this.search.badges) : fetchWebhooks(pagination.first_page_url)">
              <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
            </button>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" @click="this.search.badges ? fetchWebhooks(pagination.prev_page_url + '&search=' + this.search.badges) : fetchWebhooks(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
              <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
            </button>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <a class="font-bold">{{ $t('utils.pagination', { first: pagination.current_page, last: pagination.last_page }) }}</a>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" @click="this.search.badges ? fetchWebhooks(pagination.next_page_url + '&search=' + this.search.badges) : fetchWebhooks(pagination.next_page_url)" :disabled="!pagination.next_page_url">
              <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
            </button>
          </li>
          <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="this.search.badges ? fetchWebhooks(pagination.last_page_url + '&search=' + this.search.badges) : fetchWebhooks(pagination.last_page_url)">
              <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
            </button>
          </li>
        </ul>
      </div>
      <!-- END: Datatable Pagination -->
    </div>

    <!-- BEGIN: Delete Confirmation Modal -->
    <div
      id="delete-confirmation-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon
                class="w-16 h-16 text-theme-6 mx-auto mt-3"
                v-on:click='this.deleteModal = {}'
              />

              <div class="text-3xl mt-5">{{ $t('messages.you_sure') }}</div>
              <div class="text-gray-600 mt-2">
                {{ $t('messages.cannot_undone') }}
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-24 mr-1"
                v-on:click='this.deleteModal = {}'
              >
                {{ $t('utils.cancel') }}
              </button>
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-danger w-24"
                v-on:click='this.deleteWebhook(this.deleteModal.id)'
              >
                {{ $t('utils.delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Edit webhook Modal -->
    <div id="edit-webhook-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="edit-webhook-modal" v-show="modalState.edit" @hide="modalState.edit = false">
      <div class="modal-dialog">
        <form @submit.prevent="editWebhook">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('webhooks.edit_webhook') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="edit-webhook-modal-name" class="form-label">{{ $t('attributes.type') }}</label>
                <TailSelect
                  id="edit-webhook-modal-name"
                  v-model="this.editModal.type"
                  :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                  :options="{
                      search: true,
                      classNames: 'w-full'
                    }"
                >
                  <option value="discord" :selected="true">Discord</option>
                </TailSelect>
              </div>
              <div class="col-span-12">
                <label for="edit-webhook-modal-description" class="form-label">{{ $t('webhooks.url') }}</label>
                <textarea id="edit-webhook-modal-description" class="form-control" v-model="editModal.url"/>
              </div>
              <div class="col-span-12">
                <label for="edit-webhook-modal-description" class="form-label">{{ $t('webhooks.url') }}</label>
                <TailSelect
                  v-model="this.editModal.scopes"
                  multiple
                  :options="
              {
                search: true,
                descriptions: true,
                hideSelected: false,
                hideDisabled: false,
                multiShowCount: false,
                multiContainer: true,
                classNames: 'w-full'
              }"
                >
                  <option :value="scope" v-for="scope in this.scopes" v-bind:key="scope" :selected="this.editModal?.scopes?.some(webhook_scope => webhook_scope.scope === scope)">{{ scope }}</option>
                </TailSelect>
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
    <!-- END: Edit webhook Modal -->

    <!-- BEGIN: Create webhook Modal -->
    <div id="create-webhook-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="create-webhook-modal" v-show="modalState.create" @hide="modalState.create = false">
      <div class="modal-dialog">
        <form @submit.prevent="createWebhook">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                {{ $t('webhooks.create_webhook') }}
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-webhook-modal-name" class="form-label">{{ $t('attributes.type') }} {{ this.createModal.type }}</label>
                <TailSelect
                  id="create-webhook-modal-name"
                  v-model="this.createModal.type"
                  :class="'form-control' + (this.validation_error?.type != null ? ' border-theme-6' : '')"
                  :options="{
                      search: true,
                      classNames: 'w-full'
                    }"
                >
                  <option value="discord" :selected="true">Discord</option>
                </TailSelect>
              </div>
              <div class="col-span-12">
                <label for="edit-webhook-modal-description" class="form-label">{{ $t('webhooks.url') }}</label>
                <textarea id="create-webhook-modal-description" class="form-control" v-model="createModal.url"/>
              </div>
              <div class="col-span-12">
                <label for="edit-webhook-modal-description" class="form-label">{{ $t('webhooks.url') }}</label>
                <TailSelect
                  v-model="this.createModal.scopes"
                  multiple
                  :options="
              {
                search: true,
                descriptions: true,
                hideSelected: false,
                hideDisabled: false,
                multiShowCount: false,
                multiContainer: true,
                classNames: 'w-full'
              }"
                >
                  <option :value="scope" v-for="scope in this.scopes" v-bind:key="scope" :selected="this.editModal?.scopes?.some(webhook_scope => webhook_scope.scope === scope)">{{ scope }}</option>
                </TailSelect>
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
    <!-- END: Create webhook Modal -->
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
      webhooks: [],
      pagination: {},
      search: {
        webhooks: ''
      },
      deleteModal: {},
      editModal: {
        scopes: []
      },
      scopes: [
        'posts_create',
        'posts_update',
        'categories_create',
        'categories_update'
      ],
      validation_error: null,
      modalState: {
        create: false,
        edit: false
      },
      createModal: {
        scopes: []
      }
    }
  },
  mounted() {
    this.fetchWebhooks('webhooks')
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
    fetchWebhooks(page) {
      axios.get(page, {
        params: {
          per_page: this.per_page
        }
      })
        .then(response => {
          this.webhooks = response.data.data
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch()
    },
    createWebhook() {
      axios.post('webhooks', {
        type: this.createModal.type ?? 'discord',
        url: this.createModal.url,
        scopes: this.createModal.scopes
      })
        .then(response => {
          toast.success(response.data.message)
          this.modalState.create = false
          this.fetchWebhooks('webhooks?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
        })

      this.createModal = {}
    },
    editWebhook() {
      axios.put('webhooks/' + this.editModal.id, {
        type: this.editModal.type,
        url: this.editModal.url,
        scopes: this.editModal.scopes
      })
        .then(response => {
          toast.success(response.data.message)
          this.modalState.edit = false
          this.editModal = {}
          this.fetchWebhooks('webhooks?page=' + this.pagination.current_page)
        })
        .catch(error => {
          console.error(error)
          this.validation_error = error?.response?.data?.data?.errors
          toast.error(error?.response?.data?.message)
        })
    },
    deleteWebhook(id) {
      axios.delete('webhooks/' + id)
        .then(response => {
          toast.success(response.data.message)
          this.fetchWebhooks('webhooks?page=' + this.pagination.current_page)
        })
        .catch(error => {
          console.error(error.response)
          this.validation_error = error?.response?.data?.data?.errors
          toast.error(error?.response?.data?.message)
        })
      this.deleteModal = {}
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
