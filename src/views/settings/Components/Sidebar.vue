<template>
    <!-- BEGIN: Inbox Menu -->
    <div class="intro-y box bg-theme-1 p-5 mt-6">
      <button type="button" class="btn text-gray-700 dark:text-gray-300 w-full bg-white dark:bg-theme-1 mt-1">
        {{ this?.title }}
      </button>
      <div class="border-t border-theme-3 dark:border-dark-5 mt-6 pt-6 text-white">
        <router-link :to="{ name: 'admin.settings.general' }">
          <a :class="'flex items-center px-3 py-2 mt-2 rounded-md ' + (this.$route.name === 'admin.settings.general' ? 'bg-theme-20 dark:bg-dark-1 font-medium' : '')" href="">
            <GlobeIcon class="w-4 h-4 mr-2"/> General
          </a>
        </router-link>
        <router-link :to="{ name: 'admin.settings.security' }">
          <a :class="'flex items-center px-3 py-2 mt-2 rounded-md ' + (this.$route.name === 'admin.settings.security' ? 'bg-theme-20 dark:bg-dark-1 font-medium' : '')" href="">
              <LockIcon class="w-4 h-4 mr-2"/> Security
          </a>
        </router-link>
        <router-link :to="{ name: 'admin.settings.database' }">
          <a :class="'flex items-center px-3 py-2 mt-2 rounded-md ' + (this.$route.name === 'admin.settings.database' ? 'bg-theme-20 dark:bg-dark-1 font-medium' : '')" href="">
              <DatabaseIcon class="w-4 h-4 mr-2"/> Database
          </a>
        </router-link>
        <router-link :to="{ name: 'admin.settings.mail' }">
          <a :class="'flex items-center px-3 py-2 mt-2 rounded-md ' + (this.$route.name === 'admin.settings.mail' ? 'bg-theme-20 dark:bg-dark-1 font-medium' : '')" href="">
              <MailIcon class="w-4 h-4 mr-2"/> Mails
          </a>
        </router-link>
      </div>
      <div class="border-t border-theme-3 dark:border-dark-5 mt-4 pt-4 text-white">
        <a :href="this.supportlink" class="flex items-center px-3 py-2 mt-2 rounded-md">
          <LifeBuoyIcon class="w-4 h-4 mr-2"/>Support
        </a>
        <a :href="this.docslink" class="flex items-center px-3 py-2 mt-2 rounded-md">
          <BookIcon class="w-4 h-4 mr-2"/>Documentation
        </a>
        <a :href="this.contactlink" class="flex items-center px-3 py-2 mt-2 rounded-md">
          <SendIcon class="w-4 h-4 mr-2"/>Contact
        </a>
      </div>
    </div>
    <!-- END: Inbox Menu -->
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String
  },
  data() {
    return {
      supportlink: process.env.VUE_APP_SUPPORTLINK,
      docslink: process.env.VUE_APP_DOCUMENTATIONLINK,
      contactlink: process.env.VUE_APP_CONTACTLINK
    }
  }
})
</script>
