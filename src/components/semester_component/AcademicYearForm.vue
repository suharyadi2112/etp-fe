<template>
    <select id="academicYear" v-model="selectedYear" @change="handleYearChange" class="form-select">
    <option value="" disabled selected>Choose</option>
    <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
    </select>
    <div v-if="selectedYear" class="alert alert-info pb-1 pt-1 mt-2" role="alert">
	<small><i class="bi bi-pencil"></i> terpilih : {{ selectedYear }}/{{ getNextYear(selectedYear) }}</small>
	</div>
</template>

<script>

export default {
  data() {
    return {
      selectedYear: '',
      availableYears: generateYears(2024, 2030) // rentang tahun 2024 hingga 2030
    };
  },
  methods: {
    handleYearChange() {
      //Contoh: Memastikan hanya tahun yang diambil
      if (this.selectedYear) {
        this.selectedYear = this.selectedYear.substring(0, 4);
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
