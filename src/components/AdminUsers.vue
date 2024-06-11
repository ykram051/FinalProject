<template>
  <div class="container admin-users mt-5">
    <header class="d-flex justify-content-between align-items-center py-3 mb-4 admin-header">
      <h1 class="navbar-title">QUIZZ APP</h1>

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
    <h1 class="text-center white">All Users</h1>
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th><i class="fas fa-id-badge"></i> User ID</th>
          <th><i class="fas fa-envelope"></i> Email</th>
          <th><i class="fas fa-cogs"></i> Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><i class="fas fa-user"></i> {{ user.id }}</td>
          <td><i class="fas fa-envelope-open"></i> {{ user.email }}</td>
          <td>
            <router-link :to="{ name: 'UserRecords', params: { id: user.id } }" class="btn btn-primary">
              <i class="fas fa-file-alt"></i> View Records
            </router-link>
            <button class="btn btn-danger" @click="blockUser(user.id)">
              <i class="fas fa-ban"></i> Block User
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
</template>

<script>
import { db } from '@/firebase/Config';

export default {
  name: 'AdminUsers',
  data() {
    return {
      users: []
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const usersSnapshot = await db.collection('users').get();
        this.users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async blockUser(userId) {
      try {
        await db.collection('users').doc(userId).delete();
        alert('User has been blocked and deleted');
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error blocking user:', error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 50px;
}

.admin-users {
  margin: 0 auto;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.admin-header {
  background-color: #000;
  border-radius: 8px;
  padding: 10px 20px;
}
  
.navbar-title {
    font-size: 2rem;
    font-family: 'Italiana', serif;
    color: #fff;
    display: flex;
    align-items: center;
  }

  .nav {
  display: flex;
  gap: 15px;
}
.admin-header {
  background-color: #000;
  border-radius: 8px;
  padding: 10px 20px;
}

.white{
  color :white;
}
.admin-dashboard {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.admin-header {
  background-color: #000;
  border-radius: 8px;
  padding: 10px 20px;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  font-family: 'Italiana', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

h1 i {
  margin-right: 10px;
  color: #007bff;
}

.table {
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.7); /* Slightly dark background */
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2); /* Brilliant effect in the corners */
}

th, td {
  padding: 15px;
  text-align: center;
}

th {
  background-color: #0052aa;
  color: #fff;
  font-weight: bold;
}

td {
  background-color: rgba(10, 2, 67, 0.5); /* Slightly dark background */
  color: #fff;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.btn {
  font-size: 1rem;
  margin-right: 10px;
}

.btn-primary {
  background-color: #5ecfcf;
  border: none;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #237171;
  border: none;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  color: #fff;
  background-color: #123737;

}
</style>
