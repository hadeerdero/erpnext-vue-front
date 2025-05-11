import axios from 'axios';
// axios.defaults.baseURL = 'http://45.79.209.137'
// axios.defaults.baseURL = 'http://160.153.175.147'
// axios.defaults.baseURL = 'http://127.0.0.1:8000'

axios.defaults.baseURL = 'http://138.199.220.5:8001'

const axiosAuth = axios.create({
  // baseURL:  "http://45.79.209.137",
  // baseURL:  "http://160.153.175.147",
  // baseURL:  "http://127.0.0.1:8000",
  baseURL:  'http://138.199.220.5:8001',
  

  headers: {
    'Content-Type': 'application/json',
  },
});
        
        
axiosAuth.interceptors.request.use(
  async (config) => {
  // Get the token from the store
  let accessToken = localStorage.getItem('token')
  if(accessToken){
    // print success messages in the console with green color using ANSI escape sequences
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    // config.headers["Authorization"] = `Bearer ${accessToken}`;

  }
  return config;
},
(error) => {
  console.error(error);
  return Promise.reject(error);
}
);

axiosAuth.interceptors.response.use(
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
      return axiosAuth(error.config);
    }
    return Promise.reject(error);
  }
);

export {axiosAuth};
// import axios from 'axios';

// axios.defaults.baseURL = 'http://138.199.220.5:8001';

// const axiosAuth = axios.create({
//   baseURL: 'http://138.199.220.5:8001',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// export {axiosAuth};















