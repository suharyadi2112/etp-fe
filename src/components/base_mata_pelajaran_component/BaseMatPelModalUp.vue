<!-- ModalFormUpdatebasemataPelajaran -->
<template>
    <div class="modal fade" id="updateBaseMataPelajaran" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Update Base Mata Pelajaran</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitFormUpdate">
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
              <div class="col-md-12">
                <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.base_subject_name }"  id="basematpel" placeholder="Kimia" v-model="formData.data.base_subject_name" name="base_subject_name">
                        <label for="basematpel">Nama Base Mata Pelajaran</label>
                    </form>
                  </div>
                  <div v-if="error.base_subject_name" class="invalid-feedback">
                    Base Mata pelajaran harus diisi.
                  </div>
              </div>
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitBaseMataPelajaran">
                <span v-if="!loadingSubmitBaseMataPelajaran"><i class="bi bi-arrow-repeat"></i> Update Base Mata Pelajaran</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Update Base Mata Pelajaran</label>
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
        loadingSubmitBaseMataPelajaran : false, //progres btn
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
      submitFormUpdate() {
        this.loadingSubmitBaseMataPelajaran = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['base_subject_name'];

        requiredFields.forEach(field => {
          if (!this.formData.data[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitBaseMataPelajaran = false },1000);
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
            const response = await axios.put(`${this.baseUrl}/api/update_base_mata_pelajaran/${this.formData.data.id}`, this.formData.data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Mata Pelajaran Successfully Updated')
            this.$emit('basemataPelajaranUpdate'); //sent signal to views
            this.loadingSubmitBaseMataPelajaran = false
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
          this.loadingSubmitBaseMataPelajaran = false
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
  