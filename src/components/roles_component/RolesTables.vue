<!-- /src/components/RolesDataTable.vue -->
<template>
  <DataTable
    :columns="columns"
    :options="options"
    class="table table-hover"
    width="100%"
  >
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Guard Name</th>
      </tr>
    </thead>
  </DataTable>
</template>


<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

export default {
  components: {
    DataTable,
  },
  props: {
    columns: Array,
    data: Array,
    options: Object,
  },
};
</script>

<style scoped>
  @import 'datatables.net-bs5';
</style>