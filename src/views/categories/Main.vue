<template>
  <div class="grid grid-cols-12 gap-5">
    <div :class="this.permissions?.categories_store || this.permissions?.posts_store || this.announcements.length > 0 || !this.loading.announcements || this.recent.length > 0 || !this.loading.recent ? 'col-span-12 xxl:col-span-10' : 'col-span-12'">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 gap-8 mt-6 -mb-6">
        <!-- BEGIN: Categories Layout -->
        <div
          v-for="category in this.view_structure.categories"
          v-bind:key="category.id"
          class="intro-y blog box"
        >
          <div class="blog__preview image-fit">
            <img
              :alt="'Thumbnail of ' + category?.title"
              class="rounded-t-md"
              :src="category?.thumbnail ?? require('@/assets/images/placeholder.png')"
            />
            <div class="absolute w-full flex items-center px-5 pt-6 z-10">
              <div class="w-10 h-10 flex-none image-fit">
                <img
                  :alt="'Thumbnail of ' + category?.title"
                  class="rounded-full"
                  :src="category.user.profile_picture ?? require('@/assets/images/avatar.png')"
                />
              </div>
              <div class="ml-3 text-white mr-auto">
                <a href="" class="font-medium">{{ category.user?.name }}</a>
                <div class="text-xs mt-0.5">{{ formatDate(category.updated_at) }}</div>
              </div>
              <div class="dropdown ml-3" v-if='this.permissions?.categories_update || this.permissions?.categories_delete'>
                <a
                  href="javascript:;"
                  class="blog__action dropdown-toggle w-8 h-8 flex items-center justify-center rounded-full"
                  aria-expanded="false"
                >
                  <MoreVerticalIcon class="w-4 h-4 text-white"/>
                </a>
                <div class="dropdown-menu w-40">
                  <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                    <a
                      href="javascript:;"
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      data-dismiss="dropdown"
                      @click="this.$router.push({ name: 'moderation.categories.edit', params: { id: category.id } })"
                      v-if="this.permissions?.categories_update"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2"/> Edit
                    </a>
                    <a
                      href="javascript:;"
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      @click="this.deleteCategory(category.id)"
                      data-dismiss="dropdown"
                      v-if="this.permissions?.categories_delete"
                    >
                      <Trash2Icon class="w-4 h-4 mr-2"/> Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
              <router-link :to="{ name: 'categories.subcategory', params: { id: category.id } }">
                <a class="block font-medium text-xl mt-3">
                  {{ category.title }}
                </a>
              </router-link>
            </div>
          </div>
          <div class="px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
            <div class="w-full flex text-gray-600 text-xs sm:text-sm">
              <Tippy
                tag="div"
                class="intro-x flex flex-none items-center justify-center mr-3 text-gray-600 dark:text-gray-300"
                content="Bookmark"
                v-on:click='this.addBookmark("category", category.id)'
              >
                <BookmarkIcon class="w-5 h-5" />
              </Tippy>
              <div class="mr-3 flex">
                <FolderIcon class="mr-1 w-5 h-5"></FolderIcon><span class="font-medium">Category</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Categories Layout -->

        <!-- BEGIN: Posts Layout -->
        <div
          v-for="post in this.view_structure.posts"
          v-bind:key="post.id"
          class="intro-y blog box"
        >
          <div class="blog__preview image-fit">
            <img
              :alt="'Thumbnail of ' + post?.title"
              class="rounded-t-md"
              :src="post?.thumbnail ?? require('@/assets/images/placeholder.png')"
            />
            <div class="absolute w-full flex items-center px-5 pt-6 z-10">
              <div class="w-10 h-10 flex-none image-fit">
                <img
                  :alt="'Profile Picture of ' + post?.user?.name"
                  class="rounded-full"
                  :src="post?.user?.profile_picture ?? require('@/assets/images/avatar.png')"
                />
              </div>
              <div class="ml-3 text-white mr-auto">
                <a href="" class="font-medium">{{ post?.user?.name }}</a>
                <div class="text-xs mt-0.5">{{ formatDate(post?.updated_at) }}</div>
              </div>
              <div class="dropdown ml-3" v-if='this.permissions?.posts_update || this.permissions?.posts_delete'>
                <a
                  href='javascript:'
                  class="blog__action dropdown-toggle w-8 h-8 flex items-center justify-center rounded-full"
                  aria-expanded="false"
                >
                  <MoreVerticalIcon class="w-4 h-4 text-white"/>
                </a>
                <div class="dropdown-menu w-40">
                  <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                    <a
                      v-if="this.permissions?.posts_update"
                      href="javascript:;"
                      @click="this.$router.push({ name: 'moderation.posts.edit', params: { id: post.id } })"
                      data-dismiss="dropdown"
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                      <Edit2Icon class="w-4 h-4 mr-2"/> Edit
                    </a>
                    <a
                      v-if="this.permissions?.posts_delete"
                      href="javascript:;" @click="this.deletePost(post.id)"
                      data-dismiss="dropdown"
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                      <Trash2Icon class="w-4 h-4 mr-2"/> Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
              <router-link :to="{ name: 'posts.view', params: { id: post.id } }">
                <a class="block font-medium text-xl mt-3">
                  {{ post?.title }}
                </a>
              </router-link>
            </div>
          </div>
          <div class="w-100 px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
            <div class="flex text-gray-600 text-xs sm:text-sm">
              <Tippy
                tag="div"
                class="intro-x flex flex-none items-center justify-center mr-3 text-gray-600 dark:bg-dark-5 dark:text-gray-300"
                content="Bookmark"
                v-on:click='this.addBookmark("post", post.id)'
              >
                <BookmarkIcon class="w-5 h-5" />
              </Tippy>
              <div class="mr-3 flex">
                <FileTextIcon class="mr-1 w-5 h-5"></FileTextIcon>
                <span class="font-medium">Post</span>
              </div>
              <div class="ml-auto flex">
                <HeartIcon class="mr-1 ml-4 w-5 h-5"></HeartIcon><span class="font-medium">{{ post.like_votes > 0 ? post.like_votes : 0 }}</span>
                <MessageSquareIcon class="mr-1 ml-4 w-5 h-5"></MessageSquareIcon><span class="font-medium">{{ post.comments > 0 ? post.comments : 0 }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Posts Layout -->
        <!-- BEGIN: Placeholder Content Layout -->
        <div
          v-for="post in this.placeholder.content"
          v-show="!this.loading.content"
          v-bind:key="post"
          class="intro-y blog box"
        >
          <div class="blog__preview image-fit">
            <img
              alt="Thumbnail of Placeholder"
              class="rounded-t-md"
              :src="require('@/assets/images/placeholder.png')"
            />
            <div class="absolute w-full flex items-center px-5 pt-6 z-10">
              <div class="w-10 h-10 flex-none image-fit">
                <button class="btn w-11 h-11 rounded-full bg-gray-100 border-0 mr-1 dark:bg-dark-5 dark:text-gray-30" disabled></button>
              </div>
              <div class="ml-3 text-white mr-auto">
                <a><button class="btn w-32 rounded bg-gray-200 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button></a>
                <div class="mt-0.5"><span class="px-7 rounded bg-gray-200 text-white mr-1 dark:bg-dark-5 dark:text-gray-300"></span></div>
              </div>
            </div>
            <div class="absolute bottom-0 text-white px-5 pb-6 z-10 w-full">
              <button class="btn w-2/3 rounded bg-gray-200 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
            </div>
          </div>
          <div class="w-full px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
            <div class="flex text-gray-600 text-xs sm:text-sm">
              <div class="mr-3">
                <span class="px-10 pt-1 rounded bg-gray-100 text-white mr-1 dark:bg-dark-5 dark:text-gray-300"></span>
              </div>
              <div class="ml-auto">
                <span class="px-4 pt-1 rounded bg-gray-100 text-white mr-1 dark:bg-dark-5 dark:text-gray-300"></span>
                <span class="px-4 pt-1 rounded bg-gray-100 text-white mr-1 dark:bg-dark-5 dark:text-gray-300"></span>
              </div>
            </div>
          </div>
          <!-- END: Placeholder Content Layout -->
        </div>
      </div>
      <!-- BEGIN: No Content Placeholder -->
      <div v-if="this.view_structure.posts.length === 0 && this.view_structure.categories.length === 0 && this.loading.content === true" class="intro-y grid-cols-12">
        <div class="box">
          <div class="p-5 text-center">
            <div class="mx-auto mt-5 w-80">
              <img alt="" :src="require(`@/assets/images/no-data-illustration.svg`)"/>
            </div>
            <div class="text-3xl mt-5">There is no content so far</div>
            <div class="text-gray-600 mt-2 mb-5">
              This category is not yet filled with content!
            </div>
          </div>
        </div>
      </div>
      <!-- END: No Content Placeholder -->
    </div>
    <div class="col-span-12 xxl:col-span-2" v-if="this.permissions?.categories_store || this.permissions?.posts_store || this.announcements.length > 0 || !this.loading.announcements || this.recent.length > 0 || !this.loading.recent">
      <div class="-mb-10 pb-10">
        <div class="xxl:pl-6 grid grid-cols-12 gap-5">
          <!-- BEGIN: Announcements -->
          <div class="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 xxl:col-start-auto xxl:row-start-auto mt-3">
            <div class="flex items-center h-10 mb-4" v-if="this.$route.name === 'categories.subcategory'">
              <div class="mt-5 intro-x float-left mr-auto">
                <router-link :to="{ name: 'categories' }">
                  <button class="btn btn-primary shadow-md mr-2"><HomeIcon class="mr-2 h-5 w-5"/>Dashboard</button>
                </router-link>
              </div>
            </div>
            <div class="intro-x flex items-center h-10 mb-3 xxl:mb-8" v-if="this.announcements.length > 0 || !this.loading.announcements">
              <h2 class="text-lg font-medium truncate mr-auto">
                Announcements
              </h2>
              <button
                data-carousel="important-notes"
                data-target="prev"
                class="tiny-slider-navigator btn px-2 border-gray-400 text-gray-700 dark:text-gray-300 mr-2"
                @click="prevImportantNotes"
              >
                <ChevronLeftIcon class="w-4 h-4"/>
              </button>
              <button
                data-carousel="important-notes"
                data-target="next"
                class="tiny-slider-navigator btn px-2 border-gray-400 text-gray-700 dark:text-gray-300 mr-2"
                @click="nextImportantNotes"
              >
                <ChevronRightIcon class="w-4 h-4"/>
              </button>
            </div>
            <div class="intro-x">
              <div class="box zoom-in">
                <TinySlider ref-key="announcementsRef" v-if='this.loading.announcements'>
                  <div
                    class="p-5"
                    v-for='announce in this.announcements'
                    v-bind:key='announce.id'
                  >
                    <div class="text-base font-medium truncate">
                      {{ announce?.title }}
                    </div>
                    <div class="text-gray-500 mt-1">
                      {{ formatDate(announce?.updated_at) }}
                    </div>
                    <div class="text-gray-600 text-justify mt-1">
                      {{ announce?.description }}
                    </div>
                  </div>
                </TinySlider>
                <!-- BEGIN: Placeholder Content -->
                <TinySlider ref-key="announcementsRef" v-else>
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      <button class="btn w-32 mt-2 rounded bg-gray-300 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                    </div>
                    <div class="text-gray-500 mt-1">
                      <button class="btn w-24 rounded bg-gray-100 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                    </div>
                    <div class="text-gray-600 text-justify mt-1">
                      <button class="btn w-48 mt-1 rounded bg-gray-200 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                      <button class="btn w-48 mt-1 rounded bg-gray-200 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                      <button class="btn w-16 mt-1 rounded bg-gray-200 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                    </div>
                  </div>
                </TinySlider>
                <!-- END: Placeholder Content -->
              </div>
            </div>
          </div>
          <!-- END: Announcements -->

          <!-- BEGIN: Author Tools -->
          <div class="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mb-3 xxl:mb-8" v-if="this.permissions?.categories_store || this.permissions?.posts_store">
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Author Tools</h2>
            </div>
            <div class="">
              <router-link :to="{ name: 'moderation.categories.create' }" v-if="this.permissions?.categories_store">
                <button class="intro-x w-full block text-center rounded-md py-3 btn btn-primary w-24 mr-1 mb-2 flex">
                  <FolderIcon class="w-4 h-4 mr-2" /> Create category
                </button>
              </router-link>
              <router-link :to="{ name: 'moderation.posts.create' }" v-if="this.permissions?.posts_store">
                <button class="intro-x w-full block text-center rounded-md py-3 btn btn-primary w-24 mr-1 mb-2 flex">
                  <EditIcon class="w-4 h-4 mr-2" /> Create new post
                </button>
              </router-link>
            </div>
          </div>
          <!-- END: Author Tools -->

          <!-- BEGIN: Recent Postings -->
          <div class="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12" v-if="this.recent.length > 0 || !this.loading.recent">
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Recent Posts</h2>
            </div>
            <div class="mt-2" v-if="this.loading.recent === true">
              <div
                v-for="activity in this.recent"
                :key="activity.id"
                class="intro-x"
              >
                <router-link :to="{ name: 'posts.view', params: { id: activity.id } }">
                  <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                    <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt=""
                        :src="activity.user.profile_picture ?? require('@/assets/images/avatar.png')"
                      />
                    </div>
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">
                        {{ activity?.title }}
                      </div>
                      <div class="text-gray-600 text-xs mt-0.5">
                        {{ activity?.user?.name }}
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <router-link :to="{ name: 'categories' }" v-if="this.$route.name !== 'categories'">
                <button class="intro-x w-full block text-center rounded-md py-3 border border-theme-15 dark:border-dark-5 text-theme-16 dark:text-gray-600">
                  View More
                </button>
              </router-link>
            </div>
            <!-- BEGIN: Placeholder Content -->
            <div class="mt-2" v-else>
              <div
                v-for="activity in this.placeholder.recent"
                :key="activity"
                class="intro-x"
              >
                <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                  <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                    <button class="btn w-11 h-11 rounded-full bg-gray-100 border-0 mr-1 dark:bg-dark-5 dark:text-gray-30" disabled></button>
                  </div>
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">
                      <button class="btn w-24 mt-3 rounded bg-gray-300 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                    </div>
                    <div class="text-gray-600 text-xs mt-0.5">
                      <button class="btn w-16 rounded bg-gray-200 border-0 mr-1 dark:bg-dark-5 dark:text-gray-300" disabled></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- BEGIN: Placeholder Content -->
          </div>
          <!-- END: Recent Postings -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, provide } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'

