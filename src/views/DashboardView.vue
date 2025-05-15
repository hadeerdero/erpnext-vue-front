<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Welcome, {{ userName }}!</h1>
      <p>Last login: {{ lastLogin }}</p>
    </div>

    <div class="dashboard-widgets">
      <!-- Summary Cards -->
      <div class="widget-row">
        <DashboardCard 
          title="Total Sales" 
          :value="salesData.total" 
          icon="dollar-sign"
          :trend="salesData.trend"
        />
        <DashboardCard 
          title="New Customers" 
          :value="customerData.new" 
          icon="users"
          :trend="customerData.trend"
        />
        <DashboardCard 
          title="Pending Orders" 
          :value="orderData.pending" 
          icon="shopping-cart"
          :trend="orderData.trend"
        />
      </div>

      <!-- Charts Section -->
      <!-- <div class="widget-row">
        <div class="chart-container">
          <LineChart :data="salesChartData" title="Sales Trend" />
        </div>
        <div class="chart-container">
          <BarChart :data="customerChartData" title="Customer Growth" />
        </div>
      </div> -->

      <!-- Recent Activity -->
      <div class="widget-row">
        <RecentActivity :items="recentActivities" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import DashboardCard from '@/components/dashboard/DashboardCard.vue';

import RecentActivity from '@/components/dashboard/RecentActivity.vue';

export default {
  name: 'DashboardView',
  components: {
    DashboardCard,
   
    RecentActivity
  },
  data() {
    return {
      salesData: {
        total: 0,
        trend: 0,
        loading: true
      },
      customerData: {
        new: 0,
        trend: 0,
        loading: true
      },
      orderData: {
        pending: 0,
        trend: 0,
        loading: true
      },
      salesChartData: [],
      customerChartData: [],
      recentActivities: [],
      isLoading: true
    };
  },
  computed: {
    ...mapGetters('auth', ['currentUser', 'fullName']),
    ...mapState('auth', ['user']),
    
    userName() {
      return this.fullName || this.user?.full_name || 'User';
    },
    lastLogin() {
      // Format last login date from user data or use current time
      return new Date().toLocaleString();
    }
  },
  async created() {
    // await this.fetchDashboardData();
    this.isLoading = false;
  },
  methods: {
    // async fetchDashboardData() {
    //   try {
    //     // Fetch all data in parallel
    //     await Promise.all([
    //       this.fetchSalesData(),
    //       this.fetchCustomerData(),
    //       this.fetchOrderData(),
    //       this.fetchChartData(),
    //       this.fetchRecentActivities()
    //     ]);
    //   } catch (error) {
    //     console.error('Error loading dashboard data:', error);
    //     // Handle error (show notification, etc.)
    //   }
    // },
    
    async fetchSalesData() {
      // Example API call - replace with your actual endpoint
      const response = await this.$axios.get('/api/method/get_sales_summary');
      this.salesData = {
        total: response.data.total_sales,
        trend: response.data.trend,
        loading: false
      };
    },
    
    async fetchCustomerData() {
      const response = await this.$axios.get('/api/method/get_customer_summary');
      this.customerData = {
        new: response.data.new_customers,
        trend: response.data.trend,
        loading: false
      };
    },
    
    async fetchOrderData() {
      const response = await this.$axios.get('/api/method/get_order_summary');
      this.orderData = {
        pending: response.data.pending_orders,
        trend: response.data.trend,
        loading: false
      };
    },
    
    async fetchChartData() {
      const responses = await Promise.all([
        this.$axios.get('/api/method/get_sales_chart_data'),
        this.$axios.get('/api/method/get_customer_chart_data')
      ]);
      
      this.salesChartData = responses[0].data;
      this.customerChartData = responses[1].data;
    },
    
    async fetchRecentActivities() {
      const response = await this.$axios.get('/api/method/get_recent_activities');
      this.recentActivities = response.data.activities;
    }
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  height: 100%;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-header h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.dashboard-header p {
  color: #666;
  font-size: 14px;
}

.widget-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .widget-row {
    flex-direction: column;
  }
  
  .chart-container {
    min-width: 100%;
  }
}
</style>