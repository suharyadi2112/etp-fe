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

              <div class="form-floating">
                <select class="form-select" v-model="formData.selectedSemester" id="semesterName" aria-label="Floating label select example">
                  <option value="" disabled selected>Choose...</option>
                  <option value="Genap">Genap</option>
                  <option value="Ganjil">Ganjil</option>
                </select>
                <label for="semesterName">Semester | {{ formData.selectedSemester }}</label>
              </div>
            </div>
            
            <div class="col-md-3">
              <AcademicYearForm/>
            </div>
            <div class="col-md-3">
              <div class="form-floating mb-3">
                <input type="date" class="form-control" id="startDate" v-model="formData.startDate">
                <label for="startDate">Mulai</label>
              </div>              
            </div>
            <div class="col-md-3">
              <div class="form-floating mb-3">
                <input type="date" class="form-control" id="endDate" v-model="formData.endDate">
                <label for="endDate">Selesai</label>
              </div> 
            </div>
            <div class="col-md-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="formData.activeStatus">
                <label class="form-check-label" for="flexSwitchCheckDefault">Active Status</label>
              </div>
            </div>
            <div class="col-md-9">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Description....."  v-model="formData.description" id="description" style="height: 100px"></textarea>
                <label for="description">Deskripsi</label>
              </div>
            </div>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import AcademicYearForm from '@/components/semester_component/AcademicYearForm.vue';
// import axios from 'axios';

export default {
  components: {
    AcademicYearForm
  },
  data() {
    return {
      formData: {
        selectedSemester:'',
        startDate: '',
        endDate: '',
        name: '',
        email: '',
        activeStatus: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.sendStoreSemester();
    },
    sendStoreSemester() {
      console.log("tes ---")
    },
  },
};
</script>
