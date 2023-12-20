<!-- SweetAlertDialog.vue -->
<template>
  <div>
    <button class="btn btn-primary btn-sm rounded-pill shadow" @click="showDialogRoles">
      <i class="bi bi-plus-circle"></i> Add Roles
    </button>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  methods: {
    showDialogRoles() {

      const token = localStorage.getItem('tokenETP');
      const baseUrl = process.env.BE_APP_BASE_URL;
      
      this.$swal.fire({
        title: "Enter New Roles",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        inputPlaceholder: "Manager",
        preConfirm: async (RolesValue) => {
          try {
            let data = {
                nameroles: RolesValue,
            } 
            const response = await axios.post(`${baseUrl}/api/store_roles`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response

          } catch (error) {
            if (error.response && error.response.data.message.nameroles) {
              this.$swal.showValidationMessage(`
                Request failed: ${error.response.data.message.nameroles}
              `);
            }else{
               this.$swal.showValidationMessage(`
                Request failed: ${error}
              `);
             }
          }
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire({
            title: "Success!",
            text: "Data successfully stored",
            icon: "success",
          }).then(() => {
            this.$emit('rolesAdd');
          })
        }
      });
    },
  },
}
</script>
