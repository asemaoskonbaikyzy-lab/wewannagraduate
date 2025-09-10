// app.js
// Handles event creation and real-time display of a user's schedule.

const form = document.getElementById('event-form');
const calendar = document.getElementById('calendar');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  if (!user) return;

  const title = document.getElementById('event-title').value;
  const time = document.getElementById('event-time').value;

  try {
    await db.collection('events').add({
      title: title,
      time: time,
      createdBy: user.uid,
      shared: false
    });
  } catch (error) {
    console.error('Error:', error);
  }

  form.reset();
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('events')
      .where('createdBy', '==', user.uid)
      .orderBy('time')
      .onSnapshot(snapshot => {
        calendar.innerHTML = '';
        snapshot.forEach(doc => {
          const data = doc.data();
          const eventDiv = document.createElement('div');
          eventDiv.textContent = `${data.time} - ${data.title}`;
          calendar.appendChild(eventDiv);
        });
      });
  } else {
    calendar.innerHTML = '<p>Please sign in to view your schedule.</p>';
  }
});
