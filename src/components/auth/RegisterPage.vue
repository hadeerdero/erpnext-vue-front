<template>
    <div class="boxed-size bg-white">
      <Preloader />
      <div class="container">
      <div class="main-content d-flex flex-column p-0">
        <div class="m-auto m-1230">
          <div class="row align-items-center">
            <div class="col-lg-6 d-none d-lg-block">
              <img src="@/assets/images/register.jpg" class="rounded-3" alt="register">
            </div>
            <div class="col-lg-6">
              <div class="mw-480 ms-lg-auto">
                <div class="d-inline-block mb-4">
                  <img src="@/assets/images/logo.svg" class="rounded-3 for-light-logo" alt="login">
                  <img src="@/assets/images/white-logo.svg" class="rounded-3 for-dark-logo" alt="login">
                </div>
                <h3 class="fs-28 mb-2">Register to Trezo Dashboard</h3>
                <p class="fw-medium fs-16 mb-4">Register with social account or enter your details</p>
                <div class="row justify-content-center">
                  <div class="col-lg-4 col-sm-4">
                    <a href="https://www.google.com/" target="_blank" class="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4" style="border-color: #D6DAE1;">
                      <img src="@/assets/images/google.svg" alt="google">
                    </a>
                  </div>
                  <div class="col-lg-4 col-sm-4">
                    <a href="https://www.facebook.com/" target="_blank" class="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4" style="border-color: #D6DAE1;">
                      <img src="@/assets/images/facebook2.svg" alt="facebook2">
                    </a>
                  </div>
                  <div class="col-lg-4 col-sm-4">
                    <a href="https://www.apple.com/" target="_blank" class="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4" style="border-color: #D6DAE1;">
                      <img src="@/assets/images/apple.svg" alt="apple">
                    </a>
                  </div>
                </div>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group mb-3">
                    <label class="label text-secondary">Full Name</label>
                    <input type="text" class="form-control" v-model="form.fullName" placeholder="Enter your full name" required>
                  </div>
                  <div class="form-group mb-3">
                    <label class="label text-secondary">Email Address</label>
                    <input type="email" class="form-control" v-model="form.email" placeholder="example@trezo.com" required>
                  </div>
                  <div class="form-group mb-3">
                    <label class="label text-secondary">Password</label>
                    <input type="password" class="form-control" v-model="form.password" placeholder="Type password" required>
                  </div>
                  <div class="form-group mb-3">
                    <button type="submit" class="btn btn-primary fw-medium py-2 px-3 w-100">
                      <div class="d-flex align-items-center justify-content-center py-1">
                        <i class="material-symbols-outlined text-white fs-20 me-2">person_4</i>
                        <span>Register</span>
                      </div>
                    </button>
                  </div>
                  <div class="form-group">
                    <p>By confirming your email, you agree to our <a href="#" class="fw-medium text-decoration-none">Terms of Service</a> and that you have read and understood our <a href="#" class="fw-medium text-decoration-none">Privacy Policy</a>.</p>
                    <p>Already have an account. <router-link to="/login" class="fw-medium text-primary text-decoration-none">Log In</router-link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <ThemeSettings />
    </div>
  </template>
  
  <script>
  import Preloader from './components/Preloader.vue';
  import ThemeSettings from './components/ThemeSettings.vue';
  
  export default {
    name: 'RegisterPage',
    components: {
      Preloader,
      ThemeSettings
    },
    data() {
      return {
        form: {
          fullName: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      handleSubmit() {
        console.log('Form submitted:', this.form);
        // Handle form submission logic here
      }
    }
  }
  </script>
  
  <style>
  /* Global styles can go here or in your main App.vue */
  .boxed-size {
    min-height: 100vh;
    position: relative;
  }
  </style>