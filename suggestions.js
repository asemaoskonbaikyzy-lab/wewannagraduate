// suggestions.js
// Handles creating group event suggestions and tracking user responses.

const suggestForm = document.getElementById('suggest-form');
const suggestionsDiv = document.getElementById('suggestions');

suggestForm.addEventListener('submit', async e => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  if (!user) return;

  const title = document.getElementById('suggest-title').value;
  const time = document.getElementById('suggest-time').value;

  try {
    await db.collection('suggestions').add({
      title: title,
      time: time,
      createdBy: user.uid,
      responses: {}
    });
  } catch (err) {
    console.error('Suggestion error:', err);
  }

  suggestForm.reset();
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('suggestions').onSnapshot(snapshot => {
      suggestionsDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const container = document.createElement('div');
        container.textContent = `${data.time} - ${data.title}`;

        const accept = document.createElement('button');
        accept.textContent = 'Accept';
        accept.onclick = () => respondToSuggestion(doc.id, 'yes');

        const decline = document.createElement('button');
        decline.textContent = 'Decline';
        decline.onclick = () => respondToSuggestion(doc.id, 'no');

        const resp = data.responses[user.uid];
        if (resp) {
          const status = document.createElement('span');
          status.textContent = ` (${resp})`;
          container.appendChild(status);
        }

        container.appendChild(accept);
        container.appendChild(decline);
        suggestionsDiv.appendChild(container);
      });
    });
  } else {
    suggestionsDiv.innerHTML = '';
  }
});

function respondToSuggestion(id, response) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const field = `responses.${user.uid}`;
  db.collection('suggestions').doc(id).set({ [field]: response }, { merge: true });
}
