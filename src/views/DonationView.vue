<!-- <template>
    <div class="col-lg-5">
      <div class="card bg-white border-0 rounded-3 mb-4">
        <div class="card-body p-4">
          <h3 class="mb-4">Donation Request</h3>
  
          <form @submit.prevent="handleSubmit">
            <div class="form-group mb-4">
              <label class="label text-secondary">Select City</label>
              <select 
                v-model="selectedCity" 
                class="form-control h-55" 
                :disabled="isLoadingStocks"
                required
              >
                <option value="" disabled>Select your city</option>
                <option 
                  v-for="city in stocks" 
                  :key="city.id" 
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </select>
              <div v-if="isLoadingStocks" class="mt-2 text-muted">
                <i class="ri-loader-4-line animate-spin me-2"></i>
                Loading stocks...
              </div>
              <div v-if="cityError" class="mt-2 text-danger">
                <i class="ri-error-warning-line me-2"></i>
                {{ cityError }}
              </div>
            </div>
            
         
           
            
            <div class="form-group mb-4">
              <label class="label text-secondary">Additional Notes</label>
              <textarea 
                rows="3" 
                v-model="notes" 
                class="form-control" 
                placeholder="Any special instructions..."
              ></textarea>
            </div>
            
            <div class="d-flex flex-wrap gap-3 justify-content-between">
              <button 
                type="submit" 
                class="btn btn-primary fs-16 fw-medium text-white py-2 px-4"
               
              >
                <span class="d-inline-block py-1">
                  <i  class="ri-send-plane-fill me-2"></i>
                  {{ isSubmitting ? 'Processing...' : 'Send Donate Request' }}
                </span>
              </button>
              
              <button 
                type="button" 
                class="btn btn-outline-secondary fs-16 fw-medium py-2 px-4"
                @click="resetForm"
                :disabled="isSubmitting"
              >
                <i class="ri-close-line me-2"></i>
                <span class="d-inline-block py-1">Clear Form</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import {axiosBusiness} from '@/plugins/axios/axiosBusiness';
  
  export default {
    name: 'DonationView',
    data() {
      return {
        selectedCity: '',
        notes: '',
        stocks: [],
        isLoadingStocks: false,
        cityError: '',
        isSubmitting: false
      }
    },
    created() {
      this.fetchStocks();
    },
    methods: {
      async fetchStocks() {
        this.isLoadingStocks = true;
        this.cityError = '';
        
        try {
          const response = await axios.get('/blood-stock'); // Update with your actual API endpoint
          this.stocks = response.data.map(stock => ({
            id: stock.id,
            name: stock.name
            // Add other stock properties if needed
          }));
        } catch (error) {
          console.error('Failed to fetch stocks:', error);
          this.cityError = 'Failed to load stocks. Please try again later.';
          this.stocks = []; // Clear any partial data
        } finally {
          this.isLoadingStocks = false;
        }
      },
      
   async handleSubmit() {
        console.log("this.selectedCity",)
        if (this.isSubmitting || !this.selectedCity) return;
        
        this.isSubmitting = true;
        
        try {
          const donationData = {
            blood_stock: this.selectedCity,
            note: this.notes,
            // Add any additional required fields
          };
          
          // Send to your backend API
          const response = await axiosBusiness.post('donors/donate/', donationData);
          
          this.$emit('donation-submitted', response.data);
          
        //   this.$notify({
        //     type: 'success',
        //     title: 'Success',
        //     text: 'Donation request submitted successfully!'
        //   });
          
          this.resetForm();
        } catch (error) {
          console.error('Donation submission failed:', error);
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     text: error.response?.data?.message || 'Failed to submit donation. Please try again.'
        //   });
        } finally {
          this.isSubmitting = false;
        }
      },
      
      resetForm() {
        this.selectedCity = '';
        this.notes = '';
      }
    }
  }
  </script>
  
  <style scoped>
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .form-control {
    border: 1px solid #D6DAE1;
    transition: border-color 0.3s ease;
  }
  
  .form-control:focus {
    border-color: #4A6CF7;
    box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
  }
  
  .btn-primary {
    background-color: #4A6CF7;
    border-color: #4A6CF7;
  }
  
  .btn-primary:hover {
    background-color: #3A5BD9;
    border-color: #3A5BD9;
  }
  
  .btn-outline-secondary {
    border-color: #D6DAE1;
    color: #5E5873;
  }
  
  .btn-outline-secondary:hover {
    background-color: #F8F8F8;
  }
  </style> -->

