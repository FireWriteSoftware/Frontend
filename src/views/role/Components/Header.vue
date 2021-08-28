<template>
  <div class="box p-5 mt-5">
    <div class="mb-5">
      <h1 class="text-xl font-medium mr-auto">{{ role?.name }}</h1>
      <div class="w-1/2">{{ role?.description }}</div>
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
      <router-link :to="{ name: 'admin.role.view.preferences', params: { id: role?.id } }">
        <div :class="'py-3 px-5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-5 transition duration-500 ' + (this.$route.name === 'admin.role.view.preferences' ? 'border-2 border-theme-1 dark:border-theme-1' : 'border dark:border-gray-600')">
          <h2 class="text-lg font-medium mr-auto">Preferences</h2>
          <div class="mr-auto text-sm text-gray-700 dark:text-gray-500">Here you can make general settings of the role</div>
        </div>
      </router-link>
      <router-link :to="{ name: 'admin.role.view.permissions', params: { id: role?.id } }">
        <div :class="'py-3 px-5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-5 transition duration-500 ' + (this.$route.name === 'admin.role.view.permissions' ? 'border-2 border-theme-1 dark:border-theme-1' : 'border dark:border-gray-600')">
          <h2 class="text-lg font-medium mr-auto">Permissions</h2>
          <div class="mr-auto text-sm text-gray-700 dark:text-gray-500">Here you can make general settings of the role</div>
        </div>
      </router-link>
      <div class="py-3 px-5 rounded-lg border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-dark-5 transition duration-500">
        <h2 class="text-lg font-medium mr-auto">Members</h2>
        <div class="mr-auto text-sm text-gray-700 dark:text-gray-500">Here you can make general settings of the role</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['role']
}
</script>
