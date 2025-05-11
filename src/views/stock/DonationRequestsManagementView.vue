<!-- <template>
  <div class="donation-requests-container">
    <div class="card">
      <div class="card-header bg-white border-bottom-0">
        <h4 class="mb-0">Donation Requests Management</h4>
        <p class="text-muted mb-0">Review and process donor requests</p>
      </div>

      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-4">
            <label class="form-label">Status Filter</label>
            <select v-model="statusFilter" class="form-select">
              <option value="">All Statuses</option>
              <option value="1">New</option>
              <option value="2">Tested</option>
              <option value="3">Completed</option>
              <option value="4">Rejected</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Blood Type</label>
            <select v-model="bloodTypeFilter" class="form-select">
              <option value="">All Types</option>
              <option
                v-for="type in bloodTypes"
                :value="type.value"
                :key="type.id"
              >
                {{ type.label }}
              </option>
            </select>
          </div>
          <div class="col-md-4 d-flex align-items-end">
            <button @click="resetFilters" class="btn btn-outline-secondary">
              <i class="ri-refresh-line me-1"></i> Reset
            </button>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading requests...</p>
        </div>

        <div v-if="error" class="alert alert-danger">
          <i class="ri-error-warning-line me-2"></i>
          {{ error }}
          <button
            @click="fetchRequests"
            class="btn btn-sm btn-outline-danger ms-3"
          >
            Retry
          </button>
        </div>

        <div
          v-if="!isLoading && !error && filteredRequests.length === 0"
          class="text-center py-5"
        >
          <i class="ri-inbox-line display-4 text-muted"></i>
          <h5 class="mt-3">No donation requests found</h5>
          <p class="text-muted">
            Try adjusting your filters or check back later
          </p>
        </div>

        <div
          v-if="!isLoading && filteredRequests.length > 0"
          class="table-responsive"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Blood Type</th>
                <th>Request Date</th>
                <th>Blood Stock</th>
                <th>Quantity (ml)</th>
                <th>Status</th>
                <th>Test Result</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in filteredRequests" :key="request.id">
                <td>
                  <router-link
                    :to="`/donors/${request.donor.id}`"
                    class="text-primary"
                  >
                    {{ request.donor.name }}
                  </router-link>
                </td>
                <td>
                  <span
                    class="badge"
                    :class="`bg-${getBloodTypeColor(request.blood_type)}`"
                  >
                    {{ request.blood_type || "Not specified" }}
                  </span>
                </td>
                <td>{{ formatDate(request.donation_date) }}</td>
                <td>{{ request.blood_stock.name }}</td>
                <td>{{ request.quantity }}</td>
                <td>
                  <span
                    class="badge"
                    :class="`bg-${getStatusColor(request.status)}`"
                  >
                    {{ getStatusLabel(request.status) }}
                  </span>
                </td>
                <td>
                  <span
                    v-if="request.virus_test_result !== null"
                    :class="
                      request.virus_test_result ? 'text-success' : 'text-danger'
                    "
                  >
                    <i
                      :class="
                        request.virus_test_result
                          ? 'ri-checkbox-circle-line'
                          : 'ri-close-circle-line'
                      "
                    ></i>
                    {{ request.virus_test_result ? "Negative" : "Positive" }}
                  </span>
                  <span v-else class="text-muted">Not tested</span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <button
                      @click="openTestModal(request)"
                      class="btn btn-sm btn-outline-primary"
                      :disabled="request.status !== '1'"
                      :title="
                        request.status !== '1'
                          ? 'Only available for new requests'
                          : 'Process test'
                      "
                    >
                      <i class="ri-flask-line"></i> Test
                    </button>

                    <button
                      @click="processDonation(request)"
                      class="btn btn-sm btn-outline-success"
                      :disabled="
                        request.status !== '2' || !request.virus_test_result
                      "
                      :title="
                        request.status !== '2'
                          ? 'Only available after testing'
                          : !request.virus_test_result
                          ? 'Cannot accept positive test results'
                          : 'Process donation'
                      "
                    >
                      <i class="ri-drop-line"></i> Donate
                    </button>

                    <button
                      @click="rejectRequest(request)"
                      class="btn btn-sm btn-outline-danger"
                      :disabled="
                        request.status === '3' || request.status === '4'
                      "
                      :title="
                        request.status === '3' || request.status === '4'
                          ? 'Cannot reject completed/rejected requests'
                          : 'Reject request'
                      "
                    >
                      <i class="ri-close-line"></i> Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="text-muted">
              Showing {{ filteredRequests.length }} of
              {{ requests.length }} requests
            </div>
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="currentPage--">
                    Previous
                  </button>
                </li>
                <li
                  v-for="page in totalPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: currentPage === page }"
                >
                  <button class="page-link" @click="currentPage = page">
                    {{ page }}
                  </button>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <button class="page-link" @click="currentPage++">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showTestModal"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Process Test Result</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeTestModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Test Result</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="testResult"
                  id="testNegative"
                  value="true"
                />
                <label class="form-check-label text-success" for="testNegative">
                  Negative (Acceptable)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="testResult"
                  id="testPositive"
                  value="false"
                />
                <label class="form-check-label text-danger" for="testPositive">
                  Positive (Reject)
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Expiration Date</label>
              <input
                type="date"
                class="form-control"
                v-model="expirationDate"
                :min="minExpirationDate"
              />
              <small class="text-muted"
                >Blood will expire after this date</small
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeTestModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitTestResult"
              :disabled="!testResult || !expirationDate"
            >
              Submit Result
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { axiosBusiness } from "@/plugins/axios/axiosBusiness";
export default {
  name: "DonationRequestsManagementView",
  data() {
    return {
      requests: [],
      isLoading: false,
      error: null,
      statusFilter: "",
      bloodTypeFilter: "",
      currentPage: 1,
      itemsPerPage: 10,
      showTestModal: false,
      testResult: null,
      expirationDate: null,
      selectedRequest: null,
      bloodTypes: [
        { id: 1, value: "A+", label: "A+" },
        { id: 2, value: "A-", label: "A-" },
        { id: 3, value: "B+", label: "B+" },
        { id: 4, value: "B-", label: "B-" },
        { id: 5, value: "AB+", label: "AB+" },
        { id: 6, value: "AB-", label: "AB-" },
        { id: 7, value: "O+", label: "O+" },
        { id: 8, value: "O-", label: "O-" },
      ],
    };
  },
  computed: {
    filteredRequests() {
      let filtered = this.requests;

      // Apply status filter
      if (this.statusFilter) {
        filtered = filtered.filter((r) => r.status === this.statusFilter);
      }

      if (this.bloodTypeFilter) {
        filtered = filtered.filter(
          (r) => r.blood_type === this.bloodTypeFilter
        );
      }

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    },
    minExpirationDate() {
      return format(new Date(), "yyyy-MM-dd");
    },
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axiosBusiness.get("donors/");
        this.requests = response.data;
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        this.error =
          err.response?.data?.message ||
          "Failed to load donation requests. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      return format(new Date(dateString), "MMM dd, yyyy");
    },
    getStatusLabel(status) {
      switch (status) {
        case "1":
          return "New";
        case "2":
          return "Tested";
        case "3":
          return "Completed";
        case "4":
          return "Rejected";
        default:
          return "Unknown";
      }
    },
    getStatusColor(status) {
      switch (status) {
        case "1":
          return "info";
        case "2":
          return "warning";
        case "3":
          return "success";
        case "4":
          return "danger";
        default:
          return "secondary";
      }
    },
    getBloodTypeColor(type) {
      if (!type) return "secondary";
      return type.includes("+") ? "danger" : "primary";
    },
    resetFilters() {
      this.statusFilter = "";
      this.bloodTypeFilter = "";
      this.currentPage = 1;
    },
    openTestModal(request) {
      this.selectedRequest = request;
      this.testResult = null;
      this.expirationDate = null;
      this.showTestModal = true;
    },
    closeTestModal() {
      this.showTestModal = false;
      this.selectedRequest = null;
    },
    async submitTestResult() {
      try {
        await axiosBusiness.patch(
          `donors/donation-requests/${this.selectedRequest.id}`,
          {
            virus_test_result: this.testResult,
            expiration_date: this.expirationDate,
            status: "2", // Mark as tested
          }
        );
        this.fetchRequests();
        this.closeTestModal();
      } catch (err) {
        console.error("Failed to submit test result:", err);
        alert(err.response?.data?.message || "Failed to update test result");
      }
    },
    async processDonation(request) {
      if (
        !confirm(
          `Confirm that ${request.donor.user.first_name} has completed the donation?`
        )
      )
        return;

      try {
        await axiosBusiness.patch(`/api/donation-requests/${request.id}/`, {
          status: "3", 
        });
        this.fetchRequests();
      } catch (err) {
        console.error("Failed to process donation:", err);
        alert(err.response?.data?.message || "Failed to process donation");
      }
    },
    async rejectRequest(request) {
      if (
        !confirm(`Reject ${request.donor.user.first_name}'s donation request?`)
      )
        return;

      try {
        await axiosBusiness.patch(`/api/donation-requests/${request.id}/`, {
          status: "4", 
        });
        this.fetchRequests();
      } catch (err) {
        console.error("Failed to reject request:", err);
        alert(err.response?.data?.message || "Failed to reject request");
      }
    },
  },
};
</script>

