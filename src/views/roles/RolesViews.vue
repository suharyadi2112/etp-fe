<template>

  <main id="main" class="main">

    <div class="pagetitle"> 
      <h1 class="text-left">Roles</h1>
      <hr>
      <nav>
        <ol class="breadcrumb">
          <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
          <router-link :to="{ name: 'rolesdashboard'}" class="breadcrumb-item">Roles</router-link>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body p-4">
              <DataTable
                :columns="columns"
                :data="data"
                class="table table-hover table-striped"
                width="100%"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </tfoot>
              </DataTable>
            </div>
          </div>

        </div>

      </div>
    </section>

  </main><!-- End #main -->

</template> 

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      columns : [
        { data: 'id' },
        { data: 'name' },
      ],
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        // Add more data rows as needed
      ],
    }
  },
};
</script>
<style>
@import 'datatables.net-bs5';
</style>