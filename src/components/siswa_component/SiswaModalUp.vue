<!-- ModalFormUpSiswa -->
<template>
    <div class="modal fade" id="updateSiswa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Update Siswa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitFormSiswa">
          <div v-if="!hasLoadedSiswa">
              <div class="d-flex justify-content-center text-primary m-3">
                <strong role="status" class="pt-1" style="padding-right: 2rem;">Retrieving Data...</strong>
                <div class="spinner-border shadow" aria-hidden="true"></div>
              </div>
            </div>
            <div v-else class="modal-body row g-3">
              <div class="col-12" v-if="errorMessages.length > 0">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <li v-for="(errorMessage, index) in errorMessages" :key="index"><i class="bi bi-exclamation-circle"></i> {{ errorMessage }}</li>
                </div>
              </div>

              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.nama }"  id="nama" placeholder="Sumail Ahmad" v-model="formData.data.nama" name="nama">
                        <label for="nama">Nama Siswa</label>
                    </form>
                  </div>
                  <div v-if="error.nama" class="invalid-feedback">
                    Nama siswa harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="number" :class="{ 'form-control': true,'is-invalid': error.nis }" id="nis" placeholder="1232123211" v-model="formData.data.nis" name="nis" >
                        <label for="nis">NIS</label>
                    </form>
                  </div>
                  <div v-if="error.nis" class="invalid-feedback">
                    NIS harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group has-validation">
                
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.id_kelas }" v-model="formData.data.id_kelas" id="nama_kelas_name" aria-label="Floating label" name="nama_kelas">
                        <option value="" selected>Choose...</option>
                        <option v-for="namaKelas in listOptionKelas" :key="namaKelas.id" :value="namaKelas.id">
                          {{ namaKelas.nama_kelas }}
                        </option>
                    </select>
                    <label for="nama_kelas_name">Nama Kelas</label>
                    </div>

                    <div v-if="error.id_kelas" class="invalid-feedback">
                        Nama Kelas harus diisi.
                    </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="number" :class="{ 'form-control': true,'is-invalid': error.phone_number }" id="phone_number" placeholder="1232123211" v-model="formData.data.phone_number" name="phone_number" >
                        <label for="phone_number">Nomor Telepon</label>
                    </form>
                  </div>
                  <div v-if="error.nis" class="invalid-feedback">
                    Nomor telepon harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-2">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="statusSiswa" v-model="formData.data.status">
                  <label class="form-check-label" for="statusSiswa">Status</label>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                      <select :class="{ 'form-select': true, 'is-invalid': error.gender }" v-model="formData.data.gender" id="gender_name" aria-label="Floating label" name="gender">
                          <option value="" selected>Choose...</option>
                          <option value="Laki-laki" >Laki-laki</option>
                          <option value="Perempuan" >Perempuan</option>
                      </select>
                      
                      <label for="gender_name">Jenis Kelamin</label>
                  </div>
                  <div v-if="error.gender" class="invalid-feedback">
                    Jenis kelamin harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="date" :class="{ 'form-control': true,'is-invalid': error.birth_date }"  id="birth_date" v-model="formData.data.birth_date" name="birth_date">
                        <label for="birth_date">Tanggal Lahir</label>
                    </form>
                  </div>
                  <div v-if="error.birth_date" class="invalid-feedback">
                    Tanggal lahir harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true, 'is-invalid': error.birth_place }" placeholder="Tempat lahir....."  v-model="formData.data.birth_place" id="birth_place" style="height: 100px" name="birth_place"></textarea>
                  <label for="birth_place">Tempat Lahir</label>
                </div>
                <div v-if="error.birth_place" class="invalid-feedback">
                  Tempat lahir harus diisi.
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true, 'is-invalid': error.address }" placeholder="Alamat tempat tinggal....."  v-model="formData.data.address" id="address" style="height: 100px" name="address"></textarea>
                  <label for="address">Alamat tempat tinggal</label>
                </div>
                <div v-if="error.address" class="invalid-feedback">
                  Address harus diisi.
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                      <select :class="{ 'form-select': true, 'is-invalid': error.religion }" v-model="formData.data.religion" id="religion_name" aria-label="Floating label" name="religion">
                          <option value="" selected>Choose...</option>
                          <option value="Islam" >Islam</option>
                          <option value="Kristen" >Kristen</option>
                          <option value="Hindu" >Hindu</option>
                          <option value="Buddha" >Buddha</option>
                          <option value="Konghucu" >Konghucu</option>
                      </select>
                      
                      <label for="religion_name">Agama</label>
                  </div>
                  <div v-if="error.religion" class="invalid-feedback">
                    Agama harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.email }"  id="email" placeholder="tes@gmail.com" v-model="formData.data.email" name="email">
                        <label for="email">Email</label>
                    </form>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="number" :class="{ 'form-control': true,'is-invalid': error.parent_phone_number }"  id="parent_phone_number" placeholder="082283778895" v-model="formData.data.parent_phone_number" name="parent_phone_number">
                        <label for="parent_phone_number">Nomor Telp Orang Tua</label>
                    </form>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <label for="formFile" class="form-label"><b>Photo Profile</b><code> .jpg, .jpeg, .png</code></label>
                  <input accept="image/jpeg, image/jpg, image/png" @change="handleFileChangeUP" :class="{'form-control': true,'is-invalid': error.photo_profile }"  type="file" id="formFile">
              </div>
              
              <div v-if="this.formData.data.photo_profile">
                <img :src="this.formData.data.photo_profile" alt="Uploaded Image" style="width:30%">
              </div>
              <div v-else-if="tempFile">
                <img :src="tempFile" alt="Uploaded Image" style="width:30%">
              </div>

              <div class="col-md-12 mb-0">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary text-white"><i class="bi bi-facebook"></i></span>
                  <div class="form-floating">
                    <input type="text" :class="{ 'form-control': true,'is-invalid': error.facebook }" id="facebook" placeholder="https://www.facebook.com/example_page" name="facebook"  v-model="formData.data.facebook">
                      <label for="facebook">https://www.facebook.com/example_page</label>
                  </div>
                </div>
              </div>

              <div class="col-md-12 mb-0 mt-0">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary text-white"><i class="bi bi-instagram"></i></span>
                  <div class="form-floating">
                    <input type="text" :class="{ 'form-control': true,'is-invalid': error.instagram }" id="instagram" placeholder="https://www.instagram.com/example_account" name="instagram" v-model="formData.data.instagram">
                      <label for="instagram">https://www.instagram.com/example_account</label>
                  </div>
                </div>
              </div>

              <div class="col-md-12 mb-0 mt-0">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary text-white"><i class="bi bi-linkedin"></i></span>
                  <div class="form-floating">
                    <input type="text" :class="{ 'form-control': true,'is-invalid': error.linkedin }" id="linkedin" placeholder="https://www.linkedin.com/in/example_profile" name="linkedin" v-model="formData.data.linkedin">
                      <label for="linkedin">https://www.linkedin.com/in/example_profile</label>
                  </div>
                </div>
              </div>



            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" style="float: right;" type="submit" :disabled="loadingSubmitSiswa">
                <span v-if="!loadingSubmitSiswa"><i class="bi bi-arrow-repeat"></i> Update Siswa</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Submit Siswa</label>
                </span>
              </button>
            </div> 
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    components: { },
    props: {
      dataLoadedSiswa : Boolean,
      dataFormUpdateSiswa: Object,
      getKelas : Object,
      fileTemp: String,
    },
    computed: {
      hasLoadedSiswa() {
        return this.dataLoadedSiswa;
      },
      listOptionKelas() { //pakai computed/watcher untuk serve data langsung
        return { ...this.getKelas };
      },
      tempFile() {
        return this.fileTemp;
      }
    },
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: { ...this.dataFormUpdateSiswa },
        error : {},//error clientside
        loadingSubmitSiswa : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    watch: {
      dataFormUpdateSiswa(newData) {
        this.formData = { ...newData,
          data: {
            ...newData.data,
            //check jika dari db Active, maka ganti ke true, begitu juga sebaliknya
            status: newData.data.status === 'Active' ? true : false
          }
        };
      }
    },
    methods: {
      handleFileChangeUP(event) { //preview photo dan convert base 64
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.formData.data.photo_profile = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitFormSiswa() {
        this.loadingSubmitSiswa = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['nis', 'nama','gender','birth_date','birth_place','address','phone_number','id_kelas','religion'];
        requiredFields.forEach(field => { 
          
          console.log(this.formData.data[field])
          if (!this.formData.data[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitSiswa = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendUpdateSiswa();
        }
      },
      async sendUpdateSiswa() {
        try {
            const response = await axios.put(`${this.baseUrl}/api/update_siswa/${this.formData.data.id}`, this.formData.data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Siswa Successfully Updated')
            this.$emit('siswaUpdate'); //sent signal to views
            this.errorMessages = [];
            return response
  
        } catch (error) {
          if(error.response.data.message && error.response.status == 400){
            this.errorMessages = [];
            for (let field in error.response.data.message) { //list error 400
              this.errorMessages.push(...error.response.data.message[field]);
            }
          }
          console.log(error.response.data.message)
        } finally { 
          this.loadingSubmitSiswa = false
        }
      },
      Toasttt(msg, type, detail){
        const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "#F8F8F8",
            didOpen: (toast) => {
                toast.onmouseenter = this.$swal.stopTimer;
                toast.onmouseleave = this.$swal.resumeTimer;
            }
        });
            Toast.fire({
            icon: type,
            title: msg,
            text: detail,
        });
      },
    },
  };
  </script>
  