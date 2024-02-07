<!-- ModalFormUpdatemataPelajaran -->
<template>
    <div class="modal fade" id="updateMataPelajaran" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Update Mata Pelajaran</h1>
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
              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.subject_name }" v-model="formData.data.subject_name" id="mataPelajaranName" aria-label="Floating label select example" name="subject_name">
                        <option value="" selected>Choose...</option>
                        <option v-for="subjectBaseMatPel in listOptionMatPel" :key="subjectBaseMatPel.id" :value="subjectBaseMatPel.id">
                          {{ subjectBaseMatPel.base_subject_name }}
                        </option>
                    </select>
                    <label for="mataPelajaran">Mata Pelajaran</label>
                  </div>
                  <div v-if="error.subject_name" class="invalid-feedback">
                    Mata pelajaran harus diisi.
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.education_level }" v-model="formData.data.education_level" id="mataPelajaranName" aria-label="Floating label select example" name="education_level">
                        <option value="" selected>Choose...</option>
                        <option value="sd">SD</option>
                        <option value="mi">MI</option>
                        <option value="smp">SMP</option>
                        <option value="mts">MTS</option>
                        <option value="sma">SMA</option>
                        <option value="smk">SMK</option>
                        <option value="ma">MA</option>
                      </select>
                      <label for="mataPelajaranName">Tingkat Edukasi | {{ formData.data.education_level }}</label>
                  </div>
                  <div v-if="error.education_level" class="invalid-feedback">
                    Please select an option.
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true }" placeholder="Description....."  v-model="formData.data.subject_description" id="subject_description" style="height: 100px" name="subject_description"></textarea>
                  <label for="subject_description">Deskripsi Mata Pelajaran</label>
                </div>
              </div>
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitMataPelajaran">
                <span v-if="!loadingSubmitMataPelajaran"><i class="bi bi-arrow-repeat"></i> Update Mata Pelajaran</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Update Mata Pelajaran</label>
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
      dataFormUpdateMatPel: Object, 
      dataBaseListForUpdate : Object,
    },
    computed: {
      hasLoaded() {
        return this.dataLoaded;
      },
      listOptionMatPel() { //pakai computed/watcher untuk serve data langsung
        return { ...this.dataBaseListForUpdate };
      }
    },
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: { ...this.dataFormUpdateMatPel },
        error : {},//error clientside
        loadingSubmitMataPelajaran : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    watch: {
      dataFormUpdateMatPel(newData) {
        this.formData = { ...newData,
          data: {
            ...newData.data
          }
        };
      }
    },
    methods: {
      submitFormUpdate() {
        this.loadingSubmitMataPelajaran = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['subject_name', 'education_level', 'subject_description'];

        requiredFields.forEach(field => {
          if (!this.formData.data[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitMataPelajaran = false },1000);
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
            const response = await axios.put(`${this.baseUrl}/api/update_mata_pelajaran/${this.formData.data.id}`, this.formData.data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Mata Pelajaran Successfully Updated')
            this.$emit('mataPelajaranUpdate'); //sent signal to views
            this.loadingSubmitMataPelajaran = false
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
  