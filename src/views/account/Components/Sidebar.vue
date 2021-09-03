<template>
  <div class="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse">
    <!-- END: Sidebar navigation -->
    <div class="intro-y box mt-5">
      <div class="relative flex items-center p-5">
        <div class="w-12 h-12 image-fit">
          <img
            alt=""
            class="rounded-full"
            :src="user.profile_picture ?? require('@/assets/images/avatar.png')"
          />
        </div>
        <div class="ml-4 mr-auto">
          <div class="font-medium text-base">
            {{ this.user.name }}
          </div>
          <div class="text-gray-600">
            {{ this.user.role?.name }}
          </div>
        </div>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <router-link :to="{ 'name': 'admin.accounts.informations', 'params': { id: this.$route.params.id }}">
          <a :class="'flex items-center ' + (this.$route.name === 'admin.accounts.informations' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')" href="">
            <UserIcon class="w-4 h-4 mr-2"/>
            {{ $t('accounts.account_informations') }}
          </a>
        </router-link>
        <router-link :to="{ 'name': 'admin.accounts.settings', 'params': { id: this.$route.params.id }}">
          <a :class="'flex items-center mt-5 ' + (this.$route.name === 'admin.accounts.settings' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')">
            <BoxIcon class="w-4 h-4 mr-2"/>
            {{ $t('accounts.account_settings') }}
          </a>
        </router-link>
        <router-link :to="{ 'name': 'admin.accounts.security', 'params': { id: this.$route.params.id }}">
          <a :class="'flex items-center mt-5 ' + (this.$route.name === 'admin.accounts.security' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')">
            <LockIcon class="w-4 h-4 mr-2"/>
            {{ $t('accounts.security') }}
          </a>
        </router-link>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <router-link :to="{ 'name': 'admin.accounts.postings', 'params': { id: this.$route.params.id }}">
          <a :class="'flex items-center mt-5 ' + (this.$route.name === 'admin.accounts.postings' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')">
            <PaperclipIcon class="w-4 h-4 mr-2"/>
            {{ $t('accounts.postings') }}
          </a>
        </router-link>
        <router-link :to="{ 'name': 'admin.accounts.bookmarks', 'params': { id: this.$route.params.id }}">
          <a :class="'flex items-center mt-5 ' + (this.$route.name === 'admin.accounts.bookmarks' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')">
            <BookmarkIcon class="w-4 h-4 mr-2"/>
            {{ $t('accounts.bookmarks') }}
          </a>
        </router-link>
        <router-link :to="{ 'name': 'admin.accounts.bans', 'params': { id: this.$route.params.id }}">
          <a :class="'flex items-center mt-5 ' + (this.$route.name === 'admin.accounts.bans' ? 'text-theme-1 dark:text-theme-10 font-medium' : '')">
            <SlashIcon class="w-4 h-4 mr-2"/>
            {{ $t('accounts.bans') }}
          </a>
        </router-link>
      </div>
    </div>
    <!-- END: Sidebar navigation -->
    <!-- BEGIN: Account Informations -->
    <div class="intro-y box mt-5 p-5">
      <div class="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
        <div>
          <div class="text-gray-600">{{ $t('attributes.username') }}</div>
          <div class="mt-1">{{ this.user.name }}</div>
        </div>
        <TagIcon class="w-4 h-4 text-gray-600 ml-auto" />
      </div>
      <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
        <div>
          <div class="text-gray-600">{{ $t('accounts.fullname') }}</div>
          <div class="mt-1">{{ this.user.pre_name }} {{ this.user.last_name }}</div>
        </div>
        <UserIcon class="w-4 h-4 text-gray-600 ml-auto" />
      </div>
      <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
        <div>
          <div class="text-gray-600">{{ $t('attributes.role') }}</div>
          <div class="mt-1">{{ this.user?.role?.name }}</div>
        </div>
        <ShieldIcon class="w-4 h-4 text-gray-600 ml-auto" />
      </div>
      <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
        <div>
          <div class="text-gray-600">{{ $t('attributes.updated_at') }}</div>
          <div class="mt-1">{{ this.formatDate(this.user.updated_at) }}</div>
        </div>
        <ClockIcon class="w-4 h-4 text-gray-600 ml-auto" />
      </div>
      <div class="flex items-center pt-5">
        <div>
          <div class="text-gray-600">{{ $t('attributes.created_at') }}</div>
          <div class="mt-1">{{ this.formatDate(this.user.created_at) }}</div>
        </div>
        <UserPlusIcon class="w-4 h-4 text-gray-600 ml-auto" />
      </div>
    </div>
    <!-- END: Account Informations -->
  </div>
  <!-- END: Sidebar -->
</template>

<script>
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  props: ['user'],
  methods: {
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY')
    }
  }
})
</script>
