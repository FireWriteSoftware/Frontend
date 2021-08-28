const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'categories',
        title: 'Categories',
        permission: 'category_default'
      },
      {
        icon: 'Edit3Icon',
        pageName: 'author',
        title: 'Author',
        permission: 'category_author',
        subMenu: [
          {
            icon: 'FileTextIcon',
            pageName: 'moderation.posts.create',
            title: 'Create Post'
          },
          {
            icon: 'FolderIcon',
            pageName: 'moderation.categories.create',
            title: 'Create Category'
          }
        ]
      },
      {
        icon: 'ToolIcon',
        pageName: 'moderation.tags',
        title: 'Moderation',
        permission: 'category_moderation',
        subMenu: [
          {
            icon: 'TagIcon',
            pageName: 'moderation.tags',
            title: 'Tags'
          },
          {
            icon: 'FilterIcon',
            pageName: 'moderation.authorizations',
            title: 'Authorization'
          },
          {
            icon: 'BellIcon',
            pageName: 'moderation.announcements',
            title: 'Announcements'
          },
          {
            icon: 'AlertOctagonIcon',
            pageName: 'moderation.reports',
            title: 'Reports'
          },
          {
            icon: 'InboxIcon',
            pageName: 'moderation.notifications',
            title: 'User Notifications'
          }
        ]
      },
      {
        icon: 'SlidersIcon',
        pageName: 'admin.roles',
        title: 'Administration',
        permission: 'category_administration',
        subMenu: [
          {
            icon: 'ShieldIcon',
            pageName: 'admin.roles',
            title: 'Roles'
          },
          {
            icon: 'KeyIcon',
            pageName: 'admin.permissions',
            title: 'Permissions'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'admin.badges',
            title: 'Badges'
          },
          {
            icon: 'UsersIcon',
            pageName: 'admin.accounts',
            title: 'Accounts'
          },
          {
            icon: 'SlashIcon',
            pageName: 'admin.bans',
            title: 'Bans'
          },
          {
            icon: 'ServerIcon',
            pageName: 'admin.settings.general',
            title: 'Settings'
          }
        ]
      }
    ]
  }
}

// getters
const getters = {
  menu: state => state.menu
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
