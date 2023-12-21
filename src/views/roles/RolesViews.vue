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
                  <ModalAddRoles @rolesAdd="refreshData"></ModalAddRoles>
                </div>
              </div>
              <div class="table table-responsive">
                 <DataTable
                  ref = "table"
                  :columns="columns"
                  :options="options"
                  :ajax="ajax"
                  class="table table-hover"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Guard Name</th>
                      <th style="width:20%;">Action</th>
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

<script setup>
  import { ref, onMounted } from 'vue'
  import $ from 'jquery';
  import Swal from 'sweetalert2'
  import axios from 'axios';

  let dt;
  const table = ref();

  onMounted(function () {
    dt = table.value.dt;

    $(dt.table().body()).on('click', 'button.DeleteBtn', function () {
      const rowData = dt.row($(this).parents('tr')).data();
      DeleteDataRoles(rowData.id);
    });

    $(dt.table().body()).on('click', 'button.EditBtn', function () {
      const rowDataUp = dt.row($(this).parents('tr')).data();
      UpdateDataRoles(rowDataUp.id, rowDataUp.name);
    });

  });

  const UpdateDataRoles = (dataIDUp, dataName) => {
    Swal.fire({
        title: "Update Name Roles",
        input: "text",
        inputValue: dataName,
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Update",
        showLoaderOnConfirm: true,
        inputPlaceholder: "Manager",
        preConfirm: async (newName) => {
          try {
            let data = {
                nameroles: newName,
                id_roles: dataIDUp
            } 
            const response = await axios.post(`${baseUrl}/api/update_roles`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response

          } catch (error) {
            if (error.response && error.response.data.message.nameroles) {
              Swal.showValidationMessage(`
                Request failed: ${error.response.data.message.nameroles}
              `);
            }else{
               Swal.showValidationMessage(`
                Request failed: ${error}
              `);
             }
          }
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Success!",
            text: "Data successfully updated",
            icon: "success",
          }).then(() => {
            dt.ajax.reload(null, false)
          })
        }
      });

  } 

  const DeleteDataRoles = (dataID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: async (login) => {
         try {
            const response = await axios.post(`${baseUrl}/api/del_roles/${dataID}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            return response

          } catch (error) {
            if (error.response && error.response.status == 400) {
              Swal.showValidationMessage(`
                Request failed: ${error.response.data.message}
              `);
            }
            console.error(error,"check error");
          }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Success Delete Data",
          icon: "success",
        }).then((result) => {
          dt.ajax.reload(null, false)
        })
      }
    });
  };

</script>

<script>

import ModalAddRoles from "@/components/roles_component/RolesModalAdd.vue";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

const token = localStorage.getItem('tokenETP');
const baseUrl = process.env.BE_APP_BASE_URL;
const ajaxUrl = `${baseUrl}/api/get_roles`;

export default {
  components: {
    DataTable,
    ModalAddRoles,
  },
  data() {
    return {
      columns: [
        { data: 'id' , visible: false},
        { data: 'name' },
        { data: 'guard_name' },
        { data: null, orderable: false, 
            render: function (data) { 
              return '<button class="btn btn-outline-primary btn-sm shadow rounded-pill EditBtn" data-id='+data.id+' data-name='+data.name+'><i class="bi bi-pencil"></i> Edit</button> | <button class="btn btn-sm shadow btn-danger rounded-pill DeleteBtn" data-id='+data.id+'><i class="bi bi-trash3"></i> Delete</button>'; 
          },
        }
      ],
      options : {
        responsive: true,
        select: true,
        serverSide: true,
        processing: true,
        stateSave: true,
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