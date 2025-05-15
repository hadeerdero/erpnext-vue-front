<template>
  <div class="dashboard-card" :class="{ loading }">
    <div class="card-icon">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="card-content">
      <h3>{{ title }}</h3>
      <div class="card-value">{{ formattedValue }}</div>
      <div class="card-trend" :class="trendClass">
        <span v-if="!loading">
          <font-awesome-icon :icon="trendIcon" />
          {{ Math.abs(trend) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: String,
    value: [Number, String],
    icon: String,
    trend: Number,
    loading: Boolean
  },
  computed: {
    formattedValue() {
      if (this.loading) return '--';
      if (typeof this.value === 'number') return this.value.toLocaleString();
      return this.value;
    },
    trendClass() {
      if (this.trend > 0) return 'positive';
      if (this.trend < 0) return 'negative';
      return 'neutral';
    },
    trendIcon() {
      return this.trend > 0 ? 'arrow-up' : 'arrow-down';
    }
  }
};
</script>

<style scoped>
.dashboard-card {
  flex: 1;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-icon {
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3a86ff;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-trend {
  font-size: 12px;
}

.card-trend.positive {
  color: #4caf50;
}

.card-trend.negative {
  color: #f44336;
}

.card-trend.neutral {
  color: #9e9e9e;
}

.dashboard-card.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>