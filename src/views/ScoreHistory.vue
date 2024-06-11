<template>
  <div class="container score-history mt-5">
    <header class="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom bg-navbar">
      <h1 class="navbar-title">QUIZZ APP</h1>
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
    <h1 class="text-light">Your Score History</h1>
    <div v-if="results.length">
      <table class="table table-striped table-hover">
        <thead class="thead-dark text-light">
          <tr>
            <th><i class="fas fa-book"></i> Quiz Title</th>
            <th>Score</th>
            <th><i class="fas fa-calendar"></i> Date Taken</th>
          </tr>
        </thead>
        <tbody class="text-light">
          <tr v-for="result in results" :key="result.id">
            <td><i class="fas fa-book-open"></i> {{ result.quizTitle }}</td>
            <td><i class="fas fa-star"></i> {{ result.score }}</td>
            <td><i class="fas fa-calendar-alt"></i> {{ new Date(result.dateTaken.seconds * 1000).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-light"><i class="fas fa-exclamation-circle"></i> No results found.</p>
    </div>
  </div>
</template>

<script>
import { db, projectAuth } from '@/firebase/Config';

export default {
  name: 'ScoreHistory',
  data() {
    return {
      results: []
    };
  },
  async created() {
    const user = projectAuth.currentUser;
    if (user) {
      const resultsSnapshot = await db.collection('results').where('userID', '==', user.uid).get();
      const results = [];
      for (const doc of resultsSnapshot.docs) {
        const resultData = doc.data();
        const quizDoc = await db.collection('quizzes').doc(resultData.quizID).get();
        if (quizDoc.exists) {
          results.push({
            id: doc.id,
            quizTitle: quizDoc.data().title,
            score: resultData.score,
            dateTaken: resultData.dateTaken
          });
        }
      }
      this.results = results;
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');

body {
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
  color: #1B4242;
}

.score-history {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Darker shadow */
  text-align: center;
}

.score-history h1,
.score-history p {
  color: #fff; /* Light text for contrast */
}

.table {
  background-color: #1B4242; /* Slight transparency */
}

.table thead {
  background-color: #1B4242; /* Darker background for table header */
  color: #fff; /* Light text for table header */
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  color: #fff;
  background-color: #2a7373;

}

.table-hover tbody tr:hover {
  background-color: #f4f4f4; /* Hover effect for table rows */
}

.text-dark {
  color: #fff; /* Ensuring text visibility */
}
</style>
