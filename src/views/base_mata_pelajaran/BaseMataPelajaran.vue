<template>
    <main id="main" class="main">
  
       <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card shadow">
              <div class="card-body p-4">
                <div class="row">
                  <div class="col-sm-8">
                    <div class="pagetitle"> 
                      <h1 class="text-left">Base Mata Pelajaran</h1>
                      <nav>
                        <ol class="breadcrumb breadJa">
                          <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
                          <router-link :to="{ name: 'basematapelajaran'}" class="breadcrumb-item">Base Mata Pelajaran</router-link>
                        </ol>
                      </nav>
                    </div>
                  </div> 
                  <div class="col-4">
                    <button type="button" class="btn btn-info btn-sm shadow AddBaseMataPel" data-bs-toggle="modal" data-bs-target="#modalBaseMataPel"><i class="bi bi-plus-circle"></i> add base mata pelajaran</button>
                    <BaseMataPelajaranModalAdd @basemataPelajaranAdd="refreshData"> </BaseMataPelajaranModalAdd>
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
                    <table class="table table-hover table-bordered shadow-sm caption-top">
                      <caption class="pb-2 pt-0">List of base mata pelajaran</caption>
                      <thead class="table-primary">
                        <tr>
                          <th scope="col" style="text-align: center;">#</th>
                          <th scope="col">Nama Base Pelajaran</th>
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
                          <th scope="row" style="text-align: center;">{{ item.number }}</th>
                          <td nowrap="">{{ capitalizeSubjectName(item.base_subject_name) }}</td>
                          <td nowrap="" style="text-align: center;">
                            <button @click="openUpdateBaseMataPelajaran(item.id)" class="btn btn-primary btn-sm m-1 shadow" data-bs-toggle="modal" data-bs-target="#updateBaseMataPelajaran" :disabled="OpenUpdateBaseMataPelajaranBtn" >
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button @click="DeleteBaseMataPelajaran(item.id)" class="btn btn-outline-danger btn-sm m-1 shadow" :disabled="DeleteBaseMataPelajaranBtn" >
                              <i class="bi bi-trash"></i>
                            </button>
                        </td>
                        </tr>
                        <tr v-if="!loading && items.length === 0">
                          <td colspan="10" class="text-center">No results found.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <BaseMataPelajaranModalUpdate @basemataPelajaranUpdate="refreshData" :dataLoaded="FetchUpdateData"  :dataFormUpdateBaseMatPel="FormDataUpdateMatPel"> </BaseMataPelajaranModalUpdate>
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
    /* ponsel */
    @media screen and (max-width: 767px) { 
      .AddBaseMataPel {
        font-size: 0; 
      }
      .AddBaseMataPel i {
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
      .AddBaseMataPel{
        float: right;
      }
      .searchBox{
        width: 50%;
      }
    }
    
  </style>
  
  <script>
  import axios from 'axios';
  import BaseMataPelajaranModalAdd from '@/components/base_mata_pelajaran_component/BaseMatPelModalAdd.vue';
  import BaseMataPelajaranModalUpdate from '@/components/base_mata_pelajaran_component/BaseMatPelModalUp.vue';
  
  export default {
    components:{
      BaseMataPelajaranModalAdd,
      BaseMataPelajaranModalUpdate,
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
  
        startEntryData : 0,
        endEntryData: 0,
        totalItemsData : 0, 
  
        OpenUpdateBaseMataPelajaranBtn : false,
        FetchUpdateData : false,
  
        FormDataUpdateMatPel : {}, //data for update

        DeleteBaseMataPelajaranBtn : false,
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
          const response = await axios(`${this.baseUrl}/api/get_base_mata_pelajaran/`, {
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
          datas.data.data = datas.data.data.map((item, index) => { //nomor urut
            return {
              ...item,
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
      // ------------------update section---------------------
      async openUpdateBaseMataPelajaran(id){
        this.OpenUpdateBaseMataPelajaranBtn = true
        this.FetchUpdateData = false
        try {
            const response = await axios.get(`${this.baseUrl}/api/get_base_mata_pelajaran/${id}`,{
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
            });
            
            this.FormDataUpdateMatPel = response.data //send data to child component
            this.FetchUpdateData = true
            return response
            
        } catch (error) {
          this.Toasttt("Server Error", "error", "")
        } finally { 
          this.OpenUpdateBaseMataPelajaranBtn = false
        }
      },

      DeleteBaseMataPelajaran(id){
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
                this.DeleteBaseMataPelajaranBtn = true
                const response = await axios.delete(`${this.baseUrl}/api/del_base_mata_pelajaran/${id}`,  {
                  headers: {
                    'Authorization': `Bearer ${this.token}`,
                  },
                });
                
                this.DeleteBaseMataPelajaranBtn = false
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

      capitalizeSubjectName(subjectName) { //capital subject name
        return subjectName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
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