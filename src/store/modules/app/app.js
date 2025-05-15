// store/modules/app.js
import { axiosAuth } from "@/plugins/axios/axiosAuth";

const state = {
  sidebarData: null,
  loading: false,
  error: null
};

const getters = {
  sidebarData: (state) => state.sidebarData,
  sidebarLoading: (state) => state.loading,
  sidebarError: (state) => state.error,
  formattedSidebar: (state) => {
    if (!state.sidebarData) return null;
    
    return {
      modules: state.sidebarData.allowed_modules || [],
      shortcuts: state.sidebarData.shortcuts || [],
      sections: state.sidebarData.sections || []
    };
  }
};

const mutations = {
  SET_SIDEBAR_LOADING(state, status) {
    state.loading = status;
  },
  SET_SIDEBAR_DATA(state, data) {
    state.sidebarData = {
      // Original ERPNext data
      ...data,
      
      // Transformed data for easier consumption
      allowed_modules: data.allowed_modules.map(module => ({
        label: module.module_name,
        icon: module.icon || 'fa fa-folder',
        route: `/${module.module_name.toLowerCase()}`,
        color: module.color || '#7F8C8D'
      })),
      
      sections: (data.sections || []).map(section => ({
        label: section.label,
        items: (section.items || []).map(item => ({
          label: item.label,
          route: item.route || '#',
          icon: item.icon || 'fa fa-circle',
          count: item.count || 0,
          type: item.type || 'link'
        }))
      }))
    };
    state.error = null;
  },
  SET_SIDEBAR_ERROR(state, error) {
    state.error = error;
    state.sidebarData = null;
  },
  UPDATE_SIDEBAR_ITEM_COUNT(state, { label, count }) {
    if (!state.sidebarData) return;
    
    // Update count in all sections
    state.sidebarData.sections.forEach(section => {
      section.items.forEach(item => {
        if (item.label === label) {
          item.count = count;
        }
      });
    });
  }
};

const actions = {
  async fetchSidebarData({ commit, state }) {
    // Return cached data if available
    if (state.sidebarData && !state.error) {
      return state.sidebarData;
    }
    
    commit('SET_SIDEBAR_LOADING', true);
    
    try {
      const response = await axiosAuth.get('/api/method/frappe.desk.desktop.get_desktop_sidebar');
      commit('SET_SIDEBAR_DATA', response.data.message);
      return response.data.message;
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
      commit('SET_SIDEBAR_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_SIDEBAR_LOADING', false);
    }
  },
  
  async refreshSidebarCounts({ commit, state }) {
    if (!state.sidebarData) return;
    
    try {
      // Example: Fetch updated counts for specific items
      const countsResponse = await axiosAuth.get('/api/method/frappe.desk.desktop.get_sidebar_counts');
      
      // Update counts in the store
      Object.entries(countsResponse.data.message).forEach(([label, count]) => {
        commit('UPDATE_SIDEBAR_ITEM_COUNT', { label, count });
      });
    } catch (error) {
      console.error('Error refreshing sidebar counts:', error);
    }
  },
  
  async initializeSidebar({ dispatch }) {
    // Fetch initial data
    await dispatch('fetchSidebarData');
    
    // Set up periodic refresh (every 5 minutes)
    setInterval(() => {
      dispatch('refreshSidebarCounts');
    }, 300000);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};