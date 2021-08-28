<template>
  <!-- BEGIN: Search -->
  <div class="intro-x relative mr-3 sm:mr-6">
    <form @submit.prevent="search(this.keywords)">
      <div class="search hidden sm:block">
        <input
          type="text"
          class="search__input form-control dark:bg-dark-1 border-transparent placeholder-theme-13"
          placeholder="Search..."
          @focus="showSearchDropdown"
          @blur="hideSearchDropdown"
          v-model="keywords"
        />
        <SearchIcon class="search__icon dark:text-gray-300" />
      </div>
      <router-link :to="{ name: 'search' }">
        <a class="notification notification--light sm:hidden">
          <SearchIcon class="notification__icon dark:text-gray-300" />
        </a>
      </router-link>
    </form>
    <div class="search-result" :class="{ show: searchDropdown }">
      <div class="search-result__content">
        <div class="intro-y col-span-12 sm:col-span-12 md:col-span-12 xxl:col-span-12" v-if="this.search_results.cats.length === 0 && this.search_results.posts.length === 0 && this.search_results.users.length === 0">
          <div class="relative flex items-center">
            <div class="p-1">
              <div class="text-3xl">Nothing found</div>
              <div class="text-gray-600 mt-2">
                Please select another Keyword to search.
              </div>
            </div>
          </div>
        </div>
        <div class="search-result__content__title" v-if="this.search_results.cats.length > 0">Categories</div>
        <div class="mb-5">
          <a
            v-for="result in this.search_results.cats.slice(0, 5)"
            v-bind:key="result.id"
            href="javascript:;"
            @click="this.$router.push({ name: 'categories.subcategory', params: { id: result.id } })"
            class="flex items-center mt-2"
          >
            <div class="w-8 h-8 image-fit">
              <img
                alt=""
                class="rounded"
                :src="result.thumbnail ?? require('@/assets/images/placeholder.png')"
              />
            </div>
            <div class="ml-3">{{ result.title }}</div>
            <div class="ml-auto w-48 truncate text-gray-600 text-xs text-right">
              {{ result.description }}
            </div>
          </a>
        </div>
        <div class="search-result__content__title" v-if="this.search_results.posts.length > 0">Posts</div>
        <div class="mb-5">
          <a
            v-for="result in this.search_results.posts.slice(0, 5)"
            v-bind:key="result.id"
            href="javascript:;"
            @click="this.$router.push({ name: 'posts.view', params: { id: result.id } })"
            class="flex items-center mt-2"
          >
            <div class="w-8 h-8 image-fit">
              <img
                alt=""
                class="rounded"
                :src="result.thumbnail ?? require('@/assets/images/placeholder.png')"
              />
            </div>
            <div class="ml-3">{{ result.title }}</div>
            <div class="ml-auto w-48 truncate text-gray-600 text-xs text-right" v-html="result.content.substring(0,20)"></div>
          </a>
        </div>
        <div class="search-result__content__title" v-if="this.search_results.users.length > 0">Authors</div>
        <div class="mb-5">
          <a
            v-for="result in this.search_results.users.slice(0, 5)"
            v-bind:key="result.id"
            href="javascript:;"
            class="flex items-center mt-2"
          >
            <div class="w-8 h-8 image-fit">
              <img
                alt=""
                class="rounded-full"
                :src="result.profile_picture ?? require('@/assets/images/avatar.png')"
              />
            </div>
            <div class="ml-3">{{ result.name }}</div>
            <div class="ml-auto w-48 truncate text-gray-600 text-xs text-right">
              {{ result.email }}
            </div>
          </a>
        </div>
        <router-link :to="{ name: 'search' }">
          <button class="btn btn-primary mr-2 mb-2">
            <SearchIcon class="w-4 h-4 mr-2" /> View Searchpage
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <!-- END: Search -->
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import {
  searchDropdown,
  showSearchDropdown,
  hideSearchDropdown
} from './index'
import { linkTo } from '@/layouts/side-menu'

export default defineComponent({
  data() {
    return {
      keywords: '',
      search_results: {
        cats: [],
        posts: [],
        users: []
      }
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
    }
  },
  setup() {
    const router = useRouter()
    const formattedMenu = ref([])

    return {
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown,
      formattedMenu,
      router,
      linkTo
    }
  }
})
</script>
