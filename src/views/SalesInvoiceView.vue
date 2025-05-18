<template>
  <div class="sales-invoice-form">
    <h2>Create Sales Invoice</h2>

    <form @submit.prevent="submitInvoice">
      <!-- Customer Selection -->
      <div class="form-group">
        <label>Customer</label>
        <select v-model="form.customer" required>
          <option value="" disabled>Select Customer</option>
          <option
            v-for="customer in customers"
            :value="customer.name"
            :key="customer.name"
          >
            {{ customer.name }}
          </option>
        </select>
      </div>

      <!-- Invoice Details -->
      <div class="form-group">
        <label>Posting Date</label>
        <input type="date" v-model="form.posting_date" required />
      </div>

      <div class="form-group">
        <label>Due Date</label>
        <input type="date" v-model="form.due_date" required />
      </div>

      <!-- Items Table -->
      <div class="items-table">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index">
              <td>
                <select
                  v-model="item.item_code"
                  @change="updateItemDetails(index)"
                  required
                >
                  <option value="" disabled>Select Item</option>
                  <option
                    v-for="product in items"
                    :value="product.name"
                    :key="product.name"
                  >
                    {{ product.name }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  v-model.number="item.qty"
                  min="1"
                  @input="calculateAmount(index)"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  v-model.number="item.rate"
                  step="0.01"
                  @input="calculateAmount(index)"
                  required
                />
              </td>
              <td>
                {{ item.amount || 0 }}
              </td>
              <td>
                <button
                  type="button"
                  @click="removeItem(index)"
                  class="btn-remove"
                >
                  ×
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" @click="addItem" class="btn-add">Add Item</button>
      </div>

      <!-- Taxes -->
      <div class="form-group">
        <label>Taxes and Charges</label>
        <select v-model="form.taxes" multiple>
          <option v-for="tax in taxes" :value="tax.name" :key="tax.name">
            {{ tax.name }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? "Creating Invoice..." : "Create Invoice" }}
      </button>

      <!-- Status Messages -->
      <div v-if="success" class="alert success">
        Invoice created successfully! Invoice ID: {{ success }}
      </div>
      <div v-if="error" class="alert error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
// import axios from 'axios';
import api from "@/plugins/axios/axiosBusiness";
export default {
  data() {
    return {
      form: {
        customer: "",
        posting_date: new Date().toISOString().slice(0, 10),
        due_date: "",
        items: [
          {
            item_code: "",
            qty: 1,
            rate: 0,
            amount: 0,
          },
        ],
        taxes: [],
      },
      customers: [],
      items: [],
      taxes: [],
      loading: false,
      error: null,
      success: null,
    };
  },
  created() {
    this.fetchCustomers();
    this.fetchItems();
    this.fetchTaxes();
  },
  methods: {
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
    async fetchItems() {
      try {
        const response = await api.get("/api/method/frappe.client.get_list", {
          params: {
            doctype: "Item",
            fields: ["name", "item_name", "standard_rate"],
            filters: [["disabled", "=", 0]],
            limit: 100,
          },
        });
        this.items = response.data.message;
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async fetchTaxes() {
      try {
        const response = await api.get("/api/method/frappe.client.get_list", {
          params: {
            doctype: "Sales Taxes and Charges Template",
            fields: ["name", "taxes.rate"],
            limit: 20,
          },
        });
        this.taxes = response.data.message;
      } catch (error) {
        console.error("Error fetching taxes:", error);
      }
    },
    addItem() {
      this.form.items.push({
        item_code: "",
        qty: 1,
        rate: 0,
        amount: 0,
      });
    },
    removeItem(index) {
      if (this.form.items.length > 1) {
        this.form.items.splice(index, 1);
      }
    },
    updateItemDetails(index) {
      const selectedItem = this.items.find(
        (item) => item.name === this.form.items[index].item_code
      );
      if (selectedItem && selectedItem.standard_rate) {
        this.form.items[index].rate = selectedItem.standard_rate;
        this.calculateAmount(index);
      }
    },
    calculateAmount(index) {
      this.form.items[index].amount =
        this.form.items[index].qty * this.form.items[index].rate;
    },
    async submitInvoice() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        // Prepare the payload for ERPNext API
        const payload = {
          doctype: "Sales Invoice",
          customer: this.form.customer,
          posting_date: this.form.posting_date,
          due_date: this.form.due_date || this.form.posting_date,
          items: this.form.items.map((item) => ({
            item_code: item.item_code,
            qty: item.qty,
            rate: item.rate,
            amount: item.amount,
          })),
          taxes: this.form.taxes.map((tax) => ({
            charge_type: "On Net Total",
            account_head: tax,
            rate: this.taxes.find((t) => t.name === tax)?.taxes?.[0]?.rate || 0,
          })),
        };

        const response = await api.post("/api/method/frappe.client.insert", {
          doc: payload,
        });

        this.success = response.data.message.name;
        this.resetForm();
      } catch (error) {
        console.error("Error creating invoice:", error);
        this.error =
          error.response?.data?.message || "Failed to create invoice";
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        customer: "",
        posting_date: new Date().toISOString().slice(0, 10),
        due_date: "",
        items: [
          {
            item_code: "",
            qty: 1,
            rate: 0,
            amount: 0,
          },
        ],
        taxes: [],
      };
    },
  },
};
</script>

<style scoped>
.sales-invoice-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.items-table {
  margin: 20px 0;
}

.items-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

.items-table th,
.items-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.items-table input,
.items-table select {
  width: 100%;
  padding: 5px;
}

.btn-remove {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.btn-add {
  background: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  background: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
}

.btn-submit:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.alert {
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 15px;
}

.alert.success {
  background: #dff0d8;
  color: #3c763d;
}

.alert.error {
  background: #f2dede;
  color: #a94442;
}
</style>
