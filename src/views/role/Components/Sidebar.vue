<template>
  <div class="box p-5">
    <div class="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
      <div>
        <div class="text-gray-600">Role ID</div>
        <div class="mt-1">{{ this.role?.id ?? 'Unknown' }}</div>
      </div>
      <HashIcon class="w-4 h-4 text-gray-600 ml-auto" />
    </div>
    <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
      <div>
        <div class="text-gray-600">Role Name</div>
        <div class="mt-1">{{ this.role?.name ?? 'Unknown' }}</div>
      </div>
      <ShieldIcon class="w-4 h-4 text-gray-600 ml-auto" />
    </div>
    <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
      <div>
        <div class="text-gray-600">Created by</div>
        <div class="mt-1">{{ this.role?.user?.name ?? 'Unknown' }}</div>
      </div>
      <UserIcon class="w-4 h-4 text-gray-600 ml-auto" />
    </div>
    <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
      <div>
        <div class="text-gray-600">Created at</div>
        <div class="mt-1">{{ this.role.created_at ? formatDate(this.role.created_at) : 'Unknown' }}</div>
      </div>
      <PlusCircleIcon class="w-4 h-4 text-gray-600 ml-auto" />
    </div>
    <div class="flex items-center pt-5">
      <div>
        <div class="text-gray-600">Last Update</div>
        <div class="mt-1">{{ this.role.updated_at ? formatDate(this.role.updated_at) : 'Unknown' }}</div>
      </div>
      <ClockIcon class="w-4 h-4 text-gray-600 ml-auto" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Sidebar',
  props: ['role'],
  methods: {
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY  hh:mm')
    }
  }
}
</script>
