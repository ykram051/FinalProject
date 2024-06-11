<template>
  <div class="container signup-page mt-5">
    <header class="d-flex flex-column justify-content-center align-items-center mb-4">
      <h1 class="quizz-app-title">QUIZZ APP</h1>
      <h3 class="quizz-app-subtitle">Sign up to entertain with our quizzes!</h3>
    </header>
    <div class="d-flex justify-content-center align-items-center content-wrapper">
      <div class="image-wrapper">
        <img src="@/assets/OIF.png" alt="App Logo" class="img-fluid app-logo">
      </div>
      <form @submit.prevent="handleSignUp" class="register ms-4">
        <h2 class="text-light mb-4">Sign Up</h2>
        <div class="mb-3">
          <i class="fas fa-user icon"></i>
          <input type="text" required placeholder="Display name" v-model="displayName" class="form-control">
        </div>
        <div class="mb-3">
          <i class="fas fa-envelope icon"></i>
          <input type="email" required placeholder="Your email" v-model="email" class="form-control">
        </div>
        <div class="mb-3">
          <i class="fas fa-lock icon"></i>
          <input type="password" required placeholder="Your password" v-model="password" class="form-control">
        </div>
        <input type="submit" value="Sign up" class="btn btn-custom btn-lg">
        <div class="error mt-3" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useSignup from '@/firebase/Authentification/useSignup';

const displayName = ref('');
const email = ref('');
const password = ref('');

const { error, signup } = useSignup();
const router = useRouter();

const handleSignUp = async () => {
  const user = await signup(email.value, password.value, displayName.value);
  if (user && !error.value) {
    router.push('/home');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  background: linear-gradient(90deg, #56CCF2, #2F80ED); /* Quartz theme background */
}

.signup-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

header {
  text-align: center;
}

.quizz-app-title {
  font-size: 5rem; /* Increased font size */
  font-family: 'Italiana', serif;
  background: linear-gradient(90deg, #56f282, #2F80ED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0; /* Adjust margin as needed */
}

.quizz-app-subtitle {
  font-size: 1.5rem;
  color: #fff;
  margin-top: 0;
}

.content-wrapper {
  width: 100%;
  max-width: 1000px; /* Ensure both elements are of the same size */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #fff; /* White border */
  border-radius: 10px;
  padding: 20px;
}

.image-wrapper {
  max-width: 50%; /* Adjust size */
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-logo {
  width: 100%;
  height: auto;
  max-height: 500px; /* Ensure the image has the same height as the sign-up form */
  border-radius: 10px;
}

.register {
  max-width: 45%; /* Adjust size */
  width: 100%;
  padding: 3rem; /* Adjusted padding */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #1B4242; /* Dark blue background color */
  color: #fff; /* Ensure text is readable */
  border: 2px solid #fff; /* White border for sign-up form */
}

.register h2 {
  color: #fff; /* Ensure text is readable */
  font-weight: bold;
}

.form-control {
  width: 90%; /* Adjusted width */
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin-left: 2rem; /* Adjust margin to align with icon */
  background-color: transparent; /* Transparent background */
  color: #fff; /* Ensure text is readable */
}

.form-control::placeholder {
  color: #999;
}

.btn-custom {
  background-color: #56f2cbd7; /* Custom color to fit Quartz theme */
  color: #fff;
  font-size: 1.2rem;
  padding: 15px 20px; /* Increased padding */
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 100%;
}

.btn-custom:hover {
  background-color: #088e8e; /* Slightly lighter shade for hover */
}

.error {
  color: #ff0000;
  margin-top: 1rem;
}

.icon {
  position: absolute;
  margin-left: 10px;
  margin-top: 12px;
  color: #fff;
}
</style>
