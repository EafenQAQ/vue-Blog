<template>
  <div id="PsychArticles">
    <div v-if="error">{{ error }}</div>
    <div v-if="articles.length" class="layout">
      <PostList :posts="articles" sourceType="psych" />
      <TagsCloud :posts="articles" sourceType="psych" />
    </div>
    <div v-if="isLoading">
      <LoadSpinner />
    </div>

    <!-- 哨兵元素 -->
    <div ref="sentinel"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PsychArticles'
})
import PostList from '@/components/PostList.vue';
import TagsCloud from '@/components/TagsCloud.vue';
import LoadSpinner from '@/components/LoadSpinner.vue';
import useArticles from '@/composables/useArticles';
import { onActivated, onDeactivated, onMounted, ref } from 'vue';

const sentinel = ref(null)

const { articles, error, load, isLoading } = useArticles();

load();

const SCROLL_KEY = 'psych-articles-scroll';

// 从 sessionStorage 恢复滚动位置
const restoreScrollPosition = () => {
  const savedScroll = sessionStorage.getItem(SCROLL_KEY);
  if (savedScroll !== null) {
    // 使用 nextTick 确保 DOM 已完全渲染
    requestAnimationFrame(() => {
      window.scrollTo(0, parseInt(savedScroll, 10));
    });
  } else {
    // 首次进入或从其他入口进入，滚动到顶部
    window.scrollTo(0, 0);
  }
};

onMounted(() => {
  restoreScrollPosition();
});

onActivated(() => {
  restoreScrollPosition();
  observer.observe(sentinel.value);
});

onDeactivated(() => {
  observer.disconnect();
  // 保存当前滚动位置
  sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
});

const handleIntersection = (entries) => {
  entries.forEach( async (entry) => {
    if (entry.isIntersecting) {
      console.log('进入视口了')
      await load()
    }
  })
}

const observer = new IntersectionObserver(handleIntersection, {
  rootMargin: '0px 0px 100px 0px'
})

</script>

<style lang="scss" scoped></style>
