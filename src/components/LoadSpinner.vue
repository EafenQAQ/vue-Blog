<template>
  <div class="spin"></div>
</template>

<script setup>

</script>

<style scoped>
/* 加载动画容器 */
.spin {
  display: block;
  width: 50px;
  height: 50px;
  margin: var(--spacing-2xl) auto;
  border: 4px solid var(--base-light);
  border-radius: var(--radius-full);
  border-top-color: var(--secondary-accent);
  border-right-color: var(--base-accent);
  animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  position: relative;
}

/* 内部装饰圆 */
.spin::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, var(--base-color), var(--secondary-color));
  border-radius: var(--radius-full);
  animation: pulse 1.5s ease-in-out infinite alternate;
}

/* 旋转动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(0.8);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .spin {
    width: 40px;
    height: 40px;
    margin: var(--spacing-xl) auto;
    border-width: 3px;
  }

  .spin::before {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .spin {
    width: 35px;
    height: 35px;
    margin: var(--spacing-lg) auto;
  }

  .spin::before {
    width: 14px;
    height: 14px;
  }
}
</style>
