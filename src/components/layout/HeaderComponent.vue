<template>
    <header class="header-area bg-white mb-4 rounded-bottom-15" id="header-area">
      <div class="row align-items-center">
        <!-- Left Header Content -->
        <div class="col-lg-4 col-sm-6">
          <div class="left-header-content">
            <ul class="d-flex align-items-center ps-0 mb-0 list-unstyled justify-content-center justify-content-sm-start">
              <!-- Menu Toggle Button -->
              <li>
                <button 
                  class="header-burger-menu bg-transparent p-0 border-0" 
                  @click="toggleSidebar"
                >
                  <span class="material-symbols-outlined">menu</span>
                </button>
              </li>
              
              <!-- Search Form -->
              <li>
                <form class="src-form position-relative" @submit.prevent="handleSearch">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search here....."
                    v-model="searchQuery"
                  >
                  <button type="submit" class="src-btn position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 border-0">
                    <span class="material-symbols-outlined">search</span>
                  </button>
                </form>
              </li>
              
              <!-- Apps Dropdown -->
              <li>
                <div class="dropdown notifications apps">
                  <button 
                    class="btn btn-secondary border-0 p-0 position-relative" 
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <span class="material-symbols-outlined">apps</span>
                  </button>
                  <div class="dropdown-menu dropdown-lg p-0 border-0 py-4 px-3 max-h-312" data-simplebar>
                    <div class="notification-menu d-flex flex-wrap justify-content-between gap-4">
                      <a 
                        v-for="app in apps" 
                        :key="app.name"
                        :href="app.url" 
                        target="_blank" 
                        class="dropdown-item p-0 text-center"
                      >
                        <img :src="getImageUrl(app.icon)" class="wh-25" :alt="app.name">
                        <span>{{ app.name }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Right Header Content -->
        <div class="col-lg-8 col-sm-6">
          <div class="right-header-content mt-2 mt-sm-0">
            <ul class="d-flex align-items-center justify-content-center justify-content-sm-end ps-0 mb-0 list-unstyled">
              <!-- Dark/Light Mode Toggle -->
              <li class="header-right-item">
                <div class="light-dark">
                  <button 
                    class="switch-toggle settings-btn dark-btn p-0 bg-transparent border-0" 
                    @click="toggleDarkMode"
                  >
                    <span class="dark" v-if="darkMode">
                      <i class="material-symbols-outlined">light_mode</i>
                    </span> 
                    <span class="light" v-else>
                      <i class="material-symbols-outlined">dark_mode</i>
                    </span>
                  </button>
                </div>
              </li>
              
              <!-- Language Selector -->
              <li class="header-right-item">
                <div class="dropdown notifications language">
                  <button 
                    class="btn btn-secondary dropdown-toggle border-0 p-0 position-relative" 
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <span class="material-symbols-outlined">translate</span>
                  </button>
                  <div class="dropdown-menu dropdown-lg p-0 border-0 dropdown-menu-end">
                    <span class="fw-semibold fs-15 text-secondary title">Choose Language</span>
                    <div class="max-h-275" data-simplebar>
                      <div 
                        class="notification-menu" 
                        v-for="language in languages" 
                        :key="language.name"
                      >
                        <a href="javascript:void(0);" class="dropdown-item" @click="changeLanguage(language.code)">
                          <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                              <img :src="getImageUrl(language.flag)" class="wh-30 rounded-circle" :alt="language.name">
                            </div>
                            <div class="flex-grow-1 ms-2">
                              <span class="text-secondary fw-medium fs-14">{{ language.name }}</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              
              <!-- Fullscreen Toggle -->
              <li class="header-right-item">
                <button 
                  class="fullscreen-btn bg-transparent p-0 border-0" 
                  @click="toggleFullscreen"
                >
                  <i class="material-symbols-outlined text-body">fullscreen</i>
                </button>
              </li>
              
              <!-- Notifications -->
              <li class="header-right-item">
                <div class="dropdown notifications noti">
                  <button 
                    class="btn btn-secondary border-0 p-0 position-relative badge" 
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" v-if="unreadNotifications > 0">
                      {{ unreadNotifications }}
                    </span>
                  </button>
                  <div class="dropdown-menu dropdown-lg p-0 border-0 p-0 dropdown-menu-end">
                    <div class="d-flex justify-content-between align-items-center title">
                      <span class="fw-semibold fs-15 text-secondary">
                        Notifications <span class="fw-normal text-body fs-14">({{ notifications.length }})</span>
                      </span>
                      <button 
                        class="p-0 m-0 bg-transparent border-0 fs-14 text-primary"
                        @click="clearNotifications"
                      >
                        Clear All
                      </button>
                    </div> 
  
                    <div class="max-h-217" data-simplebar>
                      <div 
                        class="notification-menu" 
                        :class="{ 'unseen': !notification.seen }"
                        v-for="notification in notifications"
                        :key="notification.id"
                      >
                        <a href="#" class="dropdown-item" @click.prevent="handleNotificationClick(notification)">
                          <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                              <i class="material-symbols-outlined" :class="`text-${notification.type}`">
                                {{ notification.icon }}
                              </i>
                            </div>
                            <div class="flex-grow-1 ms-3">
                              <p v-html="notification.message"></p>
                              <span class="fs-13">{{ formatTime(notification.time) }}</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
  
                    <a 
                      href="#" 
                      class="dropdown-item text-center text-primary d-block view-all fw-medium rounded-bottom-3"
                      @click.prevent="viewAllNotifications"
                    >
                      <span>See All Notifications</span>
                    </a>
                  </div>
                </div>
              </li>
              
              <!-- User Profile Dropdown -->
              <li class="header-right-item">
                <div class="dropdown admin-profile">
                  <div 
                    class="d-xxl-flex align-items-center bg-transparent border-0 text-start p-0 cursor dropdown-toggle" 
                    data-bs-toggle="dropdown"
                  >
                    <div class="flex-shrink-0">
                      <img 
                        class="rounded-circle wh-40 administrator" 
                        :src="getImageUrl(user.avatar)" 
                        :alt="user.name"
                      >
                    </div>
                    <div class="flex-grow-1 ms-2">
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="d-none d-xxl-block">
                          <div class="d-flex align-content-center">
                            <h3>{{ user.name }}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      
                  <div class="dropdown-menu border-0 bg-white dropdown-menu-end">
                    <div class="d-flex align-items-center info">
                      <div class="flex-shrink-0">
                        <img 
                          class="rounded-circle wh-30 administrator" 
                          :src="getImageUrl(user.avatar)" 
                          :alt="user.name"
                        >
                      </div>
                      <div class="flex-grow-1 ms-2">
                        <h3 class="fw-medium">{{ user.fullName }}</h3>
                        <span class="fs-12">{{ user.role }}</span>
                      </div>
                    </div>
                    <ul class="admin-link ps-0 mb-0 list-unstyled">
                      <li v-for="item in profileMenu" :key="item.text">
                        <router-link 
                          :to="item.route" 
                          class="dropdown-item admin-item-link d-flex align-items-center text-body"
                        >
                          <i class="material-symbols-outlined">{{ item.icon }}</i>
                          <span class="ms-2">{{ item.text }}</span>
                        </router-link>
                      </li>
                    </ul>
                    <ul class="admin-link ps-0 mb-0 list-unstyled">
                      <li>
                        <a 
                          class="dropdown-item admin-item-link d-flex align-items-center text-body" 
                          href="#" 
                          @click.prevent="logout"
                        >
                          <i class="material-symbols-outlined">logout</i>
                          <span class="ms-2">Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              
              <!-- Theme Settings -->
              <li class="header-right-item">
                <button 
                  class="theme-settings-btn p-0 border-0 bg-transparent" 
                  type="button" 
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasScrolling" 
                  aria-controls="offcanvasScrolling"
                >
                  <i 
                    class="material-symbols-outlined" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="left" 
                    :data-bs-title="themeSettingsTooltip"
                  >
                    settings
                  </i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import { Tooltip } from 'bootstrap';
  export default {
    name: 'HeaderComponent',
    data() {
      return {
        searchQuery: '',
        darkMode: false,
        unreadNotifications: 3,
        apps: [
          { name: 'Figma', url: 'https://www.figma.com/', icon: 'figma.svg' },
          { name: 'Dribbble', url: 'https://www.dribbble.com/', icon: 'dribbble.svg' },
          { name: 'Spotify', url: 'https://www.spotify.com/', icon: 'spotify.svg' },
          { name: 'Github', url: 'https://www.github.com/', icon: 'github.svg' },
          { name: 'GDrive', url: 'https://www.google.com/drive/', icon: 'gdrive.svg' },
          { name: 'Trello', url: 'https://www.trello.com/', icon: 'trello.svg' },
          { name: 'Slack', url: 'https://www.slack.com/', icon: 'slak.svg' },
          { name: 'Pinterest', url: 'https://www.pinterest.com/', icon: 'pinterest.svg' },
          { name: 'Facebook', url: 'https://www.facebook.com/', icon: 'facebook.svg' },
          { name: 'Linkedin', url: 'https://www.linkedin.com/', icon: 'linkedin.svg' }
        ],
        languages: [
          { name: 'English', code: 'en', flag: 'usa.svg' },
          { name: 'Canada', code: 'ca', flag: 'canada.svg' },
          { name: 'Germany', code: 'de', flag: 'germany.svg' },
          { name: 'Portugal', code: 'pt', flag: 'portugal.svg' },
          { name: 'Spain', code: 'es', flag: 'spain.svg' }
        ],
        notifications: [
          { 
            id: 1, 
            message: 'You have requested to <span class="fw-semibold">withdrawal</span>', 
            icon: 'sms', 
            type: 'primary', 
            time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            seen: true 
          },
          { 
            id: 2, 
            message: 'A new user added in Trezo', 
            icon: 'person', 
            type: 'info', 
            time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            seen: false 
          },
          { 
            id: 3, 
            message: 'You have requested to <span class="fw-semibold">withdrawal</span>', 
            icon: 'mark_email_unread', 
            type: 'success', 
            time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            seen: true 
          }
        ],
        user: {
          name: 'Olivia',
          fullName: 'Olivia John',
          role: 'Marketing Manager',
          avatar: 'administrator.jpg'
        },
        profileMenu: [
          { icon: 'account_circle', text: 'My Profile', route: '/profile' },
          { icon: 'chat', text: 'Messages', route: '/chat' },
          { icon: 'format_list_bulleted', text: 'My Task', route: '/tasks' },
          { icon: 'credit_card', text: 'Billing', route: '/billing' },
          { icon: 'settings', text: 'Settings', route: '/settings' },
          { icon: 'support', text: 'Support', route: '/support' },
          { icon: 'lock', text: 'Lock Screen', route: '/lock-screen' }
        ],
        themeSettingsTooltip: 'Click On Theme Settings'
      }
    },
    methods: {
      getImageUrl(imageName) {
        // This assumes your images are in the assets/images directory
        return `/assets/images/${imageName}`;
        // return imageName
      },
      toggleSidebar() {
        console.log("toggle side bar ")
        this.$emit('toggle-sidebar');
      },
      handleSearch() {
        if (this.searchQuery.trim()) {
          this.$emit('search', this.searchQuery);
        }
      },
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode', this.darkMode);
        localStorage.setItem('darkMode', this.darkMode);
      },
      changeLanguage(langCode) {
        this.$i18n.locale = langCode;
        localStorage.setItem('language', langCode);
      },
      toggleFullscreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      },
      handleNotificationClick(notification) {
        if (!notification.seen) {
          notification.seen = true;
          this.unreadNotifications--;
        }
        // Handle navigation to notification target
        this.$emit('notification-click', notification);
      },
      clearNotifications() {
        this.notifications.forEach(n => n.seen = true);
        this.unreadNotifications = 0;
      },
      viewAllNotifications() {
        this.$router.push('/notifications');
      },
      logout() {
        // Implement logout logic
        this.$emit('logout');
      },
      formatTime(date) {
        const now = new Date();
        const diff = now - date;
        
        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        
        if (diff < minute) {
          return 'Just now';
        } else if (diff < hour) {
          const minutes = Math.floor(diff / minute);
          return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < day) {
          const hours = Math.floor(diff / hour);
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
          const days = Math.floor(diff / day);
          return `${days} day${days > 1 ? 's' : ''} ago`;
        }
      },
      initializeDarkMode() {
      // Check for saved preference or system preference
      const savedMode = localStorage.getItem('darkMode');
      
      if (savedMode !== null) {
        this.darkMode = savedMode === 'true';
      } else {
        // Fallback to system preference if no saved setting
        this.darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      // Apply the mode
      this.applyDarkMode(this.darkMode);
    },

    applyDarkMode(isDark) {
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },

    initializeTooltips() {
      try {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        
        Array.from(tooltipElements).forEach(element => {
          new Tooltip(element, {
            trigger: 'hover focus', // Show on hover or focus
            placement: 'left',     // Default placement
            // You can add more options here as needed
          });
        });
      } catch (error) {
        console.error('Error initializing tooltips:', error);
      }
    }
    },
    // mounted() {
    //   // Initialize dark mode from localStorage
    //   this.darkMode = localStorage.getItem('darkMode') === 'true';
    //   if (this.darkMode) {
    //     document.body.classList.add('dark-mode');
    //   }
      
    //   // Initialize tooltips
    //   const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    //   tooltipTriggerList.map(function (tooltipTriggerEl) {
    //     return new bootstrap.Tooltip(tooltipTriggerEl);
    //   });
    // }
    mounted() {
    this.initializeDarkMode();
    this.initializeTooltips();
  },
//   methods: {
//     initializeDarkMode() {
//       // Check for saved preference or system preference
//       const savedMode = localStorage.getItem('darkMode');
      
//       if (savedMode !== null) {
//         this.darkMode = savedMode === 'true';
//       } else {
//         // Fallback to system preference if no saved setting
//         this.darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//       }
      
//       // Apply the mode
//       this.applyDarkMode(this.darkMode);
//     },

//     applyDarkMode(isDark) {
//       if (isDark) {
//         document.body.classList.add('dark-mode');
//       } else {
//         document.body.classList.remove('dark-mode');
//       }
//     },

//     initializeTooltips() {
//       try {
//         const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        
//         Array.from(tooltipElements).forEach(element => {
//           new Tooltip(element, {
//             trigger: 'hover focus', // Show on hover or focus
//             placement: 'left',     // Default placement
//             // You can add more options here as needed
//           });
//         });
//       } catch (error) {
//         console.error('Error initializing tooltips:', error);
//       }
//     }
//   }
  }
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  .header-area {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .dark-mode .header-area {
    background-color: #1e1e2d;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .notification-menu.unseen {
    background-color: rgba(13, 110, 253, 0.05);
  }
  
  .dropdown-menu {
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    border: none;
  }
  
  .admin-profile .dropdown-menu {
    min-width: 240px;
  }
  
  .theme-settings-btn i {
    transition: all 0.3s ease;
  }
  
  .theme-settings-btn:hover i {
    transform: rotate(45deg);
  }
  </style>