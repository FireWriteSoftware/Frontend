<template>
  <div>
    <CreateDocumentModal :posts="this.posts" :categories='this.categories' @uploadedDocument='this.fetchDocuments("documents")' @closeModal='this.modalState.create = false' v-show="modalState.create"></CreateDocumentModal>
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-3 xxl:col-span-2">
        <h2 class="intro-y text-lg font-medium mr-auto mt-2">
          {{ $t('documents.document_manager') }}
        </h2>
        <!-- BEGIN: File Manager Menu -->
        <div class="intro-y box p-5 mt-6">
          <div class="mt-1">
            <a href="" class="flex items-center px-3 py-2 rounded-md bg-theme-1 text-white font-medium">
              <GridIcon class="w-4 h-4 mr-2" />
              {{ $t('documents.utils.all') }}
            </a>
            <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md">
              <ImageIcon class="w-4 h-4 mr-2" />
              {{ $t('documents.utils.images') }}
            </a>
            <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md">
              <FileIcon class="w-4 h-4 mr-2" />
              {{ $t('documents.utils.documents') }}
            </a>
          </div>
        </div>
        <!-- END: File Manager Menu -->
      </div>
      <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
        <!-- BEGIN: File Manager Filter -->
        <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
          <div class="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
            <SearchIcon
              class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-gray-700 dark:text-gray-300"
            />
            <input
              type="text"
              class="form-control w-full sm:w-64 box px-10 text-gray-700 dark:text-gray-300 placeholder-theme-13"
              :placeholder="$t('utils.search')"
              v-model="this.search.documents"
              @change="this.fetchDocuments(this.search.documents ? 'documents?search=' + this.search.documents : 'documents')"
            />
          </div>
          <div class="w-full sm:w-auto flex">
            <a data-toggle="modal" data-target="#create-document-modal" class="btn btn-primary shadow-md" @click="this.modalState.create = true">
              {{ $t('documents.upload_new_document') }}
            </a>
          </div>
        </div>
        <!-- END: File Manager Filter -->
        <!-- BEGIN: Directory & Files -->
        <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
          <div
            v-for="document in documents"
            :key="document.id"
            class="intro-y col-span-6 sm:col-span-4 md:col-span-3 xxl:col-span-2"
          >
            <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in">
              <a
                v-if="document.id === 'Empty Folder'"
                href=""
                class="w-3/5 file__icon file__icon--empty-directory mx-auto"
              ></a>
              <a
                v-else-if="document.id === 'Folder'"
                href=""
                class="w-3/5 file__icon file__icon--directory mx-auto"
              ></a>
              <a
                v-else-if="document.file_name.split('.')[1] === 'png' || document.file_name.split('.')[1] === 'svg' || document.file_name.split('.')[1] === 'jpg' || document.file_name.split('.')[1] === 'jpeg'"
                href=""
                class="w-3/5 file__icon file__icon--image mx-auto"
              >
                <div class="file__icon--image__preview image-fit">
                  <img
                    alt="Image Icon"
                    :src="image_url + document.file_name"
                  />
                </div>
              </a>
              <a v-else @click='download(document.file_name)' class="w-3/5 file__icon file__icon--file mx-auto">
                <div class="file__icon__file-name">
                  {{ document.file_name.split('.')[1] }}
                </div>
              </a>
              <p class="block font-medium mt-4 text-center truncate">
                {{ document.file_name.replace('/storage/', '') }}
              </p>
              <div class="text-gray-600 text-xs text-center mt-0.5">
                FILE SIZE
              </div>
              <div class="absolute top-0 right-0 mr-2 mt-2 dropdown ml-auto">
                <a
                  class="dropdown-toggle w-5 h-5 block"
                  href="javascript:;"
                  aria-expanded="false"
                >
                  <MoreVerticalIcon class="w-5 h-5 text-gray-600" />
                </a>
                <div class="dropdown-menu w-40">
                  <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                    <button data-dismiss="dropdown" @click="deleteDocument(document.id)" class="flex items-center w-full block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                      <TrashIcon class="w-4 h-4 mr-2" />
                      {{ $t('utils.delete') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Directory & Files -->
        <!-- BEGIN: Datatable Pagination -->
        <div class="flex flex-col items-center mt-5">
          <ul class="flex">
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="this.search.document ? fetchDocuments(pagination.first_page_url + '&search=' + this.search.document) : fetchDocuments(pagination.first_page_url)">
                <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="this.search.document ? fetchDocuments(pagination.prev_page_url + '&search=' + this.search.document) : fetchDocuments(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
                <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <a class="font-bold">{{ $t('utils.pagination', { first: pagination.current_page, last: pagination.last_page }) }}</a>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" @click="this.search.document ? fetchDocuments(pagination.next_page_url + '&search=' + this.search.document) : fetchDocuments(pagination.next_page_url)" :disabled="!pagination.next_page_url">
                <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
              </button>
            </li>
            <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="this.search.document ? fetchDocuments(pagination.last_page_url + '&search=' + this.search.document) : fetchDocuments(pagination.last_page_url)">
                <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
              </button>
            </li>
          </ul>
        </div>
        <!-- END: Datatable Pagination -->
      </div>
    </div>
  </div>
</template>

<script>
import CreateDocumentModal from './Components/create-document-modal'
import { useToast } from 'vue-toastification'
import axios from 'axios'
const toast = useToast()
export default {
  name: 'Main.vue',
  components: { CreateDocumentModal },
  data() {
    return {
      modalState: {
        create: false
      },
      documents: [],
      categories: [],
      posts: [],
      search: {
        documents: ''
      },
      pagination: {},
      image_url: process.env.VUE_APP_BASE_URL.slice(0, -5)
    }
  },
  mounted() {
    this.fetchDocuments('documents')
    this.fetchPosts()
    this.fetchCategories()
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
    fetchDocuments(link) {
      axios.get(link)
        .then(response => {
          this.documents = response.data.data
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    },
    deleteDocument(id) {
      axios.delete('documents/' + id)
        .then(response => {
          toast.success(response.data.message)
          this.fetchDocuments('documents')
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    },
    download(file) {
      axios({
        url: file,
        method: 'GET',
        baseURL: process.env.VUE_APP_BASE_URL.slice(0, -5),
        responseType: 'blob'
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'image.jpg')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
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
