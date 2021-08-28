<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Create new Category</h2>
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button class="btn btn-primary shadow-md flex items-center" type="submit">
            <SaveIcon class="w-5 h-5 mr-2"></SaveIcon>Save
          </button>
        </div>
      </div>
      <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
        <!-- BEGIN: Create Category -->
        <div class="intro-y col-span-12 lg:col-span-8">
          <div class="post intro-y overflow-hidden box mt-5">
            <div
              class="post__tabs nav nav-tabs flex-col sm:flex-row bg-gray-300 dark:bg-dark-2 text-gray-600"
              role="tablist"
            >
              <Tippy
                id="properties-tab"
                tag="a"
                content="Customize the category properties"
                class="w-full sm:w-40 py-4 text-center flex justify-center items-center active"
                role="tab"
                aria-controls="properties"
                aria-selected="true"
              >
                <FileTextIcon class="w-4 h-4 mr-2" /> Properties
              </Tippy>
            </div>
            <div class="post__content tab-content">
              <div
                id="properties"
                class="tab-pane p-5 active"
                role="tabpanel"
                aria-labelledby="properties-tab"
              >
                <div class="border border-gray-200 dark:border-dark-5 rounded-md p-5">
                  <div class="font-medium flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
                    <ChevronDownIcon class="w-4 h-4 mr-2" /> Category settings
                  </div>
                  <div class="flex flex-col-reverse xl:flex-row flex-col">
                    <div class="flex-1 mt-6 xl:mt-0">
                      <p class="mt-3">Category Title</p>
                      <input type="text" :class="'form-control mt-2' + (this.validation_error?.title != null ? ' border-theme-6' : '')" placeholder="Title" v-model="this.category.title"/>
                      <p class="mt-3">Category Description</p>
                      <textarea rows="5" :class="'form-control mt-2' + (this.validation_error?.description != null ? ' border-theme-6' : '')" placeholder="Description" v-model="this.category.description"></textarea>
                    </div>
                    <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                      <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-2 mt-5 mr-5">
                        <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                          <img
                            class="rounded-md"
                            alt=""
                            :src="this.category.thumbnail ?? require('@/assets/images/placeholder.png')"
                          />
                        </div>
                        <div class="mx-auto cursor-pointer relative mt-5">
                          <button type="button" class="btn btn-primary w-full">
                            Change Thumbnail
                          </button>
                          <input
                            type="file"
                            class="w-full h-full top-0 left-0 absolute opacity-0"
                            @change="changePicture"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Post Content -->
        <!-- BEGIN: Post Info -->
        <div class="col-span-12 lg:col-span-4">
          <div class="intro-y box p-5">
            <div>
              <label class="form-label">Created by</label>
              <div class="dropdown">
                <div class="dropdown-toggle btn w-full btn-outline-secondary dark:bg-dark-2 dark:border-dark-2 flex items-center justify-start" role="button" aria-expanded="false">
                  <div class="w-6 h-6 image-fit mr-3">
                    <img class="rounded" alt="" :src="this.user?.profile_picture ?? require('@/assets/images/avatar.png')"/>
                  </div>
                  <div class="truncate">{{ this.user?.name }}</div>
                  <UserIcon class="w-4 h-4 ml-auto"/>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <label class="form-label">Title</label>
              <div class="dropdown">
                <div class="dropdown-toggle btn w-full btn-outline-secondary dark:bg-dark-2 dark:border-dark-2 flex items-center justify-start" role="button" aria-expanded="false">
                  <div class="truncate">{{ this.category?.title?.substring(0,75) }}</div>
                  <TagIcon class="w-4 h-4 ml-auto"/>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <label class="form-label">Description</label>
              <div class="dropdown">
                <div class="dropdown-toggle btn w-full btn-outline-secondary dark:bg-dark-2 dark:border-dark-2 flex items-center justify-start" role="button" aria-expanded="false">
                  <div class="truncate">{{ this.category?.description?.substring(0,75) }}</div>
                  <FileTextIcon class="w-4 h-4 ml-auto"/>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <label class="form-label">Parent Category</label>
              <div class="w-full flex items-center justify-start mb-3" aria-expanded="false">
                <div class="form-check">
                  <input id="checkbox-has_parent" class="form-check-switch" type="checkbox" v-model="has_parent">
                  <label class="form-check-label" for="checkbox-has_parent">Has parent Category</label>
                </div>
              </div>
              <div v-show="has_parent">
                <TailSelect
                  v-model="this.category.parent_id"
                  :options="{
                  search: true,
                  classNames: 'w-full'
                }"
                >
                  <option :value="category.id" v-for="category in this.categories" v-bind:key="category.id">{{ category.title }}</option>
                </TailSelect>
              </div>
            </div>
            <div v-show="this.validation_error !== null">
              <hr class="my-5">
              <h2 class="text-lg font-medium mr-auto">The following errors have occurred</h2>
              <ul class="list-disc mx-5">
                <div class="text-theme-6 mt-2 mb-4">
                  <li v-for="error_message in this.validation_error" v-bind:key="error_message">
                    {{ error_message[0] }}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <!-- END: Post Info -->
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default defineComponent({
  data() {
    return {
      category: {
        title: '',
        description: ''
      },
      validation_error: null,
      has_parent: false,
      user: {},
      categories: [],
      uploadFiles: null
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.fetchCategories()
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      if (this.uploadFiles !== null) {
        this.uploadPicture()
      } else {
        this.createPost()
      }
    },
    createPost() {
      const loader = this.$loading.show()
      axios.post('categories', {
        title: this.category.title,
        description: this.category.description,
        thumbnail: this.category.thumbnail,
        parent_id: this.has_parent ? this.category.parent_id : null
      })
        .then(response => {
          toast.success('Category was created successfully!')
          loader.hide()
          this.$router.push({ name: 'categories' })
        })
        .catch(error => {
          this.validation_error = error.response?.data?.data?.errors
          toast.error(error.response?.data?.message)
          loader.hide()
        })
    },
    changePicture(event) {
      if (event.target.files.length <= 0) return
      this.uploadFiles = event.target.files

      const reader = new FileReader()
      reader.onload = e => {
        this.category.thumbnail = e.target.result
      }
      reader.readAsDataURL(this.uploadFiles[0])
    },
    uploadPicture() {
      const data = new FormData()
      data.append('image', this.uploadFiles[0])
      axios.post('storage/uploadImage',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.category.thumbnail = res.data.data.url
          toast.success('Thumbnail successfully uploaded')
          this.createPost()
        })
        .catch((err) => {
          console.error(err)
          toast.error(err.response.data.message)
        })
    },
    fetchCategories() {
      axios.get('categories?paginate=0&load_depth=0')
        .then(response => {
          this.categories = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
})
</script>
