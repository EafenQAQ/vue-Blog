<template>
  <div class="optimized-img">
    <img :src="optimizedSrc" alt="图片加载失败" :width="props.width" loading="lazy">
  </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  src: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  quality: {
    type: Number,
    required: false,
    default: 80
  }
})

const optimizedSrc = computed(() => {
  if (!props.src) {
    return ''
  }
  // 转义原始URL
  const encodedUrl = encodeURIComponent(props.src)
  return `/.netlify/images?url=${encodedUrl}&w=${props.width}&q=${props.quality}`
}
)

</script>

<style scoped>
/* 封面图 */
.post img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-md);
}
</style>
