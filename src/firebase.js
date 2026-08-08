// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxaVusbxvZeoZA9THnvAt1njKPpc0Op8k",
  authDomain: "campus-outing-pass.firebaseapp.com",
  projectId: "campus-outing-pass",
  storageBucket: "campus-outing-pass.firebasestorage.app",
  messagingSenderId: "26109685918",
  appId: "1:26109685918:web:558fc804b968e4091d8b8f",
  measurementId: "G-N3SZ9B18MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
