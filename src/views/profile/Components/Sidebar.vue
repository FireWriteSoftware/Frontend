<template>
  <div class="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse">
    <div class="intro-y box mt-5">
      <div class="relative flex items-center p-5">
        <div class="w-12 h-12 image-fit">
          <img
            alt=""
            class="rounded-full"
            :src="this.user.profile_picture ?? require('@/assets/images/avatar.png')"
          />
        </div>
        <div class="ml-4 mr-auto">
          <div class="font-medium text-base">
            {{ this.user.name }}
          </div>
          <div class="text-gray-600">{{ this.user.email }}</div>
        </div>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <router-link :to="{ name: 'profile.informations' }">
            <a :class="'flex items-center ' + (this.$route.name === 'profile.informations' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')" href="javascript:;">
            <UserIcon class="w-4 h-4 mr-2"/> Personal Information
          </a>
        </router-link>
        <router-link :to="{ name: 'profile.security' }">
          <a :class="'flex items-center ' + (this.$route.name === 'profile.security' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')" href="javascript:;">
            <LockIcon class="w-4 h-4 mr-2"/> Change Password
          </a>
        </router-link>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <router-link :to="{ name: 'profile.postings' }">
          <a :class="'flex items-center ' + (this.$route.name === 'profile.postings' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')" href="javascript:;">
            <FolderIcon class="w-4 h-4 mr-2"/> My Postings
          </a>
        </router-link>
        <router-link :to="{ name: 'profile.bookmarks' }">
          <a :class="'flex items-center ' + (this.$route.name === 'profile.bookmarks' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')" href="javascript:;">
            <BookmarkIcon class="w-4 h-4 mr-2"/> My Bookmarks
          </a>
        </router-link>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <router-link :to="{ name: 'tos' }">
          <a class="flex items-center" href="">
            <BookIcon class="w-4 h-4 mr-2"/> Terms of service
          </a>
        </router-link>
        <router-link :to="{ name: 'privacy' }">
          <a class="flex items-center mt-3" href="">
            <ServerIcon class="w-4 h-4 mr-2"/> Privacy policy
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['user']
})
</script>
