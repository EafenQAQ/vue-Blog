import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const requireConfirm = (to, from, next) => {
  if (from.path === '/psych' || from.path.startsWith('/tag/')) {
    next({ name: 'article', params: { id: to.params.id } })
  } else next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostDetails.vue'),
      props: true,
      beforeEnter: requireConfirm,
    },
    // {
    //   path: '/publish',
    //   name: 'publish',
    //   component: () => import('../views/PublishPost.vue'),
    // },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: () => import('../views/FilteredPosts.vue'),
    },
    {
      path: '/psych',
      name: 'psych',
      component: () => import('../views/PsychArticles.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleDetails.vue'),
      props: true,
    },
  ],
})

export default router
