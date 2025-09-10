// auth.js
// Handles Firebase Authentication (Google sign-in) and session state.

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.addEventListener('click', () => {
  firebase.auth().signInWithPopup(provider).catch(err => {
    console.error('Login error:', err);
  });
});

logoutBtn.addEventListener('click', () => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    userInfo.textContent = `Logged in as ${user.displayName}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
  } else {
    userInfo.textContent = '';
    loginBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
  }
});
