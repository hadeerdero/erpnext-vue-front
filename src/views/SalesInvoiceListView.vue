<template>
  <div class="invoice-list-container">
    <div class="invoice-list-header">
      <h2>Sales Invoices</h2>
      <router-link to="/sales-invoices/new" class="btn-create">
        <span class="material-symbols-outlined">add</span>
        Create New Invoice
      </router-link>
    </div>

    <div class="invoice-list-filters">
      <div class="filter-group">
        <label>Status</label>
        <select v-model="filters.status" @change="fetchInvoices">
          <option value="">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Overdue">Overdue</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div class="filter-group">
        <label>From Date</label>
        <input
          type="date"
          v-model="filters.from_date"
          @change="fetchInvoices"
        />
      </div>

      <div class="filter-group">
        <label>To Date</label>
        <input type="date" v-model="filters.to_date" @change="fetchInvoices" />
      </div>

      <div class="filter-group">
        <label>Customer</label>
        <select v-model="filters.customer" @change="fetchInvoices">
          <option value="">All Customers</option>
          <option
            v-for="customer in customers"
            :value="customer.name"
            :key="customer.name"
          >
            {{ customer.customer_name }}
          </option>
        </select>
      </div>
    </div>

    <div class="invoice-list-table">
      <table>
        <thead>
          <tr>
            <th @click="sortInvoices('name')">Invoice #</th>
            <!-- <th @click="sortInvoices('customer')">Customer</th>
            <th @click="sortInvoices('posting_date')">Date</th>
            <th @click="sortInvoices('due_date')">Due Date</th>
            <th @click="sortInvoices('grand_total')">Amount</th>
            <th @click="sortInvoices('status')">Status</th> -->
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.name">
            <td>{{ invoice.name }}</td>
            <!-- <td>{{ invoice.customer_name }}</td>
            <td>{{ formatDate(invoice.posting_date) }}</td>
            <td :class="{ 'overdue': isOverdue(invoice) }">
              {{ formatDate(invoice.due_date) }}
              <span v-if="isOverdue(invoice)" class="overdue-badge">Overdue</span>
            </td>
            <td>{{ formatCurrency(invoice.grand_total) }}</td>
            <td>
              <span :class="'status-badge status-' + invoice.status.toLowerCase()">
                {{ invoice.status }}
              </span>
            </td> -->
            <td class="actions">
              <button @click="viewInvoice(invoice.name)" class="btn-view">
                <span class="material-symbols-outlined">visibility</span>
              </button>
              <button @click="printInvoice(invoice.name)" class="btn-print">
                <span class="material-symbols-outlined">print</span>
              </button>
              <button
                v-if="invoice.status === 'Draft'"
                @click="editInvoice(invoice.name)"
                class="btn-edit"
              >
                <span class="material-symbols-outlined">edit</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div> -->

      <!-- <div v-if="!loading && invoices.length === 0" class="no-results">
        No invoices found matching your criteria.
      </div> -->

      <div class="pagination" v-if="totalPages > 1">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import api from "@/plugins/axios/axiosBusiness";

