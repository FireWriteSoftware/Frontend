import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import TopMenu from '../layouts/top-menu/Main'
import Categories from '../views/categories/Main'
import Roles from '../views/roles/Main'
import RolePreferences from '../views/role/Preferences.vue'
import RolePermissions from '../views/role/Permissions.vue'
import RoleMembers from '../views/role/Members.vue'
import Permissions from '../views/permissions/Main.vue'
import Bans from '../views/bans/Main.vue'
import Ban from '../views/ban/Main.vue'
import Reports from '../views/reports/Main.vue'
import Tags from '../views/tags/Main.vue'
import Badges from '../views/badges/Main.vue'
import Webhooks from '../views/webhooks/Main.vue'
import PostAuthorization from '../views/post-authorization/Main.vue'
import Announcements from '../views/announcements/Main.vue'
import NotificationsLatest from '../views/notifications/Latest.vue'
import NotificationsCreate from '../views/notifications/Create.vue'
import NotificationsHistories from '../views/notifications/Histories.vue'
import NotificationView from '../views/notification/View.vue'
import NotificationEdit from '../views/notification/Edit.vue'
import Accounts from '../views/accounts/Main'
import AccountInformations from '../views/account/AccountInformations.vue'
import AccountSettings from '../views/account/AccountSettings.vue'
import AccountSecurity from '../views/account/AccountSecurity.vue'
import AccountPostings from '../views/account/AccountPostings.vue'
import AccountBookmarks from '../views/account/AccountBookmarks.vue'
import AccountBans from '../views/account/AccountBans.vue'
import SettingsGeneral from '../views/settings/SettingsGeneral.vue'
import SettingsDatabase from '../views/settings/SettingsDatabase.vue'
import SettingsMail from '../views/settings/SettingsMail.vue'
import SettingsSecurity from '../views/settings/SettingsSecurity.vue'
import Login from '../views/login/Main'
import Register from '../views/register/Main'
import ForgotPassword from '../views/forgot-password/Main'
import ResetPassword from '../views/reset-password/Main'
import EmailVerify from '../views/email-verify/Main'
import ErrorPage from '../views/error-page/Main'
import ProfileInformations from '../views/profile/ProfileInformations.vue'
import ProfileSecurity from '../views/profile/ProfileSecurity.vue'
import ProfilePostings from '../views/profile/ProfilePostings.vue'
import ProfileBookmarks from '../views/profile/ProfileBookmarks.vue'
import CreateCategories from '../views/create-category/Main'
import CreatePosts from '../views/create-post/Main'
import EditPosts from '../views/edit-post/Main'
import EditCategories from '../views/edit-category/Main'
import Search from '../views/search/Main'
import TermsOfService from '../views/terms-of-service/Main'
import PrivacyPolicy from '../views/privacy-policy/Main'
import PostSingle from '../views/post/Main'
import DocumentOverview from '../views/documents/Main'

