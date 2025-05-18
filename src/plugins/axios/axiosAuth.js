// import axios from 'axios';
// // axios.defaults.baseURL = 'http://45.79.209.137'
// // axios.defaults.baseURL = 'http://160.153.175.147'
// // axios.defaults.baseURL = 'http://127.0.0.1:8000'

// axios.defaults.baseURL = 'http://138.199.220.5:8001'

// const axiosAuth = axios.create({
//   // baseURL:  "http://45.79.209.137",
//   // baseURL:  "http://160.153.175.147",
//   // baseURL:  "http://127.0.0.1:8000",
//   baseURL:  'http://138.199.220.5:8001',

//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosAuth.interceptors.request.use(
//   async (config) => {
//   // Get the token from the store
//   let accessToken = localStorage.getItem('token')
//   if(accessToken){
//     // print success messages in the console with green color using ANSI escape sequences
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//     // config.headers["Authorization"] = `Bearer ${accessToken}`;

//   }
//   return config;
// },
// (error) => {
//   console.error(error);
//   return Promise.reject(error);
// }
// );

// axiosAuth.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     // Throw an error to cancel the request
//     if (error.response && error.response.status === 500) {
//         throw new Error('Internal Server Error');
//     }
//     // Check if the error is due to an expired token
//     if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
//       // Set the __isRetryRequest flag to prevent an infinite loop
//       error.config.__isRetryRequest = true;
//       // Refresh the token
//       // await refreshingToken();
//       // Update the Authorization header with the new token
//       let accessToken = localStorage.getItem('token')
//       error.config.headers["Authorization"] = `Bearer ${accessToken}`;
//       // Retry the original request with the new token
//       return axiosAuth(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// export {axiosAuth};
// // import axios from 'axios';

// // axios.defaults.baseURL = 'http://138.199.220.5:8001';

// // const axiosAuth = axios.create({
// //   baseURL: 'http://138.199.220.5:8001',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // export {axiosAuth};

// src/plugins/axios/axiosAuth.js
// import axios from "axios";

// // Base configuration
// const axiosAuth = axios.create({
//   // baseURL: "http://172.29.82.206:8000", // Your ERPNext instance
//   baseURL: 'http://138.199.220.5:8001',
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Request interceptor
// axiosAuth.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // ERPNext uses "token {token}" format for authorization
//       config.headers["Authorization"] = `token ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosAuth.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // Clear auth data if unauthorized
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           break;
//         case 500:
//           error.message = "Internal Server Error";
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export { axiosAuth };


// import axios from "axios";

// // Base configuration
// const axiosAuth = axios.create({
//   baseURL: 'http://138.199.220.5:8001',
//   withCredentials: true, // Keep this for CSRF token cookies
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
// });

// // Request interceptor
// axiosAuth.interceptors.request.use(
//   (config) => {
//     // Add token authentication
//     const apiToken = localStorage.getItem("api_token");
//     const apiSecret = localStorage.getItem("api_secret");
    
//     if (apiToken && apiSecret) {
//       // ERPNext token authentication format
//       config.headers["Authorization"] = `token ${apiToken}:${apiSecret}`;
//     }
    
//     // Add CSRF token if available
//     const csrfToken = getCsrfToken();
//     if (csrfToken) {
//       config.headers["X-Frappe-CSRF-Token"] = csrfToken;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosAuth.interceptors.response.use(
//   (response) => {
//     // Extract and store CSRF token if present in response
//     const csrfToken = response.headers["x-frappe-csrf-token"];
//     if (csrfToken) {
//       localStorage.setItem("csrf_token", csrfToken);
//     }
    
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // Clear auth data if unauthorized
//           localStorage.removeItem("api_token");
//           localStorage.removeItem("api_secret");
//           localStorage.removeItem("user");
//           localStorage.removeItem("home_page");
//           localStorage.removeItem("csrf_token");
          
//           // Optional: Redirect to login page
//           // window.location.href = '/login';
//           break;
          
//         case 403:
//           console.error("Permission denied:", error.response.data);
//           break;
          
//         case 500:
//           console.error("Server error:", error.response.data);
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Helper function to get CSRF token
// function getCsrfToken() {
//   // First try localStorage
//   const storedToken = localStorage.getItem("csrf_token");
//   if (storedToken) return storedToken;
  
//   // Then try to get from cookies
//   const match = document.cookie.match('(^|;)\\s*frappe-csrf-token\\s*=\\s*([^;]+)');
//   return match ? match.pop() : '';
// }

// // export { axiosAuth };
// import axios from "axios";

// // Base configuration
// const axiosAuth = axios.create({
//   baseURL: 'http://138.199.220.5:8001',
//   withCredentials: true, // Required for session cookies
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
// });

// // Request interceptor
// axiosAuth.interceptors.request.use(
//   (config) => {
//     // Only add CSRF token for non-GET requests
//     if (config.method !== 'get') {
//       const csrfToken = getCsrfToken();
//       if (csrfToken) {
//         config.headers["X-Frappe-CSRF-Token"] = csrfToken;
//       }
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosAuth.interceptors.response.use(
//   (response) => {
//     // Store CSRF token if present
//     const csrfToken = response.headers["x-frappe-csrf-token"];
//     if (csrfToken) {
//       localStorage.setItem("csrf_token", csrfToken);
//     }
    
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // Clear session data on unauthorized
//           localStorage.removeItem("csrf_token");
//           localStorage.removeItem("user");
//           localStorage.removeItem("home_page");
//           // Redirect to login (adjust based on your router)
//           window.location.href = '/login';
//           break;
//         case 403:
//           console.error("Permission denied:", error.response.data);
//           break;
//         case 500:
//           console.error("Server error:", error.response.data);
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Helper function to get CSRF token
// function getCsrfToken() {
//   return localStorage.getItem("csrf_token") || '';
// }

// export { axiosAuth };


import axios from "axios";

// Base configuration
const axiosAuth = axios.create({
  baseURL: 'http://138.199.220.5:8001',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

// Request interceptor
axiosAuth.interceptors.request.use(
  (config) => {
    const token = getApiToken();
    if (token) {
      config.headers["Authorization"] = `token ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosAuth.interceptors.response.use(
  (response) => {
    // ERPNext typically doesn't send tokens in headers, but we'll keep this for flexibility
    const apiKey = response.headers["x-api-key"];
    const apiSecret = response.headers["x-api-secret"];
    if (apiKey && apiSecret) {
      localStorage.setItem("api_token", `${apiKey}:${apiSecret}`);
    }
    
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Clear session data on unauthorized
          localStorage.removeItem("api_token");
          localStorage.removeItem("user");
          localStorage.removeItem("home_page");
          // Redirect to login
          window.location.href = '/login';
          break;
        case 403:
          console.error("Permission denied:", error.response.data);
          break;
        case 500:
          console.error("Server error:", error.response.data);
          break;
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to get API token
function getApiToken() {
  return localStorage.getItem("api_token") || '';
}

export { axiosAuth };