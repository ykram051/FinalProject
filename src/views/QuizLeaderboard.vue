<template>
  <div class="container leaderboard mt-5">
    <header class="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom bg-navbar">
      <h1 class="navbar-title"> QUIZZ APP</h1>
      <nav class="nav d-flex">
        <router-link to="/home" class="nav-link d-flex align-items-center">
          <i class="fas fa-home"></i> <span class="ms-2">Home</span>
        </router-link>
        <router-link to="/profile" class="nav-link d-flex align-items-center">
          <i class="fas fa-user"></i> <span class="ms-2">Profile</span>
        </router-link>
        <router-link to="/quizzes" class="nav-link d-flex align-items-center">
          <i class="fas fa-list"></i> <span class="ms-2">Quizzes</span>
        </router-link>
        <router-link to="/global-leaderboard" class="nav-link d-flex align-items-center">
          <i class="fas fa-trophy"></i> <span class="ms-2">Leaderboard</span>
        </router-link>
        <router-link to="/" class="nav-link" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </router-link>
      </nav>
    </header>
    <h1 class="text-center mb-4 text-light">
      <i class="fas fa-trophy"></i> Leaderboard for {{ quizTitle }}
    </h1>
    <div v-if="leaderboard.length">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th><i class="fas fa-hashtag"></i> Rank</th>
            <th><i class="fas fa-user"></i> User</th>
            <th><i class="fas fa-star"></i> Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in leaderboard" :key="index">
            <td><i class="fas fa-medal"></i> {{ index + 1 }}</td>
            <td><i class="fas fa-user-circle"></i> {{ entry.username }}</td>
            <td><i class="fas fa-star"></i> {{ entry.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-light"><i class="fas fa-exclamation-circle"></i> No scores available for this quiz.</p>
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
  name: 'QuizLeaderboard',
  props: {
    quizId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quizTitle: '',
      leaderboard: []
    };
  },
  async created() {
    await this.fetchQuizTitle();
    this.fetchLeaderboard();
  },
  methods: {
    async fetchQuizTitle() {
      try {
        const quizDoc = await db.collection('quizzes').doc(this.quizId).get();
        if (quizDoc.exists) {
          this.quizTitle = quizDoc.data().title;
        } else {
          console.error("Quiz not found");
        }
      } catch (error) {
        console.error("Error fetching quiz title: ", error);
      }
    },
    async fetchLeaderboard() {
      if (!this.quizId) {
        console.error("quizId is undefined");
        return;
      }
      try {
        const snapshot = await db.collection('results').where('quizID', '==', this.quizId).get();
        const scores = {};

        for (const resultDoc of snapshot.docs) {
          const result = resultDoc.data();
          const userDoc = await db.collection('users').doc(result.userID).get();
          if (userDoc.exists) {
            const username = userDoc.data().username;
            if (!scores[username] || scores[username].score < result.score) {
              scores[username] = { username, score: result.score };
            }
          } else {
            console.error(`User not found for ID: ${result.userID}`);
          }
        }

        // Convert scores object to an array and sort by score descending
        this.leaderboard = Object.values(scores).sort((a, b) => b.score - a.score);
      } catch (error) {
        console.error("Error fetching leaderboard: ", error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');

body {
  background-color: #000;
}

.navbar-title {
  font-size: 2rem;
  font-family: 'Italiana', serif;
  color: #fff;
  display: flex;
  align-items: center;
}

.nav-link {
  margin: 10px 15px; /* More space between nav items */
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.nav-link i {
  margin-right: 5px;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  color: #fff;
  background-color: #2a7373;

}
.leaderboard {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.8); /* Dark background with opacity */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.thead-dark {
  background-color: #343a40;
  color: #fff;
}

th, td {
  padding: 10px;
  text-align: center;
}
</style>
