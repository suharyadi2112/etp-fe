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
                  <ModalAddRoles></ModalAddRoles>
                </div>
              </div>
              <div class="table table-responsive">
                <RolesDataTable ref="tableRoles" :columns="columns" :options="options" />
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
import RolesDataTable from '@/components/roles_component/RolesTables.vue';
import ModalAddRoles from "@/components/roles_component/RolesModalAdd.vue"; // Adjust the path accordingly

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

export default {

  components: {
    RolesDataTable,
    ModalAddRoles,
  },
  data() {
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
        dataTable: null,
      },
    }
  },

};
</script>

