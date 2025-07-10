<template>
  <div id="Home">

    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts" />
      <TagsCloud :posts="posts" />
    </div>
    <div v-else>
      <LoadSpinner />
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
import LoadSpinner from '@/components/LoadSpinner.vue';
import PostList from '@/components/PostList.vue';
import TagsCloud from '@/components/TagsCloud.vue';
import getPosts from '@/composables/getPosts';


const { posts, error, load } = getPosts();

load();





</script>

<style scoped>
/* 主页容器 */
#Home {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 主页标题 */
#Home>h1 {
  background: linear-gradient(135deg, var(--base-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  position: relative;
}

/* 标题装饰 */
#Home>h1::after {
  content: '';
  position: absolute;
  bottom: -var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color));
  border-radius: 2px;
}


#Home>div {
  text-align: center;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  color: var(--secondary-accent);
  font-size: var(--font-lg);
  margin: var(--spacing-xl) 0;
}

/* 加载状态样式 */
#Home>div:last-child {
  background: var(--base-light);
  color: var(--base-accent);
}

/* 调色板样式 */
.palette {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.palette-item {
  flex: 1;
  padding: var(--spacing-lg);
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: var(--font-sm);
  transition: all 0.3s ease;
  cursor: pointer;
}

.palette-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  z-index: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #Home>h1 {
    margin-bottom: var(--spacing-xl);
  }

  .palette {
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xl);
  }

  .palette-item {
    padding: var(--spacing-md);
    font-size: var(--font-xs);
  }

  .palette-item:hover {
    transform: none;
  }
}

@media (max-width: 480px) {
  #Home>h1 {
    margin-bottom: var(--spacing-lg);
  }

  .palette {
    margin-top: var(--spacing-lg);
  }

  .palette-item {
    padding: var(--spacing-sm);
  }
}
</style>
