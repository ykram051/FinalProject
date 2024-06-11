<template>
    <div class="star" v-for="star in stars" :key="star.id" :style="star.style"></div>
  </template>
  
  <script>
  export default {
    name: 'StarEffect',
    data() {
      return {
        stars: []
      };
    },
    methods: {
      generateStars() {
        this.stars = [];
        for (let i = 0; i < 50; i++) {
          const star = {
            id: i,
            style: {
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random()}s`
            }
          };
          this.stars.push(star);
        }
      }
    },
    mounted() {
      this.generateStars();
    }
  };
  </script>
  
  <style scoped>
  .star {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: gold;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: sparkle 1s infinite;
  }
  
  @keyframes sparkle {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
  </style>
  