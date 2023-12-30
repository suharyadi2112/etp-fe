<template>
  <main id="main" class="main">

     <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="row">
                <div class="col-sm-12">
                  <div class="pagetitle"> 
                    <h1 class="text-left">Semester</h1>
                    <nav>
                      <ol class="breadcrumb breadJa">
                        <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
                        <router-link :to="{ name: 'semesterdashboard'}" class="breadcrumb-item">Semester</router-link>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <!-- table -->
                <div class="row">
                  <div class="col-9 mb-0 pb-0 pt-2">
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
                  <div class="col-3">
                    <form class="row p-0" @submit.prevent="searchData">
                      <div class="input-group mb-3">
                        <input type="text" v-model="searchQuery" class="form-control shadow-sm" placeholder="Search" aria-label="search" aria-describedby="button-addon2">
                        <button class="btn btn-outline-primary shadow-sm" type="submit" id="button-addon2"><i class="bi bi-search"></i> Cari</button>
                      </div>
                    </form>
                  </div>
                </div>
                <table class="table table-hover table-bordered shadow-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Semester</th>
                      <th scope="col">Tahun Akademik</th>
                      <th scope="col">Mulai</th>
                      <th scope="col">Selesai</th>
                      <th scope="col">Status</th>
                      <th scope="col">Deskripsi</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <td colspan="10">
                        <div class="d-flex justify-content-center text-primary m-3">
                          <strong role="status" class="pt-1" style="padding-right: 2rem;">Loading...</strong>
                          <div class="spinner-border shadow" aria-hidden="true"></div>
                        </div>
                      </td>
                    </tr>
                    <tr v-else v-for="item in items" :key="item.id">
                      <th scope="row">{{ item.number }}</th>
                      <td>{{ item.semester_name }}</td>
                      <td>{{ item.academic_year }}</td>
                      <td>{{ item.start_date }}</td>
                      <td>{{ item.end_date }}</td>
                      <td>{{ item.active_status }}</td>
                      <td>{{ item.description }}</td>
                      <td>Roarrr</td>
                    </tr>
                    <tr v-if="!loading && items.length === 0">
                      <td colspan="10" class="text-center">No results found.</td>
                    </tr>
                  </tbody>
                </table>
                <div class="row">
                  <div class="col-9">
                    <!-- Showing Entries Message -->
                    <p class="text-muted">
                      Showing {{ startEntry }} to {{ endEntry }} of {{ totalItems }} entries
                    </p>
                  </div>
                  <!-- table -->
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
</style>

<script>
import axios from 'axios';

export default {
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios(`${this.baseUrl}/api/get_semester/`, {
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
      this.selectedEntries = option;
      this.fetchData();
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