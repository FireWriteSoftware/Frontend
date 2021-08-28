<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Wiki Tags</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <div class="w-56 relative text-gray-700 dark:text-gray-300 mr-3">
          <input
            type="text"
            class="form-control w-56 box pr-10 placeholder-theme-13"
            placeholder="Search..."
            v-model="this.search.tag"
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
        </div>
        <a href="javascript:;" data-toggle="modal" data-target="#create-tag-modal" class="btn btn-primary" @click="this.modalState.create = true">Add new Tag</a>
      </div>
    </div>

    <!-- BEGIN: Create Tag Modal -->
    <div id="create-tag-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState.create" @hide="modalState.create = false">
      <div class="modal-dialog">
        <form @submit.prevent="addTag(this.tag)">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Create a new Tag
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="create-tag-modal-name" class="form-label">Name</label>
                <input id="create-tag-modal-name" type="text" class="form-control" placeholder="Your Name" v-model="tag.name"/>
              </div>
              <div class="col-span-12">
                <label for="create-tag-modal-description" class="form-label">Description</label>
                <textarea id="create-tag-modal-description" class="form-control" placeholder="Your Description" v-model="tag.description"/>
              </div>
              <div class="col-span-12">
                <label for="create-tag-modal-color" class="form-label">Color</label>
                <input id="create-tag-modal-color" type="color" class="form-control" v-model="tag.color"/>
              </div>
              <div class="col-span-12">
                <label for="create-tag-modal-icon" class="form-label">Icon</label>
                <input id="create-tag-modal-icon" type="text" class="form-control" placeholder="Your Icon" v-model="tag.icon"/>
              </div>
              <div class="col-span-12" v-show="this.validation_error !== null">
                <h5 class="text-lg font-medium mr-auto">The following errors have occurred</h5>
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
                Cancel
              </button>
              <button type="submit" class="btn btn-primary w-20">
                Create
              </button>
            </div>
            <!-- END: Modal Footer -->
          </div>
        </form>
      </div>
    </div>
    <!-- END: Create Tag Modal -->
    <!-- BEGIN: Edit Tag Modal -->
    <div id="edit-tag-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" ref="edit-tag-modal" v-show="modalState.edit" @hide="modalState.edit = false">
      <div class="modal-dialog">
        <form @submit.prevent="editTag">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Edit a Tag
              </h2>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="edit-tag-modal-name" class="form-label">Name</label>
                <input id="edit-tag-modal-name" type="text" class="form-control" placeholder="Your Name" v-model="edit_tag.name"/>
              </div>
              <div class="col-span-12">
                <label for="edit-tag-modal-description" class="form-label">Description</label>
                <textarea id="edit-tag-modal-description" class="form-control" placeholder="Your Description" v-model="edit_tag.description"/>
              </div>
              <div class="col-span-12">
                <label for="edit-tag-modal-color" class="form-label">Color</label>
                <input id="edit-tag-modal-color" type="color" class="form-control" v-model="edit_tag.color"/>
              </div>
              <div class="col-span-12">
                <label for="edit-tag-modal-icon" class="form-label">Icon</label>
                <input id="edit-tag-modal-icon" type="text" class="form-control" placeholder="Your Name" v-model="edit_tag.icon"/>
              </div>
              <div class="col-span-12" v-show="this.validation_error !== null">
                <h5 class="text-lg font-medium mr-auto">The following errors have occurred</h5>
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
                Cancel
              </button>
              <button type="submit" class="btn btn-primary w-20">
                Save
              </button>
            </div>
            <!-- END: Modal Footer -->
          </div>
        </form>
      </div>
    </div>
    <!-- END: Edit Tag Modal -->
    <!-- BEGIN: Datatable -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
        <tr>
          <th class="text-center whitespace-nowrap">NAME</th>
          <th class="text-center whitespace-nowrap">DESCRIPTION</th>
          <th class="text-center whitespace-nowrap">COLOR</th>
          <th class="text-center whitespace-nowrap">LAST UPDATE</th>
          <th class="text-center whitespace-nowrap">CREATED AT</th>
          <th class="text-center whitespace-nowrap">ACTIONS</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="tag in this.filteredTags"
          v-bind:key="tag.id"
          class="intro-x"
        >
          <td class="text-center">
            {{ tag.name }}
          </td>
          <td class="text-center">
              {{ tag.description.substring(0, 25) }}{{ tag.description?.length > 25 ? '...' : '' }}
          </td>
          <td class="text-center" :style="'color: ' + tag.color + ';'">
            <component :is='tag.icon'></component>
          </td>
          <td class="text-center">
            {{ this.formatDate(tag.created_at) }}
          </td>

          <td class="text-center">
            {{ this.formatDate(tag.updated_at) }}
          </td>

          <td class="table-report__action w-56">
            <div class="flex justify-center items-center">
              <a href="javascript:;" @click="this.edit_tag = tag; this.modalState.edit = true" data-toggle="modal" data-target="#edit-tag-modal" class="text-small">
                <edit2-icon class="w-5 h-5 mr-5 hover:text-blue-700"></edit2-icon>
              </a>
              <a href="javascript:;" @click="deleteTag(tag.id)" class="text-small">
                <Trash2Icon class="w-5 h-5 hover:text-blue-700"></Trash2Icon>
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Datatable -->
    <!-- BEGIN: Datatable Pagination -->
    <div class="flex flex-col items-center mt-5">
      <ul class="flex">
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" :disabled="!pagination.first_page_url" @click="fetchTags(pagination.first_page_url)">
            <span class="mx-1"><ChevronsLeftIcon></ChevronsLeftIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" @click="fetchTags(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
            <span class="mx-1"><ChevronLeftIcon></ChevronLeftIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <a class="font-bold">Page {{ pagination.current_page }} / {{ pagination.last_page }}</a>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" @click="fetchTags(pagination.next_page_url)" :disabled="!pagination.next_page_url">
            <span class="mx-1"><ChevronRightIcon></ChevronRightIcon></span>
          </button>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 dark:bg-dark-5 dark:hover:bg-dark-7 dark:text-gray-200 dark:hover:text-gray-600 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
          <button class="flex items-center font-bold" :disabled="!pagination.last_page_url" @click="fetchTags(pagination.last_page_url)">
            <span class="mx-1"><ChevronsRightIcon></ChevronsRightIcon></span>
          </button>
        </li>
      </ul>
    </div>
    <!-- END: Datatable Pagination -->
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
      tags: [],
      edit_tag: {},
      tag: {
        name: 'New Tag',
        description: 'New Description',
        color: '#000000',
        icon: 'TagIcon'
      },
      search: {
        tag: ''
      },
      pagination: {},
      validation_error: null,
      modalState: {
        create: false,
        edit: false
      }
    }
  },
  mounted() {
    this.fetchTags('tags')
  },
  computed: {
    filteredTags: function () {
      return this.tags.filter((tag) => {
        return tag?.name.toLowerCase().match(this.search.tag.toLowerCase()) || tag?.description.toLowerCase().match(this.search.tag.toLowerCase()) || tag?.color.toLowerCase().match(this.search.tag.toLowerCase()) || tag?.icon.toLowerCase().match(this.search.tag.toLowerCase())
      })
    }
  },
  methods: {
    fetchTags(page) {
      const loader = this.$loading.show()
      axios.get(page)
        .then(response => {
          this.tags = response.data.data
          loader.hide()
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
    },
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
    deleteTag(id) {
      const loader = this.$loading.show()
      axios.delete('tags/' + id)
        .then(response => {
          toast.success('Tag successfully deleted')
          loader.hide()
          this.fetchTags('tags?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    addTag(tag) {
      const loader = this.$loading.show()
      axios.post('tags', {
        name: tag.name,
        description: tag.description,
        color: tag.color,
        icon: tag.icon
      })
        .then(response => {
          toast.success('Tag successfully added')
          this.modalState.create = false
          loader.hide()
          this.fetchTags('tags?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    editTag() {
      const loader = this.$loading.show()
      axios.put('tags/' + this.edit_tag.id, {
        name: this.edit_tag.name,
        description: this.edit_tag.description,
        color: this.edit_tag.color,
        icon: this.edit_tag.icon
      })
        .then(response => {
          toast.success('Tag successfully updated')
          this.modalState.edit = false
          loader.hide()
          this.fetchTags('tags?page=' + this.pagination.current_page)
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
})
</script>
