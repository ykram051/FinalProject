<template>
  <div class="container quiz-list-container mt-5">
    <header class="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom bg-navbar">
      <h1 class="navbar-title"> QUIZZ APP</h1>
      <nav class="nav">
        <router-link to="/home" class="nav-link">
          <i class="fas fa-home"></i> Home
        </router-link>
        <router-link to="/profile" class="nav-link">
          <i class="fas fa-user"></i> Profile
        </router-link>
        <router-link to="/quizzes" class="nav-link">
          <i class="fas fa-list"></i> Quizzes
        </router-link>
        <router-link to="/global-leaderboard" class="nav-link">
          <i class="fas fa-trophy"></i> Leaderboard
        </router-link>
        <router-link to="/" class="nav-link" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </router-link>
      </nav>
    </header>

    <h1 class="text-center mb-4 text-light">
       Liste des Quiz
    </h1>
    <div class="filters d-flex justify-content-between mb-4">
      <div class="d-flex align-items-center">
        <i class="fas fa-filter me-2"></i>
        <select v-model="selectedCategory" @change="applyFilters" class="form-select me-2">
          <option value="">Toutes les catégories</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="d-flex align-items-center">
        <i class="fas fa-signal me-2"></i>
        <select v-model="selectedDifficulty" @change="applyFilters" class="form-select">
          <option value="">Tous les niveaux</option>
          <option value="Easy">Facile</option>
          <option value="Medium">Moyen</option>
          <option value="Hard">Difficile</option>
        </select>
      </div>
    </div>
    <div class="quiz-list-background">
      <div class="row quiz-list justify-content-center">
        <div class="col-md-4 d-flex" v-for="quiz in filteredQuizzes" :key="quiz.id">
          <div class="card mb-4 shadow-sm flex-fill h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-light">
                <i class="fas fa-book-open"></i> {{ quiz.title }}
              </h5>
              <p class="card-text flex-grow-1">
                <i class="fas fa-tag"></i> Catégorie: {{ quiz.category }}
              </p>
              <p class="card-text">
                <i class="fas fa-tachometer-alt"></i> Difficulté: {{ quiz.difficulty }}
              </p>
              <router-link :to="'/quiz/' + quiz.id" class="btn btn-primary mt-auto btncolor">
                <i class="fas fa-play"></i> Commencer le Quiz
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { db } from '@/firebase/Config';

export default {
  name: 'QuizList',
  data() {
    return {
      quizzes: [],
      filteredQuizzes: [],
      categories: [],
      selectedCategory: '',
      selectedDifficulty: ''
    };
  },
  async created() {
    const quizzes = await this.getQuizzes();
    this.quizzes = quizzes;
    this.filteredQuizzes = quizzes;
    this.categories = [...new Set(quizzes.map(quiz => quiz.category))];
  },
  methods: {
    async getQuizzes() {
      try {
        const quizzes = [];
        const snapshot = await db.collection('quizzes').get();
        snapshot.forEach(doc => {
          const data = doc.data();
          quizzes.push({ id: doc.id, ...data });
        });
        return quizzes;
      } catch (error) {
        console.error("Error fetching quizzes: ", error);
        return [];
      }
    },
    applyFilters() {
      this.filteredQuizzes = this.quizzes.filter(quiz => {
        return (
          (this.selectedCategory === '' || quiz.category === this.selectedCategory) &&
          (this.selectedDifficulty === '' || quiz.difficulty === this.selectedDifficulty)
        );
      });
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');

body {
  background: linear-gradient(135deg, #2B3A42, #1B4242);
}

.quiz-list-container {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5); /* Dark background with opacity */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.bg-navbar {
  background-color: #000;
  border-radius: 40px;
}

.navbar-title {
  font-size: 2rem;
  font-family: 'Italiana', serif;
  color: #fff;
  display: flex;
  align-items: center;
}

.nav-link {
  margin: 0 30px; /* Increased margin for more space */
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
}

.nav-link:hover {
  color: #0056b3;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
}

.quiz-list-background {
  background-size: contain;
  padding: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.quiz-list {
  display: flex;
  flex-wrap: wrap;
  gap: 50px; /* More space between cards */
  justify-content: center; /* Center the cards */
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #1B4242; /* Slightly dark blue background */
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  margin: auto; /* Center the card */
  height: 100%; /* Ensure the card takes full height */
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;
}

.card-text {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #183D3D;
  border-color: #183D3D;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}
</style>
