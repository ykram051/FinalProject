import { createRouter, createWebHistory } from 'vue-router';


import HomeView from '../views/homeView.vue';
import LoGinForm from '../components/LoginForm.vue';
import Profile from '../views/profile.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import CreateQuiz from '../views/CreateQuiz.vue';
import SignupForm from '@/components/SignupForm.vue';
import QuizPage from '../views/QuizPage.vue'; 
import QuizList from '../views/QuizList.vue';
import ScoreHistory from '../views/ScoreHistory.vue';
import GlobalLeaderboard from '../views/GlobalLeaderboard.vue';
import QuizLeaderboard from '../views/QuizLeaderboard.vue';
import EditQuiz from '@/views/EditQuiz.vue';
import AuthPage from '@/views/AuthPage.vue';
import AdminUsers from '@/components/AdminUsers.vue';
import UserRecords from '@/components/UserRecords.vue';
import Quizlistadmin from '../views/Quizlistadmin.vue';
import globaladmin from '../views/globaladmin.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'AuthPage',
      component: AuthPage
    },
    {
      path: '/admin/users/:id',
      name: 'UserRecords',
      component: UserRecords,
      meta: { requiresAdmin: true }
    },
    {
      path: '/quiz/:id',
      name: 'QuizPage',
      component: QuizPage,
      props: true  // Pour passer l'ID du quiz en tant que prop
    },
    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: AdminUsers,
      meta: { requiresAdmin: true }
    },
    {
      path: '/global-leaderboard',
      name: 'GlobalLeaderboard',
      component: GlobalLeaderboard,
      meta: { requiresAuth: false }
    },
    {
      path: '/edit-quiz/:id',
      name: 'EditQuiz',
      component: EditQuiz,
      props: true
    },
   // In your router file (e.g., router/index.js)
{
  path: '/quiz-leaderboard/:quizId',
  name: 'QuizLeaderboard',
  component: QuizLeaderboard,
  props: true // This ensures the route parameter is passed as a prop
},
    {
      path: '/quizzes',
      name: 'QuizList',
      component: QuizList
    },
    {
      path: '/signup',
      name: 'SignupForm',
      component: SignupForm,
      meta: { requiresAuth: false } 
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true } 
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/CreateQuiz',
      name: 'CreateQuiz',
      component: CreateQuiz,
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/login',
      name: 'LoGinForm',
      component: LoGinForm,
      meta: { requiresAuth: true } 
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/score-history',
      name: 'ScoreHistory',
      component: ScoreHistory,
      meta: { requiresAuth: true }
    },
    {
      path: '/quizlistadmin',
      name: 'quizlistadmin',
      component: Quizlistadmin,
      meta: { requiresAuth: true, requiresAdmin: true  }
    },
    {
      path: '/globaladmin',
      name: 'globaladmin',
      component: globaladmin,
      meta: { requiresAuth: true, requiresAdmin: true  }
    }
  ]
});



export default router;
