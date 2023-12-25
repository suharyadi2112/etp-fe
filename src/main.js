import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import axios from 'axios';
// Set denganCredentials ke true secara global
axios.defaults.withCredentials = true;
const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);
app.use(PrimeVue);
app.mount('#app');
