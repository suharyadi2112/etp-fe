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
                    <h1 class="text-left">Siswa</h1>
                    <nav>
                      <ol class="breadcrumb breadJa">
                        <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
                        <router-link :to="{ name: 'siswadashboard'}" class="breadcrumb-item">Siswa</router-link>
                      </ol>
                    </nav>
                  </div>
                </div> 
                <div class="col-2">
                  <button type="button" @click="getListKelas()" class="btn btn-info btn-sm shadow AddSiswa" data-bs-toggle="modal" data-bs-target="#modalSiswa"><i class="bi bi-plus-circle"></i> add siswa</button>
                  <SiswaModalAdd @siswaAdd="refreshData" :dataListKelas="ListKelas" :dataLoadedKelas="FetchAddDataKelas"> </SiswaModalAdd>
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
                  <table class="table table-hover table-bordered shadow-sm caption-top table-sm">
                    <caption class="pb-2 pt-0">List of siswa</caption>
                    <thead class="table-primary">
                      <tr style="vertical-align:middle; text-align: center;">
                        <th scope="col" style="text-align: center;">#</th>
                        <th scope="col">Nis</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Kelas</th>
                        <th scope="col">JK - TL</th>
                        <th scope="col">Status</th>
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
                        <td nowrap="">{{ item.nis }}</td>
                        <td style="text-align: left; width:20%;" @click="toggleExpandName(item.id)">
                          <span v-if="!expandedName.includes(item.id)">
                            {{ shortenName(item.nama) }}
                          </span>
                          <span v-else>
                            {{ item.nama }}
                          </span>
                        </td>
                        <td nowrap="" style="text-align: center;">{{ item.basekelas.nama_kelas }}</td>
                        <td nowrap="" style="text-align: center;">{{ item.gender }} <hr> {{ item.birth_date }}</td>
                        <td nowrap="" style="text-align: center;">
                          <span v-if="item.status == 'Active'" style="width: 30px;" class="badge rounded-pill text-bg-success">
                            <!-- {{ item.status }} -->A
                          </span>
                          <span v-else class="badge rounded-pill text-bg-danger" style="width: 30px">
                            <!-- {{ item.status }} -->N
                          </span>
                        </td>
                        <td nowrap="" width="40px;" style="text-align: center;">
                            
                            <router-link :to="'/detail-siswa/' + item.id">
                              <button class="btn btn-info btn-sm m-1 shadow" title="Detail">
                                <i class="bi bi-eye text-white"></i>
                              </button>
                            </router-link>
                            
                            <button @click="openUpdateSiswa(item.id)" class="btn btn-primary btn-sm m-1 shadow" data-bs-toggle="modal" data-bs-target="#updateSiswa" :disabled="OpenUpdateSiswaBtn" title="Update">
                              <i class="bi bi-pencil"></i>
                            </button>

                            <button @click="DeleteSiswa(item.id)" class="btn btn-outline-danger btn-sm m-1 shadow" :disabled="DeleteSiswaBtn" title="Delete">
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
                <SiswaModalUp @siswaUpdate="refreshData" :fileTemp="fileTemp" :dataLoadedSiswa="FetchUpdateData" :dataFormUpdateSiswa="FormDataUpdate" :getKelas="GetKelas"> </SiswaModalUp>
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
    .AddSiswa {
      font-size: 0; 
    }
    .AddSiswa i {
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
    .AddSiswa{
      float: right;
    }
    .searchBox{
      width: 50%;
    }
  }
  
</style>

<script>
import SiswaModalAdd from '@/components/siswa_component/SiswaModalAdd.vue';
import SiswaModalUp from '@/components/siswa_component/SiswaModalUp.vue';
import axios from 'axios';

export default {
  components:{
    SiswaModalAdd,
    SiswaModalUp,
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

      OpenUpdateSiswaBtn : false,
      FetchUpdateData : false,

      FormDataUpdate : {}, //data for update
      GetKelas : {}, //data for kelas list

      expandedName: [], //address expand
      
      ListKelas : {},
      FetchAddDataKelas : false,
      DeleteSiswaBtn : false,

      fileTemp: null,
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
        const response = await axios(`${this.baseUrl}/api/get_siswa/`, {
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
    async getListKelas() { //get list kelas
        try {
          this.FetchAddDataKelas = false
            const response = await axios.get(`${this.baseUrl}/api/get_base_kelas?page=&per_page=&search=`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
            this.ListKelas = response.data.data.data
            this.FetchAddDataKelas = true
            return response
        } catch (error) {
          console.log(error.response.data.message)
        }
      },

    // ------------------update section---------------------
    async openUpdateSiswa(id){
      this.OpenUpdateSiswaBtn = true
      this.FetchUpdateData = false
      try {
          const response = await axios.get(`${this.baseUrl}/api/get_siswa/${id}`,{
              headers: {
                  'Authorization': `Bearer ${this.token}`,
              },
          });
          this.FormDataUpdate = response.data //send data to child component

          console.log(this.FormDataUpdate)

          const pathCloud = response.data.data.path_photo_cloud
          const pathOri = response.data.data.photo_name_ori

          try {
              const path = { realpath: pathCloud } //path cloud photo
              const responseTempFile = await axios.post(`${this.baseUrl}/api/temp_file`, path, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${this.token}`,
                  },
              });
              this.fileTemp = responseTempFile.data.data;
          } catch (error) {
              console.log(error)
              this.fileTemp = `${this.baseUrl}/storage${pathOri}` //get local file jika fail
          }


          //gunakan await agar tdk asycn
          await this.getKelas().then((getKelas) => {
            if (getKelas.status == 200) {
                this.FetchUpdateData = true //send info to child component update
            }
          });

          return response
          
      } catch (error) {
        this.Toasttt("Server Error", "error", "")
      } finally { 
        this.OpenUpdateSiswaBtn = false
      }
    },

    async getKelas() { //get list kelas
      try {
          const response = await axios.get(`${this.baseUrl}/api/get_base_kelas?page=&per_page=&search=`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.token}`,
              },
          });
          this.GetKelas = response.data.data.data
          return response
      } catch (error) {
        console.log(error.response.data.message)
      }
    },

    DeleteSiswa(id){
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
              this.DeleteSiswaBtn = true
              const response = await axios.delete(`${this.baseUrl}/api/del_siswa/${id}`,  {
                headers: {
                  'Authorization': `Bearer ${this.token}`,
                },
              });
              
              this.DeleteSiswaBtn = false
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