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
import SalesInvoiceView from "@/views/SalesInvoiceView.vue";
import SalesInvoiceListView from "@/views/SalesInvoiceListView.vue";
// import DonationRequestsManagementView from "@/views/stock/DonationRequestsManagementView"

const routes = [
  
  {
    path: '/sales-invoices',
    name: 'sales-invoices',
    component: SalesInvoiceListView
  },
   {
    path: '/sales-invoices/new',
    name: 'SalesInvoiceCreate',
    component: SalesInvoiceView
  },
 {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/DashboardView.vue'),
  meta: { requiresAuth: true }
},
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

// router.beforeEach((to, from, next) => {
//   console.log('Current role:', store.getters['auth/userRole']);
//   // Check if route requires guest access (like login/register)
//   if (to.matched.some(record => record.meta.requiresGuest)) {
//     if (store.getters['auth/isAuthenticated']) {
//       // If logged in, redirect to home
//       next({ path: '/' });
//       return;
//     }
//   }

//   // Check if route requires authentication
//   // if (to.matched.some(record => record.meta.requiresAuth)) {
//   //   if (!store.getters['auth/isAuthenticated']) {
//   //     // Not authenticated, redirect to login with return url
//   //     next({
//   //       path: '/login',
//   //       query: { redirect: to.fullPath }
//   //     });
//   //     return;
//   //   }

//   //   // Check if route has role requirements
//   //   if (to.meta.roles) {
//   //     const userRole = store.getters['auth/userRole'];
//   //     if (!to.meta.roles.includes(userRole)) {
//   //       // User doesn't have required role
//   //       next({ path: '/unauthorized' });
//   //       return;
//   //     }
//   //   }
//   // }

//   router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters['auth/isAuthenticated'];
  
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next('/login');
//     } else {
//       next();
//     }
//   } else if (isAuthenticated && to.path === '/login') {
//     next('/app/home'); // Redirect to dashboard if logged in
//   } else {
//     next();
//   }
// });

//   // Proceed to route
//   next();
// });


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  // Handle guest routes (login, register, etc.)
  if (requiresGuest) {
    if (isAuthenticated) {
      // If user is authenticated, redirect to home page
      next(store.getters['auth/homePage'] || '/app/home');
    } else {
      // Allow access to guest routes
      next();
    }
    return;
  }

  // Handle protected routes
  if (requiresAuth) {
    if (!isAuthenticated) {
      // Not authenticated - redirect to login with return URL
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }

    // Optional: Verify token with server if needed
    try {
      // const isValid = await store.dispatch('auth/verifyToken');
      // if (!isValid) {
      //   throw new Error('Invalid session');
      // }
      next();
    } catch (error) {
      // Token verification failed - force logout and redirect to login
      await store.dispatch('auth/logout');
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
    return;
  }

  // Handle case when authenticated user tries to access login page
  if (isAuthenticated && to.path === '/login') {
    next('/dashboard');
    return;
  }

  // For all other cases, proceed normally
  next();
});


export default router;