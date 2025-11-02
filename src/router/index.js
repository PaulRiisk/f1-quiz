import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/components/StartScreen.vue'
import QuestionGrid from '@/components/QuestionGrid.vue'
import QuestionView from '@/components/QuestionView.vue'
import ImpressumView from '@/components/ImpressumView.vue'

// Define routes
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
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: ImpressumView
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router