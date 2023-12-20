<!-- /src/components/RolesDataTable.vue -->
<template>
  <DataTable
    :columns="columns"
    :options="options"
    :ajax="ajaxConfig"
    class="table table-hover"
    width="100%"
  >
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Guard Name</th>
      </tr>
    </thead>
  </DataTable>
</template>


<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

export default { 
  components: {
    DataTable,
  },
  props: {
    columns: Array,
    data: Array,
    options: Object,
    ajax : Object,
  },
  computed: {
    ajaxConfig() {
      const token = localStorage.getItem('tokenETP');
      const baseUrl = process.env.BE_APP_BASE_URL;
      const Url = `${baseUrl}/api/get_roles`;
      return {
        url: Url,
        type: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        dataSrc: 'data',
         error: (xhr) => {
          if (xhr.status === 401) {
            this.Toasttt('Unauthorized. You do not have access.', 'warning');
            this.$router.push('/login');
          }
        }
      };
    }
  },
  methods: {
    Toasttt(msg, type){
      const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.onmouseenter = this.$swal.stopTimer;
              toast.onmouseleave = this.$swal.resumeTimer;
          }
      });
          Toast.fire({
          icon: type,
          title: msg
      });
    },
  },
};
</script>

<style scoped>
  @import 'datatables.net-bs5';
</style>
