// import { createStore } from "vuex";

// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });


import { createStore } from 'vuex'
import auth from "./modules/auth/auth"

export default createStore({
  modules: {
    auth,
  

  }
})
