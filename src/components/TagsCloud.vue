<template>
  <div id="TagsCloud">
    <div class="tags-container" :class="{ expanded: isExpanded }">
      <div class="pill" v-for="tag in displayedTags" :key="tag">
        <RouterLink :to="{ name: 'tag', params: { tag: tag }, query: { source: sourceType } }"># {{ tag }}</RouterLink>
      </div>
    </div>
    <button class="toggle-btn" @click="toggleExpand" v-if="tags.length > maxCollapsedTags">
      <span class="arrow" :class="{ rotated: isExpanded }">
        <svg t="1769327715935" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5667" width="24" height="24">
          <path
            d="M264.789333 396.373333a42.965333 42.965333 0 0 0-60.288 0 41.856 41.856 0 0 0 0 59.648l247.210667 244.608c33.28 32.938667 87.296 32.938667 120.576 0l247.210667-244.608a41.856 41.856 0 0 0 0-59.648 42.965333 42.965333 0 0 0-60.288 0L512 640.981333 264.789333 396.373333z"
            fill="#e4a254" p-id="5668"></path>
          <path
            d="M512 1024c282.752 0 512-229.248 512-512S794.752 0 512 0 0 229.248 0 512s229.248 512 512 512z m0-85.333333C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z"
            fill="#e4a254" p-id="5669"></path>
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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

const isExpanded = ref(false);
const maxCollapsedTags = 8;

const displayedTags = computed(() => {
  if (isExpanded.value || tags.value.length <= maxCollapsedTags) {
    return tags.value;
  }
  return tags.value.slice(0, maxCollapsedTags);
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

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

/* 标签容器 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  max-height: none;
  overflow: visible;
  transition: all 0.3s ease;
}

/* 展开状态下的标签容器 */
.tags-container.expanded {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
.tags-container.expanded::-webkit-scrollbar {
  width: 6px;
}

.tags-container.expanded::-webkit-scrollbar-track {
  background: var(--base-light);
  border-radius: 3px;
}

.tags-container.expanded::-webkit-scrollbar-thumb {
  background: var(--base-accent-2);
  border-radius: 3px;
}

.tags-container.expanded::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-accent);
}

/* 标签样式调整 */
#TagsCloud .pill {
  margin: 0;
  font-size: var(--font-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--base-accent);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

#TagsCloud .pill:hover {
  background: var(--secondary-accent);
  transform: translateY(-1px) scale(1.05);
}

/* 展开/收起按钮 */
.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: var(--spacing-md);
  padding: var(--spacing-xs);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--base-accent-2);
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: hsl(from var(--secondary-light) h s l / 0.2);
}

.toggle-btn .arrow {
  font-size: var(--font-base);
  transition: transform 0.3s ease;

}

.toggle-btn .arrow.rotated {
  transform: rotate(180deg);
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
  }

  .tags-container.expanded {
    max-height: 250px;
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

  .tags-container.expanded {
    max-height: 200px;
  }
}
</style>