export default {
  name: "SalesInvoiceList",
  data() {
    return {
      invoices: [],
      customers: [],
      // loading: false,
      filters: {
        status: "",
        from_date: "",
        to_date: "",
        customer: "",
      },
      sort: {
        field: "posting_date",
        order: "desc",
      },
      pagination: {
        page: 1,
        page_size: 20,
        total: 0,
      },
    };
  },
  computed: {
    currentPage() {
      return this.pagination.page;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.page_size);
    },
  },
  created() {
    this.fetchInvoices();
    this.fetchCustomers();
  },
  methods: {
    async fetchInvoices() {
      // this.loading = true;
      try {
        const params = {
          doctype: "Sales Invoice",
          fields: [
            "name",
            "customer",
            "customer_name",
            "posting_date",
            "due_date",
            "grand_total",
            "status",
            "outstanding_amount",
          ],
          limit_start: (this.currentPage - 1) * this.pagination.page_size,
          limit_page_length: this.pagination.page_size,
          order_by: `${this.sort.field} ${this.sort.order}`,
        };

        // Add filters
        if (this.filters.status) {
          params.filters = [["status", "=", this.filters.status]];
        }
        if (this.filters.from_date) {
          params.filters = params.filters || [];
          params.filters.push(["posting_date", ">=", this.filters.from_date]);
        }
        if (this.filters.to_date) {
          params.filters = params.filters || [];
          params.filters.push(["posting_date", "<=", this.filters.to_date]);
        }
        if (this.filters.customer) {
          params.filters = params.filters || [];
          params.filters.push(["customer", "=", this.filters.customer]);
        }
        // http://138.199.220.5:8001
        // const api = axios.create({
        //   // baseURL: ' http://138.199.220.5:8001'  // or your full base URL like 'https://yourdomain.com/api'
        //   baseURL: "http://172.29.82.206:8000",
        // });
        const response = await api.get("/api/method/frappe.client.get_list", {
          params,
        });
        console.log("Invoices response:", response);

        this.invoices = response.data.message;
        this.pagination.total =
          response.data.total || response.data.message.length;
      } catch (error) {
        console.error("Error fetching invoices:", error);
        this.$toast.error("Failed to load invoices");
      } finally {
        // this.loading = false;
      }
    },
    async fetchCustomers() {
      try {
        const response = await api.get("/api/method/frappe.client.get_list", {
          params: {
            doctype: "Customer",
            fields: ["name", "customer_name"],
            limit: 100,
          },
        });
        this.customers = response.data.message;
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    sortInvoices(field) {
      if (this.sort.field === field) {
        this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
      } else {
        this.sort.field = field;
        this.sort.order = "desc";
      }
      this.fetchInvoices();
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.pagination.page = page;
        this.fetchInvoices();
      }
    },
    viewInvoice(invoiceName) {
      this.$router.push(`/sales-invoices/${invoiceName}`);
    },
    editInvoice(invoiceName) {
      this.$router.push(`/sales-invoices/${invoiceName}/edit`);
    },
    async printInvoice(invoiceName) {
      try {
        const printUrl = `/api/method/frappe.utils.print_format.download_pdf?doctype=Sales%20Invoice&name=${invoiceName}&format=Standard&no_letterhead=0`;
        window.open(printUrl, "_blank");
      } catch (error) {
        console.error("Error printing invoice:", error);
        this.$toast.error("Failed to print invoice");
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString();
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
    isOverdue(invoice) {
      if (invoice.status !== "Unpaid") return false;
      if (!invoice.due_date) return false;
      return new Date(invoice.due_date) < new Date();
    },
  },
};
</script>

<style scoped>
.invoice-list-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.invoice-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-create {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
}

.invoice-list-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14px;
}

.filter-group select,
.filter-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.invoice-list-table {
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #f1f3f5;
}

tr:hover {
  background-color: #f8f9fa;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-draft {
  background-color: #fff3cd;
  color: #856404;
}

.status-paid {
  background-color: #d4edda;
  color: #155724;
}

.status-unpaid {
  background-color: #f8d7da;
  color: #721c24;
}

.status-overdue {
  background-color: #f8d7da;
  color: #721c24;
}

.status-cancelled {
  background-color: #d6d8d9;
  color: #1b1e21;
}

.overdue {
  color: #dc3545;
  font-weight: 500;
}

.overdue-badge {
  margin-left: 5px;
  padding: 2px 6px;
  background-color: #dc3545;
  color: white;
  border-radius: 10px;
  font-size: 10px;
}

.actions {
  display: flex;
  gap: 5px;
}

.actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.actions button:hover {
  background: #f1f3f5;
}

.btn-view {
  color: #17a2b8;
}

.btn-print {
  color: #6c757d;
}

.btn-edit {
  color: #ffc107;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #6c757d;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-top: 1px solid #eee;
}

.pagination button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background: #f1f3f5;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  font-size: 18px;
}
</style>
