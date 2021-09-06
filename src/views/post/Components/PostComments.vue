<template>
  <!-- BEGIN: Comment Box -->
  <div class="box p-5 news">
    <!-- BEGIN: Comments -->
    <div class="intro-y my-5">
      <div class="text-base sm:text-lg font-medium">
        {{ $t('single_post.comments') }}
      </div>
      <form @submit.prevent="writeComment()">
        <div class="news__input relative mt-5">
          <input
            type="text"
            class="form-control border-transparent bg-gray-300 py-6 placeholder-theme-13 resize-none"
            :placeholder="$t('single_post.post_comment')"
            v-model='new_comment'
          >
          <button type="submit">
            <SendIcon class="w-5 h-5 absolute my-auto inset-y-0 mr-6 right-0 text-gray-600"/>
          </button>
        </div>
      </form>
    </div>
    <div class="pb-3" v-for="comment in this.comments" v-bind:key="comment.id">
      <div class="flex box p-3 bg-gray-200 dark:bg-dark-1">
        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit">
          <img
            alt=""
            class="rounded-full"
            :src="comment?.user?.profile_picture ?? require('@/assets/images/avatar.png')"
          />
        </div>
        <div class="ml-3 flex-1">
          <div class="flex items-center">
            <a class="font-medium">{{ comment?.user?.name }}</a>
            <button
              class="ml-auto text-sm text-gray-600"
              @click='this.new_comment = "@" + comment?.user?.name'
            >
              {{ $t('single_post.reply') }}
            </button>
          </div>
          <div class="text-gray-600 text-xs">
            {{ comment?.created_at }}
          </div>
          <div class="mt-2">{{ comment?.content }}</div>
        </div>
      </div>
    </div>
    <!-- END: Comments -->
    <!-- BEGIN: Load more comments button -->
    <div>
      <Button
        class="btn w-full bg-theme-1 hover:bg-theme-23 text-white p-2 rounded-lg"
        v-show="this.pagination?.next_page_url !== null"
        @click="loadComments(this.pagination.next_page_url + '&per_page=5')"
      >
        {{ $t('single_post.load_more') }} <LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" v-show="this.loading_comments" />
      </Button>
    </div>
    <!-- END: Load more comments button -->
  </div>
  <!-- END: Comment Box -->
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  name: 'PostComments',
  data() {
    return {
      user: {},
      new_comment: '',
      pagination: {},
      comments: []
    }
  },
  props: ['post'],
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.loadComments('posts/' + this.$route.params.id + '/comments?per_page=5')
  },
  methods: {
    loadComments(url) {
      this.loading_comments = true
      axios.get(url)
        .then(response => {
          for (const comment in response.data.data) {
            this.comments.push(response.data.data[comment])
          }
          this.loading_comments = false
          this.makePagination(response.data.meta, response.data.links)
        })
        .catch()
    },
    makePagination(meta, links) {
      const pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        last_page_url: links.last,
        first_page_url: links.first,
        next_page_url: links.next,
        prev_page_url: links.prev,
        showing_from: meta.from,
        showing_to: meta.to,
        total: meta.total
      }
      this.pagination = pagination
    },
    writeComment() {
      if (this.new_comment.length > 0) {
        axios.post('posts/' + this.$route.params.id + '/comments', {
          content: this.new_comment
        })
          .then(response => {
            toast.success(response.data.message)
            this.new_comment = ''
            this.comments.push(response.data.data)
          })
          .catch(error => {
            toast.error(error.response.data.message)
          })
      }
    }
  }
}
</script>
