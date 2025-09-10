// firebase-config.js
// Replace the values below with your Firebase project configuration.
// The settings can be found in your Firebase console.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);

// Firestore database reference used across the app
const db = firebase.firestore();
