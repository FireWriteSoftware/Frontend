<template>
  <div class="intro-y pr-1">
    <div class="box p-2">
      <div class="chat__tabs nav nav-tabs justify-center" role="tablist">
        <a
          id="latest-tab"
          :class="this.$route.name === 'moderation.notifications.latest' ? 'active flex-1 py-2 rounded-md text-center self-center' : 'flex-1 py-2 rounded-md text-center self-center'"
        >
          <router-link :to="{ name: 'moderation.notifications.latest' }">
            Latest
          </router-link>
        </a>
        <a
          id="create-notification-tab"
          :class="this.$route.name === 'moderation.notifications.create' ? 'active flex-1 py-2 rounded-md text-center self-center' : 'flex-1 py-2 rounded-md text-center self-center'"
        >
          <router-link :to="{ name: 'moderation.notifications.create' }">
            Create
          </router-link>
        </a>
        <a
          id="histories-tab"
          :class="this.$route.name === 'moderation.notifications.histories' ? 'active flex-1 py-2 rounded-md text-center self-center' : 'flex-1 py-2 rounded-md text-center self-center'"
        >
          <router-link :to="{ name: 'moderation.notifications.histories' }">
            Histories
          </router-link>
        </a>
      </div>
    </div>
  </div>
</template>
