// import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import RegisterView from "@/views/auth/RegisterView.vue";
// import LoginView from "@/views/auth/LoginView.vue"; // Import your login component
// import store from "@/store"; // Import your Vuex store
// import DonationView from "@/views/DonationView.vue"

// const routes = [
//   {
//     path: "/",
//     name: "home",
//     component: HomeView,
//     meta: {
//       requiresAuth: false 
//     }
//   },
//   {
//     path: "/about",
//     name: "about",
//     component: () => import("../views/AboutView.vue"),
//     meta: {
//       requiresAuth: false 
//     }
//   },
//   // {
//   //   path: "/sign-up",
//   //   name: "register",
//   //   component: RegisterView,
//   //   meta: {
//   //     requiresAuth: false, 
//   //     requiresGuest: true 
//   //   }
//   // },
//   {
//     path: "/donation-request",
//     name: "donation-request",
//     component: DonationView,
//     meta: {
//       meta: { requiresAuth: true, roles: ['donor'] }
      
//     }
//   },
//   {
//     path: "/sign-up",
//     name: "register",
//     component: RegisterView,
//     meta: {
//       requiresAuth: false, 
//       requiresGuest: true 
//     }
//   },
//   {
//     path: "/login",
//     name: "login",
//     component: LoginView,
//     meta: {
//       requiresAuth: false, 
//       requiresGuest: true 
//     }
//   },
 
//   // Add a catch-all route for 404 pages
//   {
//     path: "/:pathMatch(.*)*",
//     name: "not-found",
//     component: () => import("@/views/NotFoundView.vue"),
//     meta: {
//       requiresAuth: false
//     }
//   }
// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (!store.getters['auth/isAuthenticated']) {
//           next({
//               path: '/login',
//               query: { redirect: to.fullPath }
//           });
//       } else {
//           if (to.meta.roles) {
//               const userRole = store.getters['auth/userRole'];
//               if (to.meta.roles.includes(userRole)) {
//                   next();
//               } else {
//                   next({ path: '/unauthorized' }); 
//               }
//           } else {
//               next();
//           }
//       }
//   } else {
//       next();
//   }
// });
// export default router;


import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import store from "@/store";
import DonationView from "@/views/DonationView.vue";
// import DonationRequestsManagementView from "@/views/stock/DonationRequestsManagementView"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false 
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    meta: {
      requiresAuth: false 
    }
  },
  {
    path: "/donation-request",
    name: "donation-request",
    component: DonationView,
    meta: {
      requiresAuth: true,
      roles: ['donor'] // Fixed duplicate meta property
    }
  },
  // {
  //   path: "/bloodbank/requests",
  //   name: "bloodbank-requests",
  //   component: () => import("@/views/stock/DonationRequestsManagementView"),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['bloodBank'] // Only bloodBank role can access
  //   }
  // },
  {
    path: "/bloodbank-requests",
    name: "bloodbank-requests",
    component: () => import("@/views/stock/DonationRequestsManagementView"),
    meta: {
      requiresAuth: true,
      roles: ['bloodBank']
    }
  },
  {
    path: "/sign-up",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false,
      requiresGuest: true 
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false,
      requiresGuest: true 
    }
  },
 
  // Add a catch-all route for 404 pages
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
    meta: {
      requiresAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('Current role:', store.getters['auth/userRole']);
  // Check if route requires guest access (like login/register)
  if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters['auth/isAuthenticated']) {
      // If logged in, redirect to home
      next({ path: '/' });
      return;
    }
  }

  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      // Not authenticated, redirect to login with return url
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }

    // Check if route has role requirements
    if (to.meta.roles) {
      const userRole = store.getters['auth/userRole'];
      if (!to.meta.roles.includes(userRole)) {
        // User doesn't have required role
        next({ path: '/unauthorized' });
        return;
      }
    }
  }

  // Proceed to route
  next();
});

export default router;