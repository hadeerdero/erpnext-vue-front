<!-- <template>
  <div class="boxed-size bg-white">
    <Preloader />
    <div class="container justify-content-start">
      <div class="main-content d-flex flex-column p-0">
        <div class="m-auto m-1230">
          <div class="row align-items-center">
            <div class="col-lg-6 d-none d-lg-block">
              <img
                src="@/assets/intlaq-logo.jpg"
                class="rounded-3"
                alt="login"
              />
            </div>
            <div class="col-lg-6">
              <div class="mw-480 ms-lg-auto">
                <div class="d-inline-block mb-4">
                
                </div>
                <h3 class="fs-28 mb-2">Welcome back to Intlaq!</h3>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group mb-4">
                    <label class="label text-secondary">Email Address</label>
                    <input
                      type="email"
                      v-model="form.email"
                      class="form-control h-55"
                      placeholder="example@trezo.com"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label class="label text-secondary">Password</label>
                    <input
                      type="password"
                      v-model="form.password"
                      class="form-control h-55"
                      placeholder="Type password"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <a
                      href="forget-password.html"
                      class="text-decoration-none text-primary fw-semibold"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="form-group mb-4">
                    <button
                      type="submit"
                      class="btn btn-primary fw-medium py-2 px-3 w-100"
                      :disabled="loading"
                    >
                      <div
                        class="d-flex align-items-center justify-content-center py-1"
                      >
                        <i
                          class="material-symbols-outlined text-white fs-20 me-2"
                          >login</i
                        >
                        <span v-if="!loading">Login</span>
                        <span v-else>Logging in...</span>
                      </div>
                    </button>
                  </div>
                  <div v-if="error" class="alert alert-danger mb-4">
                    {{ error }}
                  </div>
                  <div class="form-group">
                    <p>
                      Don't have an account.
                      <a
                        href="register.html"
                        class="fw-medium text-primary text-decoration-none"
                        >Register</a
                      >
                    </p>
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
import Preloader from "@/components/global/PreloaderComponent.vue";
import ThemeSettings from "@/components/layout/ThemeSettings.vue";
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  components: {
    Preloader,
    ThemeSettings,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),

   
    async handleSubmit() {
      this.loading = true;
      this.error = null;

      try {
        await this.login(this.form);

      
         this.$router.push('/dashboard');
      } catch (error) {
        this.error =
          error.response?.data?.message?.error ||
          error.response?.data?.message ||
          "Login failed. Please try again.";
        console.error("Login error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script> -->

<!-- <template>
  <div class="boxed-size bg-white">
    <Preloader />
    <div class="container justify-content-start">
      <div class="main-content d-flex flex-column p-0">
        <div class="m-auto m-1230">
          <div class="row align-items-center">
            <div class="col-lg-6 d-none d-lg-block">
              <img
                src="@/assets/intlaq-logo.jpg"
                class="rounded-3"
                alt="login"
              />
            </div>
            <div class="col-lg-6">
              <div class="mw-480 ms-lg-auto">
                <div class="d-inline-block mb-4">
                </div>
                <h3 class="fs-28 mb-2">Welcome back to Intlaq!</h3>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group mb-4">
                    <label class="label text-secondary">Email Address</label>
                    <input
                      type="email"
                      v-model="form.email"
                      class="form-control h-55"
                      placeholder="example@trezo.com"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label class="label text-secondary">Password</label>
                    <input
                      type="password"
                      v-model="form.password"
                      class="form-control h-55"
                      placeholder="Type password"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <a
                      href="forget-password.html"
                      class="text-decoration-none text-primary fw-semibold"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="form-group mb-4">
                    <button
                      type="submit"
                      class="btn btn-primary fw-medium py-2 px-3 w-100"
                      :disabled="loading"
                    >
                      <div
                        class="d-flex align-items-center justify-content-center py-1"
                      >
                        <i
                          class="material-symbols-outlined text-white fs-20 me-2"
                          >login</i
                        >
                        <span v-if="!loading">Login</span>
                        <span v-else>Logging in...</span>
                      </div>
                    </button>
                  </div>
                  <div v-if="error" class="alert alert-danger mb-4">
                    {{ error }}
                  </div>
                  <div class="form-group">
                    <p>
                      Don't have an account.
                      <a
                        href="register.html"
                        class="fw-medium text-primary text-decoration-none"
                        >Register</a
                      >
                    </p>
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
import Preloader from "@/components/global/PreloaderComponent.vue";
import ThemeSettings from "@/components/layout/ThemeSettings.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginView",
  components: {
    Preloader,
    ThemeSettings,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["homePage"]),
  },
  methods: {
    ...mapActions("auth", ["login", "verifyToken"]),

    async handleSubmit() {
      this.loading = true;
      this.error = null;

      try {
        // Call the login action with ERPNext compatible credentials
        await this.login({
          email: this.form.email,
          password: this.form.password
        });

        // Verify the token after successful login
        const isVerified = await this.verifyToken();
        if (!isVerified) {
          throw new Error("Authentication verification failed");
        }

        // Redirect to home page or dashboard
        const redirectPath =  '/dashboard';
        this.$router.push(redirectPath);
        
      } catch (error) {
        console.error("Login error:", error);
        this.error = this.getErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },

    getErrorMessage(error) {
      // Handle ERPNext specific error responses
      if (error.response) {
        // ERPNext often returns messages in error.response.data.message
        if (error.response.data && error.response.data.message) {
          if (typeof error.response.data.message === 'string') {
            return error.response.data.message;
          } else if (error.response.data.message.error) {
            return error.response.data.message.error;
          }
        }
        
        // Standard HTTP error messages
        switch (error.response.status) {
          case 401:
            return "Invalid email or password";
          case 403:
            return "Access denied";
          case 500:
            return "Server error. Please try again later.";
          default:
            return "Login failed. Please try again.";
        }
      } else if (error.message) {
        return error.message;
      }
      return "An unexpected error occurred";
    }
  },
  mounted() {
    // Clear any existing auth data when login component mounts
    this.$store.commit("auth/LOGOUT");
  }
};
</script> -->



<template>
  <div class="boxed-size bg-white">
    <Preloader />
    <div class="container justify-content-start">
      <div class="main-content d-flex flex-column p-0">
        <div class="m-auto m-1230">
          <div class="row align-items-center">
            <div class="col-lg-6 d-none d-lg-block">
              <img
                src="@/assets/intlaq-logo.jpg"
                class="rounded-3"
                alt="login"
              />
            </div>
            <div class="col-lg-6">
              <div class="mw-480 ms-lg-auto">
                <div class="d-inline-block mb-4">
                </div>
                <h3 class="fs-28 mb-2">Welcome back to Intlaq!</h3>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group mb-4">
                    <label class="label text-secondary">Email Address</label>
                    <input
                      type="text"
                      v-model="form.email"
                      class="form-control h-55"
                      placeholder="example@trezo.com"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label class="label text-secondary">Password</label>
                    <input
                      type="password"
                      v-model="form.password"
                      class="form-control h-55"
                      placeholder="Type password"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <a
                      href="forget-password.html"
                      class="text-decoration-none text-primary fw-semibold"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="form-group mb-4">
                    <button
                      type="submit"
                      class="btn btn-primary fw-medium py-2 px-3 w-100"
                      :disabled="loading"
                    >
                      <div
                        class="d-flex align-items-center justify-content-center py-1"
                      >
                        <i
                          class="material-symbols-outlined text-white fs-20 me-2"
                          >login</i
                        >
                        <span v-if="!loading">Login</span>
                        <span v-else>Logging in...</span>
                      </div>
                    </button>
                  </div>
                  <div v-if="error" class="alert alert-danger mb-4">
                    {{ error }}
                  </div>
                  <div class="form-group">
                    <p>
                      Don't have an account.
                      <a
                        href="register.html"
                        class="fw-medium text-primary text-decoration-none"
                        >Register</a
                      >
                    </p>
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
import Preloader from "@/components/global/PreloaderComponent.vue";
import ThemeSettings from "@/components/layout/ThemeSettings.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginView",
  components: {
    Preloader,
    ThemeSettings,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["homePage", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),

    async handleSubmit() {
      this.loading = true;
      this.error = null;

      try {
        // Call login action with credentials
        await this.login({
          email: this.form.email,
          password: this.form.password
        });

        // Redirect to dashboard after successful login
        this.$router.push('/dashboard');
        
      } catch (error) {
        console.error("Login error:", error);
        this.error = this.getEnhancedErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },

    getEnhancedErrorMessage(error) {
      // Handle network errors
      if (!error.response) {
        return "Network error. Please check your connection.";
      }

      // Handle ERPNext specific error responses
      const { status, data } = error.response;
      
      // Handle 500 errors specifically
      if (status === 500) {
        return "Server is temporarily unavailable. Please try again later.";
      }

      // Parse ERPNext error messages
      if (data && data.message) {
        const message = typeof data.message === 'string' 
          ? data.message
          : data.message.error || data.message.message;
        
        if (message) {
          if (message.includes("Incorrect password") || 
              message.includes("User disabled or missing") ||
              message.includes("No user found")) {
            return "Invalid email or password";
          }
          return message;
        }
      }

      // Standard HTTP error messages
      switch (status) {
        case 401:
          return "Invalid email or password";
        case 403:
          return "Access denied";
        case 404:
          return "Service not found";
        case 429:
          return "Too many requests. Please wait and try again.";
        default:
          return "Login failed. Please try again.";
      }
    }
  },
  mounted() {
    // If already authenticated, redirect to home
    if (this.isAuthenticated) {
      this.$router.push(this.homePage || '/dashboard');
    }
  }
};
</script>

<style scoped>
.boxed-size {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.m-1230 {
  max-width: 1230px;
  width: 100%;
}

.mw-480 {
  max-width: 480px;
}

.h-55 {
  height: 55px;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
}

.btn-primary {
  background-color: #3b7ddd;
  border-color: #3b7ddd;
}

.btn-primary:hover {
  background-color: #326abc;
  border-color: #2f64b1;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>