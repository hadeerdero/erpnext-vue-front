
// import { axiosAuth } from "@/plugins/axios/axiosAuth";

// const state = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   status: "", // 'loading', 'success', 'error'
//   home_page: "/app/home", // Default home page
// };

// const getters = {
//   isAuthenticated: (state) => !!state.user,
//   authStatus: (state) => state.status,
//   currentUser: (state) => state.user,
//   homePage: (state) => state.home_page,
//   fullName: (state) => state.user?.full_name || null,
// };

// const mutations = {
//   AUTH_REQUEST(state) {
//     state.status = "loading";
//   },
//   AUTH_SUCCESS(state, { full_name, home_page }) {
//     state.status = "success";
//     state.user = {
//       full_name: full_name,
//     };
//     state.home_page = home_page || "/app/home";

//     // Persist in localStorage
//     localStorage.setItem("user", JSON.stringify(state.user));
//     localStorage.setItem("home_page", state.home_page);
//   },
//   AUTH_ERROR(state) {
//     state.status = "error";
//     state.user = null;
//     localStorage.removeItem("user");
//     localStorage.removeItem("home_page");
//   },
//   LOGOUT(state) {
//     state.user = null;
//     state.home_page = "/app/home";
//     localStorage.removeItem("user");
//     localStorage.removeItem("home_page");
//   },
// };

// const actions = {
//   async login({ commit }, credentials) {
//     commit("AUTH_REQUEST");

//     try {
//       const response = await axiosAuth.post("/api/method/login", {
//         usr: credentials.email,
//         pwd: credentials.password,
//       });

//       const { full_name, home_page } = response.data;

//       commit("AUTH_SUCCESS", { 
//         full_name, 
//         home_page: home_page || "/app/home" 
//       });

//       return response.data;
//     } catch (error) {
//       commit("AUTH_ERROR");
//       throw error;
//     }
//   },

//   async logout({ commit }) {
//     try {
//       await axiosAuth.post("/api/method/frappe.auth.logout");
//     } finally {
//       commit("LOGOUT");
//     }
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions,
// };


// src/store/modules/auth.js
// import { axiosAuth } from "@/plugins/axios/axiosAuth";

// const state = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: localStorage.getItem("token") || null,
//   status: "", // 'loading', 'success', 'error'
//   home_page: "/app/home", // Default home page
// };

// const getters = {
//   isAuthenticated: (state) => !!state.token,
//   authStatus: (state) => state.status,
//   currentUser: (state) => state.user,
//   homePage: (state) => state.home_page,
//   fullName: (state) => state.user?.full_name || null,
//   authToken: (state) => state.token,
// };

// const mutations = {
//   AUTH_REQUEST(state) {
//     state.status = "loading";
//   },
//   AUTH_SUCCESS(state, { user, token, home_page }) {
//     state.status = "success";
//     state.user = user;
//     state.token = token;
//     state.home_page = home_page || "/app/home";

//     // Persist in localStorage
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//     localStorage.setItem("home_page", state.home_page);
//   },
//   AUTH_ERROR(state) {
//     state.status = "error";
//     state.user = null;
//     state.token = null;
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("home_page");
//   },
//   LOGOUT(state) {
//     state.user = null;
//     state.token = null;
//     state.home_page = "/app/home";
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("home_page");
//   },
// };

// const actions = {
//   async login({ commit }, credentials) {
//     commit("AUTH_REQUEST");

//     try {
//       const response = await axiosAuth.post("/api/method/login", {
//         usr: credentials.email,
//         pwd: credentials.password,
//       });

//       // ERPNext returns the full_name in the response
//       const user = {
//         full_name: response.data.full_name,
//         email: credentials.email
//       };

//       // ERPNext returns the token in the response
//       const token = response.data.token || response.data.api_key;

//       commit("AUTH_SUCCESS", { 
//         user,
//         token,
//         home_page: response.data.home_page || "/app/home" 
//       });

//       return response.data;
//     } catch (error) {
//       commit("AUTH_ERROR");
//       throw error;
//     }
//   },

//   async logout({ commit }) {
//     try {
//       await axiosAuth.post("/api/method/logout");
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       commit("LOGOUT");
//     }
//   },

//   async verifyToken({ state }) {
//     if (!state.token) return false;
    
//     try {
//       const response = await axiosAuth.get("/api/method/frappe.auth.get_logged_user");
//       return !!response.data;
//     } catch (error) {
//       return false;
//     }
//   }
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions,
// };


// src/store/modules/auth.js
import { axiosAuth } from "@/plugins/axios/axiosAuth";

const state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "", // 'loading', 'success', 'error'
  home_page: localStorage.getItem("home_page") || "/app/home",
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  authStatus: (state) => state.status,
  currentUser: (state) => state.user,
  homePage: (state) => state.home_page,
  fullName: (state) => state.user?.full_name || null,
};

const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading";
  },
  AUTH_SUCCESS(state, { user, home_page }) {
    state.status = "success";
    state.user = user;
    state.home_page = home_page || "/app/home";
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("home_page", state.home_page);
  },
  AUTH_ERROR(state) {
    state.status = "error";
    state.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("home_page");
  },
  LOGOUT(state) {
    state.user = null;
    state.home_page = "/app/home";
    localStorage.removeItem("user");
    localStorage.removeItem("home_page");
  },
};

const actions = {
  async login({ commit }, credentials) {
    commit("AUTH_REQUEST");

    try {
      // 1. Make login request - this sets the session cookie
    const response =   await axiosAuth.post("/api/method/login", {
        usr: credentials.email,
        pwd: credentials.password,
      });

      // 2. Get user details to verify login was successful
      // const userResponse = await axiosAuth.get("/api/method/frappe.auth.get_logged_user");
      // console.log("User response:", userResponse);
      // const userData = userResponse.data.message;

      // if (!userData) {
      //   throw new Error("Login failed - no user data received");
      // }

      const user = {
        full_name:  response.full_name,
        email: credentials.email,
      };

      commit("AUTH_SUCCESS", {
        user,
        home_page: "/app/home"
      });

      return user;
    } catch (error) {
      commit("AUTH_ERROR");
      
      let errorMessage = "Login failed";
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = typeof error.response.data.message === 'string' 
            ? error.response.data.message
            : error.response.data.message.error || errorMessage;
        } else if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        }
      }
      
      throw new Error(errorMessage);
    }
  },

  async logout({ commit }) {
    try {
      await axiosAuth.post("/api/method/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      commit("LOGOUT");
    }
  },

  async verifyAuth({ state, commit }) {
    try {
      const response = await axiosAuth.get("/api/method/frappe.auth.get_logged_user");
      if (response.data && response.data.message) {
        // Update user data if needed
        const userData = response.data.message;
        const updatedUser = {
          ...state.user,
          full_name: userData.full_name || state.user?.full_name,
          user_image: userData.user_image || state.user?.user_image
        };
        
        commit("AUTH_SUCCESS", {
          user: updatedUser,
          home_page: state.home_page
        });
        return true;
      }
      return false;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        commit("LOGOUT");
      }
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};