<!-- ModalFormAddSemester -->
<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Semester</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form @submit.prevent="submitForm">
          <div class="modal-body row g-3">
            <div class="col-md-3">
              <div class="input-group has-validation">
                <div class="form-floating is-invalid">
                  <select :class="{ 'form-select': true, 'is-invalid': error.semester_name }" v-model="formData.semester_name" id="semesterName" aria-label="Floating label select example">
                      <option value="" selected>Choose...</option>
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
              <AcademicYearForm @selected="handleAcademicYear" :formData="formData" :validationErrors="error"></AcademicYearForm>
            </div>
            <div class="col-md-3">
              <div class="input-group has-validation">
                <div class="form-floating is-invalid">
                  <input type="date" id="startDate" :class="{ 'form-control': true,'is-invalid': error.start_date }" v-model="formData.start_date">
                  <label for="startDate">Mulai</label>
                </div> 
                <div v-if="error.start_date" class="invalid-feedback">
                  Please choose mulai.
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
          <button type="submit" class="btn btn-primary">Submit</button>
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
  data() {
    return {
      baseUrl: process.env.BE_APP_BASE_URL,
      token: localStorage.getItem('tokenETP'),
      formData: {
        academic_year:'', //academic year
        semester_name:'',
        start_date: '',
        end_date: '',
        active_status: '',
        description: '',
      },
      error : {},
    }
  },
  methods: {
    handleAcademicYear(selectedValue) {
      this.formData.academic_year = selectedValue;
    },
    submitForm() {
      this.error = {};
      //validation
      const requiredFields = ['semester_name', 'academic_year', 'start_date', 'end_date'];
      requiredFields.forEach(field => {
        if (!this.formData[field]) {
          this.error[field] = true;
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
          console.log(response)
          return response

      } catch (error) {
        console.log(error.response)
        console.log(error)
      }

    },
  },
};
</script>
