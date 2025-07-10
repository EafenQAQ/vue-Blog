<template>
  <div>
    <main>
      <h1>
        <span>猫爪博客</span>
        <span>
          <svg t="1752130758764" class="icon" viewBox="0 0 1304 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6253" width="48" height="48"><path d="M36.66666666 448.53771062a165.74755953 140.89399541 90 1 0 281.78799178 0 165.74755953 140.89399541 90 1 0-281.78799178 0Z" fill="#ffd200" p-id="6254"></path><path d="M1087.04090506 747.12063322a135.92328297 165.74755953 12.07 1 0 69.31780671-324.16670937 135.92328297 165.74755953 12.07 1 0-69.31780671 324.16670937Z" fill="#ffd200" p-id="6255"></path><path d="M337.36979121 201.03049631a185.03049631 144.83628477 90 1 0 289.67257053 0 185.03049631 144.83628477 90 1 0-289.67257053 0Z" fill="#ffd200" p-id="6256"></path><path d="M855.44600527 433.63750153a144.83628477 185.03049631 6.71 1 0 43.2394355-367.52617687 144.83628477 185.03049631 6.71 1 0-43.2394355 367.52617687Z" fill="#ffd200" p-id="6257"></path><path d="M948.00863919 777.46177106c-10.36993497 157.00596156-161.976674 241.2509716-341.3508425 229.33840204s-318.63982691-115.18341206-308.52699722-272.27507604 167.89010806-256.67732141 343.57909247-262.93356315c181.68812087 36.50902841 316.66868223 148.77857416 306.29874725 305.87023715z" fill="#ffd200" p-id="6258"></path></svg>
        </span>
      </h1>
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
