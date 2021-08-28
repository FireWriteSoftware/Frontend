<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">User Account</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <Sidebar :user="this.user"></Sidebar>
      <!-- BEGIN: Postings -->
      <div class="col-span-12 lg:col-span-8 xxl:col-span-9">
        <div class="grid grid-cols-12 gap-6 mt-5">
          <div
            v-for="post in this.posts"
            :key="post.id"
            class="intro-y col-span-12 md:col-span-6 blog"
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
                <div class="dropdown ml-3" v-if="post.approved_at">
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
                        href="javascript:;"
                        @click="this.$router.push({ name: 'posts.view', params: { id: post.id } })"
                        data-dismiss="dropdown"
                        class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <FileIcon class="w-4 h-4 mr-2"/> View Post
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                <a href="javascript:;" class="block font-medium text-xl mt-3" @click="this.$router.push({ name: 'posts.view', params: { id: post.id } })">
                  {{ post?.title }}
                </a>
              </div>
            </div>
            <div class="box">
              <div class="px-5 pt-3 pb-5">
                <div class="w-full flex text-gray-600 text-xs sm:text-sm">
                  <div class="mr-2 flex">
                    <HeartIcon class="mr-1 h-4 w-4"></HeartIcon>{{ post.like_votes_count }}
                  </div>
                  <div class="mr-2 flex">
                    <MessageCircleIcon class="mr-1 h-4 w-4"></MessageCircleIcon>{{ post.comments_count }}
                  </div>
                  <div class="mr-2 flex">
                    <ClockIcon class="mr-1 h-4 w-4"></ClockIcon>{{ post.histories_count }}
                  </div>
                  <div class="ml-auto">
                    <span v-if="post.approved_at"><span class="px-2 py-1 rounded-full bg-theme-9 text-white mr-1">Public</span></span>
                    <span v-else><span class="px-2 py-1 rounded-full bg-theme-12 text-white mr-1">Not Approved</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.posts.length <= 0" class="intro-y col-span-12">
          <div class="box">
            <div class="p-5 text-center">
              <FolderIcon class="w-16 h-16 text-theme-1 mx-auto mt-5"/>
              <div class="text-3xl mt-5">No recent Posts</div>
              <div class="text-gray-600 mt-2 mb-5">
                This user have no Posts!
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Postings-->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Sidebar from './Components/Sidebar.vue'
import axios from 'axios'
import moment from 'moment'

export default defineComponent({
  components: {
    Sidebar
  },
  setup() {
    const select = ref('1')
    return {
      select
    }
  },
  data() {
    return {
      user: {},
      posts: []
    }
  },
  mounted() {
    this.fetchUser(this.$route.params.id)
  },
  methods: {
    fetchUser(id) {
      const loader = this.$loading.show()
      axios.get('users/' + id)
        .then(response => {
          this.user = response.data.data
          loader.hide()
          this.fetchPosts(id)
        })
        .catch(error => {
          console.error(error)
          loader.hide()
          this.$router.push({ name: 'admin.accounts' })
        })
    },
    fetchPosts(id) {
      const loader = this.$loading.show()
      axios.get('users/' + id + '/posts?paginate=0')
        .then(response => {
          this.posts = response.data.data
          loader.hide()
        })
        .catch(error => {
          console.error(error)
          loader.hide()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY')
    }
  }
})
</script>