<template>
  <div class="col-lg-5">
    <div class="card bg-white border-0 rounded-3 mb-4">
      <div class="card-body p-4">
        <h3 class="mb-4">Donation Request</h3>

        <!-- Global Error Alert -->
        <div v-if="globalError" class="alert alert-danger mb-4">
          <i class="ri-error-warning-line me-2"></i>
          {{ globalError }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success mb-4">
          <i class="ri-checkbox-circle-line me-2"></i>
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- City Selection Dropdown -->
          <div class="form-group mb-4">
            <label class="label text-secondary">Select City</label>
            <select
              v-model="selectedCity"
              class="form-control h-55"
              :class="{ 'is-invalid': fieldErrors.blood_stock }"
              :disabled="isLoadingStocks"
              required
            >
              <option value="" disabled>Select your city</option>
              <option v-for="city in stocks" :key="city.id" :value="city.id">
                {{ city.city__name || city.name }}
              </option>
            </select>
            <div v-if="isLoadingStocks" class="mt-2 text-muted">
              <i class="ri-loader-4-line animate-spin me-2"></i>
              Loading stocks...
            </div>
            <div
              v-if="fieldErrors.blood_stock"
              class="invalid-feedback d-block"
            >
              <i class="ri-error-warning-line me-2"></i>
              {{ fieldErrors.blood_stock.join(" ") }}
            </div>
          </div>

          <!-- Additional Notes -->
          <div class="form-group mb-4">
            <label class="label text-secondary">Additional Notes</label>
            <textarea
              rows="3"
              v-model="notes"
              class="form-control"
              :class="{ 'is-invalid': fieldErrors.note }"
              placeholder="Any special instructions..."
            ></textarea>
            <div v-if="fieldErrors.note" class="invalid-feedback d-block">
              <i class="ri-error-warning-line me-2"></i>
              {{ fieldErrors.note.join(" ") }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex flex-wrap gap-3 justify-content-between">
            <button
              type="submit"
              class="btn btn-primary fs-16 fw-medium text-white py-2 px-4"
              :disabled="isSubmitting"
            >
              <span class="d-inline-block py-1">
                <i
                  v-if="isSubmitting"
                  class="ri-loader-4-line animate-spin me-2"
                ></i>
                <i v-else class="ri-send-plane-fill me-2"></i>
                {{ isSubmitting ? "Processing..." : "Send Donate Request" }}
              </span>
            </button>

            <button
              type="button"
              class="btn btn-outline-secondary fs-16 fw-medium py-2 px-4"
              @click="resetForm"
              :disabled="isSubmitting"
            >
              <i class="ri-close-line me-2"></i>
              <span class="d-inline-block py-1">Clear Form</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { axiosBusiness } from "@/plugins/axios/axiosBusiness";

export default {
  name: "DonationView",
  data() {
    return {
      selectedCity: "",
      notes: "",
      stocks: [],
      isLoadingStocks: false,
      isSubmitting: false,
      globalError: "",
      successMessage: "",
      fieldErrors: {
        blood_stock: null,
        note: null,
      },
    };
  },
  created() {
    this.fetchStocks();
  },
  methods: {
    async fetchStocks() {
      this.isLoadingStocks = true;
      this.globalError = "";

      try {
        const response = await axios.get("/blood-stock"); // Update with your actual API endpoint
        this.stocks = response.data.map((stock) => ({
          id: stock.id,
          city__name: stock.city__name || stock.name,
          // Add other stock properties if needed
        }));
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
        this.handleApiError(error, "Failed to load stock locations");
      } finally {
        this.isLoadingStocks = false;
      }
    },

    async handleSubmit() {
      if (this.isSubmitting || !this.selectedCity) return;

      this.isSubmitting = true;
      this.resetErrors();

      try {
        const donationData = {
          blood_stock: this.selectedCity,
          note: this.notes,
          // Add any additional required fields
        };

        await axiosBusiness.post("donors/donate/", donationData);

        this.successMessage = "Donation request submitted successfully!";
        //   this.$emit('donation-submitted', response.data);
        this.resetForm();

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      } catch (error) {
        console.error("Donation submission failed:", error);
        this.handleApiError(error, "Failed to submit donation");
      } finally {
        this.isSubmitting = false;
      }
    },

    handleApiError(error, defaultMessage) {
      // Reset all errors first
      this.resetErrors();

      if (error.response) {
        // Handle field-specific errors (usually 400 Bad Request)
        if (error.response.status === 400 && error.response.data) {
          const data = error.response.data;
          this.globalError = data;
          // Handle Django REST framework style errors
          // if (typeof data === 'object' && !Array.isArray(data)) {
          //   for (const [field, messages] of Object.entries(data)) {
          //     if (field in this.fieldErrors) {
          //       this.fieldErrors[field] = Array.isArray(messages) ? messages : [messages];
          //     }
          //   }
          // } else if (typeof data === 'string') {
          //   this.globalError = data;
          // } else {
          //   this.globalError = 'Please correct the errors below.';
          // }
        }
        // Handle server errors (500, etc)
        else if (error.response.status >= 500) {
          this.globalError = "Server error. Please try again later.";
        }
        // Handle unauthorized/forbidden
        else if (
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          this.globalError = "Authentication required. Please login.";
        }
        // Handle not found
        else if (error.response.status === 404) {
          this.globalError = "Resource not found.";
        }
      }
      // Handle network errors
      else if (error.request) {
        this.globalError = "Network error. Please check your connection.";
      }
      // Handle other errors
      else {
        this.globalError = defaultMessage;
      }
    },

    resetErrors() {
      this.globalError = "";
      this.fieldErrors = {
        blood_stock: null,
        note: null,
      };
    },

    resetForm() {
      this.selectedCity = "";
      this.notes = "";
      this.resetErrors();
    },
  },
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.form-control {
  border: 1px solid #d6dae1;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #4a6cf7;
  box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.btn-primary {
  background-color: #4a6cf7;
  border-color: #4a6cf7;
}

.btn-primary:hover {
  background-color: #3a5bd9;
  border-color: #3a5bd9;
}

.btn-outline-secondary {
  border-color: #d6dae1;
  color: #5e5873;
}

.btn-outline-secondary:hover {
  background-color: #f8f8f8;
}

.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