<style scoped>
.donation-requests-container {
  padding: 20px;
  margin-top: 20px;
}
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35em 0.65em;
}

.bg-info {
  background-color: #0dcaf0 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
  color: #212529;
}

.bg-success {
  background-color: #198754 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.bg-primary {
  background-color: #0d6efd !important;
}

.bg-secondary {
  background-color: #6c757d !important;
}

.table th,
.table td {
  vertical-align: middle;
}

.modal {
  z-index: 1050; 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-content {
  z-index: 1051;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}
.modal.fade.show {
  display: block !important;
  background: rgba(0, 0, 0, 0.5) !important;
}
</style> -->
<template>
    <div class="donation-requests-container">
      <div class="card">
        <div class="card-header bg-white border-bottom-0">
          <h4 class="mb-0">Donation Requests Management</h4>
          <p class="text-muted mb-0">Review and process donor requests</p>
        </div>
  
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-md-4">
              <label class="form-label">Status Filter</label>
              <select v-model="statusFilter" class="form-select">
                <option value="">All Statuses</option>
                <option value="1">New</option>
                <option value="2">Tested</option>
                <option value="3">Completed</option>
                <option value="4">Rejected</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Blood Type</label>
              <select v-model="bloodTypeFilter" class="form-select">
                <option value="">All Types</option>
                <option
                  v-for="type in bloodTypes"
                  :value="type.value"
                  :key="type.id"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>
            <div class="col-md-4 d-flex align-items-end">
              <button @click="resetFilters" class="btn btn-outline-secondary">
                <i class="ri-refresh-line me-1"></i> Reset
              </button>
            </div>
          </div>
  
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading requests...</p>
          </div>
  
          <div v-if="error" class="alert alert-danger">
            <i class="ri-error-warning-line me-2"></i>
            {{ error }}
            <button
              @click="fetchRequests"
              class="btn btn-sm btn-outline-danger ms-3"
            >
              Retry
            </button>
          </div>
  
          <div
            v-if="!isLoading && !error && filteredRequests.length === 0"
            class="text-center py-5"
          >
            <i class="ri-inbox-line display-4 text-muted"></i>
            <h5 class="mt-3">No donation requests found</h5>
            <p class="text-muted">
              Try adjusting your filters or check back later
            </p>
          </div>
  
          <div
            v-if="!isLoading && filteredRequests.length > 0"
            class="table-responsive"
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Blood Type</th>
                  <th>Request Date</th>
                  <th>Blood Stock</th>
                  <th>Quantity (ml)</th>
                  <th>Status</th>
                  <th>Test Result</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="request in filteredRequests" :key="request.id">
                  <td>
                    <router-link
                      :to="`/donors/${request.donor.id}`"
                      class="text-primary"
                    >
                      {{ request.donor.name }}
                    </router-link>
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="`bg-${getBloodTypeColor(request.blood_type)}`"
                    >
                      {{ request.blood_type || "Not specified" }}
                    </span>
                  </td>
                  <td>{{ formatDate(request.donation_date) }}</td>
                  <td>{{ request.blood_stock.name }}</td>
                  <td>{{ request.quantity }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="`bg-${getStatusColor(request.status)}`"
                    >
                      {{ getStatusLabel(request.status) }}
                    </span>
                  </td>
                  <td>
                    <span
                      v-if="request.virus_test_result !== null"
                      :class="
                        request.virus_test_result ? 'text-success' : 'text-danger'
                      "
                    >
                      <i
                        :class="
                          request.virus_test_result
                            ? 'ri-checkbox-circle-line'
                            : 'ri-close-circle-line'
                        "
                      ></i>
                      {{ request.virus_test_result ? "Negative" : "Positive" }}
                    </span>
                    <span v-else class="text-muted">Not tested</span>
                  </td>
                  <td>
                    <div class="d-flex gap-2">
                      <button
                        @click="openTestModal(request)"
                        class="btn btn-sm btn-outline-primary"
                        :disabled="request.status !== '1'"
                        :title="
                          request.status !== '1'
                            ? 'Only available for new requests'
                            : 'Process test'
                        "
                      >
                        <i class="ri-flask-line"></i> Test
                      </button>
  
                      <button
                        @click="openDonationModal(request)"
                        class="btn btn-sm btn-outline-success"
                        :disabled="
                          request.status !== '2' || !request.virus_test_result
                        "
                        :title="
                          request.status !== '2'
                            ? 'Only available after testing'
                            : !request.virus_test_result
                            ? 'Cannot accept positive test results'
                            : 'Process donation'
                        "
                      >
                        <i class="ri-drop-line"></i> Donate
                      </button>
  
                      <button
                        @click="rejectRequest(request)"
                        class="btn btn-sm btn-outline-danger"
                        :disabled="
                          request.status === '3' || request.status === '4'
                        "
                        :title="
                          request.status === '3' || request.status === '4'
                            ? 'Cannot reject completed/rejected requests'
                            : 'Reject request'
                        "
                      >
                        <i class="ri-close-line"></i> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div class="text-muted">
                Showing {{ filteredRequests.length }} of
                {{ requests.length }} requests
              </div>
              <nav>
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="currentPage--">
                      Previous
                    </button>
                  </li>
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: currentPage === page }"
                  >
                    <button class="page-link" @click="currentPage = page">
                      {{ page }}
                    </button>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                  >
                    <button class="page-link" @click="currentPage++">Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Test Result Modal -->
      <div
        v-if="showTestModal"
        class="modal fade show"
        style="display: block; background: rgba(0, 0, 0, 0.5)"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Process Test Result</h5>
              <button
                type="button"
                class="btn-close"
                @click="closeTestModal"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Test Result</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="testResult"
                    id="testNegative"
                    value="true"
                  />
                  <label class="form-check-label text-success" for="testNegative">
                    Negative (Acceptable)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="testResult"
                    id="testPositive"
                    value="false"
                  />
                  <label class="form-check-label text-danger" for="testPositive">
                    Positive (Reject)
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Expiration Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="expirationDate"
                  :min="minExpirationDate"
                />
                <small class="text-muted"
                  >Blood will expire after this date</small
                >
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeTestModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="submitTestResult"
                :disabled="!testResult || !expirationDate"
              >
                Submit Result
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Donation Completion Modal -->
      <div
        v-if="showDonationModal"
        class="modal fade show"
        style="display: block; background: rgba(0, 0, 0, 0.5)"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Complete Donation Process</h5>
              <button
                type="button"
                class="btn-close"
                @click="closeDonationModal"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitDonation">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Blood Type <span class="text-danger">*</span></label>
                    <select v-model="donationData.blood_type" class="form-select" required>
                      <option value="">Select Blood Type</option>
                      <option v-for="type in bloodTypes" :key="type.id" :value="type.value">
                        {{ type.label }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Donation Date <span class="text-danger">*</span></label>
                    <input type="date" class="form-control" v-model="donationData.donation_date" required>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Quantity (ml) <span class="text-danger">*</span></label>
                    <input type="number" class="form-control" v-model="donationData.quantity" min="100" max="500" step="10" required>
                    <small class="text-muted">Typically between 450-500ml</small>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Blood Stock</label>
                    <input type="text" class="form-control" :value="selectedDonationRequest?.blood_stock?.name" disabled>
                  </div>
                  
                  <div class="col-12 mb-3">
                    <label class="form-label">Notes</label>
                    <textarea class="form-control" v-model="donationData.note" rows="3"></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeDonationModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="submitDonation"
              >
                <i class="ri-check-line me-1"></i> Complete Donation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { format } from "date-fns";
  import { axiosBusiness } from "@/plugins/axios/axiosBusiness";
  
  export default {
    name: "DonationRequestsManagementView",
    data() {
      return {
        requests: [],
        isLoading: false,
        error: null,
        statusFilter: "",
        bloodTypeFilter: "",
        currentPage: 1,
        itemsPerPage: 10,
        showTestModal: false,
        testResult: null,
        expirationDate: null,
        showDonationModal: false,
        donationData: {
          blood_type: '',
          donation_date: format(new Date(), 'yyyy-MM-dd'),
          quantity: 450,
          note: ''
        },
        selectedRequest: null,
        selectedDonationRequest: null,
        bloodTypes: [
          { id: 1, value: "A+", label: "A+" },
          { id: 2, value: "A-", label: "A-" },
          { id: 3, value: "B+", label: "B+" },
          { id: 4, value: "B-", label: "B-" },
          { id: 5, value: "AB+", label: "AB+" },
          { id: 6, value: "AB-", label: "AB-" },
          { id: 7, value: "O+", label: "O+" },
          { id: 8, value: "O-", label: "O-" },
        ],
      };
    },
    computed: {
      filteredRequests() {
        let filtered = this.requests;
  
        if (this.statusFilter) {
          filtered = filtered.filter((r) => r.status === this.statusFilter);
        }
  
        if (this.bloodTypeFilter) {
          filtered = filtered.filter(
            (r) => r.blood_type === this.bloodTypeFilter
          );
        }
  
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return filtered.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
      },
      minExpirationDate() {
        return format(new Date(), "yyyy-MM-dd");
      },
    },
    created() {
      this.fetchRequests();
    },
    methods: {
      async fetchRequests() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await axiosBusiness.get("donors/");
          this.requests = response.data;
        } catch (err) {
          console.error("Failed to fetch requests:", err);
          this.error =
            err.response?.data?.message ||
            "Failed to load donation requests. Please try again later.";
        } finally {
          this.isLoading = false;
        }
      },
      formatDate(dateString) {
        return format(new Date(dateString), "MMM dd, yyyy");
      },
      getStatusLabel(status) {
        switch (status) {
          case "1":
            return "New";
          case "2":
            return "Tested";
          case "3":
            return "Completed";
          case "4":
            return "Rejected";
          default:
            return "Unknown";
        }
      },
      getStatusColor(status) {
        switch (status) {
          case "1":
            return "info";
          case "2":
            return "warning";
          case "3":
            return "success";
          case "4":
            return "danger";
          default:
            return "secondary";
        }
      },
      getBloodTypeColor(type) {
        if (!type) return "secondary";
        return type.includes("+") ? "danger" : "primary";
      },
      resetFilters() {
        this.statusFilter = "";
        this.bloodTypeFilter = "";
        this.currentPage = 1;
      },
      openTestModal(request) {
        this.selectedRequest = request;
        this.testResult = null;
        this.expirationDate = null;
        this.showTestModal = true;
      },
      closeTestModal() {
        this.showTestModal = false;
        this.selectedRequest = null;
      },
      async submitTestResult() {
        try {
          await axiosBusiness.patch(
            `donors/donation-requests/${this.selectedRequest.id}`,
            {
              virus_test_result: this.testResult,
              expiration_date: this.expirationDate,
              status: "2", // Mark as tested
            }
          );
          this.fetchRequests();
          this.closeTestModal();
        } catch (err) {
          console.error("Failed to submit test result:", err);
          alert(err.response?.data?.message || "Failed to update test result");
        }
      },
      openDonationModal(request) {
        this.selectedDonationRequest = request;
        this.donationData = {
          blood_type: request.blood_type || '',
          donation_date: format(new Date(), 'yyyy-MM-dd'),
          quantity: request.quantity || 450,
          note: request.note || ''
        };
        this.showDonationModal = true;
      },
      closeDonationModal() {
        this.showDonationModal = false;
        this.selectedDonationRequest = null;
      },
      async submitDonation() {
        try {
          if (!this.donationData.blood_type || !this.donationData.donation_date || !this.donationData.quantity) {
            alert('Please fill all required fields');
            return;
          }
          
          const quantity = parseFloat(this.donationData.quantity);
          if (isNaN(quantity) ){
            alert('Please enter a valid quantity');
            return;
          }
  
          await axiosBusiness.patch(
            `donors/donation-requests/${this.selectedDonationRequest.id}/complete/`, 
            {
              blood_type: this.donationData.blood_type,
              donation_date: this.donationData.donation_date,
              quantity: quantity,
              note: this.donationData.note,
              status: "3" // Mark as completed
            }
          );
          
          this.fetchRequests();
          this.closeDonationModal();
          alert('Donation completed successfully!');
        } catch (err) {
          console.error('Failed to complete donation:', err);
          alert(err.response?.data?.message || 'Failed to complete donation');
        }
      },
      async rejectRequest(request) {
        if (
          !confirm(`Reject ${request.donor.user.first_name}'s donation request?`)
        )
          return;
  
        try {
          await axiosBusiness.patch(`/api/donation-requests/${request.id}/`, {
            status: "4", 
          });
          this.fetchRequests();
        } catch (err) {
          console.error("Failed to reject request:", err);
          alert(err.response?.data?.message || "Failed to reject request");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .donation-requests-container {
    padding: 20px;
    margin-top: 20px;
  }
  .badge {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.35em 0.65em;
  }
  
  .bg-info {
    background-color: #0dcaf0 !important;
  }
  
  .bg-warning {
    background-color: #ffc107 !important;
    color: #212529;
  }
  
  .bg-success {
    background-color: #198754 !important;
  }
  
  .bg-danger {
    background-color: #dc3545 !important;
  }
  
  .bg-primary {
    background-color: #0d6efd !important;
  }
  
  .bg-secondary {
    background-color: #6c757d !important;
  }
  
  .table th,
  .table td {
    vertical-align: middle;
  }
  
  .modal {
    z-index: 1050;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .modal-content {
    z-index: 1051;
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
  .modal.fade.show {
    display: block !important;
    background: rgba(0, 0, 0, 0.5) !important;
  }
  
  .form-label .text-danger {
    color: #dc3545;
  }
  </style>