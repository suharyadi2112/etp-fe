<template>

  <main id="main" class="main">

     <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="row">
                <div class="col-sm-10">
                  <div class="pagetitle"> 
                    <h1 class="text-left">Roles</h1>
                    <nav>
                      <ol class="breadcrumb breadJa">
                        <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
                        <router-link :to="{ name: 'rolesdashboard'}" class="breadcrumb-item">Roles</router-link>
                      </ol>
                    </nav>
                  </div><!-- End Page Title -->
                </div>
                <div class="col-sm-2 text-end">
                  <ModalAddRoles  @rolesAdd="refreshData"></ModalAddRoles>
                </div>
              </div>
              <div class="table table-responsive">
                 <DataTable
                  :columns="columns"
                  :options="options"
                  :ajax="ajax"
                  class="table table-hover"
                  width="100%"
                  ref = "table"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Guard Name</th>
                    </tr>
                  </thead>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main><!-- End #main -->

</template> 
<style>
  div.dataTables_wrapper div.dataTables_info {
    padding-top: 40px;
  }
  div.dataTables_wrapper div.dataTables_paginate ul.pagination {
    margin-top: 30px;
  }
  .breadJa{
    margin-top: 10px;
  }
</style>

<script>
import ModalAddRoles from "@/components/roles_component/RolesModalAdd.vue"; // Adjust the path accordingly

// import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

export default {
  components: {
    DataTable,
    ModalAddRoles,
  },
  data() {

    const token = localStorage.getItem('tokenETP');
    const baseUrl = process.env.BE_APP_BASE_URL;
    const ajaxUrl = `${baseUrl}/api/get_roles`;

    return {
      columns: [
        { data: 'id' , visible: false},
        { data: 'name' },
        { data: 'guard_name' },
      ],
      options : {
        responsive: true,
        select: true,
        serverSide: true,
        processing: true,
        order: [[ 0, "desc" ]],
      },
      ajax: {
        url: ajaxUrl,
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
      },
    }
  },
  methods: {
    refreshData() {
      console.log(this.$refs.table.dt)
      this.$refs.table.dt.ajax.reload()
    },
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
}
</script>


<style scoped>
  @import 'datatables.net-bs5';
</style>