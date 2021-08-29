<template>
  <!-- BEGIN: Modal Content -->
  <div
    id="delete-account-modal"
    class="modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to delete this Account? <br/>
              This process cannot be undone.
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1">
              Cancel
            </button>
            <button type="button" data-dismiss="modal" @click="deleteUser" class="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Modal Content -->
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  name: 'DeleteModal',
  methods: {
    deleteUser() {
      const loader = this.$loading.show()
      axios.delete('users/' + this.$route.params.id)
        .then(response => {
          loader.hide()
          toast.success('Account successfully deleted')
          this.$router.push({ name: 'admin.accounts' })
        })
        .catch(error => {
          console.error(error.response)
          this.validation_error = error.response.data.data.errors
          toast.error(error.response.data.message)
          loader.hide()
        })
    }
  }
}
</script>
