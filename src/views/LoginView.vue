<!-- Home.vue (or your main component) -->
<template>
    <div>
        <main>
            <div class="container">

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div class="d-flex justify-content-center py-4">
                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                        <img src="assets/img/logo.png" alt="">
                        <span class="d-none d-lg-block">ETP</span>
                        </a>
                    </div><!-- End Logo -->

                    <div class="card mb-3">
 
                        <div class="card-body">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                            <p class="text-center small">Enter your username & password to login</p>
                        </div>

                        <form class="row g-3 needs-validation" novalidate @submit.prevent="login">

                            <div class="col-12">
                            <label for="yourEmail" class="form-label">Email</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-envelope"></i></span>
                                <input type="text" v-model="email" class="form-control" id="yourEmail" placeholder="check@gmail.com" :class="{ 'is-invalid': isInvalidEmail }" required>
                                <div class="invalid-feedback" v-show="isInvalidEmail || emailErrorMessage">{{ emailErrorMessage || 'Please enter a valid email address.' }}</div>
                            </div>
                            </div>

                            <div class="col-12">
                            <label for="yourPassword" class="form-label">Password</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-key-fill"></i></span>
                                <input type="password" v-model="password" placeholder="Check123@" class="form-control" id="yourPassword" :class="{ 'is-invalid': isInvalidPass }" required>
                                <div class="invalid-feedback" v-show="isInvalidPass || passwordErrorMessage">{{ passwordErrorMessage || 'Please enter your password.' }}</div>
                            </div>
                            </div>

                            <div class="col-12">
                              <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                                <span v-if="!loading">Login</span>
                                <span v-else>
                                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  <span class="visually-hidden">Loading...</span>
                                </span>
                              </button>
                            </div>

                            <div class="col-12">
                              <p class="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                            </div>
                        </form>

                        </div>
                    </div>

                    <div class="credits">
                        <!-- All the links in the footer should remain intact. -->
                        <!-- You can delete the links only if you purchased the pro version. -->
                        <!-- Licensing information: https://bootstrapmade.com/license/ -->
                        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>

                    </div>
                </div>
                </div>

            </section>
            </div>
        </main><!-- End #main -->
    </div>
</template>

<script>
import axios from 'axios';
import NProgress from 'nprogress';
export default {
    data() {
        return {
            loading: false,
            email: '',
            password: '',
            isInvalidEmail: false,
            isInvalidPass: false,
            emailErrorMessage: null,
            passwordErrorMessage: null,
        };
    },
    watch: {
        email: function(newEmail) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          this.isInvalidEmail = !emailRegex.test(newEmail);
          this.emailErrorMessage = null; 
        },
      },
    methods: {
        async login() {
            try {
                NProgress.start();
                this.loading = true

                await new Promise(resolve => setTimeout(resolve, 1000));
                const baseUrl = process.env.BE_APP_BASE_URL;
                const Url = `${baseUrl}/api/login`;

                let data = {
                    email: this.email,
                    password: this.password,
                }
                
                const response = await axios.post(Url, data);
                const token = response.data.data.access_token;
                const permission = response.data.data.permission;

                if (token) {

                    localStorage.setItem('tokenETP', token);
                    localStorage.setItem('permissions', JSON.stringify(permission));

                    this.Toasttt('success','Welcome Back')
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    this.$router.push('/');
                } else {
                    this.$router.push('/login');

                }
                // Redirect or perform any other actions upon successful login
            } catch (error) {

                if (error.response && error.response.status) {
                    if (error.response.status == 500 && error.response.data.message == 'Server Error') {
                        this.Toasttt('error',error.response.data.error)
                    }else if (error.response.status == 401 && error.response.data.message == 'Unauthorized') {
                        this.Toasttt('warning','Unauthorized Access')
                    }else if (error.response && error.response.status === 400 && error.response.data.message) {
                        const emailErrorMessage = error.response.data.message.email;
                        const passwordErrorMessage = error.response.data.message.password;
                        if (Array.isArray(emailErrorMessage) && emailErrorMessage.length > 0) {
                          this.emailErrorMessage = emailErrorMessage[0];
                        }
                        if (Array.isArray(passwordErrorMessage) && passwordErrorMessage.length > 0) {
                          this.isInvalidPass = true
                          this.passwordErrorMessage = passwordErrorMessage[0];
                        }
                    }else{
                        // Handle login error
                        this.Toasttt('error',error)
                    }
                }
                console.error('Login error', error);
            }
            this.loading = false
            NProgress.done();
        },
        Toasttt(type,msg){
            const Toast = this.$swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = this.$swal.stopTimer;
                    toast.onmouseleave = this.$swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: type,
                title: msg || "Failed Login"
            });
        },
    },
};

</script>