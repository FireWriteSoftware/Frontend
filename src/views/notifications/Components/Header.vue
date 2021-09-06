<template>
  <div class="intro-y pr-1">
    <div class="box p-4">
      <div class="mb-4">
        <h2 class="text-lg font-medium mr-auto">{{ $t('notifications.notification_center') }}</h2>
        <p>{{ $t('notifications.subtitle') }}</p>
      </div>
      <div class="chat__tabs nav nav-tabs justify-center" role="tablist">
        <a
          id="latest-tab"
          :class="'flex-1 py-2 rounded-md text-center self-center ' + (this.$route.name === 'moderation.notifications.latest' ? 'active bg-theme-1 text-white' : 'border-2')"
        >
          <router-link :to="{ name: 'moderation.notifications.latest' }">
            {{ $t('notifications.latest') }}
          </router-link>
        </a>
        <a
          id="create-notification-tab"
          :class="'flex-1 py-2 rounded-md text-center self-center mx-2 ' + (this.$route.name === 'moderation.notifications.create' ? 'active bg-theme-1 text-white' : 'border-2')"
        >
          <router-link :to="{ name: 'moderation.notifications.create' }">
            {{ $t('notifications.create') }}
          </router-link>
        </a>
        <a
          id="histories-tab"
          :class="'flex-1 py-2 rounded-md text-center self-center ' + (this.$route.name === 'moderation.notifications.histories' ? 'active bg-theme-1 text-white' : 'border-2')"
        >
          <router-link :to="{ name: 'moderation.notifications.histories' }">
            {{ $t('notifications.histories') }}
          </router-link>
        </a>
      </div>
    </div>
  </div>
</template>
