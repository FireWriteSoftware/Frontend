<template>
  <div>
    <CreateDocumentModal :posts="this.posts" :categories='this.categories' @closeModal='this.modalState = false' preselected-parent='2' :preselected-post='post' v-show="modalState"></CreateDocumentModal>

    <!-- BEGIN: Document Box -->
    <div class="box p-5 news mb-4">
      <!-- BEGIN: Documents -->
      <div class="intro-y mt-5 mb-8 flex justify-between">
        <div class="text-base sm:text-lg font-medium">
          {{ $t('single_post.documents.title') }}
        </div>
        <a href="javascript:;" data-toggle="modal" data-target="#create-document-modal" class="w-9 h-9 rounded-full bg-theme-1 text-white flex justify-center items-center" @click='this.modalState = true' v-if='this.permissions?.documents_create'>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </a>
      </div>
      <div class="mb-6" v-for="document in this.documents" v-bind:key="document.id">
        <div class='flex items-center justify-between'>
          <div class="flex items-center">
            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200" v-if='permissions?.documents_get_single' @click='downloadDoc(document)'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <p class="text-gray-600 text-sm font-medium pl-3">{{ document.title }}</p>
          </div>

          <div class='flex justify-end'>
            <Tippy tag="span" href="javascript:;" class="tooltip" :content="$t('single_post.documents.password')" v-if='document.require_password'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Tippy>

            <Tippy tag="span" href="javascript:;" class="tooltip" :content="$t('single_post.documents.time', {
          expires_at: document.expires_at
        })" v-if='document.expires_at'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Tippy>

            <Tippy tag="span" href="javascript:;" class="tooltip" :content="$t('single_post.documents.limit', {
          downloads: document.downloads,
          max_downloads: document.max_downloads
        })" v-if='document.max_downloads'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
            </Tippy>

            <Tippy tag="span" href="javascript:;" class="tooltip" :content="calculateSize(document.size)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </Tippy>
          </div>
        </div>

        <div class='mt-6 grid grid-cols-12 gap-4 intro-y' v-show='document.download_password'>
          <div class="col-span-11 float-left">
            <input id="create-permission-modal-name" :placeholder="$t('attributes.password')" v-model="docPassword" type="password" class="form-control" />
          </div>

          <div class='grid-cols-1 float-right'>
            <button class='w-10 h-10 bg-theme-1 flex justify-center items-center rounded-xl' @click='downloadDoc(document, docPassword)'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- END: Documents -->
    </div>
    <!-- END: Document Box -->
  </div>
</template>

<script>
import axios from 'axios'
import mime from 'mime-types'
import CreateDocumentModal from '../../documents/Components/create-document-modal'

export default {
  name: 'PostComments',
  props: ['documents', 'post', 'permissions'],
  components: {
    CreateDocumentModal
  },
  data() {
    return {
      docPassword: '',
      categories: [],
      posts: [],
      modalState: false
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchPosts()
  },
  methods: {
    calculateSize(bytes) {
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return '0 Bytes'
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    },
    downloadDoc(doc, password = null) {
      if (this.permissions?.documents_get_single) return

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
    },
    fetchCategories() {
      axios.get('categories?paginate=0&load_depth=0')
        .then(response => {
          this.categories = response.data
        })
        .catch()
    },
    fetchPosts() {
      axios.get('posts?paginate=0')
        .then(response => {
          this.posts = response.data
        })
        .catch()
    }
  }
}
</script>
