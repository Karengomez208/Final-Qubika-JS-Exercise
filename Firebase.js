// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyg0YF6mm75CQtqoseqRf1lnhm9Z5gjVM",
  authDomain: "movie-2c727.firebaseapp.com",
  projectId: "movie-2c727",
  storageBucket: "movie-2c727.firebasestorage.app",
  messagingSenderId: "476182331913",
  appId: "1:476182331913:web:fa7fe24be76939c846aed8",
  measurementId: "G-6Q59863Y4Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = { db };
