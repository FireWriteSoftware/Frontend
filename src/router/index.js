import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import TopMenu from '../layouts/top-menu/Main.vue'
import Categories from '../views/categories/Main.vue'
import Roles from '../views/roles/Main.vue'
import RolePreferences from '../views/role/Preferences.vue'
import RolePermissions from '../views/role/Permissions.vue'
import RoleMembers from '../views/role/Members.vue'
import Permissions from '../views/permissions/Main.vue'
import Bans from '../views/bans/Main.vue'
import Ban from '../views/ban/Main.vue'
import Reports from '../views/reports/Main.vue'
import Tags from '../views/tags/Main.vue'
import Badges from '../views/badges/Main.vue'
import PostAuthorization from '../views/post-authorization/Main.vue'
import Announcements from '../views/announcements/Main.vue'
import Notifications from '../views/notifications/Main.vue'
import Accounts from '../views/accounts/Main.vue'
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
import Login from '../views/login/Main.vue'
import Register from '../views/register/Main.vue'
import ForgotPassword from '../views/forgot-password/Main.vue'
import ResetPassword from '../views/reset-password/Main.vue'
import EmailVerify from '../views/email-verify/Main.vue'
import ErrorPage from '../views/error-page/Main.vue'
import ProfileInformations from '../views/profile/ProfileInformations.vue'
import ProfileSecurity from '../views/profile/ProfileSecurity.vue'
import ProfilePostings from '../views/profile/ProfilePostings.vue'
import ProfileBookmarks from '../views/profile/ProfileBookmarks.vue'
import CreateCategories from '../views/create-category/Main.vue'
import CreatePosts from '../views/create-post/Main.vue'
import EditPosts from '../views/edit-post/Main.vue'
import EditCategories from '../views/edit-category/Main.vue'
import Search from '../views/search/Main.vue'
import TermsOfService from '../views/terms-of-service/Main.vue'
import PrivacyPolicy from '../views/privacy-policy/Main.vue'
import PostSingle from '../views/post/Main.vue'

