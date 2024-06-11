// src/firebase/Config.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; // Import Firebase Storage

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAnhubE2q-j6HeWZZPotvGsfDXO7GxlGcw",
  authDomain: "fireblogs-46175.firebaseapp.com",
  projectId: "fireblogs-46175",
  storageBucket: "fireblogs-46175.appspot.com",
  messagingSenderId: "809328886833",
  appId: "1:809328886833:web:ab33eae5653bff0f460110"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database instance
const db = firebase.firestore();

// Authentication instance
const projectAuth = firebase.auth();

// Google authentication provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Storage instance
const storage = firebase.storage(); // Add this line to initialize storage

// Export the instances for use in other parts of the application
export { db, projectAuth, googleProvider, firebase ,storage};
