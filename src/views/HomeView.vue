<template>
  <div class="home">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <img
            src="@/assets/intlaq-logo.jpg"
            alt="Intlaq Logo"
            class="navbar-logo"
          />
          <span>Intlaq</span>
        </div>
        <div class="navbar-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/services" class="nav-link">Services</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
          <router-link to="/login" class="btn-login">Login</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="welcome-title">Welcome to Intlaq Information Technology</h1>
        <p class="welcome-subtitle">Innovative Solutions for the Digital Age</p>

        <div class="cta-buttons">
          <router-link to="/services" class="btn btn-primary">
            Our Services
          </router-link>
          <router-link to="/contact" class="btn btn-outline">
            Contact Us
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div
        class="feature-card"
        v-for="(feature, index) in features"
        :key="index"
      >
        <div class="feature-icon">
          <i :class="feature.icon"></i>
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      features: [
        {
          icon: "fas fa-server",
          title: "Enterprise Solutions",
          description: "Custom-built systems for your business needs",
        },
        {
          icon: "fas fa-cloud",
          title: "Cloud Services",
          description: "Scalable and secure cloud infrastructure",
        },
        {
          icon: "fas fa-shield-alt",
          title: "Cyber Security",
          description: "Protecting your digital assets",
        },
        {
          icon: "fas fa-mobile-alt",
          title: "Mobile Development",
          description: "Cross-platform mobile applications",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

/* Navbar styles */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.navbar-logo {
  height: 40px;
  margin-right: 0.5rem;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
}

.nav-link:hover {
  color: #3498db;
}

.btn-login {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.btn-login:hover {
  background-color: #2980b9;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.company-logo {
  height: 100px;
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #fff;
  color: #2c3e50;
}

.btn-primary:hover {
  background-color: #f1f1f1;
}

.btn-outline {
  border: 2px solid #fff;
  color: #fff;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Features Section */
.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

  .navbar-links {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
