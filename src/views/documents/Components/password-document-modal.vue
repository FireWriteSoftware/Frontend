<template>
  <div id="password-document-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" @hide="this.$emit('closeModal')">
    <div class="modal-dialog">
      <form @submit.prevent="downloadDoc(document, password)">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              {{ $t('documents.enter_password_title') }}
            </h2>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <!-- START: Document Password -->
            <div class="col-span-12 py-3">
              <div class="col-span-12">
                <label for="password-document-modal-password" class="form-label">{{ $t('documents.enter_document_password') }}</label>
                <input id="password-document-modal-password" type="password" class="form-control" v-model="password"/>
              </div>
            </div>
            <!-- END: Document Password -->
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
              {{ $t('documents.utils.download') }}
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mime from 'mime-types'

export default {
  name: 'password-document-modal',
  props: {
    document: {
      type: Object,
      required: true
    },
    permissions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      validation_error: null,
      password: null
    }
  },
  methods: {
    downloadDoc(doc, password = null) {
      if (!this.permissions?.documents_get_single) return

      if (doc.require_password && password === null) {
        this.docPassword = ''
        doc.download_password = !doc.download_password
        return
      }

      axios.get(`${process.env.VUE_APP_BASE_URL}documents/${doc.id}/download${password ? '?password=' + password : ''}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          const blob = new Blob([response.data], { type: doc.mime_type })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = doc.title + '.' + mime.extension(doc.mime_type)
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    }
  }
}
</script>
