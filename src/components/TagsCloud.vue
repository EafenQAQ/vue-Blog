<template>
  <div id="TagsCloud">
    <div class="pill" v-for="tag in tags" :key="tag">
      <RouterLink :to="{ name: 'tag', params: { tag: tag }, query: { source: sourceType } }"># {{ tag }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import useTags from '@/composables/useTags';

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

const { tags } = useTags(props.posts);

</script>

<style scoped>
/* 标签云容器 */
#TagsCloud {
  background: white;
  background-color: hsl(from var(--secondary-light) h s l / 0.3);
  height: fit-content;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--base-light);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: var(--spacing-xl);
  transition: all 0.3s ease;
}

/* 标签云悬停效果 */
#TagsCloud:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* 标签云标题 */
#TagsCloud::before {
  content: '🏷️ 标签云';
  display: block;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--base-accent-2);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

/* 标签样式调整 */
#TagsCloud .pill {
  margin: var(--spacing-xs);
  font-size: var(--font-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--base-accent);
  border-radius: var(--radius-md);
}

#TagsCloud .pill:hover {
  background: var(--secondary-accent);
  transform: translateY(-1px) scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  #TagsCloud {
    position: static;
    margin-top: var(--spacing-lg);
    padding: var(--spacing-lg);
  }

  #TagsCloud::before {
    font-size: var(--font-base);
    margin-bottom: var(--spacing-md);
  }

  #TagsCloud .pill {
    font-size: var(--font-xs);
    margin: var(--spacing-xs) var(--spacing-xs) 0 0;
  }
}

@media (max-width: 480px) {
  #TagsCloud {
    padding: var(--spacing-md);
  }

  #TagsCloud::before {
    font-size: var(--font-sm);
    margin-bottom: var(--spacing-sm);
  }
}
</style>
