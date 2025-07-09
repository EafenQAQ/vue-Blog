<template>
  <nav id="NavBar">
    <router-link to="/">主页</router-link>
    <router-link to="/publish">发布</router-link>
  </nav>
</template>

<script setup>

</script>

<style scoped>
a {
  /* 去除默认样式 */
  text-decoration: none;
  color: inherit;
  /* 字体样式 */
  font-size: 1.2em;
  font-weight: 600;
  /* 颜色 */
  color: var(--base-accent-2);
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

/* 激活效果 */
a.router-link-exact-active {
  color: white;
  background-color: var(--secondary-accent);

  /* 过渡效果 */
  transition: all 0.3s ease;

}
/* 导航栏右对齐 */
#NavBar {
  display: flex;
  justify-content: flex-end;
}


</style>
