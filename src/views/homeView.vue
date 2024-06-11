<template>
  <div class="container home-page mt-5">
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

    <div class="text-over-image-section p-3 mb-4 rounded-3">
      <div class="container-fluid py-3">
        <h1 class="display-5 fw-bold text-dark"><i class="fas fa-lightbulb"></i> Découvrez et testez vos connaissances</h1>
      </div>
    </div>

    <!-- New section for background image -->
    <section class="bg-image-section"></section>

    <section class="mt-4">
      <p class="lead text-dark"><i class="fas fa-info-circle"></i> Bienvenue sur notre plateforme de quiz. Choisissez un quiz, testez vos connaissances et améliorez-vous !</p>
    </section>

    <section class="mt-4">
      <h2 class="mb-4 text-dark"><i class="fas fa-star"></i> Quiz populaires</h2>
      <div class="row">
        <div class="col-md-4" v-for="quiz in popularQuizzes" :key="quiz.id">
          <div class="card mb-4 shadow-sm dark-blue-card">
            <div class="card-body">
              <h5 class="card-title text-light"><i class="fas fa-book-open"></i> {{ quiz.title }}</h5>
              <p class="card-text"><i class="fas fa-folder-open"></i> Catégorie: {{ quiz.category }}</p>
              <p class="card-text"><i class="fas fa-thermometer-half"></i> Difficulté: {{ quiz.difficulty }}</p>
              <router-link :to="'/quiz/' + quiz.id" class="btncolor btn btn-primary"><i class="fas fa-play"></i> Commencer le Quiz</router-link>
              <router-link :to="{ name: 'QuizLeaderboard', params: { quizId: quiz.id } }" class="btn btn-secondary mt-2"><i class="fas fa-chart-line"></i> View Leaderboard</router-link>
            </div>
          </div>
        </div>
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
import { db } from '@/firebase/Config';

export default {
  name: 'HomeApp',
  data() {
    return {
      popularQuizzes: []
    }
  },
  async created() {
    this.popularQuizzes = await this.getPopularQuizzes();
  },
  methods: {
    async getPopularQuizzes() {
      try {
        const quizzes = [];
        const snapshot = await db.collection('quizzes').get();
        snapshot.forEach(doc => {
          const data = doc.data();
          quizzes.push({ id: doc.id, ...data });
        });
        return quizzes.slice(0, 5); // Return the first 5 quizzes
      } catch (error) {
        console.error("Error fetching quizzes: ", error);
        return [];
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');

body {
  background: linear-gradient(135deg, #2B3A42, #1B4242);
}

.btncolor {
  background-color: #183D3D;
  border-color: #183D3D;
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

.text-over-image-section {
  text-align: center;
}

.bg-image-section {
  background-image: url('https://www.shutterstock.com/image-photo/photograph-recycle-dark-emerald-green-260nw-250741579.jpg');
  background-size: cover;
  height: 200px; /* Adjust height as needed */
  margin-top: -250px; /* Adjust margin as needed */
  border-radius: 50px;
}

.main-content {
  color: #fff;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  color: #fdfeff;
}

.footer-link {
  color: #6c757d;
}

.footer-link:hover {
  color: #343a40;
}

.text-muted:hover {
  color: #ffffff !important;
}

.text-dark {
  color: #ffffff !important;
}

.dark-blue-card {
  background-color:#1B4242; /* Slightly dark blue background */
  color: #fff; /* Ensure text is readable */
}

.dark-blue-card .card-body {
  color: #fff; /* Ensure text is readable */
}
</style>
