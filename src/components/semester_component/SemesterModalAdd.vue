<!-- ModalFormAddSemester -->
<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Semester</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form>
          <div class="modal-body row g-3">
            <div class="col-md-3">
              <label for="semesterName" class="form-label">Semester</label>
              <select id="semesterName" class="form-select">
                <option selected>Choose...</option>
                <option value="Genap">Genap</option>
                <option value="Ganjil">Ganjil</option>
              </select>
            </div>
            <div class="col-md-3">
              <label for="academicYear" class="form-label">Tahun Akademik</label>
              <AcademicYearForm/>
            </div>
            <div class="col-md-3">
              <label for="startDate" class="form-label">Mulai</label>
              <input type="date" class="form-control" id="startDate">
            </div>
            <div class="col-md-3">
              <label for="endDate" class="form-label">Selesai</label>
              <input type="date" class="form-control" id="endDate">
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Active Status</label>
              </div>
            </div>
            <div class="col-md-6">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" placeholder="Description....."></textarea>
            </div>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import AcademicYearForm from '@/components/semester_component/AcademicYearForm.vue';

export default {
  components: {
    AcademicYearForm
  }
};
</script>
