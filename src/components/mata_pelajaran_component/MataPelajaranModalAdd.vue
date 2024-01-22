<!-- ModalFormAddSemester -->
<template>
    <div class="modal fade" id="modalMataPel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Semester</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitForm">
            <div class="modal-body row g-3">
              <div class="col-12" v-if="errorMessages.length > 0">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <li v-for="(errorMessage, index) in errorMessages" :key="index"><i class="bi bi-exclamation-circle"></i> {{ errorMessage }}</li>
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating mb-3 is-invalid">
                    <input type="text" :class="{ 'form-control': true,'is-invalid': error.subject_name }" id="mataPelajaran" placeholder="Bahasa Indonesia">
                    <label for="mataPelajaran">Mata Pelajaran</label>
                  </div>
                  <div v-if="error.subject_name" class="invalid-feedback">
                    Mata pelajaran harus diisi.
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.education_level }" v-model="formData.education_level" id="semesterName" aria-label="Floating label select example">
                        <option value="" selected>Choose...</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="MTS">MTS</option>
                        <option value="SMA">SMA</option>
                        <option value="SMK">SMK</option>
                        <option value="MA">MA</option>
                      </select>
                      <label for="semesterName">Tingkat Edukasi | {{ formData.education_level }}</label>
                  </div>
                  <div v-if="error.education_level" class="invalid-feedback">
                    Please select an option.
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <input type="date" :class="{ 'form-control': true,'is-invalid': error.end_date }" id="endDate" v-model="formData.end_date">
                    <label for="endDate">Selesai</label>
                  </div> 
                  <div v-if="error.end_date" class="invalid-feedback">
                    Please choose selesai.
                  </div>
                </div>  
              </div>
              <div class="col-md-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="formData.active_status">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Active Status</label>
                </div>
              </div>
              <div class="col-md-9">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true }" placeholder="Description....."  v-model="formData.description" id="description" style="height: 100px"></textarea>
                  <label for="description">Deskripsi</label>
                </div>
              </div>
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitSemester">
                <span v-if="!loadingSubmitSemester"><i class="bi bi-arrow-repeat"></i> Submit Semester</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Submit Semester</label>
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
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: {
          subject_name:'', //academic year
          subject_description:'',
          education_level: '',
          subject_code: '',
        },
        error : {},//error clientside
        loadingSubmitSemester : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    methods: {
      handleAcademicYear(selectedValue) {
        this.formData.academic_year = selectedValue;
      },
      submitForm() {
        this.loadingSubmitSemester = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['semester_name', 'academic_year', 'start_date', 'end_date'];
        requiredFields.forEach(field => {
          if (!this.formData[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitSemester = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendStoreSemester();
        }
      },
      async sendStoreSemester() {
        try {
            const response = await axios.post(`${this.baseUrl}/api/store_semester`, this.formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Semester Successfully Stored')
            this.$emit('semesterAdd'); //sent signal to views
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
          this.loadingSubmitSemester = false
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
  