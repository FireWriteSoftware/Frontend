<template>
  <div class="grid grid-cols-12 gap-6 mt-2">
    <div class="col-span-12">
      <section class="py-5">
        <div class="container mx-auto">
          <div class="text-gray-600">
            Your search has returned
            <a class="text-black dark:text-white font-medium">
              {{ this.search_results.posts.length + this.search_results.cats.length + this.search_results.users.length }}
            </a>
            hits
          </div>
          <form @submit.prevent="this.search(this.search_keywords)">
            <div class="pt-2 relative mx-auto text-gray-600 w-full">
              <input class="w-full h-16 px-3 rounded focus:outline-none focus:shadow-outline text-xl px-8 shadow dark:bg-dark-2" type="text" placeholder="Search..." v-model="search_keywords">
              <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                <SearchIcon class="h-9 w-9"></SearchIcon>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
    <div class="col-span-12 lg:col-span-3 xxl:col-span-2">
      <!-- BEGIN: File Manager Menu -->
      <div class="intro-y box p-5">
        <h2 class="intro-y text-lg font-medium mr-auto mt-2">
          Search Filter
        </h2>
        <div class="border-t border-gray-200 dark:border-dark-5 mt-4 pt-4">
          <a href="javascript:;" @click="this.showFilter('all')" class="flex items-center px-3 py-2 rounded-md">
            <div class="w-2 h-2 bg-theme-1 rounded-full mr-3"></div>
            Show all
          </a>
          <a href="javascript:;" @click="this.showFilter('posts')" class="flex items-center px-3 py-2 mt-2 rounded-md">
            <div class="w-2 h-2 bg-theme-11 rounded-full mr-3"></div>
            Postings
          </a>
          <a href="javascript:;" @click="this.showFilter('categories')" class="flex items-center px-3 py-2 mt-2 rounded-md">
            <div class="w-2 h-2 bg-theme-9 rounded-full mr-3"></div>
            Categories
          </a>
          <a href="javascript:;" @click="this.showFilter('authors')" class="flex items-center px-3 py-2 mt-2 rounded-md">
            <div class="w-2 h-2 bg-theme-12 rounded-full mr-3"></div>
            Authors
          </a>
        </div>
      </div>
      <!-- END: File Manager Menu -->
    </div>
    <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
      <!-- BEGIN: List all results -->
      <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6">
        <!-- BEGIN: Category Results -->
        <div
          v-for="result in this.view_results.cats"
          :key="result"
          class="intro-y col-span-12 sm:col-span-12 md:col-span-12 xxl:col-span-12"
        >
          <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative border-l-2 border-theme-9 pl-4">
            <div class="relative flex items-center">
              <div class="w-12 h-12 flex-none image-fit">
                <img alt="" class="rounded" :src="result.thumbnail ?? require('@/assets/images/placeholder.png')">
              </div>
              <div class="ml-4 mr-auto">
                <a href="javascript:;" class="font-medium" @click="this.$router.push({ name: 'categories.subcategory', params: { id: result.id } })">
                  {{ result.title }}
                </a>
                <div class="text-gray-600 mr-5 sm:mr-5" v-html="result.description.substring(0,400)+'...'">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Category Results -->
        <!-- BEGIN: Posts Results -->
        <div
          v-for="result in this.view_results.posts"
          :key="result"
          class="intro-y col-span-12 sm:col-span-12 md:col-span-12 xxl:col-span-12"
        >
          <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative border-l-2 border-theme-11 pl-4">
            <div class="relative flex items-center">
              <div class="w-12 h-12 flex-none image-fit">
                <img alt="" class="rounded" :src="result.thumbnail ?? require('@/assets/images/placeholder.png')">
              </div>
              <div class="ml-4 mr-auto">
                <a href="javascript:;" class="font-medium" @click="this.$router.push({ name: 'posts.view', params: { id: result.id } })">
                  {{ result.title }}
                </a>
                <div class="text-gray-600 mr-5 sm:mr-5" v-html="result.content.substring(0,400)+'...'"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Posts Results -->
        <!-- BEGIN: Authors Results -->
        <div
          v-for="result in this.view_results.users"
          :key="result"
          class="intro-y col-span-12 sm:col-span-12 md:col-span-12 xxl:col-span-12"
        >
          <div class="file box rounded-md px-5 pt-4 pb-4 px-3 sm:px-5 relative border-l-2 border-theme-12 pl-4">
            <div class="relative flex items-center">
              <div class="w-12 h-12 flex-none image-fit">
                <img alt="" class="rounded" :src="result.profile_picture ?? require('@/assets/images/avatar.png')">
              </div>
              <div class="ml-4 mr-auto">
                <a href="javascript:;" class="font-medium">
                  {{ result.name }}
                </a>
                <div class="text-gray-600 mr-5 sm:mr-5">
                  {{ result.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Authors Results -->
        <!-- BEGIN: No Content -->
        <div class="intro-y col-span-12 sm:col-span-12 md:col-span-12 xxl:col-span-12" v-if="this.view_results?.cats?.length === 0 && this.view_results?.posts?.length === 0 && this.view_results?.users?.length === 0 ">
          <div class="file box rounded-md px-5 pt-4 pb-4 px-3 sm:px-5 relative border-l-2 border-theme-6 pl-4">
            <div class="relative flex items-center">
              <div class="p-2">
                <div class="text-3xl mt-5">Your search has not found any results!</div>
                <div class="text-gray-600 mt-2 mb-5">
                  Your search did not find any results, please search for another term or name.
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: No Content -->
      </div>
      <!-- END: List all results -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  data() {
    return {
      search_results: {
        cats: [],
        posts: [],
        users: []
      },
      view_results: {
        cats: [],
        posts: [],
        users: []
      },
      search_keywords: ''
    }
  },
  methods: {
    search(keywords) {
      axios.get('search', {
        params: {
          keywords: keywords
        }
      })
        .then(response => {
          this.search_results = response.data.data
          this.view_results = response.data.data
        })
        .catch(error => {
          console.error(error)
          console.error(error.response)
        })
    },
    showFilter(filter) {
      this.view_results = {}

      if (filter === 'categories') { this.view_results.cats = this.search_results.cats }
      if (filter === 'posts') { this.view_results.posts = this.search_results.posts }
      if (filter === 'authors') { this.view_results.users = this.search_results.users }

      if (filter === 'all') {
        this.view_results = this.search_results
      }
    }
  }
})
</script>
