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
import PostList from '@/components/PostList.vue';
import TagsCloud from '@/components/TagsCloud.vue';
import LoadSpinner from '@/components/LoadSpinner.vue';
import useArticles from '@/composables/useArticles';
import { onMounted, onUnmounted, ref } from 'vue';

const sentinel = ref(null)

const { articles, error, load, isLoading } = useArticles();

load();


const handleIntersection = (entries) => {
  entries.forEach( async (entry) => {
    if (entry.isIntersecting) {
      console.log('进入视口了')
      await load()
    }
  }
  )
}

const observer = new IntersectionObserver(handleIntersection
, {
  rootMargin: '0px 0px 100px 0px'
})


onMounted(() => {
  observer.observe(sentinel.value)
}
)

onUnmounted(() => {
  observer.disconnect()
}
)

</script>

<style lang="scss" scoped></style>
