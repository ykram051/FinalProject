<template>
  <div class="container admin-dashboard mt-5">
    <header class="d-flex justify-content-between align-items-center py-3 mb-4 admin-header">
      <h1 class="navbar-title"> QUIZZ APP</h1>

      <nav class="nav">
        <router-link to="/admin" class="nav-link">
          <i class="fas fa-home"></i> Home
        </router-link>
        <router-link to="/CreateQuiz" class="nav-link">
          <i class="fas fa-plus"></i> Create Quiz
        </router-link>
        <router-link to="/globaladmin" class="nav-link">
          <i class="fas fa-trophy"></i> Global Leaderboard
        </router-link>
        <router-link to="/quizlistadmin" class="nav-link">
          <i class="fas fa-list"></i> All Quizzes
        </router-link>
        <router-link to="/admin/users" class="nav-link">
          <i class="fas fa-users-cog"></i> Manage Users
        </router-link>
        <router-link to="/" class="nav-link" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </router-link>
      </nav>
    </header>
    <section class="dashboard-section mb-5">
      <h2 class="text-light"><i class="fas fa-edit"></i> Manage Quizzes</h2>
      <router-link to="/CreateQuiz" class="btn btn-custom mb-4">
        <i class="fas fa-plus"></i> Create a New Quiz
      </router-link>
      <div v-if="quizzes.length" class="row quiz-list justify-content-center">
        <div v-for="quiz in quizzes" :key="quiz.id" class="col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch">
          <div class="card quiz-card mb-4 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title text-light"><i class="fas fa-book"></i> {{ quiz.title }}</h3>
              <p class="card-text text-light"><i class="fas fa-tag"></i> Category: {{ quiz.category }}</p>
              <p class="card-text text-light"><i class="fas fa-tachometer-alt"></i> Difficulty: {{ quiz.difficulty }}</p>
              <div class="mt-auto btn-group">
                <router-link :to="{ name: 'EditQuiz', params: { id: quiz.id } }" class="btn btn-primary btn-sm btn-custom">
                  <i class="fas fa-pen"></i> Edit
                </router-link>
                <button @click="deleteQuiz(quiz.id)" class="btn btn-danger btn-sm btn-custom ms-2">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-light"><i class="fas fa-exclamation-circle"></i> No quizzes available.</p>
      </div>
    </section>
    <footer class="d-flex justify-content-between align-items-center py-3 mt-4 border-top">
      <div>
        <router-link to="/contact" class="text-muted me-3"><i class="fas fa-envelope"></i> Contact</router-link>
        <router-link to="/legal" class="text-muted"><i class="fas fa-gavel"></i> Mentions Légales</router-link>
      </div>
      <div class="d-flex">
        <a href="https://facebook.com" target="_blank" class="text-muted me-3"><i class="fab fa-facebook"></i></a>
        <a href="https://twitter.com" target="_blank" class="text-muted me-3"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" class="text-muted"><i class="fab fa-instagram"></i></a>
      </div>
    </footer>
    
  </div>
</template>

<script>
import { projectAuth, db } from '@/firebase/Config';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      quizzes: []
    };
  },
  async created() {
    await this.fetchQuizzes();
  },
  methods: {
    async fetchQuizzes() {
      const snapshot = await db.collection('quizzes').get();
      const quizzes = [];
      snapshot.forEach(doc => {
        quizzes.push({ id: doc.id, ...doc.data() });
      });
      this.quizzes = quizzes;
    },
    async deleteQuiz(quizId) {
      try {
        await db.collection('quizzes').doc(quizId).delete();
        this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
        alert('Quiz deleted successfully');
      } catch (error) {
        console.error('Error deleting quiz: ', error);
        alert('Failed to delete quiz');
      }
    },
    logout() {
      projectAuth.signOut().then(() => {
        this.$router.push('/');
      }).catch(error => {
        console.error('Error signing out: ', error);
      });
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  background: linear-gradient(90deg, #56CCF2, #2F80ED);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.admin-dashboard {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}
.navbar-title {
  font-size: 2rem;
  font-family: 'Italiana', serif;
  color: #fff;
  display: flex;
  align-items: center;
}

.admin-header {
  background-color: #000;
  border-radius: 8px;
  padding: 10px 20px;
}

.nav {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Italiana', serif;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-link:hover {
  color: #1B4242;
}

.dashboard-section {
  padding: 20px;
  color: #ffffff;
}

.quiz-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Center the cards horizontally */
}

.quiz-card {
  background-color:#1B4242; /* Slightly dark blue background */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  width: 100%; /* Ensure all cards have the same width */
  max-width: 300px; /* Set a max-width for the cards */
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.quiz-card h3 {
  color: #fff; /* White text for card title */
  font-size: 1.25rem;
}

.quiz-card p {
  color: #fff; /* White text for card text */
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn-custom {
  background-color: #1B4242 !important;
  border-color: #1B4242 !important;
  color: #fff !important;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-custom:hover {
  background-color: #1B4242 !important;
}
</style>
