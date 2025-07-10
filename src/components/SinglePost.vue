<template>
  <div id="SinglePost" class="post">
    <RouterLink :to="{ name: 'post', params: { id: post.id } }">
      <h2 class="post-title">{{ post.title }}</h2>
    </RouterLink>
    <p class="post-content">{{ snippet }}</p>
    <p class="post-author">作者: {{ post.author }}</p>
    <p class="post-date">发布日期: {{ post.date }}</p>
    <div class="post-tags">
      <span class="pill" v-for="tag in post.tags" :key="tag" @click="gotoTag(tag)">

        # {{ tag }}

      </span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const snippet = computed(
  () => {
    // 截取前100个字符作为摘要
    return props.post.content.length > 100
      ? props.post.content.slice(0, 100) + '...'
      : props.post.content;
  }

)

const gotoTag = (tag) => {
  router.push({ name: 'tag', params: { tag: tag } })
}




</script>

<style scoped>
.post {
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  border: dashed 2px var(--base-accent);

}

.post-title {
  font-size: 1.5em;
  color: var(--base-accent-2);
}

/* 悬停效果 */
.post-title:hover {
  color: var(--base-accent);
  cursor: pointer;
}

/* 去除router-link默认样式 */
a {
  text-decoration: none;
  color: inherit;
}

.post-content {
  font-size: 1.2em;
  color: var(--secondary-color);
}

.post-author,
.post-date {
  font-size: 0.9em;
  color: var(--secondary-accent);
}

.post-author {
  margin-top: 10px;
}

.post-date {
  margin-top: 5px;
}

/* 宽度 */
#SinglePost {
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
}
</style>
