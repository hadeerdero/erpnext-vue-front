<!-- <template>
  
  <div class="preloader" id="preloader">
    <div class="preloader">
      <div class="waviy position-relative">
        <span
          class="d-inline-block"
          v-for="(letter, index) in letters"
          :key="index"
          >{{ letter }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreloaderComponent",
  data() {
    return {
      letters: ["T", "R", "E", "Z", "O"], 
    };
  },
};
</script>

<style scoped>


.waviy span {
  animation: wave 1.5s infinite;
}

@keyframes wave {
  0%,
  40%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
}
</style> -->
<template>
  <div class="preloader" id="preloader">
    <div class="preloader">
      <div class="waviy position-relative">
        <span class="d-inline-block">B</span>
        <span class="d-inline-block">L</span>
        <span class="d-inline-block">O</span>
        <span class="d-inline-block">O</span>
        <span class="d-inline-block">D</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreloaderComponent',
  mounted() {
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 1000);
  }
}
</script>

<style scoped>
/* Preloader specific styles */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.waviy {
  display: flex;
  gap: 5px;
}

.waviy span {
  font-size: 2rem;
  font-weight: bold;
  color: #3b7ddd;
  animation: waviy 1s infinite;
  animation-delay: calc(.1s * var(--i));
}

@keyframes waviy {
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-20px)
  }
}
</style>