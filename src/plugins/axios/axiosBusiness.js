
import axios from 'axios';
let locale = localStorage.getItem("locale") || 'en';
// const userRole = localStorage.getItem('role');

// axios.defaults.baseURL = 'http://45.79.209.137'
// axios.defaults.baseURL = 'http://160.153.175.147'

axios.defaults.baseUR ='http://127.0.0.1:8000'

const axiosBusiness = axios.create({
  // baseURL:  "http://45.79.209.137",
  // baseURL:  "http://160.153.175.147",
  baseURL:  "http://127.0.0.1:8000",
  headers: {
    'Content-Type': 'application/json',
    'lang': locale,
    // 'X-User-Role': userRole,
    // "userRole": 'admin'
  },
  // body: JSON.stringify({ role: userRole })

});
// Add a request interceptor
axiosBusiness.interceptors.request.use(
  async (config) => {
  // Get the token from the store
  let accessToken = localStorage.getItem('token')
  if(accessToken){
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (config.method === 'post' || config.method === 'put') {
    if (config.data instanceof FormData) {
      // config.data.append('role', userRole);
    } else {
      config.data = {
        ...config.data,
        // role: userRole
      };
    }
  } else if (config.method === 'get' || config.method === 'delete') {
    config.params = {
      ...config.params,
      // role: userRole
    };
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}
);
// axiosBusiness.defaults.baseURL = 'http://160.153.175.147'
// Add a response interceptor
axiosBusiness.interceptors.response.use(
  (response) => {
     
    return response;
  },
  async (error) => {
    // Throw an error to cancel the request
    if (error.response && error.response.status === 500) {
        throw new Error('Internal Server Error');
    } 
    // Check if the error is due to an expired token
    if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
      // Set the __isRetryRequest flag to prevent an infinite loop
      error.config.__isRetryRequest = true;
      // Refresh the token
      // await refreshingToken();
      // Update the Authorization header with the new token
      let accessToken = localStorage.getItem('token')
      error.config.headers["Authorization"] = `Bearer ${accessToken}`;
      // Retry the original request with the new token
      return axiosBusiness(error.config);
    }
    return Promise.reject(error);
  }
);

export {axiosBusiness};

















