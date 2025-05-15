// import axios from 'axios';
// let locale = localStorage.getItem("locale") || 'en';
// // const userRole = localStorage.getItem('role');

// // axios.defaults.baseURL = 'http://45.79.209.137'
// // axios.defaults.baseURL = 'http://160.153.175.147'

// axios.defaults.baseUR ='http://127.0.0.1:8000'

// const axiosBusiness = axios.create({
//   // baseURL:  "http://45.79.209.137",
//   // baseURL:  "http://160.153.175.147",
//   baseURL:  "http://127.0.0.1:8000",
//   headers: {
//     'Content-Type': 'application/json',
//     'lang': locale,
//     // 'X-User-Role': userRole,
//     // "userRole": 'admin'
//   },
//   // body: JSON.stringify({ role: userRole })

// });
// // Add a request interceptor
// axiosBusiness.interceptors.request.use(
//   async (config) => {
//   // Get the token from the store
//   let accessToken = localStorage.getItem('token')
//   if(accessToken){
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
//   if (config.method === 'post' || config.method === 'put') {
//     if (config.data instanceof FormData) {
//       // config.data.append('role', userRole);
//     } else {
//       config.data = {
//         ...config.data,
//         // role: userRole
//       };
//     }
//   } else if (config.method === 'get' || config.method === 'delete') {
//     config.params = {
//       ...config.params,
//       // role: userRole
//     };
//   }
//   return config;
// },
// (error) => {
//   return Promise.reject(error);
// }
// );
// // axiosBusiness.defaults.baseURL = 'http://160.153.175.147'
// // Add a response interceptor
// axiosBusiness.interceptors.response.use(
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
//       return axiosBusiness(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// export {axiosBusiness};

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://172.29.82.206:8000/api", // Your ERPNext API base URL
//   withCredentials: true, // Required for session cookies
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Add CSRF token interceptor
// api.interceptors.request.use((config) => {
//   const csrfToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("csrf_token="))
//     ?.split("=")[1];

//   if (csrfToken) {
//     config.headers["X-Frappe-CSRF-Token"] = csrfToken;
//   }
//   return config;
// });

// export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://172.29.82.206:8000", // ERPNext API base URL
//   withCredentials: true, // Needed to send cookies
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Add CSRF token from cookies (only needed for state-changing requests like POST, PUT, DELETE)
// api.interceptors.request.use((config) => {
//   const csrfToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("csrf_token="))
//     ?.split("=")[1];

//   if (csrfToken && ["post", "put", "delete"].includes(config.method)) {
//     config.headers["X-Frappe-CSRF-Token"] = csrfToken;
//   }

//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://172.29.82.206:8000", // ERPNext API base URL
  withCredentials: true, // Required for session cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Frappe-Site-Name": "mynewsite", // Add your site name here
  },
});

// Request interceptor for adding CSRF token and handling authentication
api.interceptors.request.use(async (config) => {
  // Add CSRF token for state-changing requests
  if (
    ["post", "put", "delete", "patch"].includes(config.method?.toLowerCase())
  ) {
    try {
      // Get fresh CSRF token for each request
      const csrfResponse = await axios.get(
        `${config.baseURL}/api/method/frappe.csrf_token.get_token`,
        {
          withCredentials: true,
        }
      );
      config.headers["X-Frappe-CSRF-Token"] = csrfResponse.data.token;
    } catch (error) {
      console.error("Failed to get CSRF token", error);
    }
  }

  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized, try to refresh session
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to login again
        await axios.post(
          `${originalRequest.baseURL}/api/method/login`,
          {
            usr: "your_admin_email@example.com",
            pwd: "your_password",
          },
          {
            withCredentials: true,
            headers: {
              "X-Frappe-Site-Name": "mynewsite",
            },
          }
        );

        // Retry the original request
        return api(originalRequest);
      } catch (loginError) {
        console.error("Re-authentication failed", loginError);
        return Promise.reject(loginError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
