<template>
<div class="input-group has-validation">
    <div class="form-floating is-invalid">
        <select :class="{ 'form-select': true, 'is-invalid': hasValidationError  }"  v-model="selectedYear" @change="handleYearChange" id="TahunAcademic" aria-label="Floating label select example">
            <option value="" disabled selected>Choose</option>
            <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
            <div v-if="selectedYear" class="alert alert-info pb-1 pt-1 mt-2" role="alert">
          <small><i class="bi bi-pencil"></i> terpilih : {{ selectedYear }}/{{ getNextYear(selectedYear) }}</small>
          </div>
        <label for="TahunAcademic">Tahun Akademik</label>
    </div>
  <div v-if="hasValidationError " class="invalid-feedback">
    Please choose tahun mulai.
  </div>
</div>
</template>

<script>

export default {
  props: { //recieve data dari parents
    formData: Object,
    validationErrors: Object,
    chooseUpdate: String,
  },
  computed: {
    hasValidationError() {
      return this.validationErrors && this.validationErrors.academic_year;
    }
  },
  data() {
    return {
      selectedYear: this.chooseUpdate ?? '', //digunakan untuk update dan create semester
      availableYears: generateYears(2024, 2030), // rentang tahun 2024 hingga 2030
    };
  },
  methods: {
    handleYearChange() {
      //Contoh: Memastikan hanya tahun yang diambil
      if (this.selectedYear) {
        this.selectedYear = this.selectedYear.substring(0, 4);
        this.$emit('selected', this.selectedYear);
      } 
    },
    getNextYear(year) {
      return `${parseInt(year) + 1}`;
    }
  }
};

function generateYears(start, end) {
  const years = [];
  for (let year = start; year <= end; year++) {
    years.push(`${year}`);
  }
  return years;
}

</script>
