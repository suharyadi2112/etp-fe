<template>
  <main id="main" class="main">

     <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="row">
                <div class="col-sm-9">
                  <div class="pagetitle"> 
                    <h1 class="text-left">Permission</h1>
                    <nav>
                      <ol class="breadcrumb breadJa">
                        <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
                        <router-link :to="{ name: 'permisdashboard'}" class="breadcrumb-item">Permission</router-link>
                      </ol>
                    </nav>
                  </div><!-- End Page Title -->
                </div>
                <div class="col-sm-3">
                  <div class="card flex text-left">
                   <DropdownSelect v-model="selectedRoles" @change="handleRoleChange" :options="roleS" optionLabel="name" placeholder="Select a Roles" class="w-full" />
                 </div>
                </div>
              </div>
               <table class="table table-bordered">
                <thead>
                  <tr>
                    <th style="width: 20%; vertical-align: middle; text-align: center;">Roles</th>
                    <th style="vertical-align: middle; text-align: center;">Permission</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="10">
                      <content-loader
                        viewBox="0 0 400 35" 
                        :speed="1"
                        primaryColor="#4785ff"
                        secondaryColor="#f5f5f5"
                      >
                        <rect x="0" y="2" rx="3" ry="3" width="60" height="4" /> 
                        <rect x="0" y="11" rx="3" ry="3" width="44" height="4" /> 
                        <rect x="0" y="20" rx="3" ry="3" width="150" height="4" /> 
                        <rect x="0" y="28" rx="3" ry="3" width="205" height="4" /> 
                      </content-loader>
                    </td>
                  </tr>
                  <tr v-else-if="!idRoles">
                    <td colspan="10" class="text-center">
                      <div class="alert alert-warning alert-dismissible shadow-sm" role="alert">
                        <h4><i class="bi bi-exclamation-triangle me-1"></i>
                        Please Choose Role First</h4>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(group, groupName) in data" :key="groupName">
                    <td style="vertical-align: middle; text-align: center;">{{ groupName }}</td>
                    <td>
                      <span v-for="permission in group.permissions" :key="permission.id">
                        <div class="flex flex-column gap-3">
                            <Checkbox v-model="selectedPermission" :inputId="permission.id.toString()" name="permission" :value="permission.name"/> - 
                            <label :for="permission.id.toString()">{{ permission.name }}</label>
                        </div>
                      </span>
                    </td>
                  </tr>
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main><!-- End #main -->

</template> 
<style>
  .breadJa{
    margin-top: 10px;
  }
  .p-dropdown-items-wrapper ol,
  .p-dropdown-items-wrapper ul {
    padding-left: 0rem;
  }
</style>


<script>
import axios from 'axios';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import Checkbox from 'primevue/checkbox';
import { ContentLoader } from "vue-content-loader"

export default {
  components: {
    Checkbox,
    ContentLoader,
  },
  data() {
    return {
      data: {},
      baseUrl: process.env.BE_APP_BASE_URL,
      token: localStorage.getItem('tokenETP'),
      // select----
      selectedRoles: null,
      roleS: [],
      idRoles : null,
      // checkbox--
      selectedPermission: [],
      //loading
      loading: false,
    }
  },
  methods: {
    async fetchData(idRoles) {
      try {
        const response = await axios(`${this.baseUrl}/api/get_permission/${idRoles}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        if (idRoles !== null) { // if id roles exist (not null)
          this.data = await response.data.data;
          
          this.selectedPermission = Object.values(this.data).flatMap(group => 
            group.permissions.filter(permission => permission.status_check).map(permission => permission.name)
          );

          console.log(this.selectedPermission)

        }
        this.roleS = await response.data.dataRole; //data roles
        this.idRoles = idRoles //assign idRoles
        this.loading = false; //close loading

      } catch (error) {
         if (error.response && error.response.status == 401) {
            this.Toasttt('Unauthorized. You do not have access.', 'warning');
            this.$router.push('/login');
          }
        console.error("Terjadi kesalahan:", error);
      }
    },
    handleRoleChange() { //get id roles
      if (this.selectedRoles) {
        this.ShowDetailPermission(this.selectedRoles.id);
      }
    },
    ShowDetailPermission (id){
      this.loading = true;
      this.fetchData(id);
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
  mounted() {
    this.loading = true;
    this.fetchData(this.idRoles); //fetch data
  },

}
</script>