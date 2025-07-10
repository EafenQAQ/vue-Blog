<template>
  <div id="PostDetails">
    <template v-if="error">
      {{ error }}
    </template>
    <template v-if="post">
      <!-- 文章标题 -->
      <h1 class="post-title">{{ post.title }}</h1>
      <!-- 文章内容 -->
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
    </template>
    <template v-else>
      <LoadSpinner />
    </template>

    <button class="delete-btn" @click="deletePost">
      <svg t="1752128415990" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="4964" width="32" height="32">
        <path
          d="M597.333333 256V213.333333h-170.666666v42.666667H260.266667a4.266667 4.266667 0 0 0-4.266667 4.266667v76.8a4.266667 4.266667 0 0 0 4.266667 4.266666h503.466666a4.266667 4.266667 0 0 0 4.266667-4.266666V260.266667a4.266667 4.266667 0 0 0-4.266667-4.266667H597.333333zM302.933333 810.666667h418.133334a4.266667 4.266667 0 0 0 4.266666-4.266667v-375.466667a4.266667 4.266667 0 0 0-4.266666-4.266666H302.933333a4.266667 4.266667 0 0 0-4.266666 4.266666v375.466667a4.266667 4.266667 0 0 0 4.266666 4.266667z"
          p-id="4965" fill="#d81e06"></path>
      </svg>
      <span>删除博客</span></button>
  </div>

</template>

<script setup>
import LoadSpinner from '@/components/LoadSpinner.vue';

import getPost from '@/composables/getPost';
import { projectFirestore } from '@/firebase/config';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const postID = props.id

const { post, error, load } = getPost();

load(postID);

const deletePost = async () => {
  const res = await projectFirestore.collection('posts').doc(postID).delete();
  console.log("文章删除成功：", res);

  // 重定向
  router.push({ name: 'home' })
}

</script>

<style scoped>
/* 主容器样式 */
#PostDetails {
  width: 100%;
  max-width: 900px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-md);
  min-height: 60vh;
}

/* 错误信息样式 */
#PostDetails>template:first-child {
  color: var(--secondary-accent);
  font-size: 1.1em;
  text-align: center;
  padding: 2rem;
  background-color: var(--secondary-light);
  border-radius: 8px;
  border: 1px solid var(--secondary-color);
}



/* 文章标题样式 */
.post-title {
  font-size: 2.5em;
  color: var(--base-accent-2);
  text-align: center;
  margin: 2rem 0 3rem 0;
  line-height: 1.3;
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
}

/* 标题下方装饰线 */
.post-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color));
  border-radius: 2px;
}

/* 文章内容容器 */
.post-content {
  background: #fefefe;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--base-light);
  position: relative;
  overflow: hidden;
}

/* 内容容器装饰背景 */
.post-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color), var(--base-color));
}

/* 文章正文样式 */
.post-content p {
  font-size: 1.1em;
  line-height: 1.8;
  color: #333;
  margin: 0;
  text-align: left;
  animation: none;
  padding: 0;
  text-indent: 2em;
  word-wrap: break-word;
  word-break: break-word;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #PostDetails {
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-sm);
  }

  .post-title {
    font-size: var(--font-3xl);
    margin: var(--spacing-lg) 0 var(--spacing-xl) 0;
  }

  .post-content {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .post-content p {
    font-size: var(--font-base);
    text-indent: 1.5em;
  }
}

@media (max-width: 480px) {
  #PostDetails {
    padding: 0 var(--spacing-xs);
  }

  .post-title {
    font-size: var(--font-2xl);
    margin: var(--spacing-md) 0 var(--spacing-lg) 0;
  }

  .post-content {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .post-content p {
    font-size: var(--font-sm);
    text-indent: 1em;
    line-height: 1.6;
  }
}

/* 悬停效果 */
.post-content:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* 平滑过渡 */
.post-content,
.post-title {
  transition: all 0.3s ease;
}
/* 删除按钮样式 */
.delete-btn {
  background: hsl(from var(--base-accent) h s calc(l - 10) / 0);
  color: black;
  border: none;
  padding: 0.8rem 1rem;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 居中 */
  margin: 2rem auto 0 auto;
  width: 100%;
  max-width: 300px;
}

.delete-btn:hover {
  background: hsl(from var(--secondary-accent) h s calc(l - 10));
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

</style>
