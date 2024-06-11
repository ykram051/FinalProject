<template>
  <div class="container auth-page mt-5">
    <div class="header-text text-center mb-5">
      <h1 class="quizz-app-title">Learn and Entertain</h1>
      <h3 class="quizz-app-subtitle"></h3>
    </div>
    <div class="row align-items-center">
      <div class="col-md-6 text-center d-flex align-items-center justify-content-center">
        <img src="https://transformers-magazine.com/files/Quiz-time-week-50_career-ch-scaled.jpg" alt="Auth Image" class="img-fluid mb-4 main-img">
      </div>
      <div class="col-md-6 text-center d-flex flex-column align-items-center justify-content-center">
        <div class="form-wrapper">
          <h1 class="welcome-text mb-4">Welcome</h1>
          <p class="subtext mb-4">Please sign up or log in to continue.</p>
          <div class="d-flex flex-column gap-3 btn-container">
            <router-link to="/signup" class="btn btn-signup btn-lg"><i class="fas fa-user-plus"></i> Sign Up</router-link>
            <router-link to="/login" class="btn btn-login btn-lg"><i class="fas fa-sign-in-alt"></i> Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  background: linear-gradient(90deg, #56CCF2, #2F80ED); /* Quartz theme background */
}

.auth-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(253, 246, 246);
  position: relative;
}

.header-text {
  text-align: center;
  margin-bottom: 50px; /* Adjusted spacing */
}

.quizz-app-title {
  font-size: 5rem; /* Increased font size */
  font-family: 'Italiana', serif;
  background: linear-gradient(90deg, #56f282, #2F80ED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  animation: shimmer 2s infinite;
}

.quizz-app-subtitle {
  font-size: 2rem; /* Increased font size */
  font-family: 'Italiana', serif;
  color: #fff;
  margin: 0;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

.welcome-text {
  font-size: 2.5rem; /* Increased font size */
  color: #fff;
  margin: 10px;
  margin-bottom: 10px;
  margin-top: -100px;
}

.subtext {
  font-size: 1.5rem; /* Increased font size */
  color: #fff;
  margin: 10px;
  margin-top: -30px;

}

.btn-signup {
  background-color: #16a085; /* Teal color */
  color: #fff;
  font-size: 1.2rem;
  padding: 10px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px; /* Set fixed width */
  margin: 0 auto; /* Center button */
}

.btn-signup:hover {
  background-color: #16a085; /* Slightly darker teal */
}

.btn-login {
  background-color: #6fc5e4; /* Blue color */
  color: #fff;
  font-size: 1.2rem;
  padding: 10px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px; /* Set fixed width */
  margin: 0 auto; /* Center button */
}

.btn-login:hover {
  background-color: #2980b9; /* Slightly darker blue */
}

.img-fluid {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  height: auto;
}

.main-img {
  width: auto;
  height: 100%;
  max-height: 450px;
}

.form-wrapper {
  height: 100%; /* Ensures the form wrapper is the same height as the image */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-container {
  margin-top: -30px; /* Move the buttons slightly up */
}
</style>
