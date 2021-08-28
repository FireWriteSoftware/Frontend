<template>
  <div>
    <div class="intro-y news xl:w-5/5 p-10 box mt-8">
      <!-- BEGIN: Blog Layout -->
      <div class="flex items-center py-4">
        <div class="mr-auto">
          <h2 class="text-3xl font-medium leading-8 mt-6">
            Terms and Conditions of Use
          </h2>
          <div class="flex text-gray-600 truncate text-xs mt-0.5">
            Sunday, 04/07/2021<span class="mx-1">•</span> {{ details.homepage }}
          </div>
        </div>
      </div>
      <div class="intro-y text-justify leading-relaxed">
        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">1. Terms</div>
        <div class="text-base text-gray-600 mt-1">By accessing this Website, accessible from {{ details.homepage }}, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">2. Use License</div>
        <div class="text-base text-gray-600 mt-1">Permission is granted to temporarily download one copy of the materials on Wiki's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</div>

        <br>

        <ul class=" list-reset flex flex-col">
          <li class="rounded-t relative -mb-px block border p-4 border-grey">modify or copy the materials;</li>
          <li class="relative -mb-px block border p-4 border-grey">use the materials for any commercial purpose or for any public display;</li>
          <li class="relative -mb-px block border p-4 border-grey">attempt to reverse engineer any software contained on Wiki's Website;</li>
          <li class="relative -mb-px block border p-4 border-grey">remove any copyright or other proprietary notations from the materials; or</li>
          <li class="rounded-b relative block border p-4 border-grey">transferring the materials to another person or "mirror" the materials on any other server.</li>
        </ul>

        <br>
        <div class="text-base text-gray-600 mt-1">This will let Wiki to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of the <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.</div>
        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">3. Disclaimer</div>
        <div class="text-base text-gray-600 mt-1">All the materials on Wiki’s Website are provided "as is". Wiki makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Wiki does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">4. Limitations</div>
        <div class="text-base text-gray-600 mt-1">Wiki or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Wiki’s Website, even if Wiki or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">5. Revisions and Errata</div>
        <div class="text-base text-gray-600 mt-1">The materials appearing on Wiki’s Website may include technical, typographical, or photographic errors. Wiki will not promise that any of the materials in this Website are accurate, complete, or current. Wiki may change the materials contained on its Website at any time without notice. Wiki does not make any commitment to update the materials.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">6. Links</div>
        <div class="text-base text-gray-600 mt-1">Wiki has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Wiki of the site. The use of any linked website is at the user’s own risk.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">7. Site Terms of Use Modifications</div>
        <div class="text-base text-gray-600 mt-1">Wiki may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">8. Your Privacy</div>
        <div class="text-base text-gray-600 mt-1">Please read our Privacy Policy.</div>

        <br>

        <div class="intro-y font-medium text-xl sm:text-2xl ml-auto ml-3">9. Governing Law</div>
        <div class="text-base text-gray-600 mt-1">Any claim related to Wiki's Website shall be governed by the laws of de without regards to its conflict of law provisions.</div>
      </div>
      <!-- END: Blog Layout -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      details: {
        homepage: process.env.VUE_APP_DOMAIN
      }
    }
  }
})
</script>
