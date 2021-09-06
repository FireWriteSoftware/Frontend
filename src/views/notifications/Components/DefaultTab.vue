<template>
  <div class="intro-y col-span-12 lg:col-span-8 xxl:col-span-9">
    <div class="chat__box box">
      <div class="h-full flex items-center">
        <div class="mx-auto text-center">
          <div class="w-24 h-24 flex-none overflow-hidden mx-auto">
            <AlertTriangleIcon class="w-24 h-24"/>
          </div>
          <div class="mt-3">
            <div class="font-medium">
              {{ $t('utils.warning') }}
            </div>
            <div class="text-gray-600 mt-1">
              {{ $t('notifications.select_notification') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
