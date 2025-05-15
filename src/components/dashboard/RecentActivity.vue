<template>
  <div class="recent-activity">
    <h3>Recent Activity</h3>
    <ul>
      <li v-for="(item, index) in items" :key="index" class="activity-item">
        <div class="activity-icon">
          <font-awesome-icon :icon="item.icon" />
        </div>
        <div class="activity-content">
          <p>{{ item.description }}</p>
          <span class="activity-time">{{ item.time }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecentActivity',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.recent-activity {
  background: white;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  min-width: 100%;
}

.recent-activity h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.activity-item {
  display: flex;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-content p {
  margin: 0;
  font-size: 14px;
}

.activity-time {
  font-size: 12px;
  color: #888;
}
</style>