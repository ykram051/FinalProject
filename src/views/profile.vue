<template>
  <div class="container profile-page mt-5">
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
    <h1 class="white text-center">
      Profile
    </h1>
    <div class="row align-items-center">
      <div class="col-md-6">
        <img :src="require('@/assets/list.jpg')" alt="Profile Background" class="profile-bg img-fluid">
      </div>
      <div class="col-md-6 text-center">
        <div v-if="user">
          <img :src="user.photoURL || require('@/assets/user-icon.png')" class="profile-picture rounded-circle mb-3">
          <p>
            <i class="fas fa-user"></i>
            <strong>Username:</strong> {{ user.displayName }}
          </p>
          <p>
            <i class="fas fa-envelope"></i>
            <strong>Email:</strong> {{ user.email }}
          </p>
          <div v-if="!isAdmin">
            <router-link to="/score-history" class="btn btn-custom mt-3">
              <i class="fas fa-history"></i> View Score History
            </router-link>
          </div>
        </div>
        <div v-else>
          <p>
            <i class="fas fa-spinner fa-spin"></i> Loading...
          </p>
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
import { db, projectAuth } from '@/firebase/Config';

export default {
  name: 'ProfileApp',
  data() {
    return {
      user: null,
      isAdmin: false
    };
  },
  async created() {
    const currentUser = projectAuth.currentUser;
    if (currentUser) {
      this.user = currentUser;
      const userDoc = await db.collection('users').doc(currentUser.uid).get();
      if (userDoc.exists) {
        this.isAdmin = userDoc.data().isAdmin;
      }
    } else {
      console.error('No user is logged in');
    }
  }
};
</script>

<style scoped>

.bg-navbar {
  background-color: #000;
  border-radius: 40px;
}

.navbar-title {
  font-size: 2rem;
  font-family: 'Italiana', serif;
  color: #fff;
}
.profile-page {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.nav-link {
  margin: 0 30px; /* Increased margin for more space */
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
}

.profile-page h1 {
  color: #fff; /* Light text for contrast */
}

.profile-bg {
  border-radius: 10px;
  max-height: 800px; /* Adjust the height as needed */
  object-fit: cover;
}

.profile-page p {
  color: #fff; /* Light text for contrast */
}

.profile-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
  background-color: #ccc; /* Light gray background for placeholder */
}

.btn-custom {
  display: inline-block;
  padding: 12px 25px;
  border-radius: 5px;
  background-color: #1B4242; /* Custom color for the button */
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-custom:hover {
  background-color: #1B4242; /* Slightly darker shade for hover */
}

.text-dark {
  color:#fff ; /* Ensuring text visibility */
}
.white{
  color:#fff
}
</style>
