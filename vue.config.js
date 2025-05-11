// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });
// const { defineConfig } = require("@vue/cli-service");

// module.exports = defineConfig({
//   transpileDependencies: true,

//   // Add these configurations
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://138.199.220.5:8001/", // Your Frappe server
//         changeOrigin: true,
//         ws: true,
//         pathRewrite: {
//           "^/api": "",
//         },
//         headers: {
//           "X-Frappe-Site-Name": "mynewsite", // Replace with your site name
//         },
//         onProxyRes(proxyRes) {
//           // Forward set-cookie headers from Frappe
//           const sc = proxyRes.headers["set-cookie"];
//           if (sc) {
//             proxyRes.headers["set-cookie"] = sc.map(
//               (cookie) => cookie.replace(/Domain=.*?;/, "Domain=localhost;") // Adjust domain as needed
//             );
//           }
//         },
//       },
//       "/assets": {
//         target: "http://138.199.220.5:8001/",
//         changeOrigin: true,
//       },
//       "/desk": {
//         target: "http://138.199.220.5:8001/",
//         changeOrigin: true,
//       },
//     },
//   },

//   // For production build
//   publicPath:
//     process.env.NODE_ENV === "production"
//       ? "/assets/vue-app/" // Match Frappe's assets structure
//       : "/",
// });
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      // Proxy all Frappe-related paths
      "^/(api|assets|desk|files|private|public|login|app)": {
        target: "http://138.199.220.5:8001",
        changeOrigin: true,
        ws: true,
        headers: {
          "X-Frappe-Site-Name": "mynewsite",
          Origin: "http://138.199.220.5:8001", // Ensure CORS compatibility
        },
        pathRewrite: {
          // Remove /api prefix only for API calls
          "^/api/method": "/api/method",
          "^/api/resource": "/api/resource",
        },
        onProxyRes(proxyRes) {
          // Fix cookies for local development
          const sc = proxyRes.headers["set-cookie"];
          if (sc) {
            proxyRes.headers["set-cookie"] = sc.map((cookie) =>
              cookie
                .replace(/Domain=.*?;/, "Domain=localhost;")
                .replace(/Secure;/, "") // Remove Secure flag for local dev
                .replace(/SameSite=.*?;/, "SameSite=Lax;")
            );
          }
        },
      },
    },
    // Prevent fallback to index.html for unknown paths
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /^\/desk/, to: "/desk" }],
    },
    // Allow hosting on network (for mobile testing)
    host: "0.0.0.0",
    hot: true,
  },

  // Production build settings
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/assets/vue-app/" // Must match Frappe assets directory
      : "/",

  // Additional production optimizations
  configureWebpack: {
    output: {
      filename:
        process.env.NODE_ENV === "production"
          ? "[name].[contenthash].js"
          : "[name].js",
      chunkFilename:
        process.env.NODE_ENV === "production"
          ? "[name].[contenthash].js"
          : "[name].js",
    },
  },
});
