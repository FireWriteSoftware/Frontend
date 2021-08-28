<template>
  <div>
    <DarkModeSwitcher />

    <MobileMenu />

    <!-- BEGIN: View Notification Modal -->
    <div id="view-notification-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              <component :is="this.view_notification.icon"></component> {{ this?.view_notification?.title }}
            </h2>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <p>{{ this?.view_notification?.content }}</p>
            </div>
          </div>
          <!-- END: Modal Body -->
          <!-- BEGIN: Modal Footer -->
          <div class="modal-footer text-right">
            <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
              Close
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </div>
    </div>
    <!-- END: View Notification Modal -->
    <!-- BEGIN: Top Bar -->
    <div class="-mt-10 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-2">
      <div class="top-bar-boxed flex items-center">
        <!-- BEGIN: Logo -->
        <router-link
          :to="{ name: 'categories' }"
          tag="a"
          class="-intro-x hidden md:flex"
        >
          <img
            alt=""
            class="w-6"
            :src="this?.wiki_settings?.logo"
          />
          <span class="text-white text-lg ml-3">
            <span class="font-medium">{{ this?.wiki_settings?.name }}</span>
          </span>
        </router-link>
        <!-- END: Logo -->

        <!-- BEGIN: Breadcrumb -->
        <div class="-intro-x breadcrumb breadcrumb--light mr-auto">
          <div v-for="breadcrum in this?.breadcrums" v-bind:key="breadcrum.path" class="flex">
            <a href="" :class="breadcrum.name === this.$router.name ? '' : 'breadcrumb--active'">{{ breadcrum.meta.title }}</a>
            <ChevronRightIcon class="breadcrumb__icon self-center" v-if="breadcrum.children.length !== 0"/>
          </div>
        </div>
        <!-- END: Breadcrumb -->
        <Searchbar v-if='this.loggedIn'></Searchbar>
        <!-- BEGIN: Notifications -->
        <div class="intro-x dropdown mr-4 sm:mr-6" v-if='this.loggedIn'>
          <div
            class="dropdown-toggle notification notification--light cursor-pointer"
            :class="this?.notifications.length > 0 ? 'notification--bullet' : ''"
            role="button"
            aria-expanded="false"
          >
            <BellIcon class="notification__icon dark:text-gray-300"/>
          </div>
          <div class="notification-content pt-2 dropdown-menu">
            <div
              class="p-3 dropdown-menu__content box dark:bg-dark-6"
            >
              <div class="notification-content__title">Notifications</div>
              <a
                v-for="notification in this?.notifications"
                v-bind:key="notification.id"
                class="cursor-pointer flex items-center hover:bg-gray-200 dark:hover:bg-dark-3 p-2 rounded-lg w-full"
                type="button"
                @click="this.viewNotification(notification)"
                data-toggle="modal"
                data-target="#view-notification-modal"
              >
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt=""
                    class="rounded-full"
                    :src="notification.user.profile_picture ?? require('@/assets/images/avatar.png')"
                  />
                  <div class="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                </div>
                <div class="ml-2 overflow-hidden w-full">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium truncate mr-5">
                      {{ notification.title }}
                    </a>
                    <div class="text-xs text-gray-500 ml-auto whitespace-nowrap">
                      {{ formatDate(notification.created_at) }}
                    </div>
                  </div>
                  <div class="flex truncate text-gray-600 mt-0.5">
                    {{ notification.content }}
                  </div>
                </div>
              </a>
              <div v-if="this.notifications.length === 0" class="text-xs text-gray-500 ml-auto whitespace-nowrap">
                No recent Notifications!
              </div>
            </div>
          </div>
        </div>
        <!-- END: Notifications -->
        <!-- BEGIN: Account Menu -->
        <div class="intro-x dropdown w-8 h-8" v-if='this.loggedIn'>
          <div
            class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            role="button"
            aria-expanded="false"
          >
            <img
              alt=""
              :src="user.profile_picture ?? require('@/assets/images/avatar.png')"
            />
          </div>
          <div class="dropdown-menu w-56">
            <div
              class="dropdown-menu__content box bg-theme-26 dark:bg-dark-6 text-white"
            >
              <div class="p-4 border-b border-theme-27 dark:border-dark-3">
                <div class="font-medium">{{ user?.name }}</div>
                <div class="text-xs text-theme-41 mt-0.5 dark:text-gray-600">
                  {{ user?.email }}
                </div>
              </div>
              <div class="p-2">
                <router-link :to="{ name: 'profile.informations' }">
                  <a href="#" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                    <UserIcon class="w-4 h-4 mr-2" /> Profile
                  </a>
                </router-link>
                <router-link :to="{ name: 'profile.security' }">
                  <a href="#" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                    <LockIcon class="w-4 h-4 mr-2" /> Change Password
                  </a>
                </router-link>
              </div>
              <div class="p-2 border-t border-theme-27 dark:border-dark-3">
                <a v-on:click="logout" href="#" data-dismiss="dropdown" class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                  <LogOutIcon class="w-4 h-4 mr-2"/>Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Account Menu -->
        <!-- BEGIN: Login Icon -->
        <router-link
          :to="{ name: 'login' }"
          tag="a"
          class="intro-x mr-4 sm:mr-6"
          v-if='!this.loggedIn'
        >
          <div
            class="notification notification--light notification--bullet cursor-pointer"
            role="button"
          >
            <LogInIcon class="dark:text-gray-300" />
          </div>
        </router-link>
        <!-- END: Login Icon -->
      </div>
    </div>
    <!-- END: Top Bar -->
    <!-- BEGIN: Top Menu -->
    <nav class="top-nav">
      <ul>
        <!-- BEGIN: First Child -->
        <!-- Checking User Permissions v-show="menu.permission === null || this?.permissions?.includes(menu?.permission)"-->
        <li v-for="(menu, menuKey) in formattedMenu" :key="menuKey">
          <a
            :href="menu.subMenu ? 'javascript:;' : router.resolve({ name: menu.pageName }).path"
            class="top-menu"
            :class="{
              'top-menu--active': menu.active
            }"
            @click="linkTo(menu, router, $event)"
            v-if="this.permissions[menu.permission]"
          >
            <div class="top-menu__icon">
              <component :is="menu.icon" />
            </div>
            <div class="top-menu__title">
              {{ menu.title }}
              <ChevronDownIcon v-if="menu.subMenu" class="top-menu__sub-icon" />
            </div>
          </a>
          <!-- BEGIN: Second Child -->
          <ul v-if="menu.subMenu">
            <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
              <a
                :href="
                  subMenu.subMenu
                    ? 'javascript:;'
                    : router.resolve({ name: subMenu.pageName }).path
                "
                class="top-menu"
                @click="linkTo(subMenu, router, $event)"
              >
                <div class="top-menu__icon">
                  <component :is="subMenu.icon" />
                </div>
                <div class="top-menu__title">
                  {{ subMenu.title }}
                  <ChevronDownIcon
                    v-if="subMenu.subMenu"
                    class="top-menu__sub-icon"
                  />
                </div>
              </a>
              <!-- BEGIN: Third Child -->
              <ul v-if="subMenu.subMenu">
                <li
                  v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                  :key="lastSubMenuKey"
                >
                  <a
                    :href="
                      lastSubMenu.subMenu
                        ? 'javascript:;'
                        : router.resolve({ name: lastSubMenu.pageName }).path
                    "
                    class="top-menu"
                    @click="linkTo(lastSubMenu, router, $event)"
                  >
                    <div class="top-menu__icon">
                      <component :is="lastSubMenu.icon" />
                    </div>
                    <div class="top-menu__title">
                      {{ lastSubMenu.title }}
                    </div>
                  </a>
                </li>
              </ul>
              <!-- END: Third Child -->
            </li>
          </ul>
          <!-- END: Second Child -->
        </li>
        <!-- END: First Child -->
      </ul>
    </nav>
    <!-- END: Top Menu -->
    <!-- BEGIN: Content -->
    <div class="content">
      <router-view/>
    </div>
    <!-- END: Content -->
    <div class="footer mt-5">
      <div class="my-5">
        <div class="flex px-3 m-auto text-gray-800 text-sm flex-col md:flex-row max-w-6xl">
          <div class="my-3 dark:text-theme-2">© Copyright 2021. All Rights Reserved.</div>
          <div class="md:flex-auto md:flex-row-reverse flex-row flex">
            <a class="my-3 block dark:text-theme-2" :href="'mailto:' + wiki_settings.contactmail">Contact <span class="text-teal-600 text-xs p-1"></span></a>
            <router-link :to="{ name: 'tos' }">
              <a class="my-3 block dark:text-theme-2 mr-4">Conditions</a>
            </router-link>
            <router-link :to="{ name: 'privacy' }">
              <a class="my-3 block dark:text-theme-2 mr-4">Privacy Policy</a>
            </router-link>
            <a class="my-3 block dark:text-theme-2 mr-4" :href="wiki_settings.supportlink">Help</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { helper as $h } from '@/utils/helper'
