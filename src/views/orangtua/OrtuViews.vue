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
                    <h1 class="text-left">Orang Tua (Wali)</h1>
                    <nav>
                      <ol class="breadcrumb breadJa">
                        <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
                        <router-link :to="{ name: 'ortudashboard'}" class="breadcrumb-item">Orang tua (wali)</router-link>
                      </ol>
                    </nav>
                  </div>
                </div> 
                <div class="col-2">
                  <button type="button" @click="fetchDataAdd('add')" class="btn btn-info btn-sm shadow AddOrtu" data-bs-toggle="modal" data-bs-target="#modalOrtu"><i class="bi bi-plus-circle"></i> add orang tua</button>
                  <OrtuModalAdd @ortuAdd="refreshData" :dataLoadedOrtu="dataLoaded" :dataListSiswa="fetchdataSiswa" :dataListOrtu="fetchdataListOrtu"> </OrtuModalAdd>
                </div>
              </div>
              <!-- table -->
                <div class="row">
                  <div class="col-6 mb-0 pb-0 pt-2">
                    <div class="dropdown">
                      <button class="btn btn-primary dropdown-toggle btn-sm shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Entries
                      </button>
                      <ul class="dropdown-menu shadow-sm">
                        <li v-for="option in entriesOptions" :key="option">
                          <a class="dropdown-item" style="cursor: pointer;" @click="changeEntries(option)">{{ option }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-6 GridSearchBox">
                    <form class="row p-0" @submit.prevent="searchData">
                      <div class="input-group mb-3 Search ms-auto searchBox">
                        <input type="text" v-model="searchQuery" class="form-control shadow-sm" placeholder="Genap" aria-label="search" aria-describedby="button-addon2">
                        <button class="btn btn-outline-primary shadow-sm searchBoxText" type="submit" id="button-addon2"><i class="bi bi-search"></i> search</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover table-bordered shadow-sm caption-top ">
                    <caption class="pb-2 pt-0">List of guru</caption>
                    <thead class="table-primary">
                      <tr style="vertical-align:middle; text-align: center;">
                        <th scope="col" style="text-align: center;">#</th>
                        <th scope="col">Nama Ortu</th>
                        <th scope="col">Siswa - Hubungan</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">No Telp</th>
                        <th scope="col">Pekerjaan</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      <tr v-if="loading">
                        <td colspan="10">
                          <div class="d-flex justify-content-center text-primary m-3">
                            <strong role="status" class="pt-1" style="padding-right: 2rem;">Loading...</strong>
                            <div class="spinner-border shadow" aria-hidden="true"></div>
                          </div>
                        </td>
                      </tr>
                      <tr v-else v-for="item in items" :key="item.id" style="vertical-align:middle;">
                        <td scope="row" style="text-align: center;">{{ item.number }}</td>
                        <td nowrap="" text="center">{{ item.name }}</td>
                        <td nowrap="" style="text-align: center;">
                            <span v-for="siswa in item.siswa" :key="siswa.id">
                              {{ siswa.nama }} - <b>{{ siswa.pivot.hubungan }}</b> <span v-if="siswa !== item.siswa[item.siswa.length - 1]"><hr></span>
                            </span>
                        </td>
                        <td style="text-align: justify; width:20%;" @click="toggleExpandName(item.id)">
                          <span v-if="!expandedName.includes(item.id)">
                            {{ shortenName(item.address) }}
                          </span>
                          <span v-else>
                            {{ item.address }}
                          </span>
                        </td>
                        <td nowrap="" style="text-align: center;">{{ item.phone_number }}</td>
                        <td nowrap="" style="text-align: center;">{{ item.occupation }}</td>
                        <!-- <td nowrap="" style="text-align: center;">{{ item.gender }} <hr> {{ item.birth_date }}</td> -->
                       
                        <td nowrap="" width="40px;" style="text-align: center;">

                            <button @click="infoDetail(item.email, item.date_of_birth, item.place_of_birth, item.additional_notes)"  class="btn btn-info btn-sm m-1 shadow"><i class="bi bi-eye text-white"></i></button>

                            <button @click="openUpdateOrtu(item.id)" class="btn btn-primary btn-sm m-1 shadow" data-bs-toggle="modal" data-bs-target="#modalOrtuUpdate" :disabled="OpenUpdateOrtuBtn" title="Update">
                              <i class="bi bi-pencil"></i>
                            </button>

                            <button @click="DeleteOrtu(item.id)" class="btn btn-outline-danger btn-sm m-1 shadow" :disabled="DeleteOrtuBtn" title="Delete">
                              <i class="bi bi-trash"></i>
                            </button>
                        </td>
                      </tr>
                      <tr v-if="!loading && items.length === 0">
                        <td colspan="10" class="text-center">No results found.</td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Detail Component -->
                </div>
                <OrtuModalUp @ortuUpdate="refreshData" :dataLoadedOrtu="FetchUpdateData" :dataListSiswa="fetchdataSiswa" :dataFormUpdateOrtu="FormDataUpdate"> </OrtuModalUp>
                <!-- table -->
                <div class="row">
                  <div class="col-9">
                    <!-- Showing Entries Message -->
                    <p class="text-muted">
                      Showing {{ startEntry }} to {{ endEntry }} of {{ totalItems }} entries
                    </p>
                  </div>
                <div class="col-3">
                  <!-- Pagination -->
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-end">
                        <li class="page-item shadow-sm" :class="{ 'disabled': currentPage === 1 }">
                          <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                        </li>
                        <li class="page-item shadow-sm" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
                          <a class="page-link shadow-sm" href="#" @click.prevent="setPage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item shadow-sm" :class="{ 'disabled': currentPage === totalPages }">
                          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                        </li>
                      </ul>
                    </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main><!-- End #main -->

</template> 
<style scope>
  .breadJa{
    margin-top: 10px;
  }
  hr {
      margin-top: 2px;
      margin-bottom: 2px;
  }
  /* ponsel */
  @media screen and (max-width: 767px) { 
    .AddOrtu {
      font-size: 0; 
    }
    .AddOrtu i {
      font-size: 1rem; 
    }
    .searchBoxText i {
      font-size: 1rem;
    }
    .searchBoxText {
      font-size: 0;
    }
    .GridSearchBox {
      padding-top: 8px;
    }
  }
  /* dekstop */
  @media screen and (min-width: 768px) {
    .AddOrtu{
      float: right;
    }
    .searchBox{
      width: 50%;
    }
  }
  
</style>

<script>
import OrtuModalAdd from '@/components/orangtua_component/OrangtuaModalAdd.vue';
import OrtuModalUp from '@/components/orangtua_component/OrangtuaModalUp.vue';
import axios from 'axios';

export default {
  components:{
    OrtuModalAdd,
    OrtuModalUp,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      totalPages: 0,
      searchQuery: '',
      entriesOptions: [5, 10 ,20, 50, 100], // Add entries options untuk dropdown
      selectedEntries: 5, // Initial selected value for entries dropdown
      baseUrl: process.env.BE_APP_BASE_URL,
      token: localStorage.getItem('tokenETP'),
      loading: false,
      dataLoaded: false,

      startEntryData : 0,
      endEntryData: 0,
      totalItemsData : 0, 

      OpenUpdateOrtuBtn : false,
      FetchUpdateData : false,

      FormDataUpdate : {}, //data for update
      expandedName: [], //address expand
      DeleteOrtuBtn : false,

      fetchdataSiswa: {},
      fetchdataListOrtu: {},
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    startEntry() {
      return this.startEntryData
    },
    endEntry() {
      return this.endEntryData
    },
    totalItems(){
      return this.totalItemsData
    },
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true; //loading fetch
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios(`${this.baseUrl}/api/get_orangtua/`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          params: {
            page: this.currentPage,
            search: this.searchQuery,
            per_page: this.selectedEntries,
          },
        });

        const datas = response.data;
        datas.data.data = datas.data.data.map((item, index) => {
          return {
            ...item,
            // Nomor urut dimulai dari 1 untuk setiap halaman
            // Anda dapat menghitung nomor urut dengan rumus (currentPage - 1) * selectedEntries + index + 1
            // Misalnya, jika halaman pertama dan 5 entri per halaman, maka nomor urut = index + 1
            // Jika halaman kedua, nomor urut = 5 + index + 1, dan seterusnya
            number: (this.currentPage - 1) * this.selectedEntries + index + 1,
          };
        });


        this.items = datas.data.data;
        this.totalPages = Math.ceil(datas.data.total / this.selectedEntries);

        console.log(this.items)

        // info entries
        this.startEntryData = datas.data.from 
        this.endEntryData = datas.data.to 
        this.totalItemsData = datas.data.total 

      } catch (error) {
         if (error.response && error.response.status == 401) {
            this.Toasttt('Unauthorized. You do not have access.', 'warning');
            this.$router.push('/login');
          }
        console.error("Terjadi kesalahan:", error);
      } finally {
        this.loading = false; 
      }
    },
    searchData() {
      this.currentPage = 1;
      this.fetchData();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchData();
      }
    },
    setPage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    changeEntries(option) {
      this.currentPage = 1;// ulangi currentpage, jika pilihan change entries
      this.selectedEntries = option;
      this.fetchData();
    },
    refreshData(){
      this.fetchData();
    },
    shortenName(name) {
      if (name.length > 20) {
        return name.substring(0, 20) + ' ... '; 
      } else {
        return name;
      }
    },
    toggleExpandName(itemId) {
      if (this.expandedName.includes(itemId)) {
        this.expandedName = this.expandedName.filter(id => id !== itemId);
      } else {
        this.expandedName.push(itemId);
      }
    },

    async fetchDataAdd(tipe){
        this.dataLoaded = false
        try {
          const response = await axios.get(`${this.baseUrl}/api/get_list_siswa`,{
              headers: {
                  'Authorization': `Bearer ${this.token}`,
              },
          });

          this.fetchdataSiswa = response.data.data//send data to child component
          //gunakan await agar tdk asycn
          await this.fetchDataListOrtu().then((getListOrtu) => {
            if (getListOrtu.status == 200) {
                if(tipe == "add"){ //khusus add
                  this.dataLoaded = true
                }
            }
          });
          return response
        } catch (error) {
          console.log(error, "get list siswa")
        } 
    },

    async fetchDataListOrtu(){ //list ortu
        try {
          const response = await axios.get(`${this.baseUrl}/api/get_list_ortu`,{
              headers: {
                  'Authorization': `Bearer ${this.token}`,
              },
          });
          this.fetchdataListOrtu = response.data.data//send data to child component
          return response
        } catch (error) {
          console.log(error,"get list ortu")
        } 
    },

    infoDetail(email, date, place, addit) {
        this.$swal({
          title: "<strong>Detail information</strong>",
          icon: "info",
          html: `<br>
          <div style="text-align:left;">
                <p class="card-text"><b>Email : </b> ${email}</p>
                <p class="card-text"><b>Birth Date : </b> ${date}</p>
                <p class="card-text"><b>Birth Place : </b> ${place}</p>
                <p class="card-text"><b>Additional Note : </b> ${addit}</p>
          </div>       
                 `,
          showCloseButton: true,
          focusConfirm: false,
        });
    },

    DeleteOrtu(id){
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        preConfirm: async () => {
          try {
              this.DeleteOrtuBtn = true
              const response = await axios.delete(`${this.baseUrl}/api/del_orangtua/${id}`,  {
                headers: {
                  'Authorization': `Bearer ${this.token}`,
                },
              });
              
              this.DeleteOrtuBtn = false
              return response

            } catch (error) {
              if (error.response && error.response.status == 400) {
                this.$swal.showValidationMessage(`
                  Request failed: ${error.response.data.message}
                `);
              }
              console.error(error,"check error");
            }
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire({
            title: "Success!",
            text: "Success Delete Data",
            icon: "success",
          }).then(() => {
            this.refreshData()
          })
        }
      });
    },

    //update section
    async openUpdateOrtu(id){
      this.OpenUpdateOrtuBtn = true
      this.FetchUpdateData = false
      try {
          const response = await axios.get(`${this.baseUrl}/api/get_orangtua/${id}`,{
              headers: {
                  'Authorization': `Bearer ${this.token}`,
              },
          });
       
          this.FormDataUpdate = response.data //send data to child component

          //gunakan await agar tdk asycn
          await this.fetchDataAdd("up").then((getSiswa) => {
            if (getSiswa.status == 200) {
                this.FetchUpdateData = true //send info to child component update
            }
          });
          
          return response
          
      } catch (error) {
        console.log(error)
        this.Toasttt("Server Error update", "error", "")
      } finally { 
        this.OpenUpdateOrtuBtn = false
      }
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
}
</script>