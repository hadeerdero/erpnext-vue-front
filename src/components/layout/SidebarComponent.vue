<template>
    <div class="sidebar-area" id="sidebar-area" :class="{ 'collapsed': isCollapsed }">
      {{ isCollapsed }}
      <div class="logo position-relative">
        <a href="index.html" class="d-block text-decoration-none position-relative">
          <img src="assets/images/logo-icon.png" alt="logo-icon">
          <span class="logo-text fw-bold text-dark">Trezo</span>
        </a>
        <button class="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y" id="sidebar-burger-menu">
          <i data-feather="x"></i>
        </button>
      </div>
  
      <aside id="layout-menu" class="layout-menu menu-vertical menu active" data-simplebar>
        <ul class="menu-inner">
          <li class="menu-title small text-uppercase">
            <span class="menu-title-text">MAIN</span>
          </li>
          
          <!-- Dashboard Menu -->
          <li class="menu-item" :class="{ 'open': openMenus.dashboard }">
            <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleMenu('dashboard')">
              <span class="material-symbols-outlined menu-icon">dashboard</span>
              <span class="title">Dashboard</span>
              <span class="count">24</span>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <router-link to="/" class="menu-link" :class="{ 'active': $route.path === '/' }">
                  eCommerce
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/crm" class="menu-link">
                  CRM
                  <span class="new tag">Hot</span>
                </router-link>
              </li>
              <!-- Other dashboard items -->
            </ul>
          </li>
  
          <!-- Front Pages Menu -->
          <li class="menu-item" :class="{ 'open': openMenus.frontPages }">
            <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleMenu('frontPages')">
              <span class="material-symbols-outlined menu-icon">note_stack</span>
              <span class="title">Front Pages</span>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <router-link to="/landing-page" class="menu-link">
                  Home
                </router-link>
              </li>
              <!-- Other front page items -->
            </ul>
          </li>
  
          <!-- Apps Section -->
          <li class="menu-title small text-uppercase">
            <span class="menu-title-text">APPS</span>
          </li>
  
          <li class="menu-item">
            <router-link to="/to-do-list" class="menu-link">
              <span class="material-symbols-outlined menu-icon">format_list_bulleted</span>
              <span class="title">To Do List</span>
            </router-link>
          </li>
  
          <!-- Other menu items similarly converted -->
          
          <!-- Logout Menu Item -->
          <li class="menu-item">
            <a href="#" class="menu-link" @click.prevent="logout">
              <span class="material-symbols-outlined menu-icon">logout</span>
              <span class="title">Logout</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarComponent',
    props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
    data() {
      return {
        openMenus: {
          dashboard: true,
          frontPages: false,
          // Add other menu states here
        }
      }
    },
    methods: {
      toggleMenu(menu) {
        this.openMenus[menu] = !this.openMenus[menu]
      },
      logout() {
        // Implement logout logic here
        this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style scoped>
  /* You can keep all the existing CSS classes */
  /* The styles will be scoped to this component */
  </style>