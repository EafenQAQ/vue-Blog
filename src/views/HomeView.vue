<template>
  <div id="Home">
    <div class="welcome-section">
      <div class="welcome-icon">
        <svg t="1752130758764" class="icon" viewBox="0 0 1304 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
          <path
            d="M36.66666666 448.53771062a165.74755953 140.89399541 90 1 0 281.78799178 0 165.74755953 140.89399541 90 1 0-281.78799178 0Z"
            fill="#ffd200" p-id="6254"></path>
          <path
            d="M1087.04090506 747.12063322a135.92328297 165.74755953 12.07 1 0 69.31780671-324.16670937 135.92328297 165.74755953 12.07 1 0-69.31780671 324.16670937Z"
            fill="#ffd200" p-id="6255"></path>
          <path
            d="M337.36979121 201.03049631a185.03049631 144.83628477 90 1 0 289.67257053 0 185.03049631 144.83628477 90 1 0-289.67257053 0Z"
            fill="#ffd200" p-id="6256"></path>
          <path
            d="M855.44600527 433.63750153a144.83628477 185.03049631 6.71 1 0 43.2394355-367.52617687 144.83628477 185.03049631 6.71 1 0-43.2394355 367.52617687Z"
            fill="#ffd200" p-id="6257"></path>
          <path
            d="M948.00863919 777.46177106c-10.36993497 157.00596156-161.976674 241.2509716-341.3508425 229.33840204s-318.63982691-115.18341206-308.52699722-272.27507604 167.89010806-256.67732141 343.57909247-262.93356315c181.68812087 36.50902841 316.66868223 148.77857416 306.29874725 305.87023715z"
            fill="#ffd200" p-id="6258"></path>
        </svg>
      </div>
      
      <h1>欢迎来到猫爪博客</h1>
      <p class="subtitle">记录生活，分享点滴</p>
      
      <button class="explore-btn" @click="goToPsych">
        开启探索之旅~
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPsych = () => {
  router.push({ name: 'psych' })
}
</script>

<style scoped>
#Home {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.welcome-section {
  text-align: center;
  padding: var(--spacing-2xl);
}

.welcome-icon {
  margin-bottom: var(--spacing-lg);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

h1 {
  background: linear-gradient(135deg, var(--base-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: var(--font-3xl);
  margin-bottom: var(--spacing-md);
}

.subtitle {
  color: var(--secondary-accent);
  font-size: var(--font-lg);
  margin-bottom: var(--spacing-2xl);
}

.explore-btn {
  background: linear-gradient(135deg, var(--base-color), var(--secondary-color));
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: var(--font-lg);
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  #Home {
    padding: var(--spacing-md);
  }

  .welcome-section {
    padding: var(--spacing-xl);
  }

  h1 {
    font-size: var(--font-2xl);
  }

  .explore-btn {
    padding: var(--spacing-sm) var(--spacing-xl);
    font-size: var(--font-base);
  }
}
</style>
