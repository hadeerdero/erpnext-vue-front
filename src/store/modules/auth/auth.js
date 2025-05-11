
// import {axiosAuth} from '@/plugins/axios/axiosAuth';

// const state = {
//     token: localStorage.getItem('token') || null,
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     status: '', // Can be 'loading', 'success', 'error'
//     role: localStorage.getItem('role') || null  // Add role to state
// };

// const getters = {
//     isAuthenticated: state => !!state.token,
//     authStatus: state => state.status,
//     currentUser: state => state.user,
//     userRole: state => state.role,
//     hasRole: (state) => (role) => state.role === role
// };

// const mutations = {
//     AUTH_REQUEST(state) {
//         state.status = 'loading';
//     },
//     AUTH_SUCCESS(state, { token, user }) {
//         state.status = 'success';
//         state.token = token;
//         state.user = user;
//         state.role = user.role;  // Store role from user object
//         localStorage.setItem('role', user.role);  // Persist role
//     },
//     LOGOUT(state) {
//         state.token = null;
//         state.user = null;
//         state.role = null;
//         localStorage.removeItem('role');
//     },
//     AUTH_ERROR(state) {
//         state.status = 'error';
//         state.token = null;
//         state.user = null;
//     },
   
// };

// const actions = {
//     async login({ commit }, credentials) {
//         commit('AUTH_REQUEST');
        
//         try {
//             // /users/login
//             const response = await axiosAuth.post('/api/method/my_app.custom_login', {
//                 usr: credentials.email,
//                 pwd: credentials.password
//             });
//             const token = response.data.user.tokens.access;
//             const user = response.data.user;
            
//             // Store token and user in localStorage
//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));
            
//             // Set default authorization header
//             axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
//             commit('AUTH_SUCCESS', { token, user });
//             return response.data;
//         } catch (error) {
//             commit('AUTH_ERROR');
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             delete axiosAuth.defaults.headers.common['Authorization'];
//             throw error;
//         }
//     },
    
//     register({ commit }, userData) {
//         return new Promise((resolve, reject) => {
//             commit('AUTH_REQUEST');
            
//             axiosAuth.post('users/register', userData)
//                 .then(response => {
//                     resolve(response);
//                 })
//                 .catch(error => {
//                     commit('AUTH_ERROR');
//                     reject(error);
//                 });
//         });
//     },
    
//     logout({ commit }) {
//         return new Promise((resolve) => {
//             commit('LOGOUT');
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             delete axiosAuth.defaults.headers.common['Authorization'];
//             resolve();
//         });
//     },
    
//     checkAuth({ commit }) {
//         const token = localStorage.getItem('token');
//         if (token) {
//             const user = JSON.parse(localStorage.getItem('user'));
//             axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             commit('AUTH_SUCCESS', { token, user });
//         }
//     }
// };

// export default {
//     namespaced: true,
//     state,
//     getters,
//     mutations,
//     actions,
// };


import { axiosAuth } from '@/plugins/axios/axiosAuth';

const state = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: '', // Can be 'loading', 'success', 'error'
    sid: localStorage.getItem('sid') || null,  // Store session ID
    home_page: localStorage.getItem('home_page') || '/app/home'
};

const getters = {
    isAuthenticated: state => !!state.sid,  // Now checking sid instead of token
    authStatus: state => state.status,
    currentUser: state => state.user,
    homePage: state => state.home_page,
    hasRole: (state) => (role) => state.user && state.user.role === role
};

const mutations = {
    AUTH_REQUEST(state) {
        state.status = 'loading';
    },
    AUTH_SUCCESS(state, { sid, user, home_page }) {
        state.status = 'success';
        state.sid = sid;
        state.user = {
            email: user,
            full_name: state.full_name
        };
        state.home_page = home_page;
        
        // Persist in localStorage
        localStorage.setItem('sid', sid);
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('home_page', home_page);
    },
    LOGOUT(state) {
        state.sid = null;
        state.user = null;
        state.home_page = '/app/home';
        localStorage.removeItem('sid');
        localStorage.removeItem('user');
        localStorage.removeItem('home_page');
    },
    AUTH_ERROR(state) {
        state.status = 'error';
        state.sid = null;
        state.user = null;
    },
    SET_FULL_NAME(state, full_name) {
        state.full_name = full_name;
        if (state.user) {
            state.user.full_name = full_name;
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
};

const actions = {
    async login({ commit }, credentials) {
        commit('AUTH_REQUEST');
        
        try {
            const response = await axiosAuth.post('/api/method/my_app.custom_login', {
                usr: credentials.email,
                pwd: credentials.password
            });
            
            // Extract data from response
            const { message } = response.data;
            const { sid, user, full_name, home_page } = message;
            
            // Store session data
            commit('AUTH_SUCCESS', { sid, user, home_page });
            commit('SET_FULL_NAME', full_name);
            
            // Set CSRF token for subsequent requests
            axiosAuth.defaults.headers.common['X-Frappe-Sid'] = sid;
            
            return response.data;
        } catch (error) {
            commit('AUTH_ERROR');
            localStorage.removeItem('sid');
            localStorage.removeItem('user');
            delete axiosAuth.defaults.headers.common['X-Frappe-Sid'];
            throw error;
        }
    },
    
    async logout({ commit }) {
        try {
            await axiosAuth.post('/api/method/frappe.auth.logout');
        } finally {
            commit('LOGOUT');
            localStorage.removeItem('sid');
            localStorage.removeItem('user');
            delete axiosAuth.defaults.headers.common['X-Frappe-Sid'];
        }
    },
    
    checkAuth({ commit }) {
        const sid = localStorage.getItem('sid');
        if (sid) {
            const user = JSON.parse(localStorage.getItem('user'));
            axiosAuth.defaults.headers.common['X-Frappe-Sid'] = sid;
            commit('AUTH_SUCCESS', { 
                sid, 
                user: user.email, 
                home_page: localStorage.getItem('home_page') 
            });
            commit('SET_FULL_NAME', user.full_name);
        }
    },
    
    // Optional: Refresh session
    async refreshSession({ state, commit }) {
        if (!state.sid) return;
        
        try {
            const response = await axiosAuth.get('/api/method/frappe.auth.get_logged_user');
            commit('SET_FULL_NAME', response.data.message.full_name);
        } catch (error) {
            commit('LOGOUT');
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};