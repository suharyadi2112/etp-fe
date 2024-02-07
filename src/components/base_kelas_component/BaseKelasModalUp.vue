<!-- ModalFormUpdatebaseKelas -->
<template>
    <div class="modal fade" id="updateBaseKelas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Update Base Kelas</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitFormUpdateBaseKelas">
            <div v-if="!dataLoaded">
              <div class="d-flex justify-content-center text-primary m-3">
                <strong role="status" class="pt-1" style="padding-right: 2rem;">Retrieving Data...</strong>
                <div class="spinner-border shadow" aria-hidden="true"></div>
              </div>
            </div>
            <div  v-else class="modal-body row g-3">
              <div class="col-12" v-if="errorMessages.length > 0">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <li v-for="(errorMessage, index) in errorMessages" :key="index"><i class="bi bi-exclamation-circle"></i> {{ errorMessage }}</li>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.nama_kelas }"  id="basematpel" placeholder="IPA" v-model="formData.data.nama_kelas" name="nama_kelas">
                        <label for="basematpel">Nama Base Kelas</label>
                    </form>
                  </div>
                  <div v-if="error.nama_kelas" class="invalid-feedback">
                    Base kelas harus diisi.
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="input-group has-validation">
                    <div class="form-floating is-invalid">
                        <form class="form-floating">
                            <input type="text" :class="{ 'form-control': true,'is-invalid': error.ruang_kelas }"  id="basematpel" placeholder="Kimia" v-model="formData.data.ruang_kelas" name="ruang_kelas">
                            <label for="basematpel">Nama Ruang</label>
                        </form>
                    </div>
                    <div v-if="error.ruang_kelas" class="invalid-feedback">
                        Nama Ruang harus diisi.
                    </div>
                </div>
              </div>
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitBaseKelas">
                <span v-if="!loadingSubmitBaseKelas"><i class="bi bi-arrow-repeat"></i> Update Base Kelas</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Update Base Kelas</label>
                </span>
              </button>
            </div>
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    components: {
      
    },
    props: { //recieve data dari parents
      dataLoaded: Boolean,
      dataFormUpdateBaseMatPel: Object, 
    },
    computed: {
      hasLoaded() {
        return this.dataLoaded;
      },
   
    },
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: { ...this.dataFormUpdateBaseMatPel },
        error : {},//error clientside
        loadingSubmitBaseKelas : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    watch: {
      dataFormUpdateBaseMatPel(newData) {
        this.formData = { ...newData,
          data: {
            ...newData.data
          }
        };
      }
    },
    methods: {
      submitFormUpdateBaseKelas() {
        this.loadingSubmitBaseKelas = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['nama_kelas'];

        requiredFields.forEach(field => {
          if (!this.formData.data[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitBaseKelas = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendUpdateMatPel();
        }
      },
      async sendUpdateMatPel() {
        try {
            const response = await axios.put(`${this.baseUrl}/api/update_base_kelas/${this.formData.data.id}`, this.formData.data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Base Kelas Successfully Updated')
            this.$emit('baseKelasUpdate'); //sent signal to views
            this.loadingSubmitBaseKelas = false
            this.errorMessages = [];
            return response
  
        } catch (error) { 
          
          if(error.response.data.message && error.response.status == 400){
            this.errorMessages = [];
            for (let field in error.response.data.message) { //list error 400
              this.errorMessages.push(...error.response.data.message[field]);
            }
          }
          console.log(error)
        } finally { 
          this.loadingSubmitBaseKelas = false
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
  };
  </script>
  