const toast = useToast()

export default defineComponent({
  data() {
    return {
      loading: {
        content: false,
        announcements: false,
        recent: false
      },
      placeholder: {
        content: 12,
        recent: 5
      },
      recent: [],
      announcements: [],
      view_structure: {
        posts: [],
        categories: []
      },
      permissions: {},
      validation_error: {},
      user: {}
    }
  },
  mounted() {
    this.initialLoad()
    this.user = JSON.parse(localStorage.getItem('user'))
    this.testPagePermissions()
    this.loadAnnouncements()
    this.loadRecent()
    this.loadBookmarks()
  },
  watch: {
    $route(to, from) {
      this.view_structure.categories = []
      this.view_structure.posts = []
      this.initialLoad()
    }
  },
  methods: {
    initialLoad() {
      if (this.$route.name === 'categories.subcategory') {
        this.loadSubcategory(this.$route.params.id)
      }
      if (this.$route.name === 'categories') {
        this.loadMainCategories()
      }
    },
    loadRecent() {
      axios.get('posts/recent?sort.column=updated_at&sort.method=desc&paginate=0')
        .then((response) => {
          this.recent = response.data.data.posts
          this.loading.recent = true
        })
        .catch((error) => {
          console.error(error)
        })
    },
    loadAnnouncements() {
      axios.get('announcements')
        .then((response) => {
          this.announcements = response.data.data
          this.loading.announcements = true
        })
        .catch((error) => {
          console.error(error)
        })
    },
    loadSubcategory(id) {
      axios.get('categories/' + id + '?load_depth=0')
        .then(response => {
          this.view_structure.categories = response.data.data.children
          this.view_structure.posts = response.data.data.posts
          this.loading.content = true
        })
        .catch(error => {
          toast.error(error.response.data.message)
          this.$router.push({ name: 'categories' })
        })
    },
    loadMainCategories() {
      axios.get('categories/0')
        .then(response => {
          this.view_structure.categories = response.data.data
          this.loading.content = true
        })
        .catch(error => {
          console.error(error)
        })
    },
    loadBookmarks() {
      axios.get('users/' + this.user.id + '/bookmarks')
        .then(response => {
          this.user.bookmarks = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    addBookmark(type, id) {
      let isPost = 0
      let isCategory = 0
      let postId = 0
      let categoryId = 0
      let action = 1
      let deleteId = 0

      if (type === 'post') {
        isPost = 1
        postId = id
      } else if (type === 'category') {
        isCategory = 1
        categoryId = id
      }

      for (const bookmark in this.user.bookmarks) {
        if (id === this.user.bookmarks[bookmark]?.post?.id || id === this.user.bookmarks[bookmark]?.category?.id) {
          action = 0
          deleteId = this.user.bookmarks[bookmark]?.id
        }
      }

      const loader = this.$loading.show()

      if (action) {
        axios.post('bookmarks/', {
          ...(isPost ? { is_post: isPost } : {}),
          ...(isCategory ? { is_category: isCategory } : {}),
          ...(postId !== 0 ? { post_id: postId } : {}),
          ...(categoryId !== 0 ? { category_id: categoryId } : {})
        })
          .then(response => {
            toast.success('Item has been bookmarked')
            loader.hide()
            this.loadBookmarks()
          })
          .catch(error => {
            console.error(error)
            toast.error(error)
            loader.hide()
          })
      } else {
        axios.delete('bookmarks/' + deleteId)
          .then(response => {
            toast.success('Item has been unbookmarked')
            loader.hide()
            this.loadBookmarks()
          })
          .catch(error => {
            console.error(error)
            toast.error(error)
            loader.hide()
          })
      }
    },
    testPagePermissions() {
      axios.post('permissions/test', {
        permissions: [
          'categories_store',
          'categories_update',
          'categories_delete',
          'posts_store',
          'posts_update',
          'posts_delete'
        ]
      })
        .then((response) => {
          this.permissions = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    deleteCategory(id) {
      const loader = this.$loading.show()
      axios.delete('categories/' + id)
        .then(response => {
          this.initialLoad()
          loader.hide()
          toast.success('Category was successfully deleted!')
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    deletePost(id) {
      const loader = this.$loading.show()
      axios.delete('posts/' + id)
        .then(response => {
          this.initialLoad()
          loader.hide()
          toast.success('Post was successfully deleted!')
        })
        .catch(error => {
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY')
    }
  },
  setup() {
    const announcementsRef = ref()

    provide('bind[announcementsRef]', el => {
      announcementsRef.value = el
    })

    const prevImportantNotes = () => {
      const el = announcementsRef.value
      el.tns.goTo('prev')
    }
    const nextImportantNotes = () => {
      const el = announcementsRef.value
      el.tns.goTo('next')
    }

    return {
      prevImportantNotes,
      nextImportantNotes
    }
  }
})
</script>
