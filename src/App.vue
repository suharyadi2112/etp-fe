<!-- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template> -->
<style>
@import '../public/assets/vendor/bootstrap/css/bootstrap.min.css';
@import '../public/assets/css/style.css';
@import '../public/assets/vendor/bootstrap-icons/bootstrap-icons.css';
@import '../node_modules/nprogress/nprogress.css';

@import 'https://fonts.gstatic.com" rel="preconnect';
@import 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"'; 

</style>
<template>
  <div>
    <HeaderTemplate v-if="!isLoginPage"/>
    <SidebarTemplate v-if="!isLoginPage"/> 
    <!-- Your main content goes here -->
    <router-view></router-view>
    <FooterTemplate v-if="!isLoginPage"/>
  </div>
</template>

<script>

import HeaderTemplate from '@/components/partial/HeaderPartial.vue';
import FooterTemplate from '@/components/partial/FooterPartial.vue';
import SidebarTemplate from '@/components/partial/SidebarPartial.vue';

export default {
    data() {
      return {
        isLoginPage: false,
      };
    },
    watch: {
      $route(to) {
        this.isLoginPage = to.name === 'login';
      },
    },
    components: {
      HeaderTemplate,
      FooterTemplate,
      SidebarTemplate,
    },
    mounted() {
      let bootstrap = document.createElement('script')
      bootstrap.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js')
      document.head.appendChild(bootstrap)

    },
  // Other component options go here
}

</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*/
nav {
  padding: 0px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
