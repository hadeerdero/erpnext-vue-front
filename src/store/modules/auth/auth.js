// import { axiosAuth } from "@/plugins/axios/axiosAuth";

// const state = {
//   token: localStorage.getItem("token") || null,
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   status: "", // Can be 'loading', 'success', 'error'
//   sid: localStorage.getItem("sid") || null, // Store session ID
//   home_page: localStorage.getItem("home_page") || "/app/home",
// };

// const getters = {
//   isAuthenticated: (state) => !!state.sid, // Now checking sid instead of token
//   authStatus: (state) => state.status,
//   currentUser: (state) => state.user,
//   homePage: (state) => state.home_page,
//   hasRole: (state) => (role) => state.user && state.user.role === role,
// };

// const mutations = {
//   AUTH_REQUEST(state) {
//     state.status = "loading";
//   },
//   AUTH_SUCCESS(state, { sid, user, home_page }) {
//     state.status = "success";
//     state.sid = sid;
//     state.user = {
//       email: user,
//       full_name: state.full_name,
//     };
//     state.home_page = home_page;

//     // Persist in localStorage
//     localStorage.setItem("sid", sid);
//     localStorage.setItem("user", JSON.stringify(state.user));
//     localStorage.setItem("home_page", home_page);
//   },
//   LOGOUT(state) {
//     state.sid = null;
//     state.user = null;
//     state.home_page = "/app/home";
//     localStorage.removeItem("sid");
//     localStorage.removeItem("user");
//     localStorage.removeItem("home_page");
//   },
//   AUTH_ERROR(state) {
//     state.status = "error";
//     state.sid = null;
//     state.user = null;
//   },
//   SET_FULL_NAME(state, full_name) {
//     state.full_name = full_name;
//     if (state.user) {
//       state.user.full_name = full_name;
//       localStorage.setItem("user", JSON.stringify(state.user));
//     }
//   },
// };

// const actions = {
//   async login({ commit }, credentials) {
//     commit("AUTH_REQUEST");

//     try {
//       const response = await axiosAuth.post("/api/method/my_app.custom_login", {
//         usr: credentials.email,
//         pwd: credentials.password,
//       });

//       // Extract data from response
//       const { message } = response.data;
//       const { sid, user, full_name, home_page } = message;

//       // Store session data
//       commit("AUTH_SUCCESS", { sid, user, home_page });
//       commit("SET_FULL_NAME", full_name);

//       // Set CSRF token for subsequent requests
//       axiosAuth.defaults.headers.common["X-Frappe-Sid"] = sid;

//       return response.data;
//     } catch (error) {
//       commit("AUTH_ERROR");
//       localStorage.removeItem("sid");
//       localStorage.removeItem("user");
//       delete axiosAuth.defaults.headers.common["X-Frappe-Sid"];
//       throw error;
//     }
//   },

//   async logout({ commit }) {
//     try {
//       await axiosAuth.post("/api/method/frappe.auth.logout");
//     } finally {
//       commit("LOGOUT");
//       localStorage.removeItem("sid");
//       localStorage.removeItem("user");
//       delete axiosAuth.defaults.headers.common["X-Frappe-Sid"];
//     }
//   },

//   checkAuth({ commit }) {
//     const sid = localStorage.getItem("sid");
//     if (sid) {
//       const user = JSON.parse(localStorage.getItem("user"));
//       axiosAuth.defaults.headers.common["X-Frappe-Sid"] = sid;
//       commit("AUTH_SUCCESS", {
//         sid,
//         user: user.email,
//         home_page: localStorage.getItem("home_page"),
//       });
//       commit("SET_FULL_NAME", user.full_name);
//     }
//   },

//   // Optional: Refresh session
//   async refreshSession({ state, commit }) {
//     if (!state.sid) return;

//     try {
//       const response = await axiosAuth.get(
//         "/api/method/frappe.auth.get_logged_user"
//       );
//       commit("SET_FULL_NAME", response.data.message.full_name);
//     } catch (error) {
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

import { axiosAuth } from "@/plugins/axios/axiosAuth";

const state = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "", // 'loading', 'success', 'error'
  sid: localStorage.getItem("sid") || null,
  home_page: localStorage.getItem("home_page") || "/desk",
  full_name: localStorage.getItem("full_name") || null,
};

