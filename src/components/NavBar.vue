<template>
  <nav id="NavBar">
    <router-link to="/">主页</router-link>
    <router-link to="/publish">发布</router-link>
  </nav>
</template>

<script setup>

</script>

<style scoped>
/* 导航栏容器 */
#NavBar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md) 0;
  border-bottom: 2px solid var(--base-light);
}

/* 导航链接样式 */
a {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--base-accent-2);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 链接悬停效果 */
a:hover {
  color: var(--base-accent);
  background-color: var(--base-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* 激活状态样式 */
a.router-link-exact-active {
  color: white;
  background: linear-gradient(135deg, var(--secondary-accent), var(--secondary-color));
  box-shadow: var(--shadow-md);
}

a.router-link-exact-active:hover {
  background: linear-gradient(135deg, var(--base-accent), var(--base-color));
  transform: translateY(-2px);
}

/* 链接光泽效果 */
a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

a:hover::before {
  left: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #NavBar {
    justify-content: center;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-sm) 0;
  }

  a {
    font-size: var(--font-base);
    padding: var(--spacing-xs) var(--spacing-md);
  }
}

@media (max-width: 480px) {
  #NavBar {
    flex-direction: column;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  a {
    width: 100%;
    text-align: center;
    font-size: var(--font-sm);
    padding: var(--spacing-sm);
  }
}
</style>