const routes = [
  {
    path: '/',
    component: TopMenu,
    name: 'TopMenu',
    meta: {
      title: 'navigation.default',
      auth: true,
      isAuth: false
    },
    children: [
      {
        path: 'categories',
        name: 'categories',
        component: Categories,
        meta: {
          title: 'navigation.pages.categories',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'categories/:id',
        name: 'categories.subcategory',
        component: Categories,
        meta: {
          title: 'navigation.pages.subcategory',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'posts/:id',
        name: 'posts.view',
        component: PostSingle,
        meta: {
          title: 'navigation.pages.single_post',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'documents',
        name: 'documents.overview',
        component: DocumentOverview,
        meta: {
          title: 'navigation.pages.documents',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'search',
        name: 'search',
        component: Search,
        meta: {
          title: 'navigation.pages.search',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'tos',
        name: 'tos',
        component: TermsOfService,
        meta: {
          title: 'navigation.pages.tos',
          auth: false,
          isAuth: false
        }
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: PrivacyPolicy,
        meta: {
          title: 'navigation.pages.privacy_policy',
          auth: false,
          isAuth: false
        }
      }
    ]
  },
  {
    path: '/profile',
    component: TopMenu,
    name: 'Profile',
    meta: {
      title: 'navigation.pages.profile.title',
      auth: true,
      isAuth: false
    },
    children: [
      {
        path: 'informations',
        name: 'profile.informations',
        component: ProfileInformations,
        meta: {
          title: 'navigation.pages.profile.general',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'change-password',
        name: 'profile.security',
        component: ProfileSecurity,
        meta: {
          title: 'navigation.pages.profile.security',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'postings',
        name: 'profile.postings',
        component: ProfilePostings,
        meta: {
          title: 'navigation.pages.profile.my_postings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'bookmarks',
        name: 'profile.bookmarks',
        component: ProfileBookmarks,
        meta: {
          title: 'navigation.pages.profile.my_bookmarks',
          auth: true,
          isAuth: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: TopMenu,
    meta: {
      title: 'navigation.pages.administration.title',
      auth: false,
      isAuth: false
    },
    children: [
      {
        path: 'roles',
        name: 'admin.roles',
        component: Roles,
        meta: {
          title: 'navigation.pages.administration.roles.title',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'roles/:id/preferences',
        name: 'admin.role.view.preferences',
        component: RolePreferences,
        meta: {
          title: 'navigation.pages.administration.roles.preferences',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'roles/:id/permissions',
        name: 'admin.role.view.permissions',
        component: RolePermissions,
        meta: {
          title: 'navigation.pages.administration.roles.permissions',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'roles/:id/members',
        name: 'admin.role.view.members',
        component: RoleMembers,
        meta: {
          title: 'navigation.pages.administration.roles.members',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'permissions',
        name: 'admin.permissions',
        component: Permissions,
        meta: {
          title: 'navigation.pages.administration.permissions',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'bans',
        name: 'admin.bans',
        component: Bans,
        meta: {
          title: 'navigation.pages.administration.bans',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'bans/:id',
        name: 'admin.ban',
        component: Ban,
        meta: {
          title: 'navigation.pages.administration.view_ban',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts',
        name: 'admin.accounts',
        component: Accounts,
        meta: {
          title: 'navigation.pages.administration.accounts.title',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/informations',
        name: 'admin.accounts.informations',
        component: AccountInformations,
        meta: {
          title: 'navigation.pages.administration.accounts.informations',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/settings',
        name: 'admin.accounts.settings',
        component: AccountSettings,
        meta: {
          title: 'navigation.pages.administration.accounts.settings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/security',
        name: 'admin.accounts.security',
        component: AccountSecurity,
        meta: {
          title: 'navigation.pages.administration.accounts.security',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/postings',
        name: 'admin.accounts.postings',
        component: AccountPostings,
        meta: {
          title: 'navigation.pages.administration.accounts.postings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/bookmarks',
        name: 'admin.accounts.bookmarks',
        component: AccountBookmarks,
        meta: {
          title: 'navigation.pages.administration.accounts.bookmarks',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/bans',
        name: 'admin.accounts.bans',
        component: AccountBans,
        meta: {
          title: 'navigation.pages.administration.accounts.bans',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/general',
        name: 'admin.settings.general',
        component: SettingsGeneral,
        meta: {
          title: 'navigation.pages.administration.settings.general',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/database',
        name: 'admin.settings.database',
        component: SettingsDatabase,
        meta: {
          title: 'navigation.pages.administration.settings.database',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/mail',
        name: 'admin.settings.mail',
        component: SettingsMail,
        meta: {
          title: 'navigation.pages.administration.settings.mail',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/security',
        name: 'admin.settings.security',
        component: SettingsSecurity,
        meta: {
          title: 'navigation.pages.administration.settings.security',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'badges',
        name: 'admin.badges',
        component: Badges,
        meta: {
          title: 'navigation.pages.administration.badges',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'webhooks',
        name: 'admin.webhooks',
        component: Webhooks,
        meta: {
          title: 'navigation.pages.administration.webhooks',
          auth: true,
          isAuth: false
        }
      }
    ]
  },
  {
    path: '/moderation',
    component: TopMenu,
    meta: {
      title: 'navigation.pages.moderation.title',
      auth: false,
      isAuth: false
    },
    children: [
      {
        path: 'tags',
        name: 'moderation.tags',
        component: Tags,
        meta: {
          title: 'navigation.pages.moderation.tags',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'announcements',
        name: 'moderation.announcements',
        component: Announcements,
        meta: {
          title: 'navigation.pages.moderation.announcements',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'reports',
        name: 'moderation.reports',
        component: Reports,
        meta: {
          title: 'navigation.pages.moderation.reports',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'notification/:id',
        name: 'moderation.notifications.view',
        component: NotificationView,
        meta: {
          title: 'navigation.pages.moderation.notifications.view',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'notification/:id/edit',
        name: 'moderation.notifications.edit',
        component: NotificationEdit,
        meta: {
          title: 'navigation.pages.moderation.notifications.edit',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'notifications/latest',
        name: 'moderation.notifications.latest',
        component: NotificationsLatest,
        meta: {
          title: 'navigation.pages.moderation.notifications.latest',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'notifications/create',
        name: 'moderation.notifications.create',
        component: NotificationsCreate,
        meta: {
          title: 'navigation.pages.moderation.notifications.create',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'notifications/histories',
        name: 'moderation.notifications.histories',
        component: NotificationsHistories,
        meta: {
          title: 'navigation.pages.moderation.notifications.history',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'authorizations',
        name: 'moderation.authorizations',
        component: PostAuthorization,
        meta: {
          title: 'navigation.pages.moderation.post_authorization',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'categories/create',
        name: 'moderation.categories.create',
        component: CreateCategories,
        meta: {
          title: 'navigation.pages.moderation.create_category',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'posts/create',
        name: 'moderation.posts.create',
        component: CreatePosts,
        meta: {
          title: 'navigation.pages.moderation.create_post',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'posts/:id/edit',
        name: 'moderation.posts.edit',
        component: EditPosts,
        meta: {
          title: 'navigation.pages.moderation.edit_post',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'categories/:id/edit',
        name: 'moderation.categories.edit',
        component: EditCategories,
        meta: {
          title: 'navigation.pages.moderation.edit_category',
          auth: true,
          isAuth: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'navigation.pages.auth_pages.login',
      auth: false,
      isAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'navigation.pages.auth_pages.register',
      auth: false,
      isAuth: true
    }
  },
  {
    path: '/email/verify',
    name: 'email-verify',
    component: EmailVerify,
    meta: {
      title: 'navigation.pages.auth_pages.email_verify',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/password/forgot',
    name: 'password-forgot',
    component: ForgotPassword,
    meta: {
      title: 'navigation.pages.auth_pages.forgot_password',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/password/reset',
    name: 'password-reset',
    component: ResetPassword,
    meta: {
      title: 'navigation.pages.auth_pages.reset_password',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage,
    meta: {
      title: 'navigation.pages.auth_pages.error',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    meta: {
      title: 'navigation.pages.auth_pages.error',
      auth: false,
      isAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const toWithMeta = to.matched.slice().reverse().find(r => r.meta)
  let isLoggedIn = false

  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

  if (!localStorage.getItem('token')) {
    try {
      const response = await axios.get('auth/user')
      isLoggedIn = response.data.success
    } catch (error) { }

    axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
  }

  if (toWithMeta.meta?.auth && !isLoggedIn) {
    next({
      path: '/login',
      query: {
        redirect: toWithMeta.fullPath
      }
    })
  }

  if (toWithMeta.meta?.isAuth && isLoggedIn) {
    next({
      path: '/',
      query: {
        redirect: toWithMeta.fullPath
      }
    })
  }

  // document.title = process.env.BASE_URL

  next()
})

export default router
