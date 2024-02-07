<!-- ModalFormAddSemester -->
<template>
    <div class="modal fade" id="updateSemester" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Update Semester</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitForm"> 
            <div v-if="!hasLoaded">
              <div class="d-flex justify-content-center text-primary m-3">
                <strong role="status" class="pt-1" style="padding-right: 2rem;">Retrieving Data...</strong>
                <div class="spinner-border shadow" aria-hidden="true"></div>
              </div>
            </div>
            <div  v-else class="modal-body row g-3">
              <div v-if="errorMessages.length > 0"  class="col-12">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <li v-for="(errorMessage, index) in errorMessages" :key="index"><i class="bi bi-exclamation-circle"></i> {{ errorMessage }}</li>
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.semester_name }" v-model="formData.data.semester_name" id="semesterName" aria-label="Floating label select example">
                        <option value="" disabled selected>Choose...</option>
                        <option value="Genap">Genap</option>
                        <option value="Ganjil">Ganjil</option>
                      </select>
                      <label for="semesterName">Semester | {{ formData.semester_name }}</label>
                  </div>
                  <div v-if="error.semester_name" class="invalid-feedback">
                    Please select an option.
                  </div>
                </div>
              </div>
              
              <div class="col-md-3">
                <AcademicYearForm @selected="handleAcademicYear" :chooseUpdate="formData.data.academic_year" :formData="formData" :validationErrors="error"></AcademicYearForm>
              </div>
              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <input type="date" id="startDate" :class="{ 'form-control': true,'is-invalid': error.start_date }" v-model="formData.data.start_date">
                    <label for="startDate">Mulai {{ formData.start_date }}</label>
                  </div> 
                  <div v-if="error.start_date" class="invalid-feedback">
                    Please choose mulai.
                  </div>
                </div>             
              </div>
              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <input type="date" :class="{ 'form-control': true,'is-invalid': error.end_date }" id="endDate" v-model="formData.data.end_date">
                    <label for="endDate">Selesai</label>
                  </div> 
                  <div v-if="error.end_date" class="invalid-feedback">
                    Please choose selesai.
                  </div>
                </div>  
              </div>
              <div class="col-md-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="formData.data.active_status">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Active Status</label>
                </div>
              </div>
              <div class="col-md-9">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true }" placeholder="Description....."  v-model="formData.data.description" id="description" style="height: 100px"></textarea>
                  <label for="description">Deskripsi</label>
                </div>
              </div>
              
            </div><!-- v-else--> 

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button class="btn btn-outline-info" style="float: right;" type="submit" :disabled="loadingUpdateSemester">
              <span v-if="!loadingUpdateSemester"><i class="bi bi-arrow-repeat"></i> Update Semester</span>
              <span v-else>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <label> Update Semester</label>
              </span>
            </button>
  
          </div>
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AcademicYearForm from '@/components/semester_component/AcademicYearForm.vue';
  import axios from 'axios';
  
  export default {
    components: {
      AcademicYearForm
    },
    props: { //recieve data dari parents
      dataLoaded: Boolean,
      dataFormUpdate: Object, 
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
        formData: { ...this.dataFormUpdate },
        error : {},//error clientside
        loadingUpdateSemester : false, //progres btn
        errorMessages: [],//error serverside

      }
    },
    watch: {
      dataFormUpdate(newData) {
        this.formData = { ...newData,
          data: {
            ...newData.data,
            //check jika dari db Active, maka ganti ke true, begitu juga sebaliknya
            active_status: newData.data.active_status === 'Active' ? true : false
          }
        };
      }
    },
    methods: {
      handleAcademicYear(selectedValue) {
        this.formData.data.academic_year = selectedValue;
      },
      submitForm() {
        this.loadingUpdateSemester = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['semester_name', 'academic_year', 'start_date', 'end_date'];

        requiredFields.forEach(field => {
          if (!this.formData.data[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingUpdateSemester = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendUpdateSemester();
        }
      },
      async sendUpdateSemester() {
        try {
            const response = await axios.put(`${this.baseUrl}/api/update_semester/${this.formData.data.id}`, this.formData.data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Semester Successfully Updated')
            this.$emit('semesterUpdate'); //sent signal to views
            this.loadingUpdateSemester = false
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
          this.loadingUpdateSemester = false
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
  