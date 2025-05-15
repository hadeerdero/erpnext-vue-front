<!-- <template>
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
              
            </ul>
          </li>
  
         
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
        
            </ul>
          </li>
  
         
          <li class="menu-title small text-uppercase">
            <span class="menu-title-text">APPS</span>
          </li>
  
          <li class="menu-item">
            <router-link to="/to-do-list" class="menu-link">
              <span class="material-symbols-outlined menu-icon">format_list_bulleted</span>
              <span class="title">To Do List</span>
            </router-link>
          </li>
  
       
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
  
  </style> -->


  <template>
  <div class="sidebar-area" id="sidebar-area" :class="{ 'collapsed': isCollapsed }">
    <div class="logo position-relative">
      <a href="/" class="d-block text-decoration-none position-relative">
        <img src="assets/images/logo-icon.png" alt="logo-icon">
        <span class="logo-text fw-bold text-dark">Invoice System</span>
      </a>
      <button class="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y" id="sidebar-burger-menu">
        <i data-feather="x"></i>
      </button>
    </div>

    <aside id="layout-menu" class="layout-menu menu-vertical menu active" data-simplebar>
      <ul class="menu-inner">
        <li class="menu-title small text-uppercase">
          <span class="menu-title-text">SALES</span>
        </li>
        
        <!-- Sales Invoice Menu Item -->
        <li class="menu-item" :class="{ 'active': $route.path === '/sales-invoices' }">
          <router-link to="/sales-invoices" class="menu-link">
            <span class="material-symbols-outlined menu-icon">receipt_long</span>
            <span class="title">Sales Invoices</span>
          </router-link>
        </li>

        <!-- Create New Invoice Menu Item -->
        <li class="menu-item" :class="{ 'active': $route.path === '/sales-invoices/new' }">
          <router-link to="/sales-invoices/new" class="menu-link">
            <span class="material-symbols-outlined menu-icon">add</span>
            <span class="title">Create Invoice</span>
          </router-link>
        </li>

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
  name: 'InvoiceSidebarComponent',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      // Implement logout logic here
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.sidebar-area {
  width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1030;
  background-color: #fff;
  box-shadow: 0 0 15px 0 rgba(34, 41, 47, 0.05);
  transition: all 0.3s ease;
}

.sidebar-area.collapsed {
  width: 80px;
}

.logo {
  padding: 1.3rem 1.5rem;
  border-bottom: 1px solid rgba(34, 41, 47, 0.05);
}

.logo img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.25rem;
  transition: opacity 0.3s ease;
}

.sidebar-area.collapsed .logo-text {
  opacity: 0;
  width: 0;
  display: none;
}

.layout-menu {
  height: calc(100vh - 70px);
  overflow-y: auto;
}

.menu-inner {
  padding: 0.5rem 0;
}

.menu-title {
  padding: 1.25rem 1.5rem 0.75rem;
  color: #a6a7b3;
  font-weight: 600;
}

.menu-item {
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #6e6b7b;
  text-decoration: none;
  transition: all 0.3s ease;
}

.menu-link:hover,
.menu-item.active .menu-link {
  color: #7367f0;
  background-color: rgba(115, 103, 240, 0.08);
}

.menu-link .menu-icon {
  margin-right: 1rem;
  font-size: 1.25rem;
}

.menu-link .title {
  transition: opacity 0.3s ease;
}

.sidebar-area.collapsed .title {
  opacity: 0;
  width: 0;
  display: none;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.sidebar-burger-menu {
  display: none;
}

@media (max-width: 992px) {
  .sidebar-burger-menu {
    display: block;
    opacity: 1 !important;
  }
}
</style>