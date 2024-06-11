<template>
  
  <router-view/>
</template>

<script>
import { isLogged, getUser, waitForAuthInit } from '@/firebase/Authentification/getUser'; 


export default {
  name: 'App',
  
  data() {
    return {
      user: null,
      islogged: false,
    };
  },
  mounted() {
    waitForAuthInit().then(() => {
      this.islogged = isLogged();
      if (this.islogged) {
        this.user = getUser();
      }
    });
  },
}
</script>

<style>
  body{
    font-family: Arial, sans-serif;
  }
</style>