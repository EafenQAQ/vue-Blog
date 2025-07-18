<template>
  <div id="PostList">
    <h2>文章列表</h2>
    
    <!-- 文章详情 -->
    <div class="postList" v-for="post in posts" :key="post.id">
      <SinglePost :post="post" :sourceType=sourceType />
    </div>



  </div>
</template>

<script setup>
import SinglePost from '@/components/SinglePost.vue';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  sourceType: {
    type: String,
    required: false
  }
});


</script>

<style scoped>
/* 文章列表容器 */
#PostList {
  margin: 0 auto;
  width: 100%;
}

/* 列表标题 */
#PostList h2 {
  color: var(--base-accent-2);
  font-size: var(--font-3xl);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  position: relative;
}
/*
标题装饰线
#PostList h2::after {
  content: '';
  position: absolute;
  bottom: -var(--spacing-sm);
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color));
  border-radius: 1px;
} */

/* 文章列表 */
.postList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #PostList h2 {
    font-size: var(--font-2xl);
    margin-bottom: var(--spacing-lg);
  }

  .postList {
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  #PostList h2 {
    font-size: var(--font-xl);
    margin-bottom: var(--spacing-md);
  }

  .postList {
    gap: var(--spacing-sm);
  }
}
</style>