const routes = [
  {
    path: '/',
    component: TopMenu,
    name: 'TopMenu',
    meta: {
      title: 'Wiki',
      auth: true,
      isAuth: false
    },
    children: [
      {
        path: 'categories',
        name: 'categories',
        component: Categories,
        meta: {
          title: 'Categories',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'categories/:id',
        name: 'categories.subcategory',
        component: Categories,
        meta: {
          title: 'Categories',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'posts/:id',
        name: 'posts.view',
        component: PostSingle,
        meta: {
          title: 'View Post',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'search',
        name: 'search',
        component: Search,
        meta: {
          title: 'Search',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'tos',
        name: 'tos',
        component: TermsOfService,
        meta: {
          title: 'Terms of Service',
          auth: false,
          isAuth: false
        }
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: PrivacyPolicy,
        meta: {
          title: 'Privacy Policy',
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
      title: 'Profile',
      auth: true,
      isAuth: false
    },
    children: [
      {
        path: 'informations',
        name: 'profile.informations',
        component: ProfileInformations,
        meta: {
          title: 'General',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'change-password',
        name: 'profile.security',
        component: ProfileSecurity,
        meta: {
          title: 'Change Password',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'postings',
        name: 'profile.postings',
        component: ProfilePostings,
        meta: {
          title: 'My Postings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'bookmarks',
        name: 'profile.bookmarks',
        component: ProfileBookmarks,
        meta: {
          title: 'My Bookmarks',
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
      title: 'Administration',
      auth: false,
      isAuth: false
    },
    children: [
      {
        path: 'roles',
        name: 'admin.roles',
        component: Roles,
        meta: {
          title: 'Roles',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'roles/:id/preferences',
        name: 'admin.role.view.preferences',
        component: RolePreferences,
        meta: {
          title: 'Role Preferences',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'roles/:id/permissions',
        name: 'admin.role.view.permissions',
        component: RolePermissions,
        meta: {
          title: 'Role Permissions',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'roles/:id/members',
        name: 'admin.role.view.members',
        component: RoleMembers,
        meta: {
          title: 'Role Members',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'permissions',
        name: 'admin.permissions',
        component: Permissions,
        meta: {
          title: 'Permissions',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'bans',
        name: 'admin.bans',
        component: Bans,
        meta: {
          title: 'Bans',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'bans/:id',
        name: 'admin.ban',
        component: Ban,
        meta: {
          title: 'View Ban',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts',
        name: 'admin.accounts',
        component: Accounts,
        meta: {
          title: 'Accounts',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/informations',
        name: 'admin.accounts.informations',
        component: AccountInformations,
        meta: {
          title: 'Account Informations',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/settings',
        name: 'admin.accounts.settings',
        component: AccountSettings,
        meta: {
          title: 'Account Settings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/security',
        name: 'admin.accounts.security',
        component: AccountSecurity,
        meta: {
          title: 'Account Security',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/postings',
        name: 'admin.accounts.postings',
        component: AccountPostings,
        meta: {
          title: 'Account Postings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/bookmarks',
        name: 'admin.accounts.bookmarks',
        component: AccountBookmarks,
        meta: {
          title: 'Account Bookmarks',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'accounts/:id/bans',
        name: 'admin.accounts.bans',
        component: AccountBans,
        meta: {
          title: 'Account Bans',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/general',
        name: 'admin.settings.general',
        component: SettingsGeneral,
        meta: {
          title: 'General Settings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/database',
        name: 'admin.settings.database',
        component: SettingsDatabase,
        meta: {
          title: 'Database Settings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/mail',
        name: 'admin.settings.mail',
        component: SettingsMail,
        meta: {
          title: 'Mail Settings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'settings/security',
        name: 'admin.settings.security',
        component: SettingsSecurity,
        meta: {
          title: 'Security Settings',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'badges',
        name: 'admin.badges',
        component: Badges,
        meta: {
          title: 'Badges',
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
      title: 'Moderation',
      auth: false,
      isAuth: false
    },
    children: [
      {
        path: 'tags',
        name: 'moderation.tags',
        component: Tags,
        meta: {
          title: 'Post Tags',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'announcements',
        name: 'moderation.announcements',
        component: Announcements,
        meta: {
          title: 'Announcements',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'reports',
        name: 'moderation.reports',
        component: Reports,
        meta: {
          title: 'Reports',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'notifications',
        name: 'moderation.notifications',
        component: Notifications,
        meta: {
          title: 'Notifications',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'authorizations',
        name: 'moderation.authorizations',
        component: PostAuthorization,
        meta: {
          title: 'Post Authorization',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'categories/create',
        name: 'moderation.categories.create',
        component: CreateCategories,
        meta: {
          title: 'Create Category',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'posts/create',
        name: 'moderation.posts.create',
        component: CreatePosts,
        meta: {
          title: 'Create Post',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'posts/:id/edit',
        name: 'moderation.posts.edit',
        component: EditPosts,
        meta: {
          title: 'Edit Post',
          auth: true,
          isAuth: false
        }
      },
      {
        path: 'categories/:id/edit',
        name: 'moderation.categories.edit',
        component: EditCategories,
        meta: {
          title: 'Edit Category',
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
      title: 'Login',
      auth: false,
      isAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Register',
      auth: false,
      isAuth: true
    }
  },
  {
    path: '/email/verify',
    name: 'email-verify',
    component: EmailVerify,
    meta: {
      title: 'Email Verify',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/password/forgot',
    name: 'password-forgot',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/password/reset',
    name: 'password-reset',
    component: ResetPassword,
    meta: {
      title: 'Reset Password',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage,
    meta: {
      title: 'Error',
      auth: false,
      isAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    meta: {
      title: 'Error',
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
  axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

  try {
    const response = await axios.get('auth/user')
    isLoggedIn = response.data.success
  } catch (error) { }

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

  document.title = toWithMeta.meta.title || process.env.BASE_URL

  next()
})

export default router
