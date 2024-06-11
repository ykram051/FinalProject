<template>
  <div class="container mt-5 quiz-page">
    <div v-if="quiz">
      <h1 class="text-center mb-4 text-light">{{ quiz.title }}</h1>
      <div class="timer text-light">
        <i class="fas fa-clock"></i>
        <span>{{ formattedTime }}</span>
      </div>
      <div v-if="currentQuestionIndex < quiz.questions.length">
        <div class="question card p-4 mb-4">
          <h2 class="text-light">{{ currentQuestion.question }}</h2>
          <div v-if="currentQuestion.type === 'multiple-choice'" class="mt-3">
            <div class="d-grid gap-2">
              <button
                v-for="option in currentQuestion.options"
                :key="option"
                class="btn btn-outline-light"
                @click="submitAnswer(option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
          <div v-else-if="currentQuestion.type === 'true-false'" class="mt-3">
            <div class="d-grid gap-2">
              <button class="btn btn-outline-dark" @click="submitAnswer('True')">True</button>
              <button class="btn btn-outline-dark" @click="submitAnswer('False')">False</button>
            </div>
          </div>
          <div v-else-if="currentQuestion.type === 'text'" class="mt-3">
            <input v-model="textAnswer" placeholder="Type your answer" class="form-control mb-3" />
            <button class="btn btn-dark" @click="submitAnswer(textAnswer)">Submit</button>
          </div>
          <div v-if="feedback" :class="feedback.correct ? 'text-success' : 'text-danger'">
            {{ feedback.message }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <h2 class="text-dark">Quiz Completed!</h2>
          <p class="text-dark">Your score: {{ score }}/{{ quiz.questions.length }}</p>
          <button class="btn btn-success" @click="saveResult">Save Result</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-dark">Loading...</p>
    </div>
    <StarEffect v-if="showStars" />
    <audio ref="quizAudio">
      <source src="@/assets/final.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
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
import Swal from 'sweetalert2';
import StarEffect from '@/components/StarEffect.vue';

export default {
  name: 'QuizPage',
  components: {
    StarEffect
  },
  data() {
    return {
      quiz: null,
      currentQuestionIndex: 0,
      score: 0,
      textAnswer: '',
      feedback: null,
      timer: 12,
      intervalId: null,
      showStars: false
    };
  },
  computed: {
    currentQuestion() {
      return this.quiz ? this.quiz.questions[this.currentQuestionIndex] : {};
    },
    formattedTime() {
      return this.timer;
    }
  },
  async created() {
    const quizId = this.$route.params.id;
    try {
      const quizDoc = await db.collection('quizzes').doc(quizId).get();
      if (quizDoc.exists) {
        this.quiz = quizDoc.data();
      } else {
        console.error("Quiz not found");
      }
      this.startTimer();
      this.playMusic(); // Start playing music when quiz begins
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
    this.stopMusic(); // Stop music when component is unmounted
  },
  methods: {
    submitAnswer(answer) {
      if (this.currentQuestionIndex < this.quiz.questions.length) {
        const correctAnswer = this.currentQuestion.correctAnswer;
        if (answer === correctAnswer) {
          this.score++;
          this.feedback = { correct: true, message: 'Correct!' };
        } else {
          this.feedback = { correct: false, message: 'Incorrect. The correct answer is ' + correctAnswer };
        }
        this.resetTimer();
        this.resetMusic(); // Restart the music for the next question
        setTimeout(() => {
          this.feedback = null;
          this.currentQuestionIndex++;
          this.textAnswer = '';
          if (this.currentQuestionIndex >= this.quiz.questions.length) {
            this.showCompletionPopup();
            clearInterval(this.intervalId);
            this.showStars = true; // Show stars
            this.stopMusic(); // Stop the music when quiz is finished
          } else {
            this.startTimer();
          }
        }, 1000);
      }
    },
    async saveResult() {
      const user = projectAuth.currentUser;
      if (user) {
        await db.collection('results').add({
          quizID: this.$route.params.id,
          userID: user.uid,
          score: this.score,
          dateTaken: new Date()
        });
        this.$router.push({ name: 'QuizLeaderboard', params: { quizId: this.$route.params.id } });
      }
    },
    showCompletionPopup() {
      Swal.fire({
        title: 'Quiz Completed!',
        html: `<div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p>Your score: ${this.score}/${this.quiz.questions.length}</p>`,
        showConfirmButton: false,
        timer: 3000,
        backdrop: `rgba(0,0,123,0.4)`,
        customClass: {
          popup: 'animated tada'
        }
      });
    },
    startTimer() {
      this.timer = 12;
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.submitAnswer(null);
        }
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.intervalId);
      this.timer = 12;
    },
    playMusic() {
      const audio = this.$refs.quizAudio;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    },
    resetMusic() {
      const audio = this.$refs.quizAudio;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    },
    stopMusic() {
      const audio = this.$refs.quizAudio;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }
};
</script>

<style scoped>

body {
  background: linear-gradient(135deg, #2B3A42, #1B4242);
}

.quiz-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.question {
  margin-bottom: 20px;
  background-color: #1B4242; /* Slightly dark background */
  border: 2px solid rgba(255, 255, 255, 0.7); /* Brilliant effect on border */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); /* Brilliant shadow effect */
}

.timer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
}

.timer i {
  margin-right: 10px;
}

.stars {
  font-size: 2rem;
  color: gold;
}

.animated {
  animation-duration: 1.5s;
  animation-fill-mode: both;
}

.tada {
  animation-name: tada;
}

@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
