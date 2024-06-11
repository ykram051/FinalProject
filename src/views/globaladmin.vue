<template>
    <div class="container leaderboard mt-5">
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
      <h1 class="text-center mb-4 text-bright italics">
        <i class="fas fa-trophy fa-2x"></i> Global Leaderboard
      </h1>
      <div v-if="loading" class="text-center">
        <p>
          <i class="fas fa-spinner fa-spin fa-2x"></i> Loading...
        </p>
      </div>
      <div v-else-if="leaderboard.length">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th><i class="fas fa-hashtag fa-lg"></i> Rank</th>
              <th><i class="fas fa-user fa-lg"></i> User</th>
              <th><i class="fas fa-star fa-lg"></i> Score</th>
            </tr>
          </thead >
          <tbody class="table-dark">
            <tr v-for="(entry, index) in leaderboard" :key="index">
              <td><i class="fas fa-medal fa-lg"></i> {{ index + 1 }}</td>
              <td><i class="fas fa-user fa-lg"></i> {{ entry.username }}</td>
              <td><i class="fas fa-star fa-lg"></i> {{ entry.totalScore }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center">
        <p><i class="fas fa-exclamation-circle fa-lg"></i> No scores available.</p>
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
    name: 'GlobalLeaderboard',
    data() {
      return {
        leaderboard: [],
        loading: true,
      };
    },
    async created() {
      await this.fetchLeaderboard();
    },
    methods: {
      async fetchLeaderboard() {
        try {
          this.loading = true;
          const userScores = {};
  
          // Fetch all results and calculate total scores per user
          const resultsSnapshot = await db.collection('results').get();
          resultsSnapshot.forEach(doc => {
            const result = doc.data();
            if (userScores[result.userID]) {
              userScores[result.userID] += result.score;
            } else {
              userScores[result.userID] = result.score;
            }
          });
  
          // Fetch user data for the top 10 scores
          const leaderboard = [];
          const sortedUserIDs = Object.keys(userScores).sort((a, b) => userScores[b] - userScores[a]).slice(0, 10);
          for (const userID of sortedUserIDs) {
            const userDoc = await db.collection('users').doc(userID).get();
            if (userDoc.exists) {
              leaderboard.push({ username: userDoc.data().username, totalScore: userScores[userID] });
            }
          }
  
          this.leaderboard = leaderboard;
        } catch (error) {
          console.error("Error fetching leaderboard: ", error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');

.body {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;


}
.admin-header {
  background-color: #000;
  border-radius: 8px;
  padding: 10px 20px;
}

.admin-dashboard {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}
.nav {
  display: flex;
  font-family: 'Italiana', serif;
  gap: 15px;
}

.quiz-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.navbar-title {
  font-size: 2rem;
  font-family: 'Italiana', serif;
  color: #fff;
  display: flex;
  align-items: center;
}


  .bg-navbar {
    background-color: #000;
    border-radius: 40px;
  }
  
  .navbar-title {
    font-size: 2rem;
    font-family: 'Italiana', serif;
    color: #fff;
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
  .leaderboard {
    margin: 0 auto;
    padding: 20px;
    background: #000;
    border-radius: 10px;
  }
  
  h1 {
    font-family: 'Italiana', serif;
    text-align: center;
    margin-bottom: 20px;
    color: #fff; /* Change to white for better contrast */
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.7); /* Add shadow for brilliance */
  }
  

  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    text-align: center;
  }
  
  .table th, .table td {
    padding: 10px;
    background-color: #183D3D;
  
  }
  
  .table th {
    background-color: #2a7373;
    color: #fff;
    font-size: 1.2rem;
  }
  
  .table-hover tbody tr:hover {
    background-color: #f5f5f5;
  }
  
  .italics {
    font-family: 'Italiana', serif;
  }
  
  .table-dark {
    background:  #183D3D; /* Gradient for table header */
    color: white;
  }
  
  .text-center p {
    font-family: 'Italiana', serif;
    color: #fff;
  }
  
  .text-bright {
    color: #ffd700; /* Bright gold color */
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.7); /* Add bright shadow */
  }
  </style>
  