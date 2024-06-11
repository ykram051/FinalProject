import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/bootstrap.css'; // Import the Quartz theme
import '@fortawesome/fontawesome-free/js/all.js';
import 'sweetalert2/dist/sweetalert2.min.css';



createApp(App).use(router).mount('#app')