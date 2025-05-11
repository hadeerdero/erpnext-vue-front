<template>
    <div>
      <button class="theme-settings-btn p-0 border-0 bg-transparent position-absolute" style="right: 30px; bottom: 30px;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
        <i class="material-symbols-outlined bg-primary wh-35 lh-35 text-white rounded-1" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Click On Theme Settings">settings</i>
      </button>
  
      <div class="offcanvas offcanvas-end bg-white" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
        <div class="offcanvas-header bg-body-bg py-3 px-4">
          <h5 class="offcanvas-title fs-18" id="offcanvasScrollingLabel">Theme Settings</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-4">
          <div class="mb-4 pb-2">
            <h4 class="fs-15 fw-semibold border-bottom pb-2 mb-3">RTL / LTR</h4>
            <div class="d-flex align-items-center position-relative settings-box-wrap for-rtl-mode" style="gap: 25px;">
              <div class="cursor position-relative active-wrap2">
                <div class="settings-box">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="d-flex align-items-center" style="gap: 5px; margin-top: 10px;">
                  <i class="ri-checkbox-circle-fill position-relative top-1 fs-18 text-primary opacity-1"></i>
                  <i class="ri-checkbox-blank-circle-line position-relative fs-18 text-light-40 position-absolute start-0 bottom-0 opacity-0"></i>
                  <span class="fw-semibold">LTR</span>
                </div>
              </div>
              <div class="cursor position-relative active-wrap1">
                <div class="settings-box for-rtl">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="d-flex align-items-center" style="gap: 5px; margin-top: 10px;">
                  <i class="ri-checkbox-circle-fill position-relative top-1 fs-18 text-primary opacity-1"></i>
                  <i class="ri-checkbox-blank-circle-line position-relative fs-18 text-light-40 position-absolute start-0 bottom-0 opacity-0"></i>
                  <span class="fw-semibold">RTL</span>
                </div>
              </div>
              <label id="switch" class="switch-for-rtl">
                <input type="checkbox" class="position-absolute top-0 bottom-0 start-0 end-0 opacity-0 cursor" @change="toggleTheme" id="slider">
                <span class="sliders round"></span>
              </label>
            </div>
          </div>
  
          <!-- Other theme setting sections (sidebar, header, footer, card styles) -->
          <!-- ... (include all the other theme setting sections from the original code) ... -->
        </div>
      </div>
  
      <button class="switch-toggle settings-btn dark-btn p-0 bg-transparent position-absolute top-0 d-none" id="switch-toggle" @click="toggleDarkMode">
        <span class="dark"><i class="material-symbols-outlined">light_mode</i></span> 
        <span class="light"><i class="material-symbols-outlined">dark_mode</i></span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ThemeSettings',
    methods: {
      toggleTheme() {
        document.body.classList.toggle('rtl');
      },
      toggleSidebarTheme() {
        document.querySelector('.sidebar').classList.toggle('dark');
      },
      toggleHeaderTheme() {
        document.querySelector('.header').classList.toggle('dark');
      },
      toggleFooterTheme() {
        document.querySelector('.footer').classList.toggle('dark');
      },
      toggleCardRadius() {
        document.querySelectorAll('.card').forEach(card => {
          card.classList.toggle('rounded-0');
        });
      },
      toggleCardBg() {
        document.querySelectorAll('.card').forEach(card => {
          card.classList.toggle('bg-light-40');
        });
      },
      toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Theme settings specific styles */
  .theme-settings-btn {
    z-index: 999;
  }
  
  .offcanvas {
    width: 320px;
  }
  
  .settings-box {
    width: 60px;
    height: 40px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
  }
  
  .settings-box span {
    width: 10px;
    height: 10px;
    background-color: #3b7ddd;
    margin: 1px;
    display: inline-block;
  }
  
  .switch-for-rtl {
    position: absolute;
    right: 0;
    width: 50px;
    height: 24px;
  }
  
  .switch-for-rtl input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .sliders {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .sliders:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .sliders {
    background-color: #3b7ddd;
  }
  
  input:checked + .sliders:before {
    transform: translateX(26px);
  }
  </style>