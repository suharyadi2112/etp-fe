<!-- ModalFormAddBasemataPelajaran -->
<template>
    <div class="modal fade" id="modalBaseMataPel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Adding Base Mata Pelajaran</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitFormBaseMatPel">
            <div class="modal-body row g-3">
              <div class="col-12" v-if="errorMessages.length > 0">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <li v-for="(errorMessage, index) in errorMessages" :key="index"><i class="bi bi-exclamation-circle"></i> {{ errorMessage }}</li>
                </div>
              </div>
              <div class="col-md-12">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.base_subject_name }"  id="basematpel" placeholder="Kimia" v-model="formData.base_subject_name" name="base_subject_name">
                        <label for="basematpel">Nama Base Mata Pelajaran</label>
                    </form>
                  </div>
                  <div v-if="error.base_subject_name" class="invalid-feedback">
                    Base Mata pelajaran harus diisi.
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitBaseMataPel">
                <span v-if="!loadingSubmitBaseMataPel"><i class="bi bi-arrow-repeat"></i> Submit Base Mata Pelajaran</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Submit Base Mata Pelajaran</label>
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
    components: {},
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: {
          base_subject_name:'',
        },
        error : {},//error clientside
        loadingSubmitBaseMataPel : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    methods: {
      submitFormBaseMatPel() {
        this.loadingSubmitBaseMataPel = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['base_subject_name'];
        requiredFields.forEach(field => {
          if (!this.formData[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitBaseMataPel = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendStoreBaseMataPelajaran();
        }
      },
      async sendStoreBaseMataPelajaran() {
        try {
            const response = await axios.post(`${this.baseUrl}/api/store_base_mata_pelajaran`, this.formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Base Mata Pelajaran Successfully Stored')
            this.$emit('basemataPelajaranAdd'); //sent signal to views
            this.errorMessages = [];
            return response
  
        } catch (error) {
          if(error.response.data.message && error.response.status == 400){
            this.errorMessages = [];
            for (let field in error.response.data.message) { //list error 400
              this.errorMessages.push(...error.response.data.message[field]);
            }
          }
          console.log(error.response.data.message)
        } finally { 
          this.loadingSubmitBaseMataPel = false
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
  