import TopBar from '@/components/top-bar/Main.vue'
import MobileMenu from '@/components/mobile-menu/Main.vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import axios from 'axios'

import {
  searchDropdown,
  showSearchDropdown,
  hideSearchDropdown
} from './index'
import { nestedMenu, linkTo } from '@/layouts/side-menu'
import Searchbar from './Searchbar.vue'
import moment from 'moment'

export default defineComponent({
  components: {
    Searchbar,
    TopBar,
    MobileMenu,
    DarkModeSwitcher
  },
  data() {
    return {
      user: {},
      view_notification: {},
      notifications: [],
      loggedIn: false,
      breadcrums: [],
      permissions: [],
      wiki_settings: {
        name: process.env.VUE_APP_NAME,
        logo: process.env.VUE_APP_LOGO,
        supportlink: process.env.VUE_APP_SUPPORTLINK,
        contactmail: process.env.VUE_APP_CONTACTMAIL,
        social_discord: process.env.VUE_APP_SOCIAL_DISCORD,
        social_linkedin: process.env.VUE_APP_SOCIAL_LINKEDIN,
        social_instagram: process.env.VUE_APP_SOCIAL_INSTAGRAM,
        social_twitter: process.env.VUE_APP_SOCIAL_TWITTER,
        social_facebook: process.env.VUE_APP_SOCIAL_FACEBOOK,
        social_youtube: process.env.VUE_APP_SOCIAL_YOUTUBE
      }
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.name === 'TopMenu') {
        this.$router.push({ name: 'categories' })
      }
      this.breadcrums = this.$route.matched
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) this.loggedIn = true
    if (this.loggedIn) {
      if (this.$route.name === 'TopMenu') {
        this.$router.push({ name: 'categories' })
      }
      this.testPagePermissions()
      this.fetchNotifications()
      this.breadcrums = this.$route.matched
    } else {
      if (this.$route.name === 'TopMenu') {
        this.$router.push({ name: 'login' })
      }
    }
    localStorage.getItem('darkmode') != null && localStorage.getItem('darkmode') === 'true'
      ? cash('html').addClass('dark')
      : cash('html').removeClass('dark')
  },
  methods: {
    logout() {
      axios.get('auth/logout')
        .then(response => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          this.$router.push({ name: 'login' })
        })
    },
    testPagePermissions() {
      const availablePermissions = []
      for (const category in this.formattedMenu) {
        if (this.formattedMenu[category].permission) {
          availablePermissions.push(this.formattedMenu[category].permission)
        }
      }
      axios.post('permissions/test', {
        permissions: availablePermissions
      })
        .then((response) => {
          this.permissions = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchNotifications() {
      axios.get('notifications/own?unseen=1')
        .then(response => {
          this.notifications = response.data.data
        })
    },
    viewNotification(notification) {
      this.view_notification = notification
      axios.put('notifications/' + notification.id, {
        title: notification.title,
        color: notification.color,
        content: notification.content,
        type: notification.type,
        icon: notification.icon,
        seen: 1
      })
        .then(response => {
          this.fetchNotifications()
        })
    },
    formatDate(timeString) {
      return moment(String(timeString)).format('MMM Do YYYY')
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const formattedMenu = ref([])
    const topMenu = computed(() => nestedMenu(store.state.topMenu.menu, route))

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = $h.toRaw(topMenu.value)
      }
    )

    onMounted(() => {
      cash('body')
        .removeClass('error-page')
        .removeClass('login')
        .addClass('main')
      formattedMenu.value = $h.toRaw(topMenu.value)
    })

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
