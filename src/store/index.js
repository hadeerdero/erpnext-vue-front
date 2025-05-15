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
import app from "./modules/app/app"

export default createStore({
  modules: {
    auth,
    app
  

  }
})
