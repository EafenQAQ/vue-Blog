<template>
  <div id="Home">
    <h1>猫爪博客</h1>
    <main>
     <PostList :posts="posts" />
    </main>
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
import { onMounted, ref } from 'vue';

const posts = ref([]);
// 获取文章数据
const getPost = async () => {
  const uri = 'http://localhost:3002/posts';

  try {
    const res = await fetch(uri);
    if (!res.ok) {
      throw new Error('网络错误');
    }
    const data = await res.json();
    console.log('获取文章数据:', data);

    posts.value = data;
  } catch (error) {
    console.error('获取文章数据失败:', error);
  }
}

onMounted(() => {
  getPost();
});



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
