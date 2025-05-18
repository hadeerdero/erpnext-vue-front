<template>
  <div class="customer-management">
    <h2>Customer Management</h2>
    
    <!-- Customer Creation Form -->
    <div class="customer-form">
      <h3>Create New Customer</h3>
      <form @submit.prevent="createCustomer">
        <div class="form-group">
          <label for="customerName">Customer Name*</label>
          <input 
            type="text" 
            id="customerName" 
            v-model="newCustomer.customer_name" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="customerType">Customer Type</label>
          <select id="customerType" v-model="newCustomer.customer_type">
            <option value="Company">Company</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="customerGroup">Customer Group*</label>
          <input 
            type="text" 
            id="customerGroup" 
            v-model="newCustomer.customer_group" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="territory">Territory*</label>
          <input 
            type="text" 
            id="territory" 
            v-model="newCustomer.territory" 
            required
          />
        </div>
        
        <button type="submit" :disabled="isCreating">
          {{ isCreating ? 'Creating...' : 'Create Customer' }}
        </button>
      </form>
    </div>
    
    <!-- Customer List -->
    <div class="customer-list">
      <h3>Customer List</h3>
      <div class="list-controls">
        <button @click="fetchCustomers" :disabled="isLoading">
          {{ isLoading ? 'Refreshing...' : 'Refresh List' }}
        </button>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search customers..." 
          @input="debouncedSearch"
        />
      </div>
      
      <div v-if="customers.length === 0 && !isLoading" class="empty-state">
        No customers found
      </div>
      
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Group</th>
              <th>Territory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.name">
              <td>{{ customer.customer_name }}</td>
              <td>{{ customer.customer_type }}</td>
              <td>{{ customer.customer_group }}</td>
              <td>{{ customer.territory }}</td>
              <td>
                <button @click="editCustomer(customer)">Edit</button>
                <button @click="deleteCustomer(customer.name)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="pagination" v-if="totalPages > 1">
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/axios/axiosBusiness";
import _ from 'lodash';

export default {
  name: 'CustomerManagement',
  data() {
    return {
      newCustomer: {
        customer_name: '',
        customer_type: 'Company',
        customer_group: 'Commercial',
        territory: 'United States'
      },
      customers: [],
      isLoading: false,
      isCreating: false,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      totalCustomers: 0,
      apiConfig: {
        baseURL: 'http://your-erpnext-instance.com', // Change this to your ERPNext URL
        apiKey: 'your-api-key', // Replace with your API key
        apiSecret: 'your-api-secret' // Replace with your API secret
      }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCustomers / this.pageSize);
    }
  },
  created() {
    this.fetchCustomers();
    this.debouncedSearch = _.debounce(this.searchCustomers, 500);
  },
  methods: {
    getAuthHeaders() {
      return {
        'Authorization': `token ${this.apiConfig.apiKey}:${this.apiConfig.apiSecret}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    },
    
    async fetchCustomers() {
      this.isLoading = true;
      try {
        const response = await api.get(`/api/resource/Customer`, {
          params: {
            fields: JSON.stringify(['customer_name', 'customer_type', 'customer_group', 'territory']),
            limit_start: (this.currentPage - 1) * this.pageSize,
            limit_page_length: this.pageSize
          }
        });
        
        this.customers = response.data.data;
        this.totalCustomers = response.data.total_count || response.data.data.length;
      } catch (error) {
        console.error('Error fetching customers:', error);
        alert('Failed to fetch customers. Check console for details.');
      } finally {
        this.isLoading = false;
      }
    },
    
    async searchCustomers() {
      if (!this.searchQuery) {
        this.fetchCustomers();
        return;
      }
      
      this.isLoading = true;
      try {
        const response = await api.get(`/api/resource/Customer`, {
          headers: this.getAuthHeaders(),
          params: {
            fields: JSON.stringify(['customer_name', 'customer_type', 'customer_group', 'territory']),
            filters: JSON.stringify([
              ['customer_name', 'like', `%${this.searchQuery}%`]
            ])
          }
        });
        
        this.customers = response.data.data;
        this.totalCustomers = response.data.total_count || response.data.data.length;
        this.currentPage = 1;
      } catch (error) {
        console.error('Error searching customers:', error);
        alert('Failed to search customers. Check console for details.');
      } finally {
        this.isLoading = false;
      }
    },
    
    async createCustomer() {
      this.isCreating = true;
      try {
        await api.post(
          `/api/resource/Customer`,
          JSON.stringify(this.newCustomer)
          
        );
        
        alert('Customer created successfully!');
        this.newCustomer = {
          customer_name: '',
          customer_type: 'Company',
          customer_group: 'Commercial',
          territory: 'United States'
        };
        this.fetchCustomers();
      } catch (error) {
        console.error('Error creating customer:', error);
        alert('Failed to create customer. Check console for details.');
      } finally {
        this.isCreating = false;
      }
    },
    
    editCustomer(customer) {
      // In a real implementation, you might open a modal or navigate to an edit page
      this.newCustomer = {
        customer_name: customer.customer_name,
        customer_type: customer.customer_type,
        customer_group: customer.customer_group,
        territory: customer.territory
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    async deleteCustomer(customerName) {
      if (!confirm('Are you sure you want to delete this customer?')) return;
      
      try {
        await api.delete(
          `/api/resource/Customer/${customerName}`
        
        );
        
        alert('Customer deleted successfully!');
        this.fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer. Check console for details.');
      }
    },
    
    goToPage(page) {
      this.currentPage = page;
      this.fetchCustomers();
    }
  }
};
</script>

<style scoped>
.customer-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.customer-form, .customer-list {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.pagination button.active {
  background: #333;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #666;
}

.list-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.list-controls input {
  width: 300px;
  margin-left: 10px;
}
</style>