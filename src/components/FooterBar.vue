<template>
  <footer id="FooterBar">
    <div class="footer-content">
      <!-- 网站信息 -->
      <div class="footer-section">
        <h3>猫爪博客</h3>
        <p>分享生活，记录思考</p>
        <div class="social-links">
          <a href="https://github.com/EafenQAQ/vue-Blog" class="social-link" title="GitHub">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://space.bilibili.com/12349532" class="social-link" title="哔哩哔哩">
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path fill="currentColor"
                d="M306.005333 117.632L444.330667 256h135.296l138.325333-138.368a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334A149.333333 149.333333 0 0 1 789.333333 896H234.666667A149.333333 149.333333 0 0 1 85.333333 746.666667V405.333333A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333H234.666667a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667V405.333333a64 64 0 0 0-57.856-63.701333L789.333333 341.333333zM341.333333 469.333333a64 64 0 0 1 64 64v85.333334a64 64 0 0 1-128 0v-85.333334a64 64 0 0 1 64-64z m341.333334 0a64 64 0 0 1 64 64v85.333334a64 64 0 0 1-128 0v-85.333334a64 64 0 0 1 64-64z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- 快速链接 -->
      <div class="footer-section">
        <h4>快速导航</h4>
        <nav class="footer-nav">
          <router-link to="/">首页</router-link>
          <router-link to="/psych">心理学专栏</router-link>
          <router-link to="/publish">发布文章</router-link>
        </nav>
      </div>

      <!-- 技术栈 -->
      <div class="footer-section">
        <h4>技术栈</h4>
        <div class="tech-stack">
          <span class="tech-pill">Vue 3</span>
          <span class="tech-pill">Vite</span>
          <span class="tech-pill">Notion API</span>
          <span class="tech-pill">Netlify</span>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} @智能的Eafen. 用 ❤️ 制作</p>
      <p class="footer-note">Powered by Vue.js & Notion</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* 页脚容器 */
#FooterBar {
  background: linear-gradient(135deg, var(--base-light), var(--secondary-light));
  border-top: 2px solid var(--base-color);
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  color: var(--base-accent-2);
}

/* 页脚内容区域 */
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-xl);
}

/* 页脚区块 */
.footer-section h3 {
  color: var(--base-accent-2);
  font-size: var(--font-xl);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
}

.footer-section h4 {
  color: var(--base-accent);
  font-size: var(--font-lg);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

.footer-section p {
  color: var(--base-accent);
  font-size: var(--font-base);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

/* 社交链接 */
.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--secondary-accent);
  color: white;
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--base-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 页脚导航 */
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-nav a {
  color: var(--base-accent);
  font-size: var(--font-base);
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.footer-nav a:hover {
  color: var(--base-accent-2);
  border-bottom-color: var(--base-accent);
  padding-left: var(--spacing-sm);
}

/* 技术栈标签 */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tech-pill {
  display: inline-block;
  background: var(--secondary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-pill:hover {
  background: var(--base-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 页脚底部 */
.footer-bottom {
  border-top: 1px solid var(--base-color);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
}

.footer-bottom p {
  color: var(--base-accent);
  font-size: var(--font-sm);
  margin: var(--spacing-xs) 0;
}

.footer-note {
  opacity: 0.8;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    text-align: center;
  }

  .footer-nav {
    align-items: center;
  }

  .social-links {
    justify-content: center;
  }

  .tech-stack {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  #FooterBar {
    padding: var(--spacing-xl) 0 var(--spacing-md);
  }

  .footer-content {
    padding: 0 var(--spacing-sm);
    gap: var(--spacing-md);
  }

  .footer-section h3 {
    font-size: var(--font-lg);
  }

  .footer-section h4 {
    font-size: var(--font-base);
  }

  .social-link {
    width: 36px;
    height: 36px;
  }

  .tech-pill {
    font-size: var(--font-xs);
    padding: var(--spacing-xs);
  }
}
</style>
