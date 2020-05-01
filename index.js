const fs = require('fs');

const listEvents = require('./calendar/events-list')
const authorize = require('./calendar/calendar-autorize')

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Please add the credentials.json file', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});



