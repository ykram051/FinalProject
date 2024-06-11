<template>
  <div class="container mt-5">
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
    <h1 class="text-center mb-4">
       Edit Quiz: {{ quiz.title }}
    </h1>
    <form class="edit-quiz" @submit.prevent="updateQuiz">
      <div class="mb-3 position-relative">
        <label class="form-label">Title:</label>
        <input type="text" v-model="quiz.title" class="form-control" required />
      </div>
      <div class="mb-3 position-relative">
        <label class="form-label"><i class="fas fa-tags me-2"></i>Category:</label>
        <input type="text" v-model="quiz.category" class="form-control" required />
      </div>
      <div class="mb-3 position-relative">
        <label class="form-label"><i class="fas fa-tachometer-alt me-2"></i>Difficulty:</label>
        <select v-model="quiz.difficulty" class="form-select">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div v-for="(question, index) in quiz.questions" :key="index" class="mb-4 p-3 question-box">
        <label class="form-label">Question {{ index + 1 }}:</label>
        <input type="text" v-model="question.question" class="form-control mb-2" required />
        <label class="form-label">Options:</label>
        <input v-if="question.options" type="text" v-model="question.options[0]" class="form-control mb-2" placeholder="Option 1" required />
        <input v-if="question.options" type="text" v-model="question.options[1]" class="form-control mb-2" placeholder="Option 2" required />
        <input v-if="question.options" type="text" v-model="question.options[2]" class="form-control mb-2" placeholder="Option 3" required />
        <input v-if="question.options" type="text" v-model="question.options[3]" class="form-control mb-2" placeholder="Option 4" required />
        <label class="form-label">Correct Answer:</label>
        <input type="text" v-model="question.correctAnswer" class="form-control mb-2" required />
        <button type="button" @click="removeQuestion(index)" class="btn btn-danger mt-2">
          <i class="fas fa-trash"></i> Remove Question
        </button>
      </div>
      <div class="d-flex justify-content-between">
        <button type="button" @click="addQuestion" class="btn btn-secondary mb-4">
          <i class="fas fa-plus"></i> Add Question
        </button>
        <button type="submit" class="btn btn-primary mb-4">
          <i class="fas fa-save"></i> Update Quiz
        </button>
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
import { db } from '@/firebase/Config';

export default {
  name: 'EditQuiz',
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
            correctAnswer: ''
          }
        ]
      }
    };
  },
  async created() {
    const quizId = this.$route.params.id;
    const quizDoc = await db.collection('quizzes').doc(quizId).get();
    if (quizDoc.exists) {
      const quizData = quizDoc.data();
      this.quiz = {
        ...quizData,
        questions: quizData.questions || [{
          question: '',
          options: ['', '', '', ''],
          correctAnswer: ''
        }]
      };
    } else {
      console.error('Quiz not found');
    }
  },
  methods: {
    addQuestion() {
      this.quiz.questions.push({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      });
    },
    removeQuestion(index) {
      this.quiz.questions.splice(index, 1);
    },
    async updateQuiz() {
      const quizId = this.$route.params.id;
      try {
        await db.collection('quizzes').doc(quizId).update(this.quiz);
        alert('Quiz updated successfully');
        this.$router.push('/admin');
      } catch (error) {
        console.error('Error updating quiz:', error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  background: linear-gradient(90deg, #56CCF2, #2F80ED); /* Quartz theme background */
}

.edit-quiz {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.7); /* Brilliant effect on border */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); /* Brilliant shadow effect */
}

h1 {
  color: #fff;
  font-size: 2rem;
  font-family: 'Italiana', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

h1 i {
  margin-right: 10px;
  color: #f1c40f; /* Brilliant color for icon */
}

.form-label {
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 10px;
  color: #fff;
}

.question-box {
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Brilliant shadow effect */
  padding: 20px;
  margin-bottom: 20px;
}

.btn {
  font-size: 1rem;
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #d4dadf;
  border: none;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}

input,
select {
  width: calc(100% - 30px);
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
