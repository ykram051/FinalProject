<template>
  <div class="container  mt-5">
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
    <h1 class="text-light mb-4 "> Create a New Quiz</h1>
    <form @submit.prevent="createQuiz" class="form create-quiz">
      <div class="mb-3 position-relative">
        <label class="form-label">
           Title:
        </label>
        <input type="text" v-model="quiz.title" class="form-control" required>
      </div>
      <div class="mb-3 position-relative">
        <label class="form-label">
          <i class="fas fa-tags icon"></i> Category:
        </label>
        <input type="text" v-model="quiz.category" class="form-control" required>
      </div>
      <div class="mb-3 position-relative">
        <label class="form-label">
          <i class="fas fa-tachometer-alt icon"></i> Difficulty:
        </label>
        <select v-model="quiz.difficulty" class="form-select">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div v-for="(question, index) in quiz.questions" :key="index" class="mb-4 p-3 question-box">
        <label class="form-label">
          <i class="fas fa-question-circle icon"></i> Question {{ index + 1 }}:
        </label>
        <input type="text" v-model="question.question" class="form-control mb-2" required>
        <label class="form-label">
          <i class="fas fa-list-alt icon"></i> Type:
        </label>
        <select v-model="question.type" class="form-select mb-2">
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="text">Text</option>
        </select>
        <div v-if="question.type === 'multiple-choice'">
          <label class="form-label">
            <i class="fas fa-check-circle icon"></i> Options:
          </label>
          <input type="text" v-model="question.options[0]" class="form-control mb-2" placeholder="Option 1" required>
          <input type="text" v-model="question.options[1]" class="form-control mb-2" placeholder="Option 2" required>
          <input type="text" v-model="question.options[2]" class="form-control mb-2" placeholder="Option 3" required>
          <input type="text" v-model="question.options[3]" class="form-control mb-2" placeholder="Option 4" required>
        </div>
        <label class="form-label">
          <i class="fas fa-check icon"></i> Correct Answer:
        </label>
        <input type="text" v-model="question.correctAnswer" class="form-control mb-2" required>
        <button type="button" @click="removeQuestion(index)" class="btn btn-danger btn-lg mt-2"><i class="fas fa-trash-alt"></i> Remove Question</button>
      </div>
      <div class="d-flex justify-content-between">
        <button type="button" @click="addQuestion" class="btn btn-secondary btn-lg mb-4"><i class="fas fa-plus"></i> Add Question</button>
        <button type="submit" class="btn btn-primary btn-lg mb-4"><i class="fas fa-save"></i> Create Quiz</button>
      </div>
    </form>
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
import { db, firebase } from '@/firebase/Config';

export default {
  name: 'CreateQuiz',
  data() {
    return {
      quiz: {
        title: '',
        category: '',
        difficulty: 'Easy',
        questions: [
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            type: 'multiple-choice'
          }
        ]
      }
    };
  },
  methods: {
    addQuestion() {
      this.quiz.questions.push({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        type: 'multiple-choice'
      });
    },
    removeQuestion(index) {
      this.quiz.questions.splice(index, 1);
    },
    async createQuiz() {
      try {
        await db.collection('quizzes').add({
          ...this.quiz,
          createdBy: firebase.auth().currentUser.uid,
          dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        });
        this.$router.push('/admin');
      } catch (error) {
        console.error('Error creating quiz:', error);
      }
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

.nav {
  display: flex;
  gap: 15px;
}
.navbar-title {
  font-size: 2rem;
  font-family: 'Italiana', serif;
  
  color: #fff;
  display: flex;
  align-items: center;
}

.nav-link i {
  color: #fff; /* Icons color */
}

.create-quiz {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px; /* Center the form */
  box-shadow: 0 0 10px rgb(253, 246, 246);
}

.form-label {
  font-weight: bold;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 10px;
  color: #fff; /* Icons color */
}

.question-box {
  border-radius: 8px;
  
}


.btn {
  font-size: 1.1rem;
  padding: 10px 20px;
  width: auto;
  border-radius: 5px;
  border: none;
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #2ecc71;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #27ae60;
}

.btn-danger {
  background-color: #e74c3c;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.form-control,
.form-select {
  background-color: transparent;
  border: 1px solid #ced4da;
  padding: 10px;
  color: #333;
}

.form-control::placeholder,
.form-select::placeholder {
  color: #6c757d;
  opacity: 1;
}

.d-flex {
  justify-content: center; /* Center the form buttons*/
}
</style>
