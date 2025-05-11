<template>
  <PreloaderComponent v-if="isLoading" />

  <div class="app-container" v-else>
    <SidebarComponent 
      v-if="isAuthenticated"
      :isCollapsed="isSidebarCollapsed"
    />
    
    <div class="main-content " :class="isAuthenticated ? '':'p-0'">
      <HeaderComponent 
        v-if="isAuthenticated"
        @toggle-sidebar="toggleSidebar" 
      />
      
      <div class="main-content-container overflow-hidden">
        <router-view />
      </div>
      
      <FooterComponent v-if="isAuthenticated" />
    </div>
  </div>
</template>

<script>
import PreloaderComponent from "./components/global/PreloaderComponent.vue";
import SidebarComponent from "./components/layout/SidebarComponent.vue";
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import FooterComponent from "./components/layout/FooterComponent.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    PreloaderComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      isLoading: true,
      isSidebarCollapsed: false
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
};
</script>