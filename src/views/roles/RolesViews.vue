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
                    <button class="btn btn-primary rounded-pill shadow" @click="showDialogRoles">
                      <i class="bi bi-plus-circle"></i> Add Roles
                    </button>
                  </div>
                </div>
              <div class="table table-responsive">
                <RolesDataTable :columns="columns" :options="options" :ajax="ajaxConfig" />
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
// import axios from 'axios';

export default {
  components: {
    RolesDataTable,
  },
  data() {
    return {
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'guard_name' },
      ],
      options : {
        responsive: true,
        select: true,
        serverSide: true,
        processing: true,
      },
    }
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
        dataSrc: 'data'
      };
    }
  },
  methods: {
    async showDialogRoles() {
      const ipAPI = "//api.ipify.org?format=json";

      try {
        const response = await fetch(ipAPI);
        const data = await response.json();
        const inputValue = data.ip;

        const { value: ipAddress } = await this.$swal.fire({
          title: "Enter your IP address",
          input: "text",
          inputLabel: "Your IP address",
          inputValue,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }
          }
        });

        if (ipAddress) {
          this.$swal.fire(`Your IP address is ${ipAddress}`);
        }
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }
  }
};
</script>