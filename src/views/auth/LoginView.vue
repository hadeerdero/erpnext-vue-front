<template>
  <div class="boxed-size bg-white">
    <Preloader />
    <div class="container justify-content-start">
      <div class="main-content d-flex flex-column p-0">
        <div class="m-auto m-1230">
          <div class="row align-items-center">
            <div class="col-lg-6 d-none d-lg-block">
              <img
                src="assets/images/login.jpg"
                class="rounded-3"
                alt="login"
              />
            </div>
            <div class="col-lg-6">
              <div class="mw-480 ms-lg-auto">
                <div class="d-inline-block mb-4">
                  <img
                    src="assets/images/logo.svg"
                    class="rounded-3 for-light-logo"
                    alt="login"
                  />
                  <!-- <img
                    src="assets/images/white-logo.svg"
                    class="rounded-3 for-dark-logo"
                    alt="login"
                  /> -->
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

    // async handleSubmit() {
    //   this.loading = true;
    //   this.error = null;

    //   try {
    //     await this.login(this.form);
    //     // Redirect to dashboard or home page after successful login
    //   //   this.$router.push('/dashboard');
    //     this.$router.push(this.$store.getters['auth/homePage']);

    //   } catch (error) {
    //     this.error = error.response?.data?.error || 'Login failed. Please try again.';
    //     console.error('Login error:', error);
    //   } finally {
    //     this.loading = false;
    //   }
    // }
    async handleSubmit() {
      this.loading = true;
      this.error = null;

      try {
        await this.login(this.form);

        // For proper Frappe desk redirection
        if (this.$store.getters["auth/homePage"] === "/desk") {
          // Full page reload to properly initialize Frappe desk
          window.location.href = "/desk";
        } else {
          const backendBaseUrl = "http://138.199.220.5:8001/";
          const homePage = this.$store.getters["auth/homePage"]; // e.g., "/app/home"
          window.location.href = backendBaseUrl + homePage;
          // this.$router.push(this.$store.getters["auth/homePage"]);
        }
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
</script>
