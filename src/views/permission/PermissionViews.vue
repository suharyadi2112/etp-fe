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
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="p-float-label">
                     <Dropdown  v-model="selectedRoles" @change="handleRoleChange" inputId="dd-role" :options="roleS" optionLabel="name"  class="w-full md:w-14rem" style="width: 100%;"/>
                     <label for="dd-role">Select a Roles</label>
                  </div>
                </div>
              </div>
              <!-- form -->
              <form @submit.prevent="submitFormPermission">
                <div class="table table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th style="width: 20%; vertical-align: middle; text-align: center;">Group</th>
                        <th style="vertical-align: middle; text-align: center;">Permission</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-if="loading">
                        <td colspan="10">
                          <div>
                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                          </div>
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
                            <Checkbox v-model="selectedPermission" :inputId="permission.id.toString()" name="permission" :value="permission.id"/>
                            <label :for="permission.id.toString()" class="permission-label">{{ permission.name }}</label>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-sm-12">
                  <button class="btn btn-primary"  style="float: right;" type="submit" :disabled="loadingSubmitPermiss || idRoles === null" >
                    <span v-if="!loadingSubmitPermiss"><i class="bi bi-arrow-repeat"></i> Update Permission</span>
                    <span v-else>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </span>
                  </button>
                </div>
              </form>
              <!-- form -->
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
  .permission-label {
    width: 130px; 
    margin-left: 8px;
    white-space: nowrap; 
    text-overflow: ellipsis;
    vertical-align: middle;
  }
</style>

<script>
import axios from 'axios';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import Checkbox from 'primevue/checkbox';
import ProgressBar from 'primevue/progressbar';
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Checkbox,
    ProgressBar,
    Dropdown,
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
      loadingSubmitPermiss : false,
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
            group.permissions.filter(permission => permission.status_check).map(permission => permission.id)
          );

          console.log(this.selectedPermission, "cek data fetch")
        }
        this.roleS = await response.data.dataRole; //data roles
        this.idRoles = idRoles //assign idRoles
        this.loading = false; //close loading
        this.loadingSubmitPermiss = false;

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
      this.loadingSubmitPermiss = true;
      this.fetchData(id);
    },

    async submitFormPermission() {

      this.loadingSubmitPermiss = true;

      try {
        let permisDataUpdate= {
            permissions: this.selectedPermission.map(permission => {
              return { permission_id: permission };
            }),
            roleid: this.idRoles
        };
        const response = await axios.post(`${this.baseUrl}/api/update_permission`, permisDataUpdate, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        });
        this.Toasttt("Update Permission","success", response.data.message)
      } catch (error) {
        if (error.response && error.response.status == 400) {
          this.Toasttt("Update Permission","error", error.response.data.message)
        }else{
          console.error(error,"check error");
        }
      }
      this.loadingSubmitPermiss = false;
    },
    Toasttt(msg, type, detail){
      const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#F8F8F8",
          didOpen: (toast) => {
              toast.onmouseenter = this.$swal.stopTimer;
              toast.onmouseleave = this.$swal.resumeTimer;
          }
      });
          Toast.fire({
          icon: type,
          title: msg,
          text: detail,
      });
    },
  },
  mounted() {
    this.loading = true;
    this.fetchData(this.idRoles); //fetch data
  },

}
</script>