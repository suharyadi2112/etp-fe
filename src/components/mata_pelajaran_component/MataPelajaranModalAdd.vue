<!-- ModalFormAddmataPelajaran -->
<template>
    <div class="modal fade" id="modalMataPel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Adding Mata Pelajaran</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitForm">
            <div v-if="!hasLoadedBaseMatPel">
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
                    <select :class="{ 'form-select': true, 'is-invalid': error.subject_name }" v-model="formData.subject_name" id="mataPelajaranName" aria-label="Floating label select example" name="subject_name">
                        <option value="" selected>Choose...</option>
                        <option v-for="subjectBaseMatPel in listOptionMatPel" :key="subjectBaseMatPel.id" :value="subjectBaseMatPel.id">
                          {{ subjectBaseMatPel.base_subject_name }}
                        </option>
                      </select>
                      <label for="mataPelajaranName">Mata Pelajaran</label>
                  </div>
                  <div v-if="error.subject_name" class="invalid-feedback">
                    Mata pelajaran harus diisi.
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.education_level }" v-model="formData.education_level" id="mataPelajaranName" aria-label="Floating label select example" name="education_level">
                        <option value="" selected>Choose...</option>
                        <option value="SD">SD</option>
                        <option value="MI">MI</option>
                        <option value="SMP">SMP</option>
                        <option value="MTS">MTS</option>
                        <option value="SMA">SMA</option>
                        <option value="SMK">SMK</option>
                        <option value="MA">MA</option>
                      </select>
                      <label for="mataPelajaranName">Tingkat Edukasi</label>
                  </div>
                  <div v-if="error.education_level" class="invalid-feedback">
                    Please select an option.
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true }" placeholder="Description....."  v-model="formData.subject_description" id="subject_description" style="height: 100px" name="subject_description"></textarea>
                  <label for="subject_description">Deskripsi Mata Pelajaran</label>
                </div>
              </div>
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitMataPelajaran">
                <span v-if="!loadingSubmitMataPelajaran"><i class="bi bi-arrow-repeat"></i> Submit Mata Pelajaran</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Submit Mata Pelajaran</label>
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
      dataLoadedBaseMatPel: Boolean,
      dataBaseList : Object,
    },
    computed: {
      hasLoadedBaseMatPel() {
        return this.dataLoadedBaseMatPel;
      },
      listOptionMatPel() { //pakai computed/watcher untuk serve data langsung
        return { ...this.dataBaseList };
      }
    },
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: {
          subject_name:'',
          subject_description:'',
          education_level: '',
        },
        error : {},//error clientside
        loadingSubmitMataPelajaran : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    methods: {
      handleAcademicYear(selectedValue) {
        this.formData.academic_year = selectedValue;
      },
      submitForm() {
        this.loadingSubmitMataPelajaran = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['subject_name', 'education_level', 'subject_description'];
        requiredFields.forEach(field => {
          if (!this.formData[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitMataPelajaran = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendStoreMataPelajaran();
        }
      },
      async sendStoreMataPelajaran() {
        try {
            const response = await axios.post(`${this.baseUrl}/api/store_mata_pelajaran`, this.formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Mata Pelajaran Successfully Stored')
            this.$emit('mataPelajaranAdd'); //sent signal to views
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
          this.loadingSubmitMataPelajaran = false
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
  