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
                <!-- <form @submit.prevent="handleSubmit">
                  <div class="form-group mb-3">
                    <label class="label text-secondary">name</label>
                    <input type="text" class="form-control" v-model="form.name" placeholder="Enter your full name" required>
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
                </form> -->
                <form @submit.prevent="handleSubmit">
    <div class="form-group mb-3">
      <label class="label text-secondary">Full Name</label>
      <input type="text" class="form-control" v-model="form.name" placeholder="Enter your full name" required>
    </div>
    <div class="form-group mb-3" v-if="form.role == 'donor' ">
      <label class="label text-secondary">National ID</label>
      <input type="text" class="form-control" v-model="form.national_id" placeholder="Enter your national ID" required>
    </div>
    <div class="form-group mb-3" v-if="form.role == 'donor' ">
      <label class="label text-secondary" >Phone Number</label>
      <input type="tel" class="form-control" v-model="form.phone_number" placeholder="Enter your phone number" required>
    </div>
    <div class="form-group mb-3">
      <label class="label text-secondary">City</label>
      <select class="form-control" v-model="form.city" required>
        <option value="" disabled selected>Select your city</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
      </select>
    </div>
    <div class="form-group mb-3" >
      <label class="label text-secondary">Email Address</label>
      <input type="email" class="form-control" v-model="form.email" placeholder="example@trezo.com" required>
    </div>
    <div class="form-group mb-3">
      <label class="label text-secondary">Password</label>
      <input type="password" class="form-control" v-model="form.password" placeholder="Type password" required>
    </div>
    <div class="form-group mb-3">
    <label class="label text-secondary">Register As</label>
    <div class="d-flex flex-wrap gap-3">
      <div class="form-check" v-for="role in userRoles" :key="role.value">
        <input 
          class="form-check-input" 
          type="radio" 
          v-model="form.role" 
          :id="'role-' + role.value" 
          :value="role.value"
          required
        >
        <label class="form-check-label" :for="'role-' + role.value">
          {{ role.label }}
        </label>
      </div>
    </div>
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
  import Preloader from '@/components/global/PreloaderComponent.vue';
  import ThemeSettings from '@/components/layout/ThemeSettings.vue';
  import { mapActions } from 'vuex';
  import {axiosAuth} from '@/plugins/axios/axiosAuth';
  
  export default {
    name: 'RegisterView',
    components: {
      Preloader,
      ThemeSettings
    },
    data() {
      return {
        userRoles: [
        { value: 'donor', label: 'Donor' },
        { value: 'hospital', label: 'Hospital' },
        { value: 'bloodBank', label: 'Blood Bank' }
      ],
        form: {
          name: '',
          national_id: '',
          phone_number: '',
          city: '',
          email: '',
          password: '',
          role: '' // Add role field
        },
        cities: [] // This will store the list of cities from your API
      }
    },
    created() {
      this.fetchCities();
    },
    methods: {
      validateForm() {
    // Simple validation example
    if (!this.form.name || this.form.name.length < 2) {
      alert('Please enter a valid name');
      return false;
    }
    if(this.form.role == 'donor'){
      if (!this.form.national_id || this.form.national_id.length !== 14) {
      alert('National ID must be 14 characters');
      return false;
    }
    }
   
    if(this.form.role == 'donor'){

      if (!this.form.phone_number || !/^[0-9]{10,15}$/.test(this.form.phone_number)) {
      alert('Please enter a valid phone number');
      return false;
    }
    
    }
   
    
    if (!this.form.city) {
      alert('Please select a city');
      return false;
    }
    
    if (!this.form.email || !/^\S+@\S+\.\S+$/.test(this.form.email)) {
      alert('Please enter a valid email');
      return false;
    }
    
    if (!this.form.password || this.form.password.length < 8) {
      alert('Password must be at least 8 characters');
      return false;
    }
    
    return true;
  },
      ...mapActions('auth', ['register']), // Map the register action from your auth store
      
      async fetchCities() {
        try {
          // Replace with your actual API endpoint to fetch cities
          const response = await axiosAuth.get('cities/');
          this.cities = response.data;
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      },
      
      async handleSubmit() {
        if (!this.validateForm()) return;
        try {
          // Dispatch the register action from your auth store
          await this.register(this.form);
          
          // Redirect to login or dashboard after successful registration
          this.$router.push('/login');
          
          // Optional: Show success message
          // this.$toast.success('Registration successful! Please login.');
        } catch (error) {
          console.error('Registration error:', error);
          
          // Optional: Show error message
          alert(error.response?.data?.message || 'Registration failed. Please try again.');
        }
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