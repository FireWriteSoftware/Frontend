<template>
  <div id="create-document-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" @hide="this.$emit('closeModal')">
    <div class="modal-dialog">
      <form @submit.prevent="upload_file">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              {{ $t('documents.create_document') }}
            </h2>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <label for="create-document-modal-title" class="form-label">{{ $t('documents.attributes.title') }}</label>
              <input id="create-document-modal-title" type="text" class="form-control" v-model="document.title"/>
            </div>
            <!-- BEGIN: Thumbnail upload-->
            <div class="col-span-12 relative cursor-pointer">
              <button type="button" class="btn btn-primary w-full" v-if='document.file === null'>
                {{ $t('documents.file_upload.drop_files') }}
              </button>
              <button type="button" class="btn btn-primary w-full" v-else>
                {{ $t('documents.file_upload.file_uploaded') }}
              </button>
              <input
                type="file"
                class="w-full h-full top-0 left-0 absolute opacity-0 cursor-pointer"
                @change="add_file"
              />
            </div>
            <!-- END: Thumbnail upload-->
            <!-- START: Document Password -->
            <div class="col-span-12 py-3">
              <div class="col-span-12 mb-2">
                <div class="flex items-center">
                  <div>
                    <a>
                      {{ $t('documents.has_password') }}
                    </a>
                    <div class="text-gray-600">
                      {{ $t('documents.has_password_description') }}
                    </div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" v-model="document.has_password">
                </div>
              </div>
              <div class="col-span-12" v-show='document.has_password === true'>
                <label for="create-document-modal-password" class="form-label">{{ $t('documents.attributes.password') }}</label>
                <input id="create-document-modal-password" type="password" class="form-control" v-model="document.password"/>
              </div>
            </div>
            <!-- END: Document Password -->
            <!-- START: Document Max Downloads -->
            <div class="col-span-12 py-3">
              <div class="col-span-12 mb-2">
                <div class="flex items-center">
                  <div>
                    <a>
                      {{ $t('documents.has_max_downloads') }}
                    </a>
                    <div class="text-gray-600">
                      {{ $t('documents.has_max_downloads_description') }}
                    </div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" v-model="document.has_max_downloads">
                </div>
              </div>
              <div class="col-span-12" v-show='document.has_max_downloads === true'>
                <label for="create-document-modal-max_downloads" class="form-label">{{ $t('documents.attributes.max_downloads') }}</label>
                <input id="create-document-modal-max_downloads" type="number" min='0' class="form-control" v-model="document.max_downloads"/>
              </div>
            </div>
            <!-- END: Document Max Downloads -->
            <!-- START: Document Expire Date -->
            <div class="col-span-12 py-3">
              <div class="col-span-12 mb-2">
                <div class="flex items-center">
                  <div>
                    <a>
                      {{ $t('documents.has_expire_date') }}
                    </a>
                    <div class="text-gray-600">
                      {{ $t('documents.has_expire_date_description') }}
                    </div>
                  </div>
                  <input class="form-check-switch ml-auto" type="checkbox" v-model="document.has_expire_date">
                </div>
              </div>
              <div class="col-span-12" v-show='document.has_expire_date === true'>
                <label for="create-document-modal-expire_date" class="form-label">{{ $t('documents.attributes.expires_at') }}</label>
                <input id="create-document-modal-expire_date" type="date" class="form-control" v-model="document.expires_at"/>
              </div>
            </div>
            <!-- END: Document Expire Date -->
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
            <button type="submit" data-dismiss="modal" class="btn btn-primary w-20">
              {{ $t('documents.utils.upload') }}
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import axios from 'axios'
const toast = useToast()

export default {
  name: 'create-document',
  data() {
    return {
      document: {
        title: '',
        category_id: null,
        post_id: null,
        file_name: '',
        has_expire_date: false,
        expires_at: null,
        has_password: false,
        password: null,
        has_max_downloads: false,
        max_downloads: null,
        file: null
      },
      validation_error: null
    }
  },
  methods: {
    add_file(event) {
      if (event.target.files.length <= 0) return
      this.document.file = event.target.files[0]
      toast.success(this.$t('documents.file_upload.file_attached'))
    },
    upload_file() {
      const data = new FormData()
      this.document.title ? data.append('title', this.document.title) : null
      this.document.post_id ? data.append('post_id', this.document.post_id) : null
      this.document.category_id ? data.append('category_id', this.document.category_id) : null
      this.document.expires_at ? data.append('expires_at', this.document.expires_at) : null
      this.document.password ? data.append('password', this.document.password) : null
      this.document.max_downloads ? data.append('max_downloads', this.document.max_downloads) : null
      this.document.file ? data.append('file', this.document.file) : null
      axios.post('/documents', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          toast.success(this.$t('documents.file_upload.file_uploaded'))
          this.$emit('uploadedDocument')
          this.$emit('closeModal')
        })
        .catch(error => {
          console.log(error)
        })
    },
    limit_reached() {
      toast.error(this.$t('documents.file_upload.limit_reached'))
    }
  }
}
</script>
