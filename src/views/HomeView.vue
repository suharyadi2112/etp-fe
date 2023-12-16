<template>

  <main id="main" class="main">

    <div class="pagetitle"> 
      <h1 class="text-left">Dashboard</h1>
      <hr>
      <nav>
        <ol class="breadcrumb">
          <router-link :to="{ name: '/'}" class="breadcrumb-item">Home</router-link>
          <li class="breadcrumb-item">Dashboard</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-6">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Example Card</h5>
              <p>This is an examle page with no contrnt. You can use it as a starter for your custom pages.</p>
            </div>
          </div>

        </div>

        <div class="col-lg-6">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Example Card</h5>
              <p>This is an examle page with no contrnt. You can use it as a starter for your custom pages.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main><!-- End #main -->

</template> 