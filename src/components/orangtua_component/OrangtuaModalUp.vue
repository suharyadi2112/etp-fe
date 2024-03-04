<!-- ModalFormAddOrangTua -->
<template>
    <div class="modal fade" id="modalOrtuUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Update Orang Tua (Wali)</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="submitFormOrtu">
          <div v-if="!hasLoadedOrtu">
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
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.name }"  id="name" placeholder="Sumail Ahmad" v-model="formData.data.name" name="name">
                        <label for="name">Nama Orang Tua (Wali)</label>
                    </form>
                  </div>
                  <div v-if="error.name" class="invalid-feedback">
                    Nama orang tua (wali) harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group has-validation">
                
                  <div class="form-floating is-invalid">
                    <select :class="{ 'form-select': true, 'is-invalid': error.id_siswa }" v-model="formData.data.siswa.id" id="nama_siswa" aria-label="Floating label" name="nama">
                        <option value="" selected>Choose...</option>
                        <option v-for="namaSiswa in listOptionSiswa" :key="namaSiswa.id" :value="namaSiswa.id">
                          {{ namaSiswa.nama }}
                        </option>
                    </select>
                    <label for="nama_siswa">Siswa</label>
                    {{ formData.data.siswa.id }}
                    </div>
                    <div v-if="error.id_siswa" class="invalid-feedback">
                        Siswa harus diisi.
                    </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                      <select :class="{ 'form-select': true, 'is-invalid': error.relationship }" v-model="formData.data.relationship" id="relationship" aria-label="Floating label" name="relationship">
                          <option value="" selected disable>Choose...</option>
                          <option value="adik">Adik</option>
                          <option value="anggota_komunitas">Anggota Komunitas</option>
                          <option value="ayah">Ayah</option>
                          <option value="bibiku">Bibi</option>
                          <option value="gurumu">Guru</option>
                          <option value="ibu">Ibu</option>
                          <option value="kakek">Kakek</option>
                          <option value="kakak">Kakak</option>
                          <option value="keluarga_jauh">Keluarga Jauh</option>
                          <option value="keluarga_tiri">Keluarga Tiri</option>
                          <option value="lainnya">Lainnya</option>
                          <option value="mentormu">Mentor</option>
                          <option value="nenek">Nenek</option>
                          <option value="orang_tua_angkat">Orang Tua Angkat</option>
                          <option value="paman">Paman</option>
                          <option value="pembimbing_akademik">Pembimbing Akademik</option>
                          <option value="pelatih_ekstrakurikuler">Pelatih Ekstrakurikuler</option>
                          <option value="penjaga_hukum">Penjaga Hukum</option>
                          <option value="saudara_sepupu">Saudara Sepupu</option>
                          <option value="saudara_tiri">Saudara Tiri</option>
                          <option value="teman_keluarga">Teman Keluarga</option>
                          <option value="wali_asuh">Wali Asuh</option>
                      </select>
                      
                      <label for="relationship">Hubungan</label>
                  </div>
                  <div v-if="error.relationship" class="invalid-feedback">
                    Hubungan harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true, 'is-invalid': error.address }" placeholder="Alamat tempat tinggal....."  v-model="formData.data.address" id="address" style="height: 100px" name="address"></textarea>
                  <label for="address">Alamat tempat tinggal orang tua (wali)</label>
                </div>
                <div v-if="error.address" class="invalid-feedback">
                  Alamat Orang tua harus diisi.
                </div>
              </div>

              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.email }"  id="email" placeholder="kami@gmail.com" v-model="formData.data.email" name="email">
                        <label for="email">Email Orang Tua (Wali)</label>
                    </form>
                  </div>
                  <div v-if="error.email" class="invalid-feedback">
                    Email orang tua (wali) harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="number" :class="{ 'form-control': true,'is-invalid': error.phone_number }" id="phone_number" placeholder="1232123211" v-model="formData.data.phone_number" name="phone_number" >
                        <label for="phone_number">Nomor Telepon Orang Tua (Wali)</label>
                    </form>
                  </div>
                  <div v-if="error.phone_number" class="invalid-feedback">
                    Nomor telepon harus diisi.
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="text" :class="{ 'form-control': true,'is-invalid': error.occupation }" id="occupation" placeholder="1232123211" v-model="formData.data.occupation" name="occupation" >
                        <label for="occupation">Pekerjaan Orang Tua (Wali)</label>
                    </form>
                  </div>
                  <div v-if="error.occupation" class="invalid-feedback">
                    Pekerjaan harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="input-group has-validation">
                  <div class="form-floating is-invalid">
                    <form class="form-floating">
                        <input type="date" :class="{ 'form-control': true,'is-invalid': error.date_of_birth }"  id="date_of_birth" v-model="formData.data.date_of_birth" name="date_of_birth">
                        <label for="date_of_birth">Tanggal Lahir Orang Tua (Wali)</label>
                    </form>
                  </div>
                  <div v-if="error.date_of_birth" class="invalid-feedback">
                    Tanggal lahir harus diisi.
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true, 'is-invalid': error.place_of_birth }" placeholder="Tempat lahir....."  v-model="formData.data.place_of_birth" id="place_of_birth" style="height: 100px" name="place_of_birth"></textarea>
                  <label for="place_of_birth">Tempat Lahir Orang Tua (Wali)</label>
                </div>
                <div v-if="error.place_of_birth" class="invalid-feedback">
                  Tempat lahir harus diisi.
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating is-invalid">
                  <textarea :class="{ 'form-control': true, 'is-invalid': error.additional_notes }" placeholder="Tambahan keterangan lainnya....."  v-model="formData.data.additional_notes" id="additional_notes" style="height: 100px" name="additional_notes"></textarea>
                  <label for="additional_notes">Tambahan keterangan lainnya</label>
                </div>
                <div v-if="error.additional_notes" class="invalid-feedback">
                  Tambahan keterangan harus diisi.
                </div>
              </div>


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-info text-white" style="float: right;" type="submit" :disabled="loadingSubmitOrangtua">
                <span v-if="!loadingSubmitOrangtua"><i class="bi bi-arrow-repeat"></i> Update Orangtua</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <label> Update Orangtua</label>
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
      dataListSiswa : Object,
      dataLoadedOrtu: Boolean,
      dataFormUpdateOrtu: Object,
    },
    computed: {
      hasLoadedOrtu() {
        return this.dataLoadedOrtu;
      },
      listOptionSiswa() { //pakai computed/watcher untuk serve data langsung
        return { ...this.dataListSiswa };
      },
    },
    data() {
      return {
        baseUrl: process.env.BE_APP_BASE_URL,
        token: localStorage.getItem('tokenETP'),
        formData: { ...this.dataFormUpdateOrtu },
        error : {},//error clientside
        loadingSubmitOrangtua : false, //progres btn
        errorMessages: [],//error serverside
      }
    },
    watch: {
      dataFormUpdateOrtu(newData) {
        this.formData = { ...newData,
          data: {
            ...newData.data,
          }
        };
      }
    },
    methods: {
      handleFileChange(event) { //preview photo dan convert base 64
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.formData.photo_profile = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitFormOrtu() {
        this.loadingSubmitOrangtua = true //progres btn
        this.error = {};
        //validation
        const requiredFields = ['name','phone_number','relationship','id_siswa', 'address','date_of_birth'];
        requiredFields.forEach(field => { 
          
          console.log(this.formData[field])
          if (!this.formData[field]) {
            this.error[field] = true;
            setTimeout(()=>{ this.loadingSubmitOrangtua = false },1000);
          }else{
            this.error[field] = false;// fill
          }
        });
        const hasErrors = requiredFields.some(field => this.error[field]);
        if (!hasErrors) {
          this.sendStoreOrtu();
        }
      },
      async sendStoreOrtu() {
        try {
            const response = await axios.post(`${this.baseUrl}/api/store_orangtua`, this.formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
  
            this.Toasttt('Successfully', 'success', 'Data Orang Tua Successfully Stored')
            this.$emit('ortuAdd'); //sent signal to views
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
          this.loadingSubmitOrangtua = false
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
  