const getters = {
  isAuthenticated: (state) => !!state.sid,
  authStatus: (state) => state.status,
  currentUser: (state) => state.user,
  homePage: (state) => state.home_page,
  fullName: (state) => state.full_name,
  hasRole: (state) => (role) =>
    state.user && state.user.roles && state.user.roles.includes(role),
};

const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading";
  },
  AUTH_SUCCESS(state, { sid, user, home_page, full_name }) {
    state.status = "success";
    state.sid = sid;
    state.user = {
      email: user,
      full_name: full_name,
      roles: state.user?.roles || [],
    };
    state.home_page = home_page;
    state.full_name = full_name;

    // Persist in localStorage
    localStorage.setItem("sid", sid);
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("home_page", home_page);
    localStorage.setItem("full_name", full_name);
  },
  AUTH_ERROR(state) {
    state.status = "error";
    state.sid = null;
    state.user = null;
    state.full_name = null;
    localStorage.removeItem("sid");
    localStorage.removeItem("user");
    localStorage.removeItem("home_page");
    localStorage.removeItem("full_name");
  },
  LOGOUT(state) {
    state.sid = null;
    state.user = null;
    state.home_page = "/desk";
    state.full_name = null;
    localStorage.removeItem("sid");
    localStorage.removeItem("user");
    localStorage.removeItem("home_page");
    localStorage.removeItem("full_name");
  },
  SET_USER_ROLES(state, roles) {
    if (state.user) {
      state.user.roles = roles;
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
};

const actions = {
  async login({ commit }, credentials) {
    commit("AUTH_REQUEST");

    try {
      const response = await axiosAuth.post("/api/method/my_app.custom_login", {
        usr: credentials.email,
        pwd: credentials.password,
      });

      const { message } = response.data;
      const { sid, user, full_name, home_page } = message;

      // Set critical cookies for Frappe desk
      document.cookie = `sid=${sid}; path=/; ${
        process.env.NODE_ENV === "production"
          ? "domain=.yourdomain.com; Secure; SameSite=Lax"
          : ""
      }`;
      document.cookie = `user_id=${user}; path=/; ${
        process.env.NODE_ENV === "production"
          ? "domain=.yourdomain.com; Secure; SameSite=Lax"
          : ""
      }`;
      document.cookie = `full_name=${encodeURIComponent(full_name)}; path=/; ${
        process.env.NODE_ENV === "production"
          ? "domain=.yourdomain.com; Secure; SameSite=Lax"
          : ""
      }`;

      // Configure axios for future requests
      axiosAuth.defaults.headers.common["X-Frappe-Sid"] = sid;

      commit("AUTH_SUCCESS", { sid, user, home_page, full_name });

      // Fetch user roles if needed
      await this.dispatch("fetchUserRoles");

      return response.data;
    } catch (error) {
      commit("AUTH_ERROR");
      delete axiosAuth.defaults.headers.common["X-Frappe-Sid"];
      throw error;
    }
  },

  async fetchUserRoles({ commit }) {
    try {
      const response = await axiosAuth.get(
        "/api/method/frappe.auth.get_logged_user"
      );
      const roles = response.data.message.roles.map((r) => r.role);
      commit("SET_USER_ROLES", roles);
    } catch (error) {
      console.error("Failed to fetch user roles:", error);
    }
  },

  async logout({ commit }) {
    try {
      await axiosAuth.post("/api/method/frappe.auth.logout");
    } finally {
      commit("LOGOUT");
      delete axiosAuth.defaults.headers.common["X-Frappe-Sid"];

      // Clear Frappe cookies
      document.cookie = "sid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "full_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },

  checkAuth({ commit }) {
    const sid = localStorage.getItem("sid");
    if (sid) {
      const user = JSON.parse(localStorage.getItem("user"));
      const full_name = localStorage.getItem("full_name");
      const home_page = localStorage.getItem("home_page") || "/desk";

      axiosAuth.defaults.headers.common["X-Frappe-Sid"] = sid;

      commit("AUTH_SUCCESS", {
        sid,
        user: user?.email || "",
        home_page,
        full_name,
      });

      // Verify session is still valid
      this.dispatch("verifySession");
    }
  },

  async verifySession({ commit, state }) {
    if (!state.sid) return;

    try {
      await axiosAuth.get("/api/method/frappe.auth.get_logged_user");
    } catch (error) {
      commit("LOGOUT");
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
