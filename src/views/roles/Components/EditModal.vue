<template>
  <!-- BEGIN: Edit Role Modal -->
  <div id="edit-role-modal" data-backdrop="static" class="modal" tabindex="-1" aria-hidden="true" v-show="modalState.edit" @hide="modalState.edit = false">
    <div class="modal-dialog">
      <form @submit.prevent="editRole">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Edit a Role
            </h2>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <label for="edit-role-modal-name" class="form-label">Name</label>
              <input id="edit-role-modal-name" type="text" class="form-control" placeholder="Your Name" v-model="edit_role.name"/>
            </div>
            <div class="col-span-12">
              <label for="edit-role-modal-description" class="form-label">Description</label>
              <textarea id="edit-role-modal-description" class="form-control" placeholder="Your Description" rows="5" v-model="edit_role.description"/>
            </div>
            <div class="col-span-12">
              <label for="edit-role-modal-color" class="form-label">Color</label>
              <input id="edit-role-modal-color" type="color" class="form-control" v-model="edit_role.color"/>
            </div>
            <div class="col-span-12">
              <div class="flex items-center">
                <div>
                  <a>
                    Default Role {{ edit_role.is_default }}
                  </a>
                  <div class="text-gray-600">
                    Is the role a default user role?
                  </div>
                </div>
                <input class="form-check-switch ml-auto" type="checkbox" v-model="edit_role.is_default" :checked="edit_role.is_default">
              </div>
            </div>
            <div class="col-span-12" v-show="this.validation_error !== null">
              <h5 class="text-lg font-medium mr-auto">The following errors have occurred</h5>
              <ul class="list-disc mx-5">
                <div class="text-theme-6 mt-2 mb-4">
                  <li v-for="error_message in this.validation_error" v-bind:key="error_message">
                    {{ error_message[0] }}
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <!-- END: Modal Body -->
          <!-- BEGIN: Modal Footer -->
          <div class="modal-footer text-right">
            <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary w-20">
              Save
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </form>
    </div>
  </div>
  <!-- END: Edit Role Modal -->
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  name: 'EditModal',
  props: ['role', 'modalState'],
  data() {
    return {
      edit_role: {},
      validation_error: {}
    }
  },
  mounted() {
    this.edit_role = this.role
  },
  methods: {
    editRole() {
      const loader = this.$loading.show()
      axios.put('roles/' + this.edit_role.id, {
        name: this.edit_role.name,
        description: this.edit_role.description,
        color: this.edit_role.color,
        is_default: this.edit_role.is_default
      })
        .then(response => {
          console.error(response)
          toast.success('Role was successfully edited')
          loader.hide()
          this.modalState.edit = false
          this.fetchRoles('roles?page=' + this.pagination.current_page)
        })
        .catch(error => {
          toast.error(error.response.data.message)
          this.validation_error = error.response.data.data.errors
          console.log(this.validation_error)
          loader.hide()
        })
    }
  }
}
</script>
