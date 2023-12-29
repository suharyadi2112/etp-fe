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
                <form class="row offset-9 p-0" @submit.prevent="searchData">
                  <div class="input-group mb-3">
                    <input type="text" v-model="searchQuery" class="form-control" placeholder="Search" aria-label="search" aria-describedby="button-addon2">
                    <button class="btn btn-outline-primary" type="submit" id="button-addon2"><i class="bi bi-search"></i> Cari</button>
                  </div>
                </form>
                <table class="table table-hover table-bordered">
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
                        <div class="d-flex align-items-center text-primary m-2">
                          <strong role="status">Loading...</strong>
                          <div class="spinner-border ms-auto" aria-hidden="true"></div>
                        </div>
                      </td>
                    </tr>
                    <tr v-else v-for="(item, index) in items" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
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
                <!-- Pagination -->
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                    </li>
                    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
                      <a class="page-link" href="#" @click.prevent="setPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                    </li>
                  </ul>
                </nav>

              <!-- table -->
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
      itemsPerPage: 5,
      searchQuery: '',
      baseUrl: process.env.BE_APP_BASE_URL,
      token: localStorage.getItem('tokenETP'),
      loading: false,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true; //loading fetch
        const response = await axios(`${this.baseUrl}/api/get_semester/`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          params: {
            page: this.currentPage,
            search: this.searchQuery,
          },
        });

        const datas = response.data;

        this.items = datas.data.data;
        this.totalPages = Math.ceil(datas.data.total / this.itemsPerPage);

        console.log(this.totalPages)

        console.log(response)

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