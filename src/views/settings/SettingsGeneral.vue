<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 lg:col-span-3 xxl:col-span-2">
      <h2 class="intro-y text-lg font-medium mr-auto mt-2">Wiki Settings</h2>
      <Sidebar :title="this.wiki_settings.name"></Sidebar>
    </div>
    <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
      <div class="intro-y text-right items-center">
        <Tippy
          tag="a"
          href="javascript:;"
          class="tooltip btn px-2 box text-gray-700 dark:text-gray-300"
          content="These are the general wiki settings, here you can view your wiki data!"
        >
          <span class="flex items-center justify-center">
            <InfoIcon class="w-5 h-5 mr-2"/>Informations
          </span>
        </Tippy>
      </div>
      <!-- BEGIN: Inbox Content -->
      <div class="intro-y inbox box mt-5">
        <div class="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200 dark:border-dark-1">
          <h2 class="font-medium text-base mr-auto">General Wiki</h2>
        </div>
        <div class="overflow-x-auto sm:overflow-x-visible">
          <div class="intro-y p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
              <div class="flex-1 mt-6 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 xxl:col-span-12">
                    <div>
                      <label for="view-settings-name" class="form-label">
                        Name
                      </label>
                      <input
                        id="view-settings-name"
                        type="text"
                        class="form-control"
                        placeholder="No wiki name was given"
                        v-model='wiki_settings.name'
                        disabled
                      />
                    </div>
                    <div class="mt-3 xxl:mt-5">
                      <label for="view-settings-description" class="form-label">
                        Description
                      </label>
                      <textarea
                        id="view-settings-description"
                        type="text"
                        class="form-control"
                        placeholder="No wiki description was given"
                        v-model='wiki_settings.description'
                        disabled
                      />
                    </div>
                    <div>
                      <label for="view-settings-domain" class="form-label mt-3 xxl:mt-5">
                        Domain
                      </label>
                      <input
                        id="view-settings-domain"
                        type="url"
                        class="form-control"
                        placeholder="No wiki domain was given"
                        v-model='wiki_settings.domain'
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                <label class="form-label">
                  Logo
                </label>
                <div class="border-2 shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                  <div class="h-40 mx-auto image-fit">
                    <img alt="" :src="this.wiki_settings.logo ? this.wiki_settings.logo : require('@/assets/images/placeholder.png')"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="intro-y inbox box mt-5">
        <div class="overflow-x-auto sm:overflow-x-visible">
          <div class="intro-y p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
              <div class="flex-1 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 xxl:col-span-12">
                    <div>
                      <label for="view-settings-contactmail" class="form-label">
                        Contact Mail
                      </label>
                      <input
                        id="view-settings-contactmail"
                        type="url"
                        class="form-control"
                        placeholder="No wiki contact mail was given"
                        v-model='wiki_settings.contactmail'
                        disabled
                      />
                    </div>
                    <div>
                      <label for="view-settings-pagetitle" class="form-label mt-3 xxl:mt-5">
                        Page Title
                      </label>
                      <input
                        id="view-settings-pagetitle"
                        type="url"
                        class="form-control"
                        placeholder="No wiki page title was given"
                        :value="wiki_settings.pagetitle ? wiki_settings.pagetitle + ' {PAGETITLE}' : null"
                        disabled
                      />
                    </div>
                    <div>
                      <label for="view-settings-supportlink" class="form-label mt-3 xxl:mt-5">
                        Support Link
                      </label>
                      <input
                        id="view-settings-supportlink"
                        type="url"
                        class="form-control"
                        placeholder="No wiki support link was given"
                        :value="wiki_settings.supportlink"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Inbox Content -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from './Components/Sidebar'

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      wiki_settings: {
        name: process.env.VUE_APP_NAME,
        description: process.env.VUE_APP_DESCRIPTION,
        domain: process.env.VUE_APP_DOMAIN,
        logo: process.env.VUE_APP_LOGO,
        contactmail: process.env.VUE_APP_CONTACTMAIL,
        pagetitle: process.env.VUE_APP_PAGETITLE,
        supportlink: process.env.VUE_APP_SUPPORTLINK
      }
    }
  }
})
</script>
