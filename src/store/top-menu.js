const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'categories',
        title: 'navigation.categories',
        permission: 'category_default'
      },
      {
        icon: 'FileIcon',
        pageName: 'documents.overview',
        title: 'navigation.documents',
        permission: 'category_default' // TODO: Change Permission
      },
      {
        icon: 'Edit3Icon',
        pageName: 'author',
        title: 'navigation.author.title',
        permission: 'category_author',
        subMenu: [
          {
            icon: 'FileTextIcon',
            pageName: 'moderation.posts.create',
            title: 'navigation.author.create_post'
          },
          {
            icon: 'FolderIcon',
            pageName: 'moderation.categories.create',
            title: 'navigation.author.create_category'
          }
        ]
      },
      {
        icon: 'ToolIcon',
        pageName: 'moderation.tags',
        title: 'navigation.moderation.title',
        permission: 'category_moderation',
        subMenu: [
          {
            icon: 'TagIcon',
            pageName: 'moderation.tags',
            title: 'navigation.moderation.tags'
          },
          {
            icon: 'FilterIcon',
            pageName: 'moderation.authorizations',
            title: 'navigation.moderation.authorization'
          },
          {
            icon: 'BellIcon',
            pageName: 'moderation.announcements',
            title: 'navigation.moderation.announcements'
          },
          {
            icon: 'AlertOctagonIcon',
            pageName: 'moderation.reports',
            title: 'navigation.moderation.reports'
          },
          {
            icon: 'InboxIcon',
            pageName: 'moderation.notifications.latest',
            title: 'navigation.moderation.user_notifications'
          }
        ]
      },
      {
        icon: 'SlidersIcon',
        pageName: 'admin.roles',
        title: 'navigation.administration.title',
        permission: 'category_administration',
        subMenu: [
          {
            icon: 'ShieldIcon',
            pageName: 'admin.roles',
            title: 'navigation.administration.roles'
          },
          {
            icon: 'KeyIcon',
            pageName: 'admin.permissions',
            title: 'navigation.administration.permissions'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'admin.badges',
            title: 'navigation.administration.badges'
          },
          {
            icon: 'LinkIcon',
            pageName: 'admin.webhooks',
            title: 'navigation.administration.webhooks'
          },
          {
            icon: 'UsersIcon',
            pageName: 'admin.accounts',
            title: 'navigation.administration.accounts'
          },
          {
            icon: 'SlashIcon',
            pageName: 'admin.bans',
            title: 'navigation.administration.bans'
          },
          {
            icon: 'ServerIcon',
            pageName: 'admin.settings.general',
            title: 'navigation.administration.settings'
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
