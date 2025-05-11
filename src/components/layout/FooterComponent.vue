<template>
    <footer class="footer-area bg-white text-center rounded-top-7">
      <p class="fs-14">
        © <span class="text-primary-div">{{ appName }}</span> is Proudly Owned by 
        <a 
          :href="companyUrl" 
          target="_blank" 
          class="text-decoration-none text-primary"
        >
          {{ companyName }}
        </a>
      </p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
    data() {
      return {
        appName: 'Trezo',
        companyName: 'EnvyTheme',
        companyUrl: 'https://envytheme.com/'
      }
    }
  }
  </script>
  
  <style scoped>
  .footer-area {
    padding: 1rem 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .text-primary-div {
    color: #7367f0; /* Or your primary color */
  }
  
  .text-primary {
    color: #7367f0; /* Or your primary color */
    transition: color 0.3s ease;
  }
  
  .text-primary:hover {
    color: #5a50d5; /* Slightly darker shade for hover */
  }
  
  .fs-14 {
    font-size: 14px;
    margin: 0;
  }
  </style>