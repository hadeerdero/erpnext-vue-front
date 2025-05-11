<!-- <template>
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
</script> -->

<template>
  <PreloaderComponent v-if="isLoading" />

  <div class="app-container" v-else>
    <SidebarComponent
      v-if="showLayoutComponents"
      :isCollapsed="isSidebarCollapsed"
    />

    <div class="main-content" :class="showLayoutComponents ? '' : 'p-0'">
      <HeaderComponent
        v-if="showLayoutComponents"
        @toggle-sidebar="toggleSidebar"
      />

      <div class="main-content-container overflow-hidden">
        <router-view />
      </div>

      <FooterComponent v-if="showLayoutComponents" />
    </div>
  </div>
</template>

<script>
import PreloaderComponent from "./components/global/PreloaderComponent.vue";
import SidebarComponent from "./components/layout/SidebarComponent.vue";
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import FooterComponent from "./components/layout/FooterComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PreloaderComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isLoading: true,
      isSidebarCollapsed: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    showLayoutComponents() {
      // Hide layout components if not authenticated OR if on root route
      return this.isAuthenticated && this.$route.path !== "/";
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  watch: {
    // Watch for route changes to handle layout visibility
    $route(to) {
      if (to.path === "/") {
        // Additional logic when navigating to root if needed
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.main-content-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.p-0 {
  padding: 0 !important;
}
</style>
