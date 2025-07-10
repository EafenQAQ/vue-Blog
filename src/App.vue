<template>
  <div>
    <main>
      <h1>猫爪博客🐾</h1>
      <NavBar />
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';


</script>

<style scoped>
/* 应用根容器 */
div {
  min-height: 100vh;
  background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
}

/* 主内容区域 */
main {
  position: relative;
}

/* 主标题样式 */
main>h1 {
  background: linear-gradient(135deg, var(--base-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 主标题装饰 */
/* main>h1::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color));
  border-radius: 2px;
} */

/* 响应式设计 */
@media (max-width: 768px) {
  main>h1 {
    font-size: var(--font-3xl);
  }
}

@media (max-width: 480px) {
  main>h1 {
    font-size: var(--font-2xl);
  }
}
</style>
