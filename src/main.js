import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from 'vue-toastification'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// main.js or App.vue
// store.dispatch('app/initializeSidebar');
 store.dispatch('checkSession');
// async created() {
//     await store.dispatch('checkSession').catch(() => {
//       this.$router.push('/login');
//     });
//   },
const toastOptions = {
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
  }
createApp(App).use(store).use(router).use(Toast, toastOptions).mount("#app");
