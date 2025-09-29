import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/components/StartScreen.vue'
import QuestionGrid from '@/components/QuestionGrid.vue'
import QuestionView from '@/components/QuestionView.vue'

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartScreen
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionGrid
  },
  {
    path: '/question/:id',
    name: 'question',
    component: QuestionView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router