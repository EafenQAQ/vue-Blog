<template>
  <div id="Home">
    <h1>猫爪博客</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>

    <div class="palette">
      <div class="palette-item" style="background-color: var(--base-color);">base-color</div>
      <div class="palette-item" style="background-color: var(--base-light);">base-light</div>
      <div class="palette-item" style="background-color: var(--base-accent);">base-accent</div>
      <div class="palette-item" style="background-color: var(--secondary-color);">secondary-color</div>
      <div class="palette-item" style="background-color: var(--secondary-light);">secondary-light</div>
      <div class="palette-item" style="background-color: var(--secondary-accent);">secondary-accent</div>

    </div>

  </div>
</template>

<script setup>
import PostList from '@/components/PostList.vue';
import getPosts from '@/composables/getPosts';

const { posts, error, load } = getPosts();

load();




</script>

<style scoped>
.palette {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.palette-item {
  flex: 1;
  padding: 20px;